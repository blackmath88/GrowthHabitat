/* ==========================================================================
   Growth Habitat — Storage
   Single-key localStorage persistence behind a small interface. Swap this
   one file for a Cloudflare Workers + D1 client later, no other file
   changes. The interface is what other code depends on.
   ========================================================================== */

import type { AppData } from "../types/entities";
import { SCHEMA_VERSION } from "../types/entities";
import { SEED } from "./seed";

const STORAGE_KEY = "growth_habitat_data";

// ---------- Migration ----------------------------------------------------

/**
 * Migrate data from older schema versions to the current one. Add new
 * versions as the schema evolves. The point is that old saves keep working.
 */
function migrate(raw: unknown): AppData {
  if (!raw || typeof raw !== "object") {
    return SEED;
  }
  const data = raw as Partial<AppData>;
  if (data.schemaVersion === SCHEMA_VERSION && data.profile) {
    return data as AppData;
  }
  // Future migrations land here as branches:
  // if (data.schemaVersion === 1 && SCHEMA_VERSION === 2) { ... }
  console.warn(
    `[storage] Schema version mismatch (saved=${data.schemaVersion}, expected=${SCHEMA_VERSION}). Resetting to seed.`
  );
  return SEED;
}

// ---------- Public interface ---------------------------------------------

export const storage = {
  /** Load app data from localStorage. Returns seed if empty or corrupt. */
  load(): AppData {
    if (typeof window === "undefined") return SEED;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return SEED;
      const parsed = JSON.parse(raw);
      return migrate(parsed);
    } catch (err) {
      console.error("[storage] Failed to load:", err);
      return SEED;
    }
  },

  /** Save app data. Stamps updatedAt. Quiet — no errors thrown to caller. */
  save(data: AppData): void {
    if (typeof window === "undefined") return;
    try {
      const stamped: AppData = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stamped));
    } catch (err) {
      console.error("[storage] Failed to save:", err);
    }
  },

  /** Reset to seed data. Used by the "reset" action in settings. */
  reset(): AppData {
    if (typeof window === "undefined") return SEED;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
    } catch (err) {
      console.error("[storage] Failed to reset:", err);
    }
    return SEED;
  },

  /** Export current data as a JSON string for download. */
  exportJSON(): string {
    return JSON.stringify(this.load(), null, 2);
  },

  /**
   * Import data from a JSON string. Validates schema before saving.
   * Returns the parsed data on success, throws on failure.
   */
  importJSON(json: string): AppData {
    const parsed = JSON.parse(json);
    const migrated = migrate(parsed);
    this.save(migrated);
    return migrated;
  },
};

// ---------- Convenience: download as file --------------------------------

export function downloadJSON(filename = "growth-habitat-data.json"): void {
  const blob = new Blob([storage.exportJSON()], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
