import { TimePeriodExpense } from "@/models/TimePeriodExpense";

export const calculateScale = (
  expenses: TimePeriodExpense[],
  maxValue: number
) => {
  let amount = findHightestTotalAmount(expenses);
  let scale = 1;
  while (amount > maxValue) {
    amount = amount / 2;
    scale = scale / 2;
  }
  return scale;
};

const findHightestTotalAmount = (expenses: TimePeriodExpense[]) => {
  const amounts = expenses.map((e) => e.totalAmount);
  return Math.max(...amounts);
};
