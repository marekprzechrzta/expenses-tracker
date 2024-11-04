export const getDateFromWeek = (str: string) => {
  let [year, week] = str.split("-");

  if (!year || !week) throw Error("Invalid string");

  const date = new Date(Number(year), 0, 1);
  const dayOfWeek = date.getDay() || 7;
  const dayOffset = (Number(week) - 1) * 7 - (dayOfWeek - 1);

  date.setDate(date.getDate() + dayOffset);

  return date.toISOString();
};
