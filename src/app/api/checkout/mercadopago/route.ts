import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getMpPreApproval } from "@/lib/mercadopago";

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const preapproval = await getMpPreApproval().create({
    body: {
      reason: "Suscripción mensual Terra Araras",
      external_reference: session.userId,
      payer_email: session.email,
      back_url: `${siteUrl}/dashboard?suscripcion=ok`,
      status: "pending",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: Number(process.env.MERCADOPAGO_MONTHLY_AMOUNT ?? "0"),
        currency_id: "UYU",
      },
    },
  });

  return NextResponse.json({ url: preapproval.init_point });
}
