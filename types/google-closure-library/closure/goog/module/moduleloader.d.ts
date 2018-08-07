/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./abstractmoduleloader.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../log/log.d.ts"/>
/// <reference path="../net/bulkloader.d.ts"/>
/// <reference path="./moduleinfo.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.module.ModuleLoader' {
    import alias = goog.module.ModuleLoader;
    export default alias;
}

declare namespace goog.module {
    /**
     * A class that loads Javascript modules.
     * @extends {goog.events.EventTarget}
     * @implements {goog.module.AbstractModuleLoader}
     */
    class ModuleLoader extends __ModuleLoader {}
    abstract class __ModuleLoader extends goog.events.__EventTarget implements goog.module.AbstractModuleLoader {
        /**
         */
        constructor();

        /**
         * Event handler for managing handling events.
         * @type {goog.events.EventHandler<!goog.module.ModuleLoader>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.module.ModuleLoader>;

        /**
         * A map from module IDs to goog.module.ModuleLoader.LoadStatus.
         * @type {!Object<Array<string>, goog.module.ModuleLoader.LoadStatus>}
         * @private
         */
        private loadingModulesStatus_: any;

        /**
         * A logger.
         * @type {goog.log.Logger}
         * @protected
         */
        protected logger: goog.log.Logger;

        /**
         * Whether debug mode is enabled.
         * @type {boolean}
         * @private
         */
        private debugMode_: boolean;

        /**
         * Whether source url injection is enabled.
         * @type {boolean}
         * @private
         */
        private sourceUrlInjection_: boolean;

        /**
         * Gets the debug mode for the loader.
         * @return {boolean} Whether the debug mode is enabled.
         */
        getDebugMode(): boolean;

        /**
         * Sets the debug mode for the loader.
         * @param {boolean} debugMode Whether the debug mode is enabled.
         */
        setDebugMode(debugMode: boolean): void;

        /**
         * When enabled, we will add a sourceURL comment to the end of all scripts
         * to mark their origin.
         *
         * On WebKit, stack traces will reflect the sourceURL comment, so this is
         * useful for debugging webkit stack traces in production.
         *
         * Notice that in debug mode, we will use source url injection + eval rather
         * then appending script nodes to the DOM, because the scripts will load far
         * faster.  (Appending script nodes is very slow, because we can't parallelize
         * the downloading and evaling of the script).
         *
         * The cost of appending sourceURL information is negligible when compared to
         * the cost of evaling the script. Almost all clients will want this on.
         *
         * TODO(nicksantos): Turn this on by default. We may want to turn this off
         * for clients that inject their own sourceURL.
         *
         * @param {boolean} enabled Whether source url injection is enabled.
         */
        setSourceUrlInjection(enabled: boolean): void;

        /**
         * @return {boolean} Whether we're using source url injection.
         * @private
         */
        private usingSourceUrlInjection_(): boolean;

        /**
         * Evaluate the JS code.
         * @param {Array<string>} moduleIds The module ids.
         * @private
         */
        private evaluateCode_(moduleIds: string[]): void;

        /**
         * Handles a successful response to a request for prefetch or load one or more
         * modules.
         *
         * @param {goog.net.BulkLoader} bulkLoader The bulk loader.
         * @param {Array<string>} moduleIds The ids of the modules requested.
         * @private
         */
        private handleSuccess_(bulkLoader: goog.net.BulkLoader, moduleIds: string[]): void;

        /**
         * Downloads a list of JavaScript modules.
         *
         * @param {Array<string>} ids The module ids in dependency order.
         * @param {!Object<string, !goog.module.ModuleInfo>} moduleInfoMap A mapping
         *     from module id to ModuleInfo object.
         * @private
         */
        private downloadModules_(ids: string[], moduleInfoMap: {[key: string]: goog.module.ModuleInfo}): void;

        /**
         * Handles an error during a request for one or more modules.
         * @param {goog.net.BulkLoader} bulkLoader The bulk loader.
         * @param {Array<string>} moduleIds The ids of the modules requested.
         * @param {number} status The response status.
         * @private
         */
        private handleError_(bulkLoader: goog.net.BulkLoader, moduleIds: string[], status: number): void;

        /**
         * Handles an error during a request for one or more modules.
         * @param {Array<string>} moduleIds The ids of the modules requested.
         * @param {?function(?number)} errorFn The function to call on failure.
         * @param {?number} status The response status.
         * @param {!Error=} opt_error The error encountered, if available.
         * @private
         */
        private handleErrorHelper_(
            moduleIds: string[], errorFn: ((_0: number|null) => void)|null, status: number|null, opt_error?: Error
        ): void;

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

declare namespace goog.module.ModuleLoader {
    /**
     * @extends {goog.events.Event}
     * @final
     * @protected
     */
    class EvaluateCodeEvent extends __EvaluateCodeEvent {}
    abstract class __EvaluateCodeEvent extends goog.events.__Event {
        /**
         * @param {Array<string>} moduleIds The ids of the modules being evaluated.
         */
        constructor(moduleIds: string[]);

        /**
         * @type {Array<string>}
         */
        moduleIds: string[];
    }

    /**
     * @extends {goog.events.Event}
     * @final
     * @protected
     */
    class RequestSuccessEvent extends __RequestSuccessEvent {}
    abstract class __RequestSuccessEvent extends goog.events.__Event {
        /**
         * @param {Array<string>} moduleIds The ids of the modules being evaluated.
         */
        constructor(moduleIds: string[]);

        /**
         * @type {Array<string>}
         */
        moduleIds: string[];
    }

    /**
     * @extends {goog.events.Event}
     * @final
     * @protected
     */
    class RequestErrorEvent extends __RequestErrorEvent {}
    abstract class __RequestErrorEvent extends goog.events.__Event {
        /**
         * @param {Array<string>} moduleIds The ids of the modules being evaluated.
         * @param {!Error=} opt_error The error encountered, if available.
         */
        constructor(moduleIds: string[], opt_error?: Error);

        /**
         * @type {Array<string>}
         */
        moduleIds: string[];

        /** @type {?Error} */
        error: Error|null;
    }

    /**
     * A class that keeps the state of the module during the loading process. It is
     * used to save loading information between modules download and evaluation.
     * @final
     */
    class LoadStatus extends __LoadStatus {}
    abstract class __LoadStatus {
        /**
         */
        constructor();

        /**
         * The request uris.
         * @type {Array<string>}
         */
        requestUris: string[];

        /**
         * The response texts.
         * @type {Array<string>}
         */
        responseTexts: string[];

        /**
         * Whether loadModules was called for the set of modules referred by this
         * status.
         * @type {boolean}
         */
        loadRequested: boolean;

        /**
         * Success callback.
         * @type {?function()}
         */
        successFn: (() => void)|null;

        /**
         * Error callback.
         * @type {?function(?number)}
         */
        errorFn: ((_0: number|null) => void)|null;
    }

    /**
     * @return {boolean} Whether sourceURL affects stack traces.
     */
    function supportsSourceUrlStackTraces(): boolean;

    /**
     * @return {boolean} Whether sourceURL affects the debugger.
     */
    function supportsSourceUrlDebugger(): boolean;

    /**
     * Events dispatched by the ModuleLoader.
     * @const
     */
    const EventType: any /*missing*/;
}
