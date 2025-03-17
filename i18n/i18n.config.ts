import en from "./locales/en.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import ca from "./locales/ca.json";

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: {
      en,
      es,
      de,
      fr,
      ca,
    },
    missingWarn: false,
    fallbackWarn: false,
  };
});
