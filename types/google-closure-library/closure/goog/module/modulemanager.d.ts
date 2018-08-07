/// <reference path="../../../globals.d.ts"/>
/// <reference path="../loader/abstractmodulemanager.d.ts"/>
/// <reference path="./moduleinfo.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>

declare module 'goog:goog.module.ModuleManager' {
    import alias = goog.module.ModuleManager;
    export default alias;
}

declare module 'goog:goog.module.ModuleManager.FailureType' {
    import alias = goog.module.ModuleManager.FailureType;
    export default alias;
}

declare module 'goog:goog.module.ModuleManager.CallbackType' {
    import alias = goog.module.ModuleManager.CallbackType;
    export default alias;
}

declare namespace goog.module {
    /**
     * The ModuleManager keeps track of all modules in the environment.
     * Since modules may not have their code loaded, we must keep track of them.
     * @extends {goog.loader.AbstractModuleManager}
     * @struct
     */
    class ModuleManager extends __ModuleManager {}
    abstract class __ModuleManager extends goog.loader.__AbstractModuleManager {
        /**
         */
        constructor();

        /**
         * A mapping from module id to ModuleInfo object.
         * @private {!Object<string, !goog.module.ModuleInfo>}
         */
        private moduleInfoMap_: any /*missing*/;

        /**
         * The ids of the currently loading modules. If batch mode is disabled, then
         * this array will never contain more than one element at a time.
         * @type {!Array<string>}
         * @private
         */
        private loadingModuleIds_: string[];

        /**
         * The requested ids of the currently loading modules. This does not include
         * module dependencies that may also be loading.
         * @type {!Array<string>}
         * @private
         */
        private requestedLoadingModuleIds_: string[];

        /**
         * All module ids that have ever been requested. In concurrent loading these
         * are the ones to subtract from future requests.
         * @type {!Array<string>}
         * @private
         */
        private requestedModuleIds_: string[];

        /**
         * A queue of the ids of requested but not-yet-loaded modules. The zero
         * position is the front of the queue. This is a 2-D array to group modules
         * together with other modules that should be batch loaded with them, if
         * batch loading is enabled.
         * @type {!Array<!Array<string>>}
         * @private
         */
        private requestedModuleIdsQueue_: string[][];

        /**
         * The ids of the currently loading modules which have been initiated by user
         * actions.
         * @type {!Array<string>}
         * @private
         */
        private userInitiatedLoadingModuleIds_: string[];

        /**
         * A map of callback types to the functions to call for the specified
         * callback type.
         * @type {!Object<!goog.loader.AbstractModuleManager.CallbackType,
         *     !Array<!Function>>}
         * @private
         */
        private callbackMap_: {[key: string]: Function[]};

        /**
         * Module info for the base module (the one that contains the module
         * manager code), which we set as the loading module so one can
         * register initialization callbacks in the base module.
         *
         * The base module is considered loaded when #setAllModuleInfo is called or
         * #setModuleContext is called, whichever comes first.
         *
         * @type {!goog.module.ModuleInfo}
         * @private
         */
        private baseModuleInfo_: goog.module.ModuleInfo;

        /**
         * The module that is currently loading, or null if not loading anything.
         * @type {?goog.module.ModuleInfo}
         * @private
         */
        private currentlyLoadingModule_: goog.module.ModuleInfo|null;

        /**
         * The id of the last requested initial module. When it loaded
         * the deferred in `this.initialModulesLoaded_` resolves.
         * @private {?string}
         */
        private lastInitialModuleId_: any /*missing*/;

        /**
         * Deferred for when all initial modules have loaded. We currently block
         * sending additional module requests until this deferred resolves. In a
         * future optimization it may be possible to use the initial modules as
         * seeds for the module loader "requested module ids" and start making new
         * requests even sooner.
         * @private {!goog.async.Deferred}
         */
        private initialModulesLoaded_: any /*missing*/;

        /**
         * A logger.
         * @private {?goog.log.Logger}
         */
        private logger_: any /*missing*/;

        /**
         * Whether the batch mode (i.e. the loading of multiple modules with just one
         * request) has been enabled.
         * @private {boolean}
         */
        private batchModeEnabled_: any /*missing*/;

