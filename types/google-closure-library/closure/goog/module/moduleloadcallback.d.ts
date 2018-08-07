/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.module.ModuleLoadCallback' {
    import alias = goog.module.ModuleLoadCallback;
    export default alias;
}

declare namespace goog.module {
    /**
     * Class used to encapsulate the callbacks to be called when a module loads.
     * @final
     */
    class ModuleLoadCallback extends __ModuleLoadCallback {}
    abstract class __ModuleLoadCallback {
        /**
         * @param {Function} fn Callback function.
         * @param {Object=} opt_handler Optional handler under whose scope to execute
         *     the callback.
         */
        constructor(fn: Function, opt_handler?: Object);

        /**
         * Callback function.
         * @type {Function}
         * @private
         */
        private fn_: Function;

        /**
         * Optional handler under whose scope to execute the callback.
         * @type {Object|undefined}
         * @private
         */
        private handler_: Object|undefined;

        /**
         * Completes the operation and calls the callback function if appropriate.
         * @param {*} context The module context.
         */
        execute(context: any): void;

        /**
         * Abort the callback, but not the actual module load.
         */
        abort(): void;
    }
}
