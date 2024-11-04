import { lastDayOfWeek, startOfWeek } from "date-fns";

export const toDateLongText = (timePeriod: string, date?: string | Date) => {
  if (!date) return "Not selected";
  if (!timePeriod) return "No data";

  switch (timePeriod) {
    case "Daily":
      return new Date(date).toDateString();
    case "Weekly":
      return (
        new Date(startOfWeek(date)).toDateString() +
        " - " +
        new Date(lastDayOfWeek(date)).toDateString()
      );
    case "Monthly":
      return (
        new Date(date).toLocaleDateString("default", { month: "long" }) +
        " " +
        new Date(date).getFullYear()
      );
    case "Yearly":
      return String(new Date(date).getFullYear());
    default:
      throw Error("Invalid time period");
  }
};
