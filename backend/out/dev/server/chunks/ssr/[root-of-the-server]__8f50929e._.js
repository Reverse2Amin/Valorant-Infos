module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/lib/valorant.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAgents",
    ()=>fetchAgents,
    "fetchMaps",
    ()=>fetchMaps,
    "fetchWeaponSkins",
    ()=>fetchWeaponSkins,
    "fetchWeapons",
    ()=>fetchWeapons
]);
async function getEndpoint(endpoint) {
    const url = `https://valorant-api.com/v1/${endpoint}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Valorant API error ${res.status}`);
    const json = await res.json();
    return json.data ?? [];
}
async function fetchAgents() {
    const data = await getEndpoint("agents?isPlayableCharacter=true");
    return data.map((a)=>({
            uuid: a.uuid ?? a.id ?? null,
            id: a.uuid ?? a.id ?? null,
            name: a.displayName ?? a.name ?? "",
            displayName: a.displayName ?? "",
            role: a.role?.displayName ?? a.role ?? null,
            displayIcon: a.displayIcon ?? a.displayIconSmall ?? a.icon ?? null,
            raw: a
        }));
}
async function fetchMaps() {
    const data = await getEndpoint("maps");
    return data.map((m)=>({
            uuid: m.uuid ?? m.id ?? null,
            id: m.uuid ?? m.id ?? null,
            name: m.displayName ?? m.name ?? "",
            displayName: m.displayName ?? "",
            splash: m.splash ?? m.splash ?? null,
            callouts: m.callouts ?? [],
            raw: m
        }));
}
async function fetchWeapons() {
    const data = await getEndpoint("weapons");
    return data.map((w)=>({
            uuid: w.uuid ?? w.id ?? null,
            id: w.uuid ?? w.id ?? null,
            name: w.displayName ?? w.name ?? "",
            displayName: w.displayName ?? "",
            category: w.shopData?.category ?? w.category ?? null,
            displayIcon: w.displayIcon ?? w.displayIcon ?? null,
            skins: w.skins ?? [],
            raw: w
        }));
}
async function fetchWeaponSkins() {
    const weapons = await getEndpoint("weapons");
    const skins = [];
    weapons.forEach((weapon)=>{
        (weapon.skins ?? []).forEach((skin)=>{
            skins.push({
                id: skin.uuid ?? skin.id ?? null,
                uuid: skin.uuid ?? skin.id ?? null,
                name: skin.displayName ?? skin.name ?? "",
                displayName: skin.displayName ?? "",
                weaponId: weapon.uuid ?? weapon.id ?? null,
                displayIcon: skin.displayIcon ?? skin.displayIcon ?? null,
                raw: skin
            });
        });
    });
    return skins;
}
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ValPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/lib/valorant.js [app-rsc] (ecmascript)");
;
;
async function ValPage() {
    const [agents, maps, weapons, skins] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAgents"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchMaps"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchWeapons"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchWeaponSkins"])()
    ]);
    const data = {
        agents,
        maps,
        weapons,
        skins
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
        style: {
            color: "white",
            background: "#0a0a0f",
            padding: "20px",
            fontSize: "14px"
        },
        children: JSON.stringify(data, null, 2)
    }, void 0, false, {
        fileName: "[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/page.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8f50929e._.js.map