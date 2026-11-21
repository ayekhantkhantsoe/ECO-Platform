import type { Money } from '@eco/shared';

/**
 * Provider-agnostic payment port (decision log: keep Payments behind an adapter).
 * Feature modules depend on this interface, never on the Stripe SDK directly.
 */
export interface PaymentProvider {
  /** Create (or return the existing, for the same idempotency key) payment intent. */
  createPayment(input: {
    amount: Money;
    idempotencyKey: string;
    /** Our reference, e.g. checkout attempt / quote / campaign participation id */
    reference: string;
    customerEmail?: string;
  }): Promise<{ providerPaymentId: string; clientSecret: string }>;

  refund(input: {
    providerPaymentId: string;
    amount: Money;
    idempotencyKey: string;
  }): Promise<{ providerRefundId: string }>;
}

export const PAYMENT_PROVIDER = Symbol('PAYMENT_PROVIDER');
