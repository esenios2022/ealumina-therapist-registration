import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const PHONE = "59893422022";

export default function WhatsAppButton({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const t = getDictionary(locale);
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t.whatsapp.message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-block rounded-full bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
      }
    >
      {t.whatsapp.button}
    </a>
  );
}
