export const JOB_STATUSES = [
  "saved", "applied", "assessment", "interview", "offer", "rejected", "withdrawn"
] as const;

export type JobStatus = typeof JOB_STATUSES[number];

export interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  jobUrl: string;
  employmentType: string;
  status: JobStatus;
  dateAdded: string;
  applicationDate?: string;
  followUpDate?: string;
  notes: string;
}