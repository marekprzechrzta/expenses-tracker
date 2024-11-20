import { getLocales } from "expo-localization";

export const formatDate = (date: string | Date) => {
  const locale = getLocales()[0];
  return new Date(date).toLocaleDateString(locale.languageTag);
};
