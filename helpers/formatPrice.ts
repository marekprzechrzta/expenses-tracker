import { getLocales } from "expo-localization";

export const formatPrice = (amount: number) => {
  const language = getLocales()[0];

  return Intl.NumberFormat(language.languageTag as string, {
    style: "currency",
    currencyDisplay: "symbol",
    currencySign: "standard",
    currency: language.currencyCode as string,
  }).format(amount);
};
