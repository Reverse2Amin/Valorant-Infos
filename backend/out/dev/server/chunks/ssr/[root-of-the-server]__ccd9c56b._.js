module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ValPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
async function ValPage() {
    const [agents, maps, weapons] = await Promise.all([
        fetchAgents(),
        fetchMaps(),
        fetchWeapons()
    ]);
    const data = {
        agents,
        maps,
        weapons
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

//# sourceMappingURL=%5Broot-of-the-server%5D__ccd9c56b._.js.map