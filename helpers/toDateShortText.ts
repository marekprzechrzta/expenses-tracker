import { getWeek } from "date-fns";
import { getLocales } from "expo-localization";

export const toDateShortText = (timePeriod: string, date: string | Date) => {
  const locale = getLocales()[0];
  switch (timePeriod) {
    case "Daily":
      return new Date(date).toLocaleDateString(locale.languageTag, {
        weekday: "short",
      });
    case "Weekly":
      return String(getWeek(date));
    case "Monthly":
      return new Date(date).toLocaleDateString(locale.languageTag, {
        month: "short",
      });
    case "Yearly":
      return String(new Date(date).getFullYear());
    default:
      throw Error("Invalid time period");
  }
};
