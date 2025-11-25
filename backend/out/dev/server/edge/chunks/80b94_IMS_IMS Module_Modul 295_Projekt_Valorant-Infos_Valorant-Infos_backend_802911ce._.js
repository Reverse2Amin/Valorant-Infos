(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/80b94_IMS_IMS Module_Modul 295_Projekt_Valorant-Infos_Valorant-Infos_backend_802911ce._.js",
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/instrumentation.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

// TODO: Add DB initializer logic here.
}),
"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/edge-wrapper.js { MODULE => \"[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/instrumentation.ts [instrumentation-edge] (ecmascript)\" } [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i("[project]/Documents/IMS/IMS Module/Modul 295/Projekt/Valorant-Infos/Valorant-Infos/backend/src/instrumentation.ts [instrumentation-edge] (ecmascript)"));
modProm.catch(()=>{});
self._ENTRIES["middleware_instrumentation"] = new Proxy(modProm, {
    get (modProm, name) {
        if (name === "then") {
            return (res, rej)=>modProm.then(res, rej);
        }
        let result = (...args)=>modProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>modProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
});
}),
]);

//# sourceMappingURL=80b94_IMS_IMS%20Module_Modul%20295_Projekt_Valorant-Infos_Valorant-Infos_backend_802911ce._.js.map