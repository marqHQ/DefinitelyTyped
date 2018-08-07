/// <reference path="../../../../../globals.d.ts"/>
/// <reference path="../../../../../closure/goog/promise/thenable.d.ts"/>
/// <reference path="../../../../../closure/goog/debug/error.d.ts"/>

declare module 'goog:goog.async.Deferred' {
    import alias = goog.async.Deferred;
    export default alias;
}

declare module 'goog:goog.async.Deferred.CanceledError' {
    import alias = goog.async.Deferred.CanceledError;
    export default alias;
}

declare module 'goog:goog.async.Deferred.AlreadyCalledError' {
    import alias = goog.async.Deferred.AlreadyCalledError;
    export default alias;
}

declare namespace goog.async {
    /**
     * A Deferred represents the result of an asynchronous operation. A Deferred
     * instance has no result when it is created, and is "fired" (given an initial
     * result) by calling `callback` or `errback`.
     *
     * Once fired, the result is passed through a sequence of callback functions
     * registered with `addCallback` or `addErrback`. The functions may
     * mutate the result before it is passed to the next function in the sequence.
     *
     * Callbacks and errbacks may be added at any time, including after the Deferred
     * has been "fired". If there are no pending actions in the execution sequence
     * of a fired Deferred, any new callback functions will be called with the last
     * computed result. Adding a callback function is the only way to access the
     * result of the Deferred.
     *
     * If a Deferred operation is canceled, an optional user-provided cancellation
     * function is invoked which may perform any special cleanup, followed by firing
     * the Deferred's errback sequence with a `CanceledError`. If the
     * Deferred has already fired, cancellation is ignored.
     *
     * Deferreds may be templated to a specific type they produce using generics
     * with syntax such as:
     *
     *    /** @type {goog.async.Deferred<string>} *\
     *    var d = new goog.async.Deferred();
     *    // Compiler can infer that foo is a string.
     *    d.addCallback(function(foo) {...});
     *    d.callback('string');  // Checked to be passed a string
     *
     * Since deferreds are often used to produce different values across a chain,
     * the type information is not propagated across chains, but rather only
     * associated with specifically cast objects.
     *
     * @implements {goog.Thenable<VALUE>}
     * @template VALUE
     */
    class Deferred<VALUE> extends __Deferred<VALUE> {}
    abstract class __Deferred<VALUE> implements goog.Thenable<VALUE> {
        /**
         *    /** @type {goog.async.Deferred<string>} *\
         * @param {Function=} opt_onCancelFunction A function that will be called if the
         *     Deferred is canceled. If provided, this function runs before the
         *     Deferred is fired with a `CanceledError`.
         * @param {Object=} opt_defaultScope The default object context to call
         *     callbacks and errbacks in.
         */
        constructor(opt_onCancelFunction?: Function, opt_defaultScope?: Object);

        /**
         * Entries in the sequence are arrays containing a callback, an errback, and
         * an optional scope. The callback or errback in an entry may be null.
         * @type {!Array<!Array>}
         * @private
         */
        private sequence_: any[][];

        /**
         * Optional function that will be called if the Deferred is canceled.
         * @type {Function|undefined}
         * @private
         */
        private onCancelFunction_: Function|undefined;

        /**
         * The default scope to execute callbacks and errbacks in.
         * @type {Object}
         * @private
         */
        private defaultScope_: Object;

        /**
         * Whether the Deferred has been fired.
         * @type {boolean}
         * @private
         */
        private fired_: boolean;

        /**
         * Whether the last result in the execution sequence was an error.
         * @type {boolean}
         * @private
         */
        private hadError_: boolean;

        /**
         * The current Deferred result, updated as callbacks and errbacks are
         * executed.
         * @type {*}
         * @private
         */
        private result_: any;

        /**
         * Whether the Deferred is blocked waiting on another Deferred to fire. If a
         * callback or errback returns a Deferred as a result, the execution sequence
         * is blocked until that Deferred result becomes available.
         * @type {boolean}
         * @private
         */
        private blocked_: boolean;

        /**
         * Whether this Deferred is blocking execution of another Deferred. If this
         * instance was returned as a result in another Deferred's execution
         * sequence,that other Deferred becomes blocked until this instance's
         * execution sequence completes. No additional callbacks may be added to a
         * Deferred once it is blocking another instance.
         * @type {boolean}
         * @private
         */
        private blocking_: boolean;

        /**
         * Whether the Deferred has been canceled without having a custom cancel
         * function.
         * @type {boolean}
         * @private
         */
        private silentlyCanceled_: boolean;

        /**
         * If an error is thrown during Deferred execution with no errback to catch
         * it, the error is rethrown after a timeout. Reporting the error after a
         * timeout allows execution to continue in the calling context (empty when
         * no error is scheduled).
         * @type {number}
         * @private
         */
        private unhandledErrorId_: number;

