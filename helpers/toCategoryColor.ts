import { color } from "@/constants/theme";

const categoryColorMap = new Map([
  ["Food", color.green],
  ["Clothes", color.blue],
  ["Alcohol", color.red],
  ["Commute", color.yellow],
  ["House", color.purple],
  ["Other", color.secondary],
]);

export const toCategoryColor = (category: string) => {
  const categoryColor = categoryColorMap.get(category);
  return categoryColor ?? "";
};
