import type { JobApplication } from "../types/job.types";

const columns: (keyof JobApplication)[] = [
  "jobTitle", "company", "location", "jobUrl", "employmentType", "status",
  "dateAdded", "applicationDate", "followUpDate", "notes"
];

function csvCell(value: unknown): string {
  let text = String(value ?? "");
  // Reduce spreadsheet formula-injection risk when opening exported CSV files.
  if (/^[\s]*[=+\-@]/.test(text)) text = "'" + text;
  return `"${text.replace(/"/g, '""')}"`;
}

export function jobsToCsv(jobs: JobApplication[]): string {
  return [
    columns.join(","),
    ...jobs.map(job => columns.map(key => csvCell(job[key])).join(","))
  ].join("\r\n");
}

export function downloadText(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}