        /**
         * If this Deferred was created by branch(), this will be the "parent"
         * Deferred.
         * @type {goog.async.Deferred}
         * @private
         */
        private parent_: goog.async.Deferred<any>;

        /**
         * The number of Deferred objects that have been branched off this one. This
         * will be decremented whenever a branch is fired or canceled.
         * @type {number}
         * @private
         */
        private branches_: number;

        /**
         * Holds the stack trace at time of deferred creation if the JS engine
         * provides the Error.captureStackTrace API.
         * @private {?string}
         */
        private constructorStack_: any /*missing*/;

        /**
         * Cancels a Deferred that has not yet been fired, or is blocked on another
         * deferred operation. If this Deferred is waiting for a blocking Deferred to
         * fire, the blocking Deferred will also be canceled.
         *
         * If this Deferred was created by calling branch() on a parent Deferred with
         * opt_propagateCancel set to true, the parent may also be canceled. If
         * opt_deepCancel is set, cancel() will be called on the parent (as well as any
         * other ancestors if the parent is also a branch). If one or more branches were
         * created with opt_propagateCancel set to true, the parent will be canceled if
         * cancel() is called on all of those branches.
         *
         * @param {boolean=} opt_deepCancel If true, cancels this Deferred's parent even
         *     if cancel() hasn't been called on some of the parent's branches. Has no
         *     effect on a branch without opt_propagateCancel set to true.
         */
        cancel(opt_deepCancel?: boolean): void;

        /**
         * Handle a single branch being canceled. Once all branches are canceled, this
         * Deferred will be canceled as well.
         *
         * @private
         */
        private branchCancel_(): void;

        /**
         * Called after a blocking Deferred fires. Unblocks this Deferred and resumes
         * its execution sequence.
         *
         * @param {boolean} isSuccess Whether the result is a success or an error.
         * @param {*} res The result of the blocking Deferred.
         * @private
         */
        private continue_(isSuccess: boolean, res: any): void;

        /**
         * Updates the current result based on the success or failure of the last action
         * in the execution sequence.
         *
         * @param {boolean} isSuccess Whether the new result is a success or an error.
         * @param {*} res The result.
         * @private
         */
        private updateResult_(isSuccess: boolean, res: any): void;

        /**
         * Verifies that the Deferred has not yet been fired.
         *
         * @private
         * @throws {Error} If this has already been fired.
         */
        private check_(): void;

        /**
         * Fire the execution sequence for this Deferred by passing the starting result
         * to the first registered callback.
         * @param {VALUE=} opt_result The starting result.
         */
        callback(opt_result?: VALUE): void;

        /**
         * Fire the execution sequence for this Deferred by passing the starting error
         * result to the first registered errback.
         * @param {*=} opt_result The starting error.
         */
        errback(opt_result?: any): void;

        /**
         * Attempt to make the error's stack trace be long in that it contains the
         * stack trace from the point where the deferred was created on top of the
         * current stack trace to give additional context.
         * @param {*} error
         * @private
         */
        private makeStackTraceLong_(error: any): void;

        /**
         * Asserts that an object is not a Deferred.
         * @param {*} obj The object to test.
         * @throws {Error} Throws an exception if the object is a Deferred.
         * @private
         */
        private assertNotDeferred_(obj: any): void;

        /**
         * Register a callback function to be called with a successful result. If no
         * value is returned by the callback function, the result value is unchanged. If
         * a new value is returned, it becomes the Deferred result and will be passed to
         * the next callback in the execution sequence.
         *
         * If the function throws an error, the error becomes the new result and will be
         * passed to the next errback in the execution chain.
         *
         * If the function returns a Deferred, the execution sequence will be blocked
         * until that Deferred fires. Its result will be passed to the next callback (or
         * errback if it is an error result) in this Deferred's execution sequence.
         *
         * @param {function(this:T,VALUE):?} cb The function to be called with a
         *     successful result.
         * @param {T=} opt_scope An optional scope to call the callback in.
         * @return {!goog.async.Deferred} This Deferred.
         * @template T
         */
        addCallback<T>(cb: (this: T, _0: VALUE) => any, opt_scope?: T): goog.async.Deferred<any>;

