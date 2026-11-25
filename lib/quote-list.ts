"use client";

// Quote List store, kept in localStorage and shared across tabs.
// Phase 1 exposes the count for the header; Phase 5 builds the full list UI.

import { useSyncExternalStore } from "react";

export type QuoteItem = {
  id: string; // stable key, e.g. "stationery/writing/ball-pens" or "kit/exam-season"
  name: string;
  category?: string;
  quantity: number;
};

const KEY = "schoolsource:quote-list";
const EVENT = "schoolsource:quote-list-change";
const EMPTY: QuoteItem[] = [];

let cache: { raw: string | null; items: QuoteItem[] } = { raw: null, items: EMPTY };

function read(): QuoteItem[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cache.raw) return cache.items;
  let items = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) items = parsed;
  } catch {
    // ignore malformed storage
  }
  cache = { raw, items };
  return items;
}

function write(items: QuoteItem[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // storage unavailable (private mode) - list lives for this page only
    cache = { raw: null, items };
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && callback();
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function useQuoteList() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function useQuoteCount() {
  return useQuoteList().length;
}

/** Plain-text version of the list for emails and WhatsApp messages. */
export function formatQuoteList(items: QuoteItem[]) {
  return items
    .map((item, i) => `${i + 1}. ${item.name}${item.category ? ` (${item.category})` : ""} - Qty ${item.quantity}`)
    .join("\n");
}

export const quoteList = {
  add(item: Omit<QuoteItem, "quantity"> & { quantity?: number }) {
    const items = read();
    if (items.some((i) => i.id === item.id)) return;
    write([...items, { quantity: 1, ...item }]);
  },
  remove(id: string) {
    write(read().filter((i) => i.id !== id));
  },
  setQuantity(id: string, quantity: number) {
    write(read().map((i) => (i.id === id ? { ...i, quantity } : i)));
  },
  clear() {
    write([]);
  },
};
