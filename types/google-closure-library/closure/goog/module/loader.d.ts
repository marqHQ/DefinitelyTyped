/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.module.Loader' {
    import alias = goog.module.Loader;
    export default alias;
}

declare namespace goog.module {
    /**
     * The dynamic loading functionality is defined as a class. The class
     * will be used as singleton. There is, however, a two step
     * initialization procedure because parameters need to be passed to
     * the goog.module.Loader instance.
     *
     * @final
     */
    class Loader extends __Loader {}
    abstract class __Loader {
        /**
         */
        constructor();

        /**
         * Map of module name/array of {symbol name, callback} pairs that are pending
         * to be loaded.
         * @type {Object}
         * @private
         */
        private pending_: Object;

        /**
         * Provides associative access to each module and the symbols of each module
         * that have already been loaded (one lookup for the module, another lookup
         * on the module for the symbol).
         * @type {Object}
         * @private
         */
        private modules_: Object;

        /**
         * Map of module name to module url. Used to avoid fetching the same URL
         * twice by keeping track of in-flight URLs.
         * Note: this allows two modules to be bundled into the same file.
         * @type {Object}
         * @private
         */
        private pendingModuleUrls_: Object;

        /**
         * The base url to load modules from. This property will be set in init().
         * @type {?string}
         * @private
         */
        private urlBase_: string|null;

        /**
         * Array of modules that have been requested before init() was called.
         * If require() is called before init() was called, the required
         * modules can obviously not yet be loaded, because their URL is
         * unknown. The modules that are requested before init() are
         * therefore stored in this array, and they are loaded at init()
         * time.
         * @type {Array<string>}
         * @private
         */
        private pendingBeforeInit_: string[];

        /**
         * Creates a full URL to the compiled module code given a base URL and a
         * module name. By default it's urlBase + '_' + module + '.js'.
         * @param {string} urlBase URL to the module files.
         * @param {string} module Module name.
         * @return {string} The full url to the module binary.
         * @private
         */
        private getModuleUrl_(urlBase: string, module: string): string;

        /**
         * Initializes the Loader to be fully functional. Also executes load
         * requests that were received before initialization. Must be called
         * exactly once, with the URL of the base library. Module URLs are
         * derived from the URL of the base library by inserting the module
         * name, preceded by a period, before the .js prefix of the base URL.
         *
         * @param {string} baseUrl The URL of the base library.
         * @param {Function=} opt_urlFunction Function that creates the URL for the
         *     module file. It will be passed the base URL for module files and the
         *     module name and should return the fully-formed URL to the module file to
         *     load.
         */
        init(baseUrl: string, opt_urlFunction?: Function): void;

        /**
         * Requests the loading of a symbol from a module. When the module is
         * loaded, the requested symbol will be passed as argument to the
         * function callback.
         *
         * @param {string} module The name of the module. Usually, the value
         *     is defined as a constant whose name starts with MOD_.
         * @param {number|string} symbol The ID of the symbol. Usually, the value is
         *     defined as a constant whose name starts with SYM_.
         * @param {Function} callback This function will be called with the
         *     resolved symbol as the argument once the module is loaded.
         */
        require(module: string, symbol: number|string, callback: Function): void;

        /**
         * Registers a symbol in a loaded module. When called without symbol,
         * registers the module to be fully loaded and executes all callbacks
         * from pending require() callbacks for this module.
         *
         * @param {string} module The name of the module. Cf. parameter module
         *     of method require().
         * @param {number|string=} opt_symbol The symbol being defined, or nothing when
         *     all symbols of the module are defined. Cf. parameter symbol of method
         *     require().
         * @param {Object=} opt_object The object bound to the symbol, or nothing when
         *     all symbols of the module are defined.
         */
        provide(module: string, opt_symbol?: number|string, opt_object?: Object): void;

        /**
         * Starts to load a module. Assumes that init() was called.
         *
         * @param {string} module The name of the module.
         * @private
         */
        private load_(module: string): void;
    }
}

declare namespace goog.module.Loader {
    /**
     * Wrapper of goog.module.Loader.require() for use in modules.
     * See method goog.module.Loader.require() for
     * explanation of params.
     *
     * @param {string} module The name of the module. Usually, the value
     *     is defined as a constant whose name starts with MOD_.
     * @param {number|string} symbol The ID of the symbol. Usually, the value is
     *     defined as a constant whose name starts with SYM_.
     * @param {Function} callback This function will be called with the
     *     resolved symbol as the argument once the module is loaded.
     */
    function require(module: string, symbol: number|string, callback: Function): void;

    /**
     * Wrapper of goog.module.Loader.provide() for use in modules
     * See method goog.module.Loader.provide() for explanation of params.
     *
     * @param {string} module The name of the module. Cf. parameter module
     *     of method require().
     * @param {number|string=} opt_symbol The symbol being defined, or nothing
     *     when all symbols of the module are defined. Cf. parameter symbol of
     *     method require().
     * @param {Object=} opt_object The object bound to the symbol, or nothing when
     *     all symbols of the module are defined.
     */
    function provide(module: string, opt_symbol?: number|string, opt_object?: Object): void;

    /**
     * Wrapper of init() so that we only need to export this single
     * identifier instead of three. See method goog.module.Loader.init() for
     * explanation of param.
     *
     * @param {string} urlBase The URL of the base library.
     * @param {Function=} opt_urlFunction Function that creates the URL for the
     *     module file. It will be passed the base URL for module files and the
     *     module name and should return the fully-formed URL to the module file to
     *     load.
     */
    function init(urlBase: string, opt_urlFunction?: Function): void;

    /**
     * Produces a function that delegates all its arguments to a
     * dynamically loaded function. This is used to export dynamically
     * loaded functions.
     *
     * @param {string} module The module to load from.
     * @param {number|string} symbol The ID of the symbol to load from the module.
     *     This symbol must resolve to a function.
     * @return {!Function} A function that forwards all its arguments to
     *     the dynamically loaded function specified by module and symbol.
     */
    function loaderCall(module: string, symbol: number|string): Function;

    /**
     * The globally exported name of the load callback. Matches the
     * definition in the js_module_binary() BUILD rule.
     * @type {string}
     */
    let LOAD_CALLBACK: string;
}
