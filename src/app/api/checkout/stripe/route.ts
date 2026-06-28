import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    client_reference_id: user.id,
    line_items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!, quantity: 1 }],
    success_url: `${siteUrl}/dashboard?suscripcion=ok`,
    cancel_url: `${siteUrl}/dashboard?suscripcion=cancelada`,
  });

  return NextResponse.json({ url: session.url });
}
