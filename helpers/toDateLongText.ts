import { lastDayOfWeek, startOfWeek } from "date-fns";
import { getLocales } from "expo-localization";

export const toDateLongText = (timePeriod: string, date?: string | Date) => {
  if (!date) return "Not selected";
  if (!timePeriod) return "No data";

  const locale = getLocales()[0];

  switch (timePeriod) {
    case "Daily":
      return new Date(date).toLocaleDateString(locale.languageTag, {
        dateStyle: "full",
      });
    case "Weekly":
      return (
        new Date(startOfWeek(date)).toLocaleDateString(locale.languageTag) +
        " - " +
        new Date(lastDayOfWeek(date)).toLocaleDateString(locale.languageTag)
      );
    case "Monthly":
      return (
        new Date(date).toLocaleDateString(locale.languageTag, {
          month: "long",
        }) +
        " " +
        new Date(date).getFullYear()
      );
    case "Yearly":
      return String(new Date(date).getFullYear());
    default:
      throw Error("Invalid time period");
  }
};