        /**
         * Register a callback function to be called with an error result. If no value
         * is returned by the function, the error result is unchanged. If a new error
         * value is returned or thrown, that error becomes the Deferred result and will
         * be passed to the next errback in the execution sequence.
         *
         * If the errback function handles the error by returning a non-error value,
         * that result will be passed to the next normal callback in the sequence.
         *
         * If the function returns a Deferred, the execution sequence will be blocked
         * until that Deferred fires. Its result will be passed to the next callback (or
         * errback if it is an error result) in this Deferred's execution sequence.
         *
         * @param {function(this:T,?):?} eb The function to be called on an
         *     unsuccessful result.
         * @param {T=} opt_scope An optional scope to call the errback in.
         * @return {!goog.async.Deferred<VALUE>} This Deferred.
         * @template T
         */
        addErrback<T>(eb: (this: T, _0: any) => any, opt_scope?: T): goog.async.Deferred<VALUE>;

        /**
         * Registers one function as both a callback and errback.
         *
         * @param {function(this:T,?):?} f The function to be called on any result.
         * @param {T=} opt_scope An optional scope to call the function in.
         * @return {!goog.async.Deferred} This Deferred.
         * @template T
         */
        addBoth<T>(f: (this: T, _0: any) => any, opt_scope?: T): goog.async.Deferred<any>;

        /**
         * Like addBoth, but propagates uncaught exceptions in the errback.
         *
         * @param {function(this:T,?):?} f The function to be called on any result.
         * @param {T=} opt_scope An optional scope to call the function in.
         * @return {!goog.async.Deferred<VALUE>} This Deferred.
         * @template T
         */
        addFinally<T>(f: (this: T, _0: any) => any, opt_scope?: T): goog.async.Deferred<VALUE>;

        /**
         * Registers a callback function and an errback function at the same position
         * in the execution sequence. Only one of these functions will execute,
         * depending on the error state during the execution sequence.
         *
         * NOTE: This is not equivalent to {@code def.addCallback().addErrback()}! If
         * the callback is invoked, the errback will be skipped, and vice versa.
         *
         * @param {?(function(this:T,VALUE):?)} cb The function to be called on a
         *     successful result.
         * @param {?(function(this:T,?):?)} eb The function to be called on an
         *     unsuccessful result.
         * @param {T=} opt_scope An optional scope to call the functions in.
         * @return {!goog.async.Deferred} This Deferred.
         * @template T
         */
        addCallbacks<T>(
            cb: (((this: T, _0: VALUE) => any))|null, eb: (((this: T, _0: any) => any))|null, opt_scope?: T
        ): goog.async.Deferred<any>;

        /**
         * Links another Deferred to the end of this Deferred's execution sequence. The
         * result of this execution sequence will be passed as the starting result for
         * the chained Deferred, invoking either its first callback or errback.
         *
         * @param {!goog.async.Deferred} otherDeferred The Deferred to chain.
         * @return {!goog.async.Deferred} This Deferred.
         */
        chainDeferred(otherDeferred: goog.async.Deferred<any>): goog.async.Deferred<any>;

        /**
         * Makes this Deferred wait for another Deferred's execution sequence to
         * complete before continuing.
         *
         * This is equivalent to adding a callback that returns `otherDeferred`,
         * but doesn't prevent additional callbacks from being added to
         * `otherDeferred`.
         *
         * @param {!goog.async.Deferred|!goog.Thenable} otherDeferred The Deferred
         *     to wait for.
         * @return {!goog.async.Deferred} This Deferred.
         */
        awaitDeferred(otherDeferred: goog.async.Deferred<any>|goog.Thenable<any>): goog.async.Deferred<any>;

        /**
         * Creates a branch off this Deferred's execution sequence, and returns it as a
         * new Deferred. The branched Deferred's starting result will be shared with the
         * parent at the point of the branch, even if further callbacks are added to the
         * parent.
         *
         * All branches at the same stage in the execution sequence will receive the
         * same starting value.
         *
         * @param {boolean=} opt_propagateCancel If cancel() is called on every child
         *     branch created with opt_propagateCancel, the parent will be canceled as
         *     well.
         * @return {!goog.async.Deferred<VALUE>} A Deferred that will be started with
         *     the computed result from this stage in the execution sequence.
         */
        branch(opt_propagateCancel?: boolean): goog.async.Deferred<VALUE>;

        /**
         * @return {boolean} Whether the execution sequence has been started on this
         *     Deferred by invoking `callback` or `errback`.
         */
        hasFired(): boolean;

        /**
         * @param {*} res The latest result in the execution sequence.
         * @return {boolean} Whether the current result is an error that should cause
         *     the next errback to fire. May be overridden by subclasses to handle
         *     special error types.
         * @protected
         */
        protected isError(res: any): boolean;

        /**
         * @return {boolean} Whether an errback exists in the remaining sequence.
         * @private
         */
        private hasErrback_(): boolean;

