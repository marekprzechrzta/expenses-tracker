import { initialization, useIntl } from "react-native-international";
import { getLocales } from "expo-localization";

import enLang from "@/translations/en";
import plLang from "@/translations/pl";
import deLang from "@/translations/de";

const localeFromPhone = async () => {
  // You can take saved language from storage here
  return getLocales()?.[0]?.languageCode ?? "en";
};

void initialization({
  defaultFallback: "en",
  languages: [enLang, plLang, deLang],
  localeFromPhone,
  debug: true, // i18next debug (optional)
});

export const useT = () => {
  return useIntl() as { t: (t: string) => string };
};
