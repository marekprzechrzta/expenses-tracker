import { Category } from "@/models/Category";
import { getDatabase } from "./expensesApi";

export const createCategory = async ({ value, label }: Category) => {
  try {
    const db = await getDatabase();
    const query = "INSERT INTO categories (value, label) VALUES (?, ?)";
    await db.runAsync(query, value, label);
  } catch (e) {
    alert(e);
  }
};

export const deleteCategory = async (category: string) => {
  await new Promise((res) => setTimeout(res, 300));
  try {
    const db = await getDatabase();
    const query = "DELETE FROM categories WHERE value = ?";
    await db.runAsync(query, category);
  } catch (e) {
    alert(e);
  }
};

export const getCategories = async () => {
  try {
    const db = await getDatabase();
    const query = `SELECT * FROM categories`;
    const res = await db.getAllAsync<Category>(query);
    return res;
  } catch (e) {
    alert(e);
  }
};
