import {
  addMoney,
  formatMoney,
  money,
  multiplyMoney,
  parseMajor,
  sumMoney,
} from './money.js';

describe('money', () => {
  it('keeps amounts as integer minor units', () => {
    expect(parseMajor('265')).toEqual({ amountMinor: 26500, currency: 'AED' });
    expect(parseMajor('12.5')).toEqual({ amountMinor: 1250, currency: 'AED' });
    expect(() => parseMajor('1.005')).toThrow(RangeError);
    expect(() => money(1.5)).toThrow(RangeError);
  });

  it('adds the spec example quote without float drift', () => {
    // tote 180 + pouch 60 + organizer 20 − discount 10 + shipping 15 = 265
    const items = sumMoney([
      parseMajor('180'),
      parseMajor('60'),
      parseMajor('20'),
    ]);
    const total = addMoney(
      addMoney(items, parseMajor('-10')),
      parseMajor('15'),
    );
    expect(total.amountMinor).toBe(26500);
    expect(multiplyMoney(parseMajor('0.10'), 3).amountMinor).toBe(30);
  });

  it('formats with Western digits in Arabic', () => {
    const formatted = formatMoney(money(26500), 'ar-AE');
    expect(formatted).toMatch(/265\.00/);
    expect(formatMoney(money(26500), 'en-AE')).toMatch(/265\.00/);
  });
});
