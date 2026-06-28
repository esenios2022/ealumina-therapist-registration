import { NextRequest, NextResponse } from "next/server";
import { getMpPreApproval } from "@/lib/mercadopago";
import { createServiceRoleClient } from "@/lib/supabase/server";

function mapStatus(status: string): string {
  if (status === "authorized") return "active";
  if (status === "paused") return "past_due";
  return "canceled";
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const type = body?.type ?? request.nextUrl.searchParams.get("type");
  const preapprovalId = body?.data?.id ?? request.nextUrl.searchParams.get("data.id");

  if (type !== "subscription_preapproval" || !preapprovalId) {
    return NextResponse.json({ received: true });
  }

  const preapproval = await getMpPreApproval().get({ id: preapprovalId });
  const userId = preapproval.external_reference;
  if (!userId) return NextResponse.json({ received: true });

  const status = mapStatus(preapproval.status ?? "");
  const supabase = createServiceRoleClient();

  await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      provider: "mercadopago",
      provider_subscription_id: preapproval.id,
      status,
    },
    { onConflict: "provider_subscription_id" }
  );

  await supabase.from("profiles").update({ subscription_status: status }).eq("id", userId);

  return NextResponse.json({ received: true });
}
