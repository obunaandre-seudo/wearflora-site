"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCartStore } from "@/store/cart-store";
import { useCurrentUser } from "@/lib/use-current-user";
import { apiFetch, ClientApiError } from "@/lib/api-client";
import { formatCurrency } from "@/lib/format";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { createPaymentVerificationUrl } from "@/lib/whatsapp";

const SHIPPING_FEE = 5000;

interface CheckoutOrder {
  order: {
    id: string;
    orderNumber: string;
    total: number | string;
    currency: string;
    items: { id: string; productName: string; quantity: number; lineTotal: number | string }[];
  };
  payment: { provider: string | null; authorizationUrl?: string; message?: string };
}

export default function CheckoutPage() {
  const { items, subtotal, clear, hasHydrated } = useCartStore();
  const { user, loading: userLoading } = useCurrentUser();
  const [submitting, setSubmitting] = useState(false);
  const [checkoutOrder, setCheckoutOrder] = useState<CheckoutOrder | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    contactEmail: "",
    notes: "",
    discountCode: "",
  });

  useEffect(() => {
    if (user) {
      setForm((f) => ({ ...f, fullName: f.fullName || user.name, contactEmail: f.contactEmail || user.email }));
    }
  }, [user]);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  if (!userLoading && !user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 sm:px-6">
        <EmptyState
          title="Sign in to check out"
          description="Create an account or sign in so we can attach this order, your shipping address and order history to your profile."
          action={
            <div className="flex gap-3">
              <ButtonLink href="/login?next=/checkout">Sign in</ButtonLink>
              <ButtonLink href="/register?next=/checkout" variant="outline">Create account</ButtonLink>
            </div>
          }
        />
      </div>
    );
  }

  if (!hasHydrated) {
    return <div className="mx-auto max-w-6xl px-4 py-20 text-center text-sm text-muted sm:px-6">Loading your cart…</div>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await apiFetch<CheckoutOrder>(
        "/api/checkout",
        {
          method: "POST",
          body: JSON.stringify({
            address: {
              fullName: form.fullName,
              phone: form.phone,
              line1: form.line1,
              line2: form.line2 || undefined,
              city: form.city,
              state: form.state,
              postalCode: form.postalCode || undefined,
              country: "Nigeria",
              isDefault: true,
            },
            contactEmail: form.contactEmail,
            contactPhone: form.phone,
            notes: form.notes || undefined,
            discountCode: form.discountCode || undefined,
            items: items.map(({ productId, quantity }) => ({ productId, quantity })),
          }),
        }
      );

      clear();
      setCheckoutOrder(result);
      toast.success("Order placed. Review your payment options below.");
    } catch (err) {
      const message = err instanceof ClientApiError ? err.message : "Checkout failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  const total = subtotal() + SHIPPING_FEE;

  if (checkoutOrder) {
    const { order, payment } = checkoutOrder;
    const totalDisplay = formatCurrency(order.total, order.currency);
    const verificationUrl = createPaymentVerificationUrl({
      orderNumber: order.orderNumber,
      customerName: form.fullName,
      total: totalDisplay,
      items: order.items.map((item) => `${item.productName} × ${item.quantity}`),
    });

    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <CheckCircle2 size={44} className="mx-auto text-emerald-500" aria-hidden="true" />
          <h1 className="mt-4 font-display text-4xl font-semibold text-brand-700">Order placed</h1>
          <p className="mt-2 text-sm text-muted">
            Order <span className="font-mono text-text">{order.orderNumber}</span> · Total {totalDisplay}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-semibold text-brand-700">Your contact details</h2>
            <p className="mt-3 text-sm text-text">{form.fullName}</p>
            <p className="mt-1 text-sm text-muted">{form.contactEmail}</p>
            <p className="mt-1 text-sm text-muted">{form.phone}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {form.line1}{form.line2 ? `, ${form.line2}` : ""}, {form.city}, {form.state}
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-semibold text-brand-700">Order details</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-4">
                  <span className="text-muted">{item.productName} × {item.quantity}</span>
                  <span className="shrink-0 text-text">{formatCurrency(item.lineTotal, order.currency)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-border pt-3 text-right font-semibold text-text">{totalDisplay}</p>
          </section>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {payment.authorizationUrl && (
            <ButtonLink href={payment.authorizationUrl} target="_blank" rel="noopener noreferrer" size="lg">
              Pay securely
            </ButtonLink>
          )}
          <ButtonLink
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="secondary"
          >
            <MessageCircle size={18} />
            Verify payment on WhatsApp
          </ButtonLink>
          <ButtonLink href={`/orders/${order.id}`} variant="outline" size="lg">
            View order
          </ButtonLink>
        </div>
        {!payment.authorizationUrl && payment.message && (
          <p className="mt-4 text-center text-xs text-muted">{payment.message}</p>
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 sm:px-6">
        <EmptyState title="Your cart is empty" description="Add a product before checking out." action={<ButtonLink href="/products">Shop products</ButtonLink>} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-brand-700 sm:text-5xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1fr,380px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-2xl font-semibold text-brand-700">Contact information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input id="contactEmail" type="email" required value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-2xl font-semibold text-brand-700">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="line1">Address line 1</Label>
                <Input id="line1" required value={form.line1} onChange={(e) => update("line1", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="line2" hint="Optional">Address line 2</Label>
                <Input id="line2" value={form.line2} onChange={(e) => update("line2", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" required value={form.city} onChange={(e) => update("city", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" required value={form.state} onChange={(e) => update("state", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="postalCode" hint="Optional">Postal code</Label>
                <Input id="postalCode" value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-2xl font-semibold text-brand-700">Order notes</h2>
            <Textarea
              rows={3}
              placeholder="Delivery instructions, preferred install date, etc. (optional)"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="mt-3"
            />
          </section>
        </div>

        <div className="h-fit space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-2xl font-semibold text-brand-700">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.productId} className="flex justify-between text-sm">
                  <span className="text-muted">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-text">{formatCurrency(item.unitPrice * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Label htmlFor="discountCode" hint="Optional">Discount code</Label>
              <Input id="discountCode" value={form.discountCode} onChange={(e) => update("discountCode", e.target.value)} placeholder="Enter your code" />
            </div>

            <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-text">{formatCurrency(subtotal())}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-text">{formatCurrency(SHIPPING_FEE)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2.5 text-base font-semibold">
                <dt className="text-text">Total</dt>
                <dd className="text-text">{formatCurrency(total)}</dd>
              </div>
            </dl>

            <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full">
              {submitting ? "Placing order…" : "Place order"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted">
              Payment is processed securely. If a payment provider isn&apos;t yet configured, your order is created as pending for manual confirmation.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