        /**
         * Whether the module requests may be sent out of order.
         * @private {boolean}
         */
        private concurrentLoadingEnabled_: any /*missing*/;

        /**
         * Tracer that measures how long it takes to load a module.
         * @private {?number}
         */
        private loadTracer_: any /*missing*/;

        /**
         * The number of consecutive failures that have happened upon module load
         * requests.
         * @private {number}
         */
        private consecutiveFailures_: any /*missing*/;

        /**
         * Determines if the module manager was just active before the processing of
         * the last data.
         * @private {boolean}
         */
        private lastActive_: any /*missing*/;

        /**
         * Determines if the module manager was just user active before the processing
         * of the last data. The module manager is user active if any of the
         * user-initiated modules are loading or queued up to load.
         * @private {boolean}
         */
        private userLastActive_: any /*missing*/;

        /**
         * Dispatches an ACTIVE or IDLE event if necessary.
         * @private
         */
        private dispatchActiveIdleChangeIfNeeded_(): void;

        /**
         * Loads a single module for use with a given deferred.
         *
         * @param {string} id The id of the module to load.
         * @param {!goog.async.Deferred} d A deferred object.
         * @private
         */
        private addLoadModule_(id: string, d: goog.async.Deferred<any>): void;

        /**
         * Loads a list of modules or, if some other module is currently being loaded,
         * appends the ids to the queue of requested module ids. Registers callbacks a
         * module that is currently loading and returns a fired deferred for a module
         * that is already loaded.
         *
         * @param {!Array<string>} ids The id of the module to load.
         * @param {boolean=} opt_userInitiated If the load is a result of a user action.
         * @return {!Object<string, !goog.async.Deferred>} A mapping from id (String)
         *     to deferred objects that will callback or errback when the load for that
         *     id is finished.
         * @private
         */
        private loadModulesOrEnqueueIfNotLoadedOrLoading_(ids: string[], opt_userInitiated?: boolean):
            {[key: string]: goog.async.Deferred<any>};

        /**
         * Registers the callbacks and handles logic if it is a user initiated module
         * load.
         *
         * @param {string} id The id of the module to possibly load.
         * @param {!goog.module.ModuleInfo} moduleInfo The module identifier for the
         *     given id.
         * @param {boolean} userInitiated If the load was user initiated.
         * @param {!goog.async.Deferred} d A deferred object.
         * @private
         */
        private registerModuleLoadCallbacks_(id: string, moduleInfo: goog.module.ModuleInfo, userInitiated: boolean, d: goog.async.Deferred<any>): void;

        /**
         * Initiates loading of a list of modules or, if a module is currently being
         * loaded, appends the modules to the queue of requested module ids.
         *
         * The caller should verify that the requested modules are not already loaded or
         * loading. {@link #loadModulesOrEnqueueIfNotLoadedOrLoading_} is a more lenient
         * alternative to this method.
         *
         * @param {!Array<string>} ids The ids of the modules to load.
         * @private
         */
        private loadModulesOrEnqueue_(ids: string[]): void;

        /**
         * Gets the amount of delay to wait before sending a request for more modules.
         * If a certain module request fails, we backoff a little bit and try again.
         * @return {number} Delay, in ms.
         * @private
         */
        private getBackOff_(): number;

        /**
         * Loads a list of modules and any of their not-yet-loaded prerequisites.
         * If batch mode is enabled, the prerequisites will be loaded together with the
         * requested modules and all requested modules will be loaded at the same time.
         *
         * The caller should verify that the requested modules are not already loaded
         * and that no modules are currently loading before calling this method.
         *
         * @param {!Array<string>} ids The ids of the modules to load.
         * @param {boolean=} opt_isRetry If the load is a retry of a previous load
         *     attempt.
         * @param {boolean=} opt_forceReload Whether to bypass cache while loading the
         *     module.
         * @private
         */
        private loadModules_(ids: string[], opt_isRetry?: boolean, opt_forceReload?: boolean): void;

