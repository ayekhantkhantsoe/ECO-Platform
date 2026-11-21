/**
 * Status vocabularies from spec §3 and §6. Each domain has its own vocabulary —
 * never map e.g. "refund pending" and "refunded" to the same badge.
 * Keep these in sync with the Prisma enums in apps/api/prisma/schema.prisma.
 */

/** F01 bundle offer, F05 find it for me, F06 shop my budget, F07 negotiate a deal. */
export const REQUEST_TYPES = [
  'BUNDLE_OFFER',
  'SOURCING',
  'BUDGET',
  'NEGOTIATION',
] as const;
export type RequestType = (typeof REQUEST_TYPES)[number];

/** draft → submitted → awaiting shop → awaiting you → resolved / closed */
export const REQUEST_STATUSES = [
  'DRAFT',
  'SUBMITTED',
  'AWAITING_SHOP',
  'AWAITING_CUSTOMER',
  'RESOLVED',
  'CLOSED',
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

/** draft → sent → accepted → paid, or superseded / expired / rejected / withdrawn */
export const QUOTE_STATUSES = [
  'DRAFT',
  'SENT',
  'ACCEPTED',
  'PAID',
  'SUPERSEDED',
  'EXPIRED',
  'REJECTED',
  'WITHDRAWN',
] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const CAMPAIGN_STATUSES = [
  'DRAFT',
  'ACTIVE',
  'CLOSED',
  'SUCCEEDED',
  'FAILED',
  'REFUNDING',
  'REFUNDED',
] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const PAYMENT_STATUSES = [
  'REQUIRES_PAYMENT',
  'PROCESSING',
  'SUCCEEDED',
  'FAILED',
  'CANCELED',
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const FULFILLMENT_STATUSES = [
  'UNFULFILLED',
  'SOURCING',
  'PACKING',
  'SHIPPED',
  'DELIVERED',
  'CANCELED',
] as const;
export type FulfillmentStatus = (typeof FULFILLMENT_STATUSES)[number];

export const REFUND_STATUSES = [
  'PENDING',
  'SUCCEEDED',
  'FAILED',
  'NEEDS_ATTENTION',
] as const;
export type RefundStatus = (typeof REFUND_STATUSES)[number];

export const GIFT_CLAIM_STATUSES = [
  'UNCLAIMED',
  'CLAIMED',
  'REVOKED',
  'EXPIRED',
] as const;
export type GiftClaimStatus = (typeof GIFT_CLAIM_STATUSES)[number];
