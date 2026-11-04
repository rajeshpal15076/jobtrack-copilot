import { JOB_STATUSES, type JobApplication } from "../types/job.types";

export function validateJobInput(input: Partial<JobApplication>): string | null {
  if (!input.jobTitle?.trim()) return "Please enter a job title.";
  if (!input.company?.trim()) return "Please enter a company name.";
  if (input.jobUrl?.trim()) {
    try {
      const url = new URL(input.jobUrl);
      if (!["http:", "https:"].includes(url.protocol)) return "Use an HTTP or HTTPS job URL.";
    } catch {
      return "Please enter a valid job URL.";
    }
  }
  if (input.status && !JOB_STATUSES.includes(input.status)) return "Please choose a valid status.";
  return null;
}