        /**
         * Exhausts the execution sequence while a result is available. The result may
         * be modified by callbacks or errbacks, and execution will block if the
         * returned result is an incomplete Deferred.
         *
         * @private
         */
        private fire_(): void;

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
        then<VALUE2, THIS, RESULT>(
            opt_onFulfilled?: (((this: THIS, _0: VALUE) => VALUE2))|null,
            opt_onRejected?: (((this: THIS, _0: any) => any))|null,
            opt_context?: THIS
        ): RESULT;
    }
}

declare namespace goog.async.Deferred {
    /**
     * An error sub class that is used when a Deferred has already been called.
     * @extends {goog.debug.Error}
     */
    class AlreadyCalledError extends __AlreadyCalledError {}
    abstract class __AlreadyCalledError extends goog.debug.__Error {
        /**
         * @param {!goog.async.Deferred} deferred The Deferred.
         *
         */
        constructor(deferred: goog.async.Deferred<any>);

        /**
         * The Deferred that raised this error.
         * @type {goog.async.Deferred}
         */
        deferred: goog.async.Deferred<any>;
    }

    /**
     * An error sub class that is used when a Deferred is canceled.
     *
     * @extends {goog.debug.Error}
     */
    class CanceledError extends __CanceledError {}
    abstract class __CanceledError extends goog.debug.__Error {
        /**
         * @param {!goog.async.Deferred} deferred The Deferred object.
         */
        constructor(deferred: goog.async.Deferred<any>);

        /**
         * The Deferred that raised this error.
         * @type {goog.async.Deferred}
         */
        deferred: goog.async.Deferred<any>;
    }

    /**
     * Wrapper around errors that are scheduled to be thrown by failing deferreds
     * after a timeout.
     *
     * @final
     * @private
     * @struct
     */
    class Error_ extends __Error_ {}
    abstract class __Error_ {
        /**
         * @param {*} error Error from a failing deferred.
         */
        constructor(error: any);

        /** @const @private {number} */
        readonly id_: any /*missing*/;

        /** @const @private {*} */
        readonly error_: any /*missing*/;

        /**
         * Actually throws the error and removes it from the list of pending
         * deferred errors.
         */
        throwError(): void;

        /**
         * Resets the error throw timer.
         */
        resetTimer(): void;
    }

    /**
     * Creates a Deferred that has an initial result.
     *
     * @param {*=} opt_result The result.
     * @return {!goog.async.Deferred} The new Deferred.
     */
    function succeed(opt_result?: any): goog.async.Deferred<any>;

    /**
     * Creates a Deferred that fires when the given promise resolves.
     * Use only during migration to Promises.
     *
     * Note: If the promise resolves to a thenable value (which is not allowed by
     * conforming promise implementations), then the deferred may behave
     * unexpectedly as it tries to wait on it. This should not be a risk when using
     * goog.Promise, goog.async.Deferred, or native Promise objects.
     *
     * @param {!IThenable<T>} promise
     * @return {!goog.async.Deferred<T>} The new Deferred.
     * @template T
     */
    function fromPromise<T>(promise: IThenable<T>): goog.async.Deferred<T>;

    /**
     * Creates a Deferred that has an initial error result.
     *
     * @param {*} res The error result.
     * @return {!goog.async.Deferred} The new Deferred.
     */
    function fail(res: any): goog.async.Deferred<any>;

    /**
     * Creates a Deferred that has already been canceled.
     *
     * @return {!goog.async.Deferred} The new Deferred.
     */
    function canceled(): goog.async.Deferred<any>;

    /**
     * Normalizes values that may or may not be Deferreds.
     *
     * If the input value is a Deferred, the Deferred is branched (so the original
     * execution sequence is not modified) and the input callback added to the new
     * branch. The branch is returned to the caller.
     *
     * If the input value is not a Deferred, the callback will be executed
     * immediately and an already firing Deferred will be returned to the caller.
     *
     * In the following (contrived) example, if <code>isImmediate</code> is true
     * then 3 is alerted immediately, otherwise 6 is alerted after a 2-second delay.
     *
     * <pre>
     * var value;
     * if (isImmediate) {
     *   value = 3;
     * } else {
     *   value = new goog.async.Deferred();
     *   setTimeout(function() { value.callback(6); }, 2000);
     * }
     *
     * var d = goog.async.Deferred.when(value, alert);
     * </pre>
     *
     * @param {*} value Deferred or normal value to pass to the callback.
     * @param {function(this:T, ?):?} callback The callback to execute.
     * @param {T=} opt_scope An optional scope to call the callback in.
     * @return {!goog.async.Deferred} A new Deferred that will call the input
     *     callback with the input value.
     * @template T
     */
    function when<T>(value: any, callback: (this: T, _0: any) => any, opt_scope?: T): goog.async.Deferred<any>;

    /**
     * Asserts that there are no pending deferred errors. If there are any
     * scheduled errors, one will be thrown immediately to make this function fail.
     */
    function assertNoErrors(): void;
}
