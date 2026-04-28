/* ==========================================================================
   Growth Habitat — Store
   React context wrapping the storage layer. Provides:
     - useStore()           full data + setters
     - useProfile()         profile + updater
     - useDirections()      list + add/update/delete
     - useConversations()   list + add/update/delete
     - useOpportunities()   list + add/update/delete
     - useCurrentHypothesis() current hypothesis + replace/version
   Autosave runs on every mutation. There's no "save" button — the storage
   layer is the source of truth, the React state mirrors it.
   ========================================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type {
  AppData,
  Conversation,
  Direction,
  Hypothesis,
  Opportunity,
  Profile,
} from "../types/entities";
import { storage } from "./storage";

// ---------- Context ------------------------------------------------------

interface StoreContextValue {
  data: AppData;
  setData: (next: AppData | ((prev: AppData) => AppData)) => void;
  saving: boolean;
  resetToSeed: () => void;
  importData: (json: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

// ---------- Provider -----------------------------------------------------

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<AppData>(() => storage.load());
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef<number | null>(null);

  const persist = useCallback((next: AppData) => {
    setSaving(true);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    // Tiny debounce so a burst of edits batches into one save.
    saveTimer.current = window.setTimeout(() => {
      storage.save(next);
      setSaving(false);
    }, 200);
  }, []);

  const setData = useCallback<StoreContextValue["setData"]>(
    (updater) => {
      setDataState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const resetToSeed = useCallback(() => {
    const fresh = storage.reset();
    setDataState(fresh);
  }, []);

  const importData = useCallback((json: string) => {
    const imported = storage.importJSON(json);
    setDataState(imported);
  }, []);

  // Cleanup pending save timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, []);

  const value = useMemo<StoreContextValue>(
    () => ({ data, setData, saving, resetToSeed, importData }),
    [data, setData, saving, resetToSeed, importData]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// ---------- Base hook ---------------------------------------------------

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used inside <StoreProvider>");
  }
  return ctx;
}

// ---------- Profile hook ------------------------------------------------

export function useProfile() {
  const { data, setData } = useStore();

  const update = useCallback(
    (patch: Partial<Profile>) => {
      setData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...patch,
          updatedAt: new Date().toISOString(),
        },
      }));
    },
    [setData]
  );

  return { profile: data.profile, update };
}

// ---------- Directions hook ---------------------------------------------

export function useDirections() {
  const { data, setData } = useStore();

  const add = useCallback(
    (
      direction: Omit<Direction, "id" | "createdAt" | "updatedAt">
    ): Direction => {
      const now = new Date().toISOString();
      const created: Direction = {
        ...direction,
        id: `dir_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        createdAt: now,
        updatedAt: now,
      };
      setData((prev) => ({ ...prev, directions: [...prev.directions, created] }));
      return created;
    },
    [setData]
  );

  const update = useCallback(
    (id: string, patch: Partial<Direction>) => {
      setData((prev) => ({
        ...prev,
        directions: prev.directions.map((d) =>
          d.id === id
            ? { ...d, ...patch, updatedAt: new Date().toISOString() }
            : d
        ),
      }));
    },
    [setData]
  );

  const remove = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        directions: prev.directions.filter((d) => d.id !== id),
      }));
    },
    [setData]
  );

  return { directions: data.directions, add, update, remove };
}

// ---------- Conversations hook ------------------------------------------

export function useConversations() {
  const { data, setData } = useStore();

  const add = useCallback(
    (
      conv: Omit<Conversation, "id" | "createdAt" | "updatedAt">
    ): Conversation => {
      const now = new Date().toISOString();
      const created: Conversation = {
        ...conv,
        id: `conv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        createdAt: now,
        updatedAt: now,
      };
      setData((prev) => ({
        ...prev,
        conversations: [...prev.conversations, created],
      }));
      return created;
    },
    [setData]
  );

  const update = useCallback(
    (id: string, patch: Partial<Conversation>) => {
      setData((prev) => ({
        ...prev,
        conversations: prev.conversations.map((c) =>
          c.id === id
            ? { ...c, ...patch, updatedAt: new Date().toISOString() }
            : c
        ),
      }));
    },
    [setData]
  );

  const remove = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        conversations: prev.conversations.filter((c) => c.id !== id),
      }));
    },
    [setData]
  );

  return { conversations: data.conversations, add, update, remove };
}

// ---------- Opportunities hook ------------------------------------------

export function useOpportunities() {
  const { data, setData } = useStore();

  const add = useCallback(
    (
      opp: Omit<Opportunity, "id" | "createdAt" | "updatedAt">
    ): Opportunity => {
      const now = new Date().toISOString();
      const created: Opportunity = {
        ...opp,
        id: `opp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        createdAt: now,
        updatedAt: now,
      };
      setData((prev) => ({
        ...prev,
        opportunities: [...prev.opportunities, created],
      }));
      return created;
    },
    [setData]
  );

  const update = useCallback(
    (id: string, patch: Partial<Opportunity>) => {
      setData((prev) => ({
        ...prev,
        opportunities: prev.opportunities.map((o) =>
          o.id === id
            ? { ...o, ...patch, updatedAt: new Date().toISOString() }
            : o
        ),
      }));
    },
    [setData]
  );

  const remove = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        opportunities: prev.opportunities.filter((o) => o.id !== id),
      }));
    },
    [setData]
  );

  return { opportunities: data.opportunities, add, update, remove };
}

// ---------- Hypothesis hook ---------------------------------------------

export function useCurrentHypothesis() {
  const { data, setData } = useStore();

  const current = useMemo<Hypothesis | undefined>(
    () => data.hypotheses.find((h) => h.isCurrent) ?? data.hypotheses.at(-1),
    [data.hypotheses]
  );

  /**
   * Update the current hypothesis IN PLACE (no new version created).
   * Use this for confidence tweaks and minor edits.
   */
  const updateCurrent = useCallback(
    (patch: Partial<Hypothesis>) => {
      setData((prev) => ({
        ...prev,
        hypotheses: prev.hypotheses.map((h) =>
          h.isCurrent
            ? { ...h, ...patch, updatedAt: new Date().toISOString() }
            : h
        ),
      }));
    },
    [setData]
  );

  /**
   * Replace the current hypothesis with a NEW version. Old version is
   * archived (isCurrent: false). Use this when the statement itself changes.
   */
  const replaceWithNewVersion = useCallback(
    (statement: string, confidence: number) => {
      const now = new Date().toISOString();
      setData((prev) => {
        const archived = prev.hypotheses.map((h) => ({
          ...h,
          isCurrent: false,
        }));
        const next: Hypothesis = {
          id: `hyp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          statement,
          confidence,
          evidenceFor: "",
          evidenceAgainst: "",
          nextStep: "",
          isCurrent: true,
          createdAt: now,
          updatedAt: now,
        };
        return {
          ...prev,
          hypotheses: [...archived, next],
          profile: {
            ...prev.profile,
            currentHypothesis: statement,
            updatedAt: now,
          },
        };
      });
    },
    [setData]
  );

  return {
    current,
    history: data.hypotheses,
    updateCurrent,
    replaceWithNewVersion,
  };
}
