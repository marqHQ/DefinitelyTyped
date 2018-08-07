/// <reference path="../../../globals.d.ts"/>
/// <reference path="./moduleinfo.d.ts"/>

declare module 'goog:goog.module.AbstractModuleLoader' {
    import alias = goog.module.AbstractModuleLoader;
    export default alias;
}

declare namespace goog.module {
    interface AbstractModuleLoader {
        /**
         * Loads a list of JavaScript modules.
         *
         * @param {Array<string>} ids The module ids in dependency order.
         * @param {!Object<string, !goog.module.ModuleInfo>} moduleInfoMap A mapping
         *     from module id to ModuleInfo object.
         * @param {function()?=} opt_successFn The callback if module loading is a
         *     success.
         * @param {function(?number)?=} opt_errorFn The callback if module loading is an
         *     error.
         * @param {function()?=} opt_timeoutFn The callback if module loading times out.
         * @param {boolean=} opt_forceReload Whether to bypass cache while loading the
         *     module.
         */
        loadModules(
            ids: string[],
            moduleInfoMap: {[key: string]: goog.module.ModuleInfo},
            opt_successFn?: (() => void)|null,
            opt_errorFn?: ((_0: number|null) => void)|null,
            opt_timeoutFn?: (() => void)|null,
            opt_forceReload?: boolean
        ): void;

        /**
         * Pre-fetches a JavaScript module.
         *
         * @param {string} id The module id.
         * @param {!goog.module.ModuleInfo} moduleInfo The module info.
         */
        prefetchModule(id: string, moduleInfo: goog.module.ModuleInfo): void;
    }
}
