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

__turbopack_context__.s([
    "getValorantData",
    ()=>getValorantData
]);
async function getValorantData(category) {
    const res = await fetch(`https://valorant-api.com/v1/${category}`);
    if (!res.ok) throw new Error("Fehler beim Abrufen der Valorant-API");
    const json = await res.json();
    return json.data;
}
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/app/api/valorant/maps/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
    try {
        const maps = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$src$2f$lib$2f$valorant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getValorantData"])("maps");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(maps);
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$IMS$2f$IMS__Module$2f$Modul__295$2f$Projekt$2f$Valorant$2d$Infos$2f$Valorant$2d$Infos$2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e60e1deb._.js.map