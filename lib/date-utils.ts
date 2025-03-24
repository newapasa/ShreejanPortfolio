/**
 * Format a date string (YYYY-MM) to a more readable format
 */
export function formatDate(dateString: string): string {
  if (dateString === "Present") return "Present";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("en-US", options);
}

/**
 * Calculate duration between two dates
 */
export function calculateDuration(startDate: string, endDate: string): string {
  if (!startDate) return "";

  const start = new Date(startDate);
  const end = endDate === "Present" ? new Date() : new Date(endDate);

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  let totalMonths = years * 12 + months;
  if (totalMonths < 0) totalMonths = 0;

  const durationYears = Math.floor(totalMonths / 12);
  const durationMonths = totalMonths % 12;

  let result = "";
  if (durationYears > 0) {
    result += `${durationYears} year${durationYears !== 1 ? "s" : ""}`;
  }

  if (durationMonths > 0) {
    if (result) result += ", ";
    result += `${durationMonths} month${durationMonths !== 1 ? "s" : ""}`;
  }

  return result;
}
