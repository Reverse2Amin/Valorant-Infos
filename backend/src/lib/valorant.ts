// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

export type Json = Record<string, unknown>;

export interface Agent {
  id: string;
  name: string;
  role: string | null;
  icon: string | null;
  portrait: string | null;
  raw: Json;
}

export interface MapItem {
  id: string;
  name: string;
  splash: string | null;
  raw: Json;
}

export interface Weapon {
  id: string;
  name: string;
  category: string | null;
  icon: string | null;
  raw: Json;
}

// ------------------------------------------------------------
// API HELPER
// ------------------------------------------------------------

async function getApi(endpoint: string): Promise<Json[]> {
  const url = `https://valorant-api.com/v1/${endpoint}`;
  const res = await fetch(url);

  if (!res.ok) return [];

  const json = (await res.json()) as { data?: unknown };

  return Array.isArray(json.data) ? (json.data as Json[]) : [];
}

// ------------------------------------------------------------
// GENERIC HELPERS
// ------------------------------------------------------------

const id = (o: Json): string =>
  (typeof o.uuid === "string" && o.uuid) ||
  (typeof o.id === "string" && o.id) ||
  "";

const name = (o: Json): string =>
  (typeof o.displayName === "string" && o.displayName) ||
  (typeof o.name === "string" && o.name) ||
  "";

const icon = (o: Json, ...keys: string[]): string | null => {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string") return v;
  }
  return null;
};

// ------------------------------------------------------------
// CATEGORY HELPER (fix für rot markierung)
// ------------------------------------------------------------

function safeCategory(w: Json): string | null {
  // 1. w.shopData.category
  if (
    w.shopData &&
    typeof w.shopData === "object" &&
    typeof (w.shopData as Json).category === "string"
  ) {
    return (w.shopData as Json).category as string;
  }

  // 2. w.category
  if (typeof w.category === "string") return w.category;

  return null;
}

// ------------------------------------------------------------
// FETCHERS
// ------------------------------------------------------------

export async function fetchAgents(): Promise<Agent[]> {
  const data = await getApi("agents?isPlayableCharacter=true");

  return data.map((a): Agent => ({
    id: id(a),
    name: name(a),
    role:
      typeof a.role === "string"
        ? a.role
        : typeof a.role === "object" && a.role !== null
          ? ((a.role as Json).displayName as string) ?? null
          : null,
    icon: icon(a, "displayIcon", "displayIconSmall"),
    portrait:
      (typeof a.fullPortraitV2 === "string" && a.fullPortraitV2) ||
      (typeof a.fullPortrait === "string" && a.fullPortrait) ||
      null,
    raw: a
  }));
}

export async function fetchMaps(): Promise<MapItem[]> {
  const data = await getApi("maps");

  return data.map((m): MapItem => ({
    id: id(m),
    name: name(m),
    splash: typeof m.splash === "string" ? m.splash : null,
    raw: m
  }));
}

export async function fetchWeapons(): Promise<Weapon[]> {
  const data = await getApi("weapons");

  return data.map((w): Weapon => ({
    id: id(w),
    name: name(w),
    category: safeCategory(w),
    icon: icon(w, "displayIcon"),
    raw: w
  }));
}