        /**
         * Processes a list of module ids for loading. Checks if any of the modules are
         * already loaded and then gets transitive deps. Queues any necessary modules
         * if batch mode is not enabled. Returns the list of ids that should be loaded.
         *
         * @param {!Array<string>} ids The ids that need to be loaded.
         * @return {!Array<string>} The ids to load, including dependencies.
         * @throws {!Error} If the module is already loaded.
         * @private
         */
        private processModulesForLoad_(ids: string[]): string[];

        /**
         * Builds a list of the ids of the not-yet-loaded modules that a particular
         * module transitively depends on, including itself.
         *
         * @param {string} id The id of a not-yet-loaded module.
         * @return {!Array<string>} An array of module ids in dependency order that's
         *     guaranteed to end with the provided module id.
         * @private
         */
        private getNotYetLoadedTransitiveDepIds_(id: string): string[];

        /**
         * If we are still loading the base module, consider the load complete.
         * @private
         */
        private maybeFinishBaseLoad_(): void;

        /**
         * Ensures that the module with the given id is listed as a user-initiated
         * module that is being loaded. This method guarantees that a module will never
         * get listed more than once.
         * @param {string} id Identifier of the module.
         * @private
         */
        private addUserInitiatedLoadingModule_(id: string): void;

        /**
         * Handles a module load failure.
         *
         * @param {!Array<string>} requestedLoadingModuleIds Modules ids that were
         *     requested in failed request. Does not included calculated dependencies.
         * @param {!Array<string>} requestedModuleIdsWithDeps All module ids requested
         *     in the failed request including all dependencies.
         * @param {?number} status The error status.
         * @private
         */
        private handleLoadError_(
            requestedLoadingModuleIds: string[], requestedModuleIdsWithDeps: string[], status: number|null
        ): void;

        /**
         * Handles a module load timeout.
         * @private
         */
        private handleLoadTimeout_(): void;

        /**
         * Requeues batch loads that had more than one requested module
         * (i.e. modules that were not included as dependencies) as separate loads or
         * if there was only one requested module, fails that module with the received
         * cause.
         * @param {!goog.loader.AbstractModuleManager.FailureType} cause The reason for
         *     the failure.
         * @private
         */
        private requeueBatchOrDispatchFailure_(cause: goog.loader.AbstractModuleManager.FailureType): void;

        /**
         * Handles when a module load failed.
         * @param {!goog.loader.AbstractModuleManager.FailureType} cause The reason for
         *     the failure.
         * @private
         */
        private dispatchModuleLoadFailed_(cause: goog.loader.AbstractModuleManager.FailureType): void;

        /**
         * Loads the next modules on the queue.
         * @private
         */
        private loadNextModules_(): void;

        /**
         * Register a callback for the specified callback type.
         * @param {!goog.loader.AbstractModuleManager.CallbackType} type The callback
         *     type.
         * @param {!Function} fn The callback function.
         * @private
         */
        private registerCallback_(type: goog.loader.AbstractModuleManager.CallbackType, fn: Function): void;

        /**
         * Call the callback functions of the specified type.
         * @param {!goog.loader.AbstractModuleManager.CallbackType} type The callback
         *     type.
         * @private
         */
        private executeCallbacks_(type: goog.loader.AbstractModuleManager.CallbackType): void;
    }
}

declare namespace goog.module.ModuleManager {
    /**
     * The type of callbacks that can be registered with the module manager,.
     * @enum {string}
     */
    enum CallbackType { ERROR, IDLE, ACTIVE, USER_IDLE, USER_ACTIVE }

    /**
     * The possible reasons for a module load failure callback being fired.
     * @enum {number}
     */
    enum FailureType { UNAUTHORIZED, CONSECUTIVE_FAILURES, TIMEOUT, OLD_CODE_GONE, INIT_ERROR }

    /**
     * A non-HTTP status code indicating a corruption in loaded module.
     * This should be used by a ModuleLoader as a replacement for the HTTP code
     * given to the error handler function to indicated that the module was
     * corrupted.
     * This will set the forceReload flag on the loadModules method when retrying
     * module loading.
     * @type {number}
     */
    let CORRUPT_RESPONSE_STATUS_CODE: number;

    /** @return {!goog.loader.AbstractModuleManager} */
    function getInstance(): goog.loader.AbstractModuleManager;
}
