// Kho sự kiện tracking (danh sách vv:events trong Upstash Redis).
import { redis, redisReady } from './redis.js';

export const EVENT_NAMES = ['mission_started', 'mission_submitted', 'mission_completed', 'mission_resubmitted'];
const KEY = 'vv:events';
const MAX_EVENTS = 100000;
export const storeReady = redisReady;

export async function saveEvent(event) {
  await redis([['LPUSH', KEY, JSON.stringify(event)], ['LTRIM', KEY, '0', String(MAX_EVENTS - 1)]]);
}

export async function loadEvents() {
  const [lines] = await redis([['LRANGE', KEY, '0', '-1']]);
  return (lines ?? []).map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean).reverse();
}
