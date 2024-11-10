import { calculateEndDate } from "@/helpers/calculateEndDate";

describe("calculateEndDate", () => {
  test("calculates end date for daily period", () => {
    const timePeriod = "Daily";
    const date = new Date("2024-01-01");

    const res = calculateEndDate(timePeriod, date);

    expect(res).toEqual(new Date("2024-01-02"));
  });
});
