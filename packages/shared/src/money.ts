import { z } from 'zod';

/**
 * Money rules (decision log D02 + spec §3):
 * - Amounts are integers in the currency's minor unit (AED → fils, 1 AED = 100 fils).
 * - Every amount carries its currency. Never use floats, never assume 2 decimals.
 * - Only AED is enabled today; add a currency here (and in Prisma's enum) to enable more.
 */
export const CURRENCIES = ['AED'] as const;
export type Currency = (typeof CURRENCIES)[number];

export const DEFAULT_CURRENCY: Currency = 'AED';

/** Number of minor-unit digits per ISO 4217 currency. */
export const MINOR_UNIT_DIGITS: Record<Currency, number> = {
  AED: 2,
};

/** Stripe's minimum charge for AED is 2.00 AED. */
export const MIN_CHARGE_MINOR: Record<Currency, number> = {
  AED: 200,
};

export const currencySchema = z.enum(CURRENCIES);

export const moneySchema = z.object({
  amountMinor: z.number().int(),
  currency: currencySchema,
});

export type Money = z.infer<typeof moneySchema>;

export function money(
  amountMinor: number,
  currency: Currency = DEFAULT_CURRENCY,
): Money {
  if (!Number.isSafeInteger(amountMinor)) {
    throw new RangeError(
      `Money amount must be a safe integer in minor units, got ${amountMinor}`,
    );
  }
  return { amountMinor, currency };
}

/** Convert a major-unit decimal string ("12.50") into minor units without float math. */
export function parseMajor(
  value: string,
  currency: Currency = DEFAULT_CURRENCY,
): Money {
  const digits = MINOR_UNIT_DIGITS[currency];
  const match = /^(-)?(\d+)(?:\.(\d+))?$/.exec(value.trim());
  if (!match) throw new TypeError(`Not a decimal amount: "${value}"`);
  const [, sign, whole, fraction = ''] = match;
  if (fraction.length > digits) {
    throw new RangeError(
      `${currency} allows at most ${digits} decimal places, got "${value}"`,
    );
  }
  const minor =
    Number(whole) * 10 ** digits + Number(fraction.padEnd(digits, '0') || '0');
  return money(sign ? -minor : minor, currency);
}

function assertSameCurrency(a: Money, b: Money): void {
  if (a.currency !== b.currency) {
    throw new TypeError(`Currency mismatch: ${a.currency} vs ${b.currency}`);
  }
}

export function addMoney(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  return money(a.amountMinor + b.amountMinor, a.currency);
}

export function subtractMoney(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  return money(a.amountMinor - b.amountMinor, a.currency);
}

export function multiplyMoney(a: Money, quantity: number): Money {
  if (!Number.isInteger(quantity))
    throw new RangeError('Quantity must be an integer');
  return money(a.amountMinor * quantity, a.currency);
}

export function sumMoney(
  items: readonly Money[],
  currency: Currency = DEFAULT_CURRENCY,
): Money {
  return items.reduce(
    (total, item) => addMoney(total, item),
    money(0, currency),
  );
}

/**
 * Display formatting. Arabic UI uses Western digits (design assumption, see
 * decision log) — hence numberingSystem 'latn'.
 */
export function formatMoney(value: Money, locale: string): string {
  const digits = MINOR_UNIT_DIGITS[value.currency];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: value.currency,
    numberingSystem: 'latn',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value.amountMinor / 10 ** digits);
}
