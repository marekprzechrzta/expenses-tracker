import { getWeek } from "date-fns";

export const toDateShortText = (timePeriod: string, date: string | Date) => {
  switch (timePeriod) {
    case "Daily":
      return new Date(date).toLocaleDateString("en", { weekday: "short" });
    case "Weekly":
      return String(getWeek(date));
    case "Monthly":
      return new Date(date).toLocaleDateString("default", { month: "short" });
    case "Yearly":
      return String(new Date(date).getFullYear());
    default:
      throw Error("Invalid time period");
  }
};
