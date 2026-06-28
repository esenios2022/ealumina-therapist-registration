import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createServiceRoleClient } from "@/lib/supabase/server";

function mapStatus(status: Stripe.Subscription.Status): string {
  if (status === "active" || status === "trialing") return "active";
  if (status === "past_due" || status === "unpaid") return "past_due";
  return "canceled";
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    if (userId) {
      await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          provider: "stripe",
          provider_customer_id: session.customer as string,
          provider_subscription_id: session.subscription as string,
          status: "active",
        },
        { onConflict: "provider_subscription_id" }
      );
      await supabase
        .from("profiles")
        .update({ subscription_status: "active" })
        .eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const status = mapStatus(subscription.status);

    const { data: existing } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("provider_subscription_id", subscription.id)
      .single();

    await supabase
      .from("subscriptions")
      .update({ status, current_period_end: new Date(subscription.current_period_end * 1000).toISOString() })
      .eq("provider_subscription_id", subscription.id);

    if (existing?.user_id) {
      await supabase
        .from("profiles")
        .update({ subscription_status: status })
        .eq("id", existing.user_id);
    }
  }

  return NextResponse.json({ received: true });
}
