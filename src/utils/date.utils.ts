export function formatDate(value?: string): string {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function dateRelation(value?: string): "overdue" | "today" | "upcoming" | "none" {
  if (!value) return "none";
  const target = new Date(value);
  if (Number.isNaN(target.getTime())) return "none";
  const today = new Date();
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  if (target < today) return "overdue";
  if (target.getTime() === today.getTime()) return "today";
  return "upcoming";
}