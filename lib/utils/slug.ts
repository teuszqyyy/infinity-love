import { nanoid } from "nanoid"

/**
 * Generate a unique, URL-safe slug from a person's name.
 * Format: {sanitized-name}-{nanoid(8)}
 * Example: "Ana Clara" → "ana-clara-k7x9m2p1"
 */
export function generateSlug(name: string): string {
  const sanitized = name
    .normalize("NFD")                    // decompose accents
    .replace(/[\u0300-\u036f]/g, "")     // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")       // remove special chars
    .replace(/\s+/g, "-")               // spaces → hyphens
    .replace(/-+/g, "-")                // collapse multiple hyphens
    .replace(/^-|-$/g, "")              // trim leading/trailing hyphens

  const id = nanoid(8)
  return sanitized ? `${sanitized}-${id}` : id
}
