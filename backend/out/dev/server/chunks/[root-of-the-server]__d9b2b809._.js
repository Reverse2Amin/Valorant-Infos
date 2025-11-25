module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/lib/valorant.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------
__turbopack_context__.s([
    "fetchAgents",
    ()=>fetchAgents,
    "fetchMaps",
    ()=>fetchMaps,
    "fetchWeapons",
    ()=>fetchWeapons
]);
// ------------------------------------------------------------
// API HELPER
// ------------------------------------------------------------
async function getApi(endpoint) {
    const url = `https://valorant-api.com/v1/${endpoint}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
}
// ------------------------------------------------------------
// GENERIC HELPERS
// ------------------------------------------------------------
const id = (o)=>typeof o.uuid === "string" && o.uuid || typeof o.id === "string" && o.id || "";
const name = (o)=>typeof o.displayName === "string" && o.displayName || typeof o.name === "string" && o.name || "";
const icon = (o, ...keys)=>{
    for (const k of keys){
        const v = o[k];
        if (typeof v === "string") return v;
    }
    return null;
};
// ------------------------------------------------------------
// CATEGORY HELPER (fix für rot markierung)
// ------------------------------------------------------------
function safeCategory(w) {
    // 1. w.shopData.category
    if (w.shopData && typeof w.shopData === "object" && typeof w.shopData.category === "string") {
        return w.shopData.category;
    }
    // 2. w.category
    if (typeof w.category === "string") return w.category;
    return null;
}
async function fetchAgents() {
    const data = await getApi("agents?isPlayableCharacter=true");
    return data.map((a)=>({
            id: id(a),
            name: name(a),
            role: typeof a.role === "string" ? a.role : typeof a.role === "object" && a.role !== null ? a.role.displayName ?? null : null,
            icon: icon(a, "displayIcon", "displayIconSmall"),
            portrait: typeof a.fullPortraitV2 === "string" && a.fullPortraitV2 || typeof a.fullPortrait === "string" && a.fullPortrait || null,
            raw: a
        }));
}
async function fetchMaps() {
    const data = await getApi("maps");
    return data.map((m)=>({
            id: id(m),
            name: name(m),
            splash: typeof m.splash === "string" ? m.splash : null,
            raw: m
        }));
}
async function fetchWeapons() {
    const data = await getApi("weapons");
    return data.map((w)=>({
            id: id(w),
            name: name(w),
            category: safeCategory(w),
            icon: icon(w, "displayIcon"),
            raw: w
        }));
}
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/api/valorant/all/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/lib/valorant.ts [app-route] (ecmascript)");
;
;
async function GET() {
    const [agents, maps, weapons] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAgents"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchMaps"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchWeapons"])()
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        agents,
        maps,
        weapons
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d9b2b809._.js.map