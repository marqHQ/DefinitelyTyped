/// <reference path="../../../globals.d.ts"/>
/// <reference path="./thenable.d.ts"/>
/// <reference path="../debug/error.d.ts"/>
/// <reference path="./resolver.d.ts"/>

declare module 'goog:goog.Promise' {
    import alias = goog.Promise;
    export default alias;
}

declare namespace goog {
    /**
     * NOTE: This class was created in anticipation of the built-in Promise type
     * being standardized and implemented across browsers. Now that Promise is
     * available in modern browsers, and is automatically polyfilled by the Closure
     * Compiler, by default, most new code should use native `Promise`
     * instead of `goog.Promise`. However, `goog.Promise` has the
     * concept of cancellation which native Promises do not yet have. So code
     * needing cancellation may still want to use `goog.Promise`.
     *
     * Promises provide a result that may be resolved asynchronously. A Promise may
     * be resolved by being fulfilled with a fulfillment value, rejected with a
     * rejection reason, or blocked by another Promise. A Promise is said to be
     * settled if it is either fulfilled or rejected. Once settled, the Promise
     * result is immutable.
     *
     * Promises may represent results of any type, including undefined. Rejection
     * reasons are typically Errors, but may also be of any type. Closure Promises
     * allow for optional type annotations that enforce that fulfillment values are
     * of the appropriate types at compile time.
     *
     * The result of a Promise is accessible by calling `then` and registering
     * `onFulfilled` and `onRejected` callbacks. Once the Promise
     * is settled, the relevant callbacks are invoked with the fulfillment value or
     * rejection reason as argument. Callbacks are always invoked in the order they
     * were registered, even when additional `then` calls are made from inside
     * another callback. A callback is always run asynchronously sometime after the
     * scope containing the registering `then` invocation has returned.
     *
     * If a Promise is resolved with another Promise, the first Promise will block
     * until the second is settled, and then assumes the same result as the second
     * Promise. This allows Promises to depend on the results of other Promises,
     * linking together multiple asynchronous operations.
     *
     * This implementation is compatible with the Promises/A+ specification and
     * passes that specification's conformance test suite. A Closure Promise may be
     * resolved with a Promise instance (or sufficiently compatible Promise-like
     * object) created by other Promise implementations. From the specification,
     * Promise-like objects are known as "Thenables".
     *
     * @see http://promisesaplus.com/
     *
     * @struct
     * @final
     * @implements {goog.Thenable<TYPE>}
     * @template TYPE,RESOLVER_CONTEXT
     */
    class Promise<TYPE> extends __Promise<TYPE> {}
    abstract class __Promise<TYPE> implements goog.Thenable<TYPE> {
        /**
         * @param {function(
         *             this:RESOLVER_CONTEXT,
         *             function((TYPE|IThenable<TYPE>|Thenable)=),
         *             function(*=)): void} resolver
         *     Initialization function that is invoked immediately with `resolve`
         *     and `reject` functions as arguments. The Promise is resolved or
         *     rejected with the first argument passed to either function.
         * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
         *     resolver function. If unspecified, the resolver function will be executed
         *     in the default scope.
         */
        constructor(
            resolver: (_0: (_0: TYPE|IThenable<TYPE>|Thenable<TYPE>) => void, _1: (_0: any) => void) => void,
            opt_context?: any
        );

        /**
         * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
         * BLOCKED.
         * @private {goog.Promise.State_}
         */
        private state_: any /*missing*/;

        /**
         * The settled result of the Promise. Immutable once set with either a
         * fulfillment value or rejection reason.
         * @private {*}
         */
        private result_: any /*missing*/;

        /**
         * For Promises created by calling `then()`, the originating parent.
         * @private {goog.Promise}
         */
        private parent_: goog.Promise<any>;

        /**
         * The linked list of `onFulfilled` and `onRejected` callbacks
         * added to this Promise by calls to `then()`.
         * @private {?goog.Promise.CallbackEntry_}
         */
        private callbackEntries_: any /*missing*/;

        /**
         * The tail of the linked list of `onFulfilled` and `onRejected`
         * callbacks added to this Promise by calls to `then()`.
         * @private {?goog.Promise.CallbackEntry_}
         */
        private callbackEntriesTail_: any /*missing*/;

        /**
         * Whether the Promise is in the queue of Promises to execute.
         * @private {boolean}
         */
        private executing_: any /*missing*/;

        /**
         * A timeout ID used when the `UNHANDLED_REJECTION_DELAY` is greater
         * than 0 milliseconds. The ID is set when the Promise is rejected, and
         * cleared only if an `onRejected` callback is invoked for the
         * Promise (or one of its descendants) before the delay is exceeded.
         *
         * If the rejection is not handled before the timeout completes, the
         * rejection reason is passed to the unhandled rejection handler.
         * @private {number}
         */
        private unhandledRejectionId_: any /*missing*/;

        /**
         * When the `UNHANDLED_REJECTION_DELAY` is set to 0 milliseconds, a
         * boolean that is set if the Promise is rejected, and reset to false if an
         * `onRejected` callback is invoked for the Promise (or one of its
         * descendants). If the rejection is not handled before the next timestep,
         * the rejection reason is passed to the unhandled rejection handler.
         * @private {boolean}
         */
        private hadUnhandledRejection_: any /*missing*/;

        /**
         * A list of stack trace frames pointing to the locations where this Promise
         * was created or had callbacks added to it. Saved to add additional context
         * to stack traces when an exception is thrown.
         * @private {!Array<string>}
         */
        private stack_: any /*missing*/;

        /**
         * Index of the most recently executed stack frame entry.
         * @private {number}
         */
        private currentStep_: any /*missing*/;

        /**
         * Adds callbacks that will operate on the result of the Promise without
         * returning a child Promise (unlike "then").
         *
         * If the Promise is fulfilled, the `onFulfilled` callback will be invoked
         * with the fulfillment value as argument.
         *
         * If the Promise is rejected, the `onRejected` callback will be invoked
         * with the rejection reason as argument.
         *
         * @param {?(function(this:THIS, TYPE):?)=} opt_onFulfilled A
         *     function that will be invoked with the fulfillment value if the Promise
         *     is fulfilled.
         * @param {?(function(this:THIS, *): *)=} opt_onRejected A function that will
         *     be invoked with the rejection reason if the Promise is rejected.
         * @param {THIS=} opt_context An optional context object that will be the
         *     execution context for the callbacks. By default, functions are executed
         *     with the default this.
         * @package
         * @template THIS
         */
        thenVoid<THIS>(
            opt_onFulfilled?: (((this: THIS, _0: TYPE) => any))|null,
            opt_onRejected?: (((this: THIS, _0: any) => any))|null,
            opt_context?: THIS
        ): void;

        /**
         * Adds a callback that will be invoked when the Promise is settled (fulfilled
         * or rejected). The callback receives no argument, and no new child Promise is
         * created. This is useful for ensuring that cleanup takes place after certain
         * asynchronous operations. Callbacks added with `thenAlways` will be
         * executed in the same order with other calls to `then`,
         * `thenAlways`, or `thenCatch`.
         *
         * Since it does not produce a new child Promise, cancellation propagation is
         * not prevented by adding callbacks with `thenAlways`. A Promise that has
         * a cleanup handler added with `thenAlways` will be canceled if all of
         * its children created by `then` (or `thenCatch`) are canceled.
         * Additionally, since any rejections are not passed to the callback, it does
         * not stop the unhandled rejection handler from running.
         *
         * @param {function(this:THIS): void} onSettled A function that will be invoked
         *     when the Promise is settled (fulfilled or rejected).
         * @param {THIS=} opt_context An optional context object that will be the
         *     execution context for the callbacks. By default, functions are executed
         *     in the global scope.
         * @return {!goog.Promise<TYPE>} This Promise, for chaining additional calls.
         * @template THIS
         */
        thenAlways<THIS>(onSettled: (this: THIS) => void, opt_context?: THIS): goog.Promise<TYPE>;

        /**
         * Adds a callback that will be invoked only if the Promise is rejected. This
         * is equivalent to {@code then(null, onRejected)}.
         *
         * @param {function(this:THIS, *): *} onRejected A function that will be
         *     invoked with the rejection reason if the Promise is rejected.
         * @param {THIS=} opt_context An optional context object that will be the
         *     execution context for the callbacks. By default, functions are executed
         *     in the global scope.
         * @return {!goog.Promise} A new Promise that will receive the result of the
         *     callback.
         * @template THIS
         */
        thenCatch<THIS>(onRejected: (this: THIS, _0: any) => any, opt_context?: THIS): goog.Promise<any>;

        /**
         * Cancels the Promise if it is still pending by rejecting it with a cancel
         * Error. No action is performed if the Promise is already resolved.
         *
         * All child Promises of the canceled Promise will be rejected with the same
         * cancel error, as with normal Promise rejection. If the Promise to be canceled
         * is the only child of a pending Promise, the parent Promise will also be
         * canceled. Cancellation may propagate upward through multiple generations.
         *
         * @param {string=} opt_message An optional debugging message for describing the
         *     cancellation reason.
         */
        cancel(opt_message?: string): void;

        /**
         * Cancels this Promise with the given error.
         *
         * @param {!Error} err The cancellation error.
         * @private
         */
        private cancelInternal_(err: Error): void;

        /**
         * Cancels a child Promise from the list of callback entries. If the Promise has
         * not already been resolved, reject it with a cancel error. If there are no
         * other children in the list of callback entries, propagate the cancellation
         * by canceling this Promise as well.
         *
         * @param {!goog.Promise} childPromise The Promise to cancel.
         * @param {!Error} err The cancel error to use for rejecting the Promise.
         * @private
         */
        private cancelChild_(childPromise: goog.Promise<any>, err: Error): void;

        /**
         * Adds a callback entry to the current Promise, and schedules callback
         * execution if the Promise has already been settled.
         *
         * @param {goog.Promise.CallbackEntry_} callbackEntry Record containing
         *     `onFulfilled` and `onRejected` callbacks to execute after
         *     the Promise is settled.
         * @private
         */
        private addCallbackEntry_(callbackEntry: any): void;

        /**
         * Creates a child Promise and adds it to the callback entry list. The result of
         * the child Promise is determined by the state of the parent Promise and the
         * result of the `onFulfilled` or `onRejected` callbacks as
         * specified in the Promise resolution procedure.
         *
         * @see http://promisesaplus.com/#the__method
         *
         * @param {?function(this:THIS, TYPE):
         *          (RESULT|goog.Promise<RESULT>|Thenable)} onFulfilled A callback that
         *     will be invoked if the Promise is fulfilled, or null.
         * @param {?function(this:THIS, *): *} onRejected A callback that will be
         *     invoked if the Promise is rejected, or null.
         * @param {THIS=} opt_context An optional execution context for the callbacks.
         *     in the default calling context.
         * @return {!goog.Promise} The child Promise.
         * @template RESULT,THIS
         * @private
         */
        private addChildPromise_<RESULT, THIS>(
            onFulfilled: ((this: THIS, _0: TYPE) => RESULT | IThenable<RESULT>)|null,
            onRejected: ((this: THIS, _0: any) => any)|null,
            opt_context?: THIS
        ): goog.Promise<any>;

        /**
         * Unblocks the Promise and fulfills it with the given value.
         *
         * @param {TYPE} value
         * @private
         */
        private unblockAndFulfill_(value: TYPE): void;

        /**
         * Unblocks the Promise and rejects it with the given rejection reason.
         *
         * @param {*} reason
         * @private
         */
        private unblockAndReject_(reason: any): void;

        /**
         * Attempts to resolve a Promise with a given resolution state and value. This
         * is a no-op if the given Promise has already been resolved.
         *
         * If the given result is a Thenable (such as another Promise), the Promise will
         * be settled with the same state and result as the Thenable once it is itself
         * settled.
         *
         * If the given result is not a Thenable, the Promise will be settled (fulfilled
         * or rejected) with that result based on the given state.
         *
         * @see http://promisesaplus.com/#the_promise_resolution_procedure
         *
         * @param {goog.Promise.State_} state
         * @param {*} x The result to apply to the Promise.
         * @private
         */
        private resolve_(state: any, x: any): void;

        /**
         * Executes the pending callbacks of a settled Promise after a timeout.
         *
         * Section 2.2.4 of the Promises/A+ specification requires that Promise
         * callbacks must only be invoked from a call stack that only contains Promise
         * implementation code, which we accomplish by invoking callback execution after
         * a timeout. If `startExecution_` is called multiple times for the same
         * Promise, the callback chain will be evaluated only once. Additional callbacks
         * may be added during the evaluation phase, and will be executed in the same
         * event loop.
         *
         * All Promises added to the waiting list during the same browser event loop
         * will be executed in one batch to avoid using a separate timeout per Promise.
         *
         * @private
         */
        private scheduleCallbacks_(): void;

        /**
         * @return {boolean} Whether there are any pending callbacks queued.
         * @private
         */
        private hasEntry_(): boolean;

        /**
         * @param {goog.Promise.CallbackEntry_} entry
         * @private
         */
        private queueEntry_(entry: any): void;

        /**
         * @return {goog.Promise.CallbackEntry_} entry
         * @private
         */
        private popEntry_(): any;

        /**
         * @param {goog.Promise.CallbackEntry_} previous
         * @private
         */
        private removeEntryAfter_(previous: any): void;

        /**
         * Executes all pending callbacks for this Promise.
         *
         * @private
         */
        private executeCallbacks_(): void;

        /**
         * Executes a pending callback for this Promise. Invokes an `onFulfilled`
         * or `onRejected` callback based on the settled state of the Promise.
         *
         * @param {!goog.Promise.CallbackEntry_} callbackEntry An entry containing the
         *     onFulfilled and/or onRejected callbacks for this step.
         * @param {goog.Promise.State_} state The resolution status of the Promise,
         *     either FULFILLED or REJECTED.
         * @param {*} result The settled result of the Promise.
         * @private
         */
        private executeCallback_(callbackEntry: any, state: any, result: any): void;

        /**
         * Records a stack trace entry for functions that call `then` or the
         * Promise constructor. May be disabled by unsetting `LONG_STACK_TRACES`.
         *
         * @param {!Error} err An Error object created by the calling function for
         *     providing a stack trace.
         * @private
         */
        private addStackTrace_(err: Error): void;

        /**
         * Adds extra stack trace information to an exception for the list of
         * asynchronous `then` calls that have been run for this Promise. Stack
         * trace information is recorded in {@see #addStackTrace_}, and appended to
         * rethrown errors when `LONG_STACK_TRACES` is enabled.
         *
         * @param {*} err An unhandled exception captured during callback execution.
         * @private
         */
        private appendLongStack_(err: any): void;

        /**
         * Marks this rejected Promise as having being handled. Also marks any parent
         * Promises in the rejected state as handled. The rejection handler will no
         * longer be invoked for this Promise (if it has not been called already).
         *
         * @private
         */
        private removeUnhandledRejection_(): void;

        /**
         * Adds callbacks that will operate on the result of the Thenable, returning a
         * new child Promise.
         *
         * If the Thenable is fulfilled, the `onFulfilled` callback will be
         * invoked with the fulfillment value as argument, and the child Promise will
         * be fulfilled with the return value of the callback. If the callback throws
         * an exception, the child Promise will be rejected with the thrown value
         * instead.
         *
         * If the Thenable is rejected, the `onRejected` callback will be invoked
         * with the rejection reason as argument, and the child Promise will be rejected
         * with the return value of the callback or thrown value.
         *
         * @param {?(function(this:THIS, TYPE): VALUE)=} opt_onFulfilled A
         *     function that will be invoked with the fulfillment value if the Promise
         *     is fulfilled.
         * @param {?(function(this:THIS, *): *)=} opt_onRejected A function that will
         *     be invoked with the rejection reason if the Promise is rejected.
         * @param {THIS=} opt_context An optional context object that will be the
         *     execution context for the callbacks. By default, functions are executed
         *     with the default this.
         *
         * @return {RESULT} A new Promise that will receive the result
         *     of the fulfillment or rejection callback.
         * @template VALUE
         * @template THIS
         *
         * When a Promise (or thenable) is returned from the fulfilled callback,
         * the result is the payload of that promise, not the promise itself.
         *
         * @template RESULT := type('goog.Promise',
         *     cond(isUnknown(VALUE), unknown(),
         *       mapunion(VALUE, (V) =>
         *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
         *           templateTypeOf(V, 0),
         *           cond(sub(V, 'Thenable'),
         *              unknown(),
         *              V)))))
         *  =:
         *
         */
        then<VALUE, THIS, RESULT>(
            opt_onFulfilled?: (((this: THIS, _0: TYPE) => VALUE))|null,
            opt_onRejected?: (((this: THIS, _0: any) => any))|null,
            opt_context?: THIS
        ): RESULT;
    }
}

declare namespace goog.Promise {
    /**
     * Error used as a rejection reason for canceled Promises.
     *
     * @extends {goog.debug.Error}
     * @final
     */
    class CancellationError extends __CancellationError {}
    abstract class __CancellationError extends goog.debug.__Error {
        /**
         * @param {string=} opt_message
         */
        constructor(opt_message?: string);
    }

    /**
     * Internal implementation of the resolver interface.
     *
     * @implements {goog.promise.Resolver<TYPE>}
     * @final @struct
     * @private
     * @template TYPE
     */
    class Resolver_<TYPE> extends __Resolver_<TYPE> {}
    abstract class __Resolver_<TYPE> implements goog.promise.Resolver<TYPE> {
        /**
         * @param {!goog.Promise<TYPE>} promise
         * @param {function((TYPE|goog.Promise<TYPE>|Thenable)=)} resolve
         * @param {function(*=): void} reject
         */
        constructor(
            promise: goog.Promise<TYPE>, resolve: (_0: TYPE|IThenable<TYPE>) => void, reject: (_0: any) => void
        );

        /**
         * The promise that created this resolver.
         * @type {!goog.Promise<TYPE>}
         */
        readonly promise: goog.Promise<TYPE>;

        /**
         * Resolves this resolver with the specified value.
         * @type {function((TYPE|goog.Promise<TYPE>|Thenable)=)}
         */
        readonly resolve: (_0: TYPE|goog.Promise<TYPE>|Thenable<TYPE>) => void;

        /**
         * Rejects this resolver with the specified reason.
         * @type {function(*=): void}
         */
        readonly reject: (_0: any) => void;
    }

    /** @const @private {goog.async.FreeList<!goog.Promise.CallbackEntry_>} */
    const freelist_: any /*missing*/;

    /**
     * @param {VALUE=} opt_value
     * @return {RESULT} A new Promise that is immediately resolved
     *     with the given value. If the input value is already a goog.Promise, it
     *     will be returned immediately without creating a new instance.
     * @template VALUE
     * @template RESULT := type('goog.Promise',
     *     cond(isUnknown(VALUE), unknown(),
     *       mapunion(VALUE, (V) =>
     *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
     *           templateTypeOf(V, 0),
     *           cond(sub(V, 'Thenable'),
     *              unknown(),
     *              V)))))
     * =:
     */
    function resolve<VALUE, RESULT>(opt_value?: VALUE): RESULT;

    /**
     * @param {*=} opt_reason
     * @return {!goog.Promise} A new Promise that is immediately rejected with the
     *     given reason.
     */
    function reject(opt_reason?: any): goog.Promise<any>;

    /**
     * @param {!Array<?(goog.Promise<TYPE>|goog.Thenable<TYPE>|Thenable|*)>}
     *     promises
     * @return {!goog.Promise<TYPE>} A Promise that receives the result of the
     *     first Promise (or Promise-like) input to settle immediately after it
     *     settles.
     * @template TYPE
     */
    function race<TYPE>(promises: goog.Promise<TYPE>|IThenable<TYPE>|any|null[]): goog.Promise<TYPE>;

    /**
     * @param {!Array<?(goog.Promise<TYPE>|goog.Thenable<TYPE>|Thenable|*)>}
     *     promises
     * @return {!goog.Promise<!Array<TYPE>>} A Promise that receives a list of
     *     every fulfilled value once every input Promise (or Promise-like) is
     *     successfully fulfilled, or is rejected with the first rejection reason
     *     immediately after it is rejected.
     * @template TYPE
     */
    function all<TYPE>(promises: goog.Promise<TYPE>|IThenable<TYPE>|any|null[]): goog.Promise<TYPE[]>;

    /**
     * @param {!Array<?(goog.Promise<TYPE>|goog.Thenable<TYPE>|Thenable|*)>}
     *     promises
     * @return {!goog.Promise<!Array<{
     *     fulfilled: boolean,
     *     value: (TYPE|undefined),
     *     reason: (*|undefined)}>>} A Promise that resolves with a list of
     *         result objects once all input Promises (or Promise-like) have
     *         settled. Each result object contains a 'fulfilled' boolean indicating
     *         whether an input Promise was fulfilled or rejected. For fulfilled
     *         Promises, the resulting value is stored in the 'value' field. For
     *         rejected Promises, the rejection reason is stored in the 'reason'
     *         field.
     * @template TYPE
     */
    function allSettled<TYPE>(promises: goog.Promise<TYPE>|IThenable<TYPE>|any|null[]): goog.Promise<{
        fulfilled: boolean;
        value: TYPE|undefined;
        reason: any|undefined;
    }[]>;

    /**
     * @param {!Array<?(goog.Promise<TYPE>|goog.Thenable<TYPE>|Thenable|*)>}
     *     promises
     * @return {!goog.Promise<TYPE>} A Promise that receives the value of the first
     *     input to be fulfilled, or is rejected with a list of every rejection
     *     reason if all inputs are rejected.
     * @template TYPE
     */
    function firstFulfilled<TYPE>(promises: goog.Promise<TYPE>|IThenable<TYPE>|any|null[]): goog.Promise<TYPE>;

    /**
     * @return {!goog.promise.Resolver<TYPE>} Resolver wrapping the promise and its
     *     resolve / reject functions. Resolving or rejecting the resolver
     *     resolves or rejects the promise.
     * @template TYPE
     */
    function withResolver<TYPE>(): goog.promise.Resolver<TYPE>;

    /**
     * Sets a handler that will be called with reasons from unhandled rejected
     * Promises. If the rejected Promise (or one of its descendants) has an
     * `onRejected` callback registered, the rejection will be considered
     * handled, and the rejection handler will not be called.
     *
     * By default, unhandled rejections are rethrown so that the error may be
     * captured by the developer console or a `window.onerror` handler.
     *
     * @param {function(*)} handler A function that will be called with reasons from
     *     rejected Promises. Defaults to `goog.async.throwException`.
     */
    function setUnhandledRejectionHandler(handler: (_0: any) => void): void;
}
