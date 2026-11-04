import "../styles/variables.css";
import "./popup.css";
import { addJob, getJobs } from "../services/storage.service";
import { validateJobInput } from "../services/validation.service";
import { createId } from "../utils/id.utils";
import type { JobApplication, JobStatus } from "../types/job.types";

const form = document.querySelector<HTMLFormElement>("#job-form")!;
const message = document.querySelector<HTMLParagraphElement>("#form-message")!;
const count = document.querySelector<HTMLSpanElement>("#job-count")!;

async function refreshCount(): Promise<void> {
  const jobs = await getJobs();
  count.textContent = `${jobs.length} application${jobs.length === 1 ? "" : "s"} saved`;
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  message.textContent = "";
  const data = new FormData(form);
  const input = {
    jobTitle: String(data.get("jobTitle") ?? "").trim(),
    company: String(data.get("company") ?? "").trim(),
    location: String(data.get("location") ?? "").trim(),
    jobUrl: String(data.get("jobUrl") ?? "").trim(),
    employmentType: String(data.get("employmentType") ?? ""),
    status: String(data.get("status") ?? "saved") as JobStatus,
    notes: String(data.get("notes") ?? "").trim()
  };
  const error = validateJobInput(input);
  if (error) {
    message.textContent = error;
    message.className = "form-message error";
    return;
  }
  const now = new Date().toISOString();
  const job: JobApplication = {
    ...input,
    id: createId(),
    dateAdded: now,
    ...(input.status !== "saved" ? { applicationDate: now } : {})
  };
  try {
    await addJob(job);
    form.reset();
    message.textContent = "Job saved successfully.";
    message.className = "form-message success";
    await refreshCount();
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : "Could not save this job.";
    message.className = "form-message error";
  }
});

refreshCount().catch(error => {
  message.textContent = error instanceof Error ? error.message : "Unable to load saved jobs.";
  message.className = "form-message error";
});