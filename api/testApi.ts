import * as SQLite from "expo-sqlite";

import { createExpense } from "./expensesApi";

export const seedDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("expensesDb");
  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, category TEXT NOT NULL, amount REAL, date TEXT NOT NULL);
      INSERT INTO expenses (name, category, amount, date) VALUES ('Beer', 'Alcohol', 23, '2024-01-01');
      INSERT INTO expenses (name, category, amount, date) VALUES ('Groceries', 'Food', 33, '2024-01-02');
      INSERT INTO expenses (name, category, amount, date) VALUES ('Jacket', 'Clothes', 102, '2024-01-03');
    `);
};

export const createRandomExpense = async () => {
  await createExpense({
    name: getRandom(names),
    category: getRandom(categories),
    amount: getRandom(amounts),
    date: getRandom(dates),
  });
};

export const clearDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("expensesDb");
  await db.execAsync(`DELETE FROM expenses`);
};

const getRandom = <T>(collection: T[]) => {
  return collection[randomIdx(collection.length)];
};

const randomIdx = (max: number) => Math.floor(Math.random() * max);

const names = [
  "Bear",
  "Jacket",
  "Groceries",
  "Bus ticket",
  "Insurance",
  "Flowers",
];

const dates = [
  "2023-10-01",
  "2023-11-01",
  "2023-12-01",
  "2024-03-11",
  "2024-04-15",
  "2023-09-08",
  "2024-10-10",
];

const categories = ["Food", "Alcohol", "Clothes", "Commute", "House", "Other"];

const amounts = [2, 35, 105, 40, 22, 56.8];