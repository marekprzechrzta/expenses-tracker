import { addDays, addMonths, addYears } from "date-fns";

export const calculateEndDate = (timePeriod: string, start: Date) => {
  if (timePeriod === "Daily") {
    return addDays(start, 1);
  } else if (timePeriod === "Weekly") {
    return addDays(start, 7);
  } else if (timePeriod === "Monthly") {
    return addMonths(start, 1);
  } else if (timePeriod === "Yearly") {
    return addYears(start, 1);
  } else {
    throw Error("Invalid time period");
  }
};
