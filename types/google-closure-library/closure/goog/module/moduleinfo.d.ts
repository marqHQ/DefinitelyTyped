/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./moduleloadcallback.d.ts"/>
/// <reference path="../html/trustedresourceurl.d.ts"/>
/// <reference path="./basemodule.d.ts"/>
/// <reference path="../loader/abstractmodulemanager.d.ts"/>

declare module 'goog:goog.module.ModuleInfo' {
    import alias = goog.module.ModuleInfo;
    export default alias;
}

declare namespace goog.module {
    /**
     * A ModuleInfo object is used by the ModuleManager to hold information about a
     * module of js code that may or may not yet be loaded into the environment.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class ModuleInfo extends __ModuleInfo {}
    abstract class __ModuleInfo extends goog.__Disposable {
        /**
         * @param {Array<string>} deps Ids of the modules that must be loaded before
         *     this one. The ids must be in dependency order (i.e. if the ith module
         *     depends on the jth module, then i > j).
         * @param {string} id The module's ID.
         */
        constructor(deps: string[], id: string);

        /**
         * A list of the ids of the modules that must be loaded before this module.
         * @type {Array<string>}
         * @private
         */
        private deps_: string[];

        /**
         * The module's ID.
         * @type {string}
         * @private
         */
        private id_: string;

        /**
         * Callbacks to execute once this module is loaded.
         * @type {Array<goog.module.ModuleLoadCallback>}
         * @private
         */
        private onloadCallbacks_: goog.module.ModuleLoadCallback[];

        /**
         * Callbacks to execute if the module load errors.
         * @type {Array<goog.module.ModuleLoadCallback>}
         * @private
         */
        private onErrorCallbacks_: goog.module.ModuleLoadCallback[];

        /**
         * Early callbacks to execute once this module is loaded. Called after
         * module initialization but before regular onload callbacks.
         * @type {Array<goog.module.ModuleLoadCallback>}
         * @private
         */
        private earlyOnloadCallbacks_: goog.module.ModuleLoadCallback[];

        /**
         * The uris that can be used to retrieve this module's code.
         * @type {?Array<!goog.html.TrustedResourceUrl>}
         * @private
         */
        private uris_: goog.html.TrustedResourceUrl[]|null;

        /**
         * The constructor to use to instantiate the module object after the module
         * code is loaded. This must be either goog.module.BaseModule or a subclass of
         * it.
         * @type {Function}
         * @private
         */
        private moduleConstructor_: Function;

        /**
         * The module object. This will be null until the module is loaded.
         * @type {goog.module.BaseModule?}
         * @private
         */
        private module_: goog.module.BaseModule|null;

        /**
         * Gets the dependencies of this module.
         * @return {Array<string>} The ids of the modules that this module depends on.
         */
        getDependencies(): string[];

        /**
         * Gets the ID of this module.
         * @return {string} The ID.
         */
        getId(): string;

        /**
         * Sets the uris of this module.
         * @param {!Array<!goog.html.TrustedResourceUrl>} uris Uris for this module's
         *     code.
         */
        setTrustedUris(uris: goog.html.TrustedResourceUrl[]): void;

        /**
         * Gets the uris of this module.
         * @return {!Array<!goog.html.TrustedResourceUrl>} Uris for this module's code.
         */
        getUris(): goog.html.TrustedResourceUrl[];

        /**
         * Sets the constructor to use to instantiate the module object after the
         * module code is loaded.
         * @param {Function} constructor The constructor of a goog.module.BaseModule
         *     subclass.
         */
        setModuleConstructor(constructor: Function): void;

        /**
         * Registers a function that should be called after the module is loaded. These
         * early callbacks are called after {@link Module#initialize} is called but
         * before the other callbacks are called.
         * @param {Function} fn A callback function that takes a single argument which
         *    is the module context.
         * @param {Object=} opt_handler Optional handler under whose scope to execute
         *     the callback.
         * @return {!goog.module.ModuleLoadCallback} Reference to the callback
         *     object.
         */
        registerEarlyCallback(fn: Function, opt_handler?: Object): goog.module.ModuleLoadCallback;

        /**
         * Registers a function that should be called after the module is loaded.
         * @param {Function} fn A callback function that takes a single argument which
         *    is the module context.
         * @param {Object=} opt_handler Optional handler under whose scope to execute
         *     the callback.
         * @return {!goog.module.ModuleLoadCallback} Reference to the callback
         *     object.
         */
        registerCallback(fn: Function, opt_handler?: Object): goog.module.ModuleLoadCallback;

        /**
         * Registers a function that should be called if the module load fails.
         * @param {Function} fn A callback function that takes a single argument which
         *    is the failure type.
         * @param {Object=} opt_handler Optional handler under whose scope to execute
         *     the callback.
         * @return {!goog.module.ModuleLoadCallback} Reference to the callback
         *     object.
         */
        registerErrback(fn: Function, opt_handler?: Object): goog.module.ModuleLoadCallback;

        /**
         * Registers a function that should be called after the module is loaded.
         * @param {Array<goog.module.ModuleLoadCallback>} callbacks The array to
         *     add the callback to.
         * @param {Function} fn A callback function that takes a single argument which
         *     is the module context.
         * @param {Object=} opt_handler Optional handler under whose scope to execute
         *     the callback.
         * @return {!goog.module.ModuleLoadCallback} Reference to the callback
         *     object.
         * @private
         */
        private registerCallback_(callbacks: goog.module.ModuleLoadCallback[], fn: Function, opt_handler?: Object):
            goog.module.ModuleLoadCallback;

        /**
         * Determines whether the module has been loaded.
         * @return {boolean} Whether the module has been loaded.
         */
        isLoaded(): boolean;

        /**
         * Gets the module.
         * @return {goog.module.BaseModule?} The module if it has been loaded.
         *     Otherwise, null.
         */
        getModule(): goog.module.BaseModule|null;

        /**
         * Sets this module as loaded.
         * @param {function() : Object} contextProvider A function that provides the
         *     module context.
         * @return {boolean} Whether any errors occurred while executing the onload
         *     callbacks.
         */
        onLoad(contextProvider: () => Object): boolean;

        /**
         * Calls the error callbacks for the module.
         * @param {goog.loader.AbstractModuleManager.FailureType} cause What caused the
         *     error.
         */
        onError(cause: goog.loader.AbstractModuleManager.FailureType): void;

        /**
         * Helper to call the callbacks after module load.
         * @param {Array<goog.module.ModuleLoadCallback>} callbacks The callbacks
         *     to call and then clear.
         * @param {*} context The module context.
         * @return {Array<*>} Any errors encountered while calling the callbacks,
         *     or null if there were no errors.
         * @private
         */
        private callCallbacks_(callbacks: goog.module.ModuleLoadCallback[], context: any): any[];
    }
}
