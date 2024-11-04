import { CategoryExpense } from "./CategoryExpense";

export interface TimePeriodExpense {
  totalAmount: number;
  timePeriod: string;
  date: string;
  categoryExpenses: CategoryExpense[];
}
