/** Generate a stable unique id for a block. */
export function createId(): string {
  // crypto.randomUUID is available in modern browsers and Node 19+.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for older environments.
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Deep clone via JSON — fine here because block data is plain JSON. */
export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
