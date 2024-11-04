import * as SQLite from "expo-sqlite";
import { format } from "date-fns";

import { Expense } from "@/models/Expense";
import { TimePeriodExpense } from "@/models/TimePeriodExpense";
import { getDateFromWeek } from "@/helpers/getDateFromWeek";
import { add } from "@/helpers/add";
import { calculateEndDate } from "@/helpers/calculateEndDate";

export const createExpense = async (payload: Omit<Expense, "id">) => {
  const { name, category, amount, date } = payload;
  const db = await SQLite.openDatabaseAsync("expensesDb");
  const query =
    "INSERT INTO expenses (name, category, amount, date) VALUES (?, ?, ?, ?)";
  await db.runAsync(query, name, category, amount, date);
};

export const getRecentExpenses = async (limit = 5) => {
  const db = await SQLite.openDatabaseAsync("expensesDb");
  const query = `SELECT * FROM expenses ORDER BY date DESC LIMIT ${limit}`;
  return db.getAllAsync<Expense>(query);
};

export const getAllExpenses = async () => {
  const db = await SQLite.openDatabaseAsync("expensesDb");
  const query = `SELECT * FROM expenses ORDER BY date DESC`;
  return db.getAllAsync<Expense>(query);
};

export const searchByName = async (
  search: string,
  timePeriod?: string,
  date?: string
) => {
  let query = `
    SELECT *
    FROM expenses
    WHERE (name LIKE '%${search}%' OR category LIKE '%${search}%')
  `;

  if (timePeriod && date) {
    const { from, to } = timePeriodToDateRange(timePeriod, date);
    query += ` AND date BETWEEN '${from}' AND '${to}'`;
  }

  const db = await SQLite.openDatabaseAsync("expensesDb");
  return db.getAllAsync<Expense>(query);
};

export const findExpenses = async (timePeriod: string, date: string) => {
  const { from, to } = timePeriodToDateRange(timePeriod, date);
  const dateRangeQuery = createFindExpensesQuery(from, to);
  const db = await SQLite.openDatabaseAsync("expensesDb");
  return db.getAllAsync<Expense>(dateRangeQuery);
};

export const getTimePeriodExpenses = async (timePeriod = "Daily") => {
  const db = await SQLite.openDatabaseAsync("expensesDb");
  const query = createQueryGroupByTimePeriodAndCategory(timePeriod);
  const items = await db.getAllAsync<GroupExpense>(query);
  const maxColumnSize = 8;
  return items
    .reduce(toTimePeriodExpenses(timePeriod), [])
    .slice(0, maxColumnSize);
};

const timePeriodToDateRange = (timePeriod: string, date: string) => {
  const from = new Date(date);
  const to = calculateEndDate(timePeriod, from);
  return { from: format(from, "yyyy-MM-dd"), to: format(to, "yyyy-MM-dd") };
};

const createFindExpensesQuery = (from: string, to: string) => {
  return `
    SELECT *
    FROM expenses
    WHERE date BETWEEN '${from}' AND '${to}'
    ORDER BY category
  `;
};

const createQueryGroupByTimePeriodAndCategory = (timePeriod: string) => {
  const formatMap = new Map([
    ["Daily", "%Y-%m-%d"],
    ["Weekly", "%Y-%W"],
    ["Monthly", "%Y-%m"],
    ["Yearly", "%Y"],
  ]);
  const dateFormat = formatMap.get(timePeriod);

  if (!dateFormat) throw Error("Invalid time period");

  return `
      SELECT 
        strftime('${dateFormat}', date) AS timePeriodDate,
        category, 
        SUM(amount) AS totalAmount
      FROM 
        expenses
      GROUP BY 
        timePeriodDate, category
      ORDER BY 
        timePeriodDate, category;
    `;
};

const toTimePeriodExpenses =
  (timePeriod: string) => (acc: TimePeriodExpense[], item: GroupExpense) => {
    const date =
      timePeriod === "Weekly"
        ? getDateFromWeek(item.timePeriodDate)
        : item.timePeriodDate;

    const found = acc.find((i) => i.date === date);
    if (found) {
      found.totalAmount = add(found.totalAmount, item.totalAmount);
      found.categoryExpenses.push({
        totalAmount: item.totalAmount,
        category: item.category,
      });
      return acc;
    }

    acc.push({
      totalAmount: item.totalAmount,
      timePeriod: timePeriod,
      date: date,
      categoryExpenses: [
        { totalAmount: item.totalAmount, category: item.category },
      ],
    });
    return acc;
  };

interface GroupExpense {
  category: string;
  timePeriodDate: string;
  totalAmount: number;
}
