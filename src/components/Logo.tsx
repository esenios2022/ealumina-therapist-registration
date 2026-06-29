import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className ?? ""}`}>
      <Image src="/logo.png" alt="Terra Araras" width={44} height={44} className="rounded-full" />
      <span className="font-serif text-2xl font-semibold tracking-wide md:text-3xl">
        Terra Araras
      </span>
    </span>
  );
}
