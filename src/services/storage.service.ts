import type { JobApplication } from "../types/job.types";

const STORAGE_KEY = "jobtrack_jobs";

function storageAvailable(): boolean {
  return typeof chrome !== "undefined" && Boolean(chrome.storage?.local);
}

export async function getJobs(): Promise<JobApplication[]> {
  if (!storageAvailable()) throw new Error("Chrome extension storage is unavailable. Load this page from the installed extension.");
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const value: unknown = result[STORAGE_KEY];
  return Array.isArray(value) ? value as JobApplication[] : [];
}

export async function saveJobs(jobs: JobApplication[]): Promise<void> {
  if (!storageAvailable()) throw new Error("Chrome extension storage is unavailable.");
  await chrome.storage.local.set({ [STORAGE_KEY]: jobs });
}

export async function addJob(job: JobApplication): Promise<void> {
  const jobs = await getJobs();
  if (job.jobUrl && jobs.some(item => item.jobUrl === job.jobUrl)) {
    throw new Error("This job URL is already saved.");
  }
  await saveJobs([job, ...jobs]);
}

export async function deleteJob(id: string): Promise<void> {
  const jobs = await getJobs();
  await saveJobs(jobs.filter(job => job.id !== id));
}

export async function updateJob(id: string, changes: Partial<JobApplication>): Promise<void> {
  const jobs = await getJobs();
  const updated = jobs.map(job => job.id === id ? { ...job, ...changes, id: job.id } : job);
  await saveJobs(updated);
}