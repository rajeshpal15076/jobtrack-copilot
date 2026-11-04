import "../styles/variables.css";
import "./dashboard.css";
import { deleteJob, getJobs, saveJobs, updateJob } from "../services/storage.service";
import { downloadText, jobsToCsv } from "../services/export.service";
import { formatDate, dateRelation } from "../utils/date.utils";
import { JOB_STATUSES, type JobApplication, type JobStatus } from "../types/job.types";

const list = document.querySelector<HTMLElement>("#job-list")!;
const search = document.querySelector<HTMLInputElement>("#search-input")!;
const filter = document.querySelector<HTMLSelectElement>("#status-filter")!;
const followupList = document.querySelector<HTMLElement>("#followup-list")!;

const labels: Record<JobStatus, string> = {
  saved: "Saved", applied: "Applied", assessment: "Assessment", interview: "Interview",
  offer: "Offer", rejected: "Rejected", withdrawn: "Withdrawn"
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]!);
}

function renderStats(jobs: JobApplication[]): void {
  document.querySelector("#stat-total")!.textContent = String(jobs.length);
  document.querySelector("#stat-applied")!.textContent = String(jobs.filter(j => j.status === "applied").length);
  document.querySelector("#stat-interview")!.textContent = String(jobs.filter(j => j.status === "interview").length);
  document.querySelector("#stat-offer")!.textContent = String(jobs.filter(j => j.status === "offer").length);
}

function renderJobs(jobs: JobApplication[]): void {
  const query = search.value.trim().toLowerCase();
  const selected = filter.value;
  const visible = jobs.filter(job => {
    const matchesText = `${job.jobTitle} ${job.company} ${job.location}`.toLowerCase().includes(query);
    return matchesText && (selected === "all" || job.status === selected);
  });
  if (!visible.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">⌕</div><h3>No applications found</h3><p>Save a job from the extension popup or adjust your search.</p></div>`;
    return;
  }
  list.innerHTML = visible.map(job => `
    <article class="job-card">
      <div class="job-main">
        <div class="company-avatar">${escapeHtml(job.company.slice(0, 1).toUpperCase())}</div>
        <div class="job-details">
          <h4>${escapeHtml(job.jobTitle)}</h4>
          <p>${escapeHtml(job.company)}${job.location ? ` · ${escapeHtml(job.location)}` : ""}</p>
          <small>Added ${formatDate(job.dateAdded)}${job.followUpDate ? ` · Follow-up ${formatDate(job.followUpDate)}` : ""}</small>
          ${job.jobUrl ? `<a class="job-link" href="${escapeHtml(job.jobUrl)}" target="_blank" rel="noopener noreferrer">Open job listing ↗</a>` : ""}
        </div>
      </div>
      <div class="job-actions">
        <select class="status-select" data-status-id="${escapeHtml(job.id)}" aria-label="Application status">
          ${JOB_STATUSES.map(status => `<option value="${status}" ${job.status === status ? "selected" : ""}>${labels[status]}</option>`).join("")}
        </select>
        <input class="followup-input" type="date" data-followup-id="${escapeHtml(job.id)}" value="${escapeHtml(job.followUpDate ?? "")}" aria-label="Follow-up date" />
        <button class="delete-button" data-delete-id="${escapeHtml(job.id)}" aria-label="Delete ${escapeHtml(job.jobTitle)}">Delete</button>
      </div>
    </article>
  `).join("");
}

function renderFollowups(jobs: JobApplication[]): void {
  const items = jobs.filter(job => job.followUpDate).sort((a, b) => (a.followUpDate ?? "").localeCompare(b.followUpDate ?? ""));
  if (!items.length) {
    followupList.innerHTML = `<p class="empty-inline">No follow-ups scheduled yet.</p>`;
    return;
  }
  followupList.innerHTML = items.map(job => {
    const relation = dateRelation(job.followUpDate);
    return `<div class="followup-row"><div><strong>${escapeHtml(job.jobTitle)}</strong><span>${escapeHtml(job.company)}</span></div><div class="followup-date ${relation}">${formatDate(job.followUpDate)}${relation === "overdue" ? " · Overdue" : relation === "today" ? " · Today" : ""}</div></div>`;
  }).join("");
}

async function render(): Promise<void> {
  const jobs = await getJobs();
  renderStats(jobs);
  renderJobs(jobs);
  renderFollowups(jobs);
}

search.addEventListener("input", () => { void render(); });
filter.addEventListener("change", () => { void render(); });

list.addEventListener("change", async event => {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement) || !target.dataset.statusId) return;
  await updateJob(target.dataset.statusId, { status: target.value as JobStatus });
  await render();
});

list.addEventListener("change", async event => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.dataset.followupId) return;
  await updateJob(target.dataset.followupId, { followUpDate: target.value || undefined });
  await render();
});

list.addEventListener("click", async event => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest<HTMLButtonElement>("[data-delete-id]");
  if (!button?.dataset.deleteId) return;
  if (!confirm("Delete this application? This cannot be undone unless you have a backup.")) return;
  await deleteJob(button.dataset.deleteId);
  await render();
});

document.querySelector("#export-button")!.addEventListener("click", async () => {
  const jobs = await getJobs();
  downloadText("jobtrack-applications.csv", jobsToCsv(jobs), "text/csv;charset=utf-8");
});

document.querySelector("#backup-button")!.addEventListener("click", async () => {
  const jobs = await getJobs();
  downloadText("jobtrack-backup.json", JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), jobs }, null, 2), "application/json");
});

document.querySelector<HTMLInputElement>("#restore-input")!.addEventListener("change", async event => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.files?.[0]) return;
  try {
    const parsed: unknown = JSON.parse(await input.files[0].text());
    if (!parsed || typeof parsed !== "object" || !("jobs" in parsed) || !Array.isArray(parsed.jobs)) {
      throw new Error("This backup file does not contain a valid jobs list.");
    }
    const imported = parsed.jobs as JobApplication[];
    const valid = imported.every(job =>
      job && typeof job.id === "string" && typeof job.jobTitle === "string" &&
      typeof job.company === "string" && JOB_STATUSES.includes(job.status)
    );
    if (!valid) throw new Error("The backup contains invalid job records.");
    if (!confirm(`Restore ${imported.length} jobs? This replaces your current saved list.`)) return;
    await saveJobs(imported);
    await render();
    alert("Backup restored.");
  } catch (error) {
    alert(error instanceof Error ? error.message : "Could not restore backup.");
  } finally {
    input.value = "";
  }
});

document.querySelector("#clear-button")!.addEventListener("click", async () => {
  if (!confirm("Permanently delete all JobTrack data from this Chrome profile? Export a backup first if needed.")) return;
  await saveJobs([]);
  await render();
});

render().catch(error => {
  list.innerHTML = `<div class="empty-state"><h3>Unable to load applications</h3><p>${escapeHtml(error instanceof Error ? error.message : "Unknown error")}</p></div>`;
});