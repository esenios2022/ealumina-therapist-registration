import type { Locale } from "@/lib/i18n/config";
import type { ContentItem } from "@/lib/types";

export function localizedContent(item: ContentItem, locale: Locale) {
  if (locale === "pt") {
    return {
      title: item.title_pt || item.title,
      description: item.description_pt || item.description,
    };
  }
  return { title: item.title, description: item.description };
}
