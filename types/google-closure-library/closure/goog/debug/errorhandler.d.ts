/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./entrypointregistry.d.ts"/>
/// <reference path="./error.d.ts"/>

declare module 'goog:goog.debug.ErrorHandler' {
    import alias = goog.debug.ErrorHandler;
    export default alias;
}

declare module 'goog:goog.debug.ErrorHandler.ProtectedFunctionError' {
    import alias = goog.debug.ErrorHandler.ProtectedFunctionError;
    export default alias;
}

declare namespace goog.debug {
    /**
     * The ErrorHandler can be used to to wrap functions with a try/catch
     * statement. If an exception is thrown, the given error handler function will
     * be called.
     *
     * When this object is disposed, it will stop handling exceptions and tracing.
     * It will also try to restore window.setTimeout and window.setInterval
     * if it wrapped them. Notice that in the general case, it is not technically
     * possible to remove the wrapper, because functions have no knowledge of
     * what they have been assigned to. So the app is responsible for other
     * forms of unwrapping.
     *
     * @extends {goog.Disposable}
     * @implements {goog.debug.EntryPointMonitor}
     */
    class ErrorHandler extends __ErrorHandler {}
    abstract class __ErrorHandler extends goog.__Disposable implements goog.debug.EntryPointMonitor {
        /**
         * @param {Function} handler Handler for exceptions.
         */
        constructor(handler: Function);

        /**
         * Handler for exceptions, which can do logging, reporting, etc.
         * @type {Function}
         * @private
         */
        private errorHandlerFn_: Function;

        /**
         * Whether errors should be wrapped in
         * goog.debug.ErrorHandler.ProtectedFunctionError before rethrowing.
         * @type {boolean}
         * @private
         */
        private wrapErrors_: boolean;

        /**
         * Whether to add a prefix to all error messages. The prefix is
         * goog.debug.ErrorHandler.ProtectedFunctionError.MESSAGE_PREFIX. This option
         * only has an effect if this.wrapErrors_  is set to false.
         * @type {boolean}
         * @private
         */
        private prefixErrorMessages_: boolean;

        /**
         * Whether to add tracers when instrumenting entry points.
         * @type {boolean}
         * @private
         */
        private addTracersToProtectedFunctions_: boolean;

        /**
         * Enable tracers when instrumenting entry points.
         * @param {boolean} newVal See above.
         */
        setAddTracersToProtectedFunctions(newVal: boolean): void;

        /**
         * Private helper function to return a span that can be clicked on to display
         * an alert with the current stack trace. Newlines are replaced with a
         * placeholder so that they will not be html-escaped.
         * @param {string} stackTrace The stack trace to create a span for.
         * @return {string} A span which can be clicked on to show the stack trace.
         * @private
         */
        private getStackTraceHolder_(stackTrace: string): string;

        /**
         * Get the index for a function. Used for internal indexing.
         * @param {boolean} wrapper True for the wrapper; false for the wrapped.
         * @return {string} The index where we should store the function in its
         *     wrapper/wrapped function.
         * @private
         */
        private getFunctionIndex_(wrapper: boolean): string;

        /**
         * Installs exception protection for an entry point function. When an exception
         * is thrown from a protected function, a handler will be invoked to handle it.
         *
         * @param {Function} fn An entry point function to be protected.
         * @return {!Function} A protected wrapper function that calls the entry point
         *     function.
         */
        protectEntryPoint(fn: Function): Function;

        /**
         * Helps {@link #protectEntryPoint} by actually creating the protected
         * wrapper function, after {@link #protectEntryPoint} determines that one does
         * not already exist for the given function.  Can be overriden by subclasses
         * that may want to implement different error handling, or add additional
         * entry point hooks.
         * @param {!Function} fn An entry point function to be protected.
         * @return {!Function} protected wrapper function.
         * @protected
         */
        protected getProtectedFunction(fn: Function): Function;

        /**
         * Installs exception protection for window.setTimeout to handle exceptions.
         */
        protectWindowSetTimeout(): void;

        /**
         * Install exception protection for window.setInterval to handle exceptions.
         */
        protectWindowSetInterval(): void;

        /**
         * Install exception protection for window.requestAnimationFrame to handle
         * exceptions.
         */
        protectWindowRequestAnimationFrame(): void;

        /**
         * Helper function for protecting a function that causes a function to be
         * asynchronously called, for example setTimeout or requestAnimationFrame.
         * @param {string} fnName The name of the function to protect.
         * @private
         */
        private protectWindowFunctionsHelper_(fnName: string): void;

        /**
         * Set whether to wrap errors that occur in protected functions in a
         * goog.debug.ErrorHandler.ProtectedFunctionError.
         * @param {boolean} wrapErrors Whether to wrap errors.
         */
        setWrapErrors(wrapErrors: boolean): void;

        /**
         * Set whether to add a prefix to all error messages that occur in protected
         * functions.
         * @param {boolean} prefixErrorMessages Whether to add a prefix to error
         *     messages.
         */
        setPrefixErrorMessages(prefixErrorMessages: boolean): void;

        /**
         * Instruments a function.
         *
         * @param {!Function} fn A function to instrument.
         * @return {!Function} The instrumented function.
         */
        wrap(fn: Function): Function;

        /**
         * Try to remove an instrumentation wrapper created by this monitor.
         * If the function passed to unwrap is not a wrapper created by this
         * monitor, then we will do nothing.
         *
         * Notice that some wrappers may not be unwrappable. For example, if other
         * monitors have applied their own wrappers, then it will be impossible to
         * unwrap them because their wrappers will have captured our wrapper.
         *
         * So it is important that entry points are unwrapped in the reverse
         * order that they were wrapped.
         *
         * @param {!Function} fn A function to unwrap.
         * @return {!Function} The unwrapped function, or `fn` if it was not
         *     a wrapped function created by this monitor.
         */
        unwrap(fn: Function): Function;
    }
}

declare namespace goog.debug.ErrorHandler {
    /**
     * Error thrown to the caller of a protected entry point if the entry point
     * throws an error.
     * @extends {goog.debug.Error}
     * @final
     */
    class ProtectedFunctionError extends __ProtectedFunctionError {}
    abstract class __ProtectedFunctionError extends goog.debug.__Error {
        /**
         * @param {*} cause The error thrown by the entry point.
         */
        constructor(cause: any);

        /**
         * The error thrown by the entry point.
         * @type {*}
         */
        cause: any;
    }
}

declare namespace goog.debug.ErrorHandler.ProtectedFunctionError {
    /**
     * Text to prefix the message with.
     * @type {string}
     */
    let MESSAGE_PREFIX: string;
}
