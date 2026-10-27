export const WHATSAPP_URL =
  "https://wa.me/2347031324811?text=Hi%20Wearflora%2C%20I%27d%20like%20to%20know%20more.";

export function createPaymentVerificationUrl(order: {
  orderNumber: string;
  customerName: string;
  total: string;
  items: string[];
}) {
  const message = [
    "Hi Wearflora, I have completed payment and would like you to verify it.",
    `Order: ${order.orderNumber}`,
    `Items: ${order.items.join(", ")}`,
    `Amount: ${order.total}`,
    `Customer: ${order.customerName}`,
  ].join("\n");

  return `https://wa.me/2347031324811?${new URLSearchParams({ text: message }).toString()}`;
}
