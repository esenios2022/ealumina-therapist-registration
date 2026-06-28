import { MercadoPagoConfig, PreApproval } from "mercadopago";

let preApprovalClient: PreApproval | null = null;

export function getMpPreApproval(): PreApproval {
  if (!preApprovalClient) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });
    preApprovalClient = new PreApproval(client);
  }
  return preApprovalClient;
}
