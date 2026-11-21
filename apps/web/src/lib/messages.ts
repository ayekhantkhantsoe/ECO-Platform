import type en from '../../messages/en.json';

/** English is the source of truth for message keys; ar.json must mirror its shape. */
export type Messages = typeof en;
export type PageKey = keyof Messages['pages'];
