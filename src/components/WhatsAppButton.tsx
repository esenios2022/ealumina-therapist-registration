const PHONE = "59893422022";
const MENSAJE = "Hola! Quiero suscribirme a Terra Araras, ¿cómo hago el pago?";

export default function WhatsAppButton({ className }: { className?: string }) {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MENSAJE)}`;

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
      Consultar por WhatsApp
    </a>
  );
}
