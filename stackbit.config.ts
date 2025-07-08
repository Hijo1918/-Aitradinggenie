// stackbit.config.ts
import {
  defineStackbitConfig,
  getLocalizedFieldForLocale,
  SiteMapEntry
} from "@stackbit/types";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  siteMap: ({ documents, models }) => {
    const pageModels = models.filter(m => m.type === "page").map(m => m.name);
    return documents
      .filter(d => pageModels.includes(d.modelName))
      .map(document => {
        // ...
        return {
          document
          // ...
        };
      })
      .filter(Boolean) as SiteMapEntry[];
  }
});

