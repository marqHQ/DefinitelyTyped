/// <reference path="../../../globals.d.ts"/>
/// <reference path="../promise/promise.d.ts"/>

declare module 'goog:goog.testing.JsTdAsyncWrapper' {
    import alias = goog.testing.JsTdAsyncWrapper;
    export default alias;
}

declare namespace goog.testing.JsTdAsyncWrapper {
    /**
     * A queue that mirrors the JSTD Async Queue api but exposes a promise that
     * resolves once the queue is complete for compatibility with JsUnit.
     * @final
     */
    class Queue extends __Queue {}
    abstract class __Queue {
        /**
         * @param {!Object} testObj The test object containing all test methods. This
         *     object is passed into queue callbacks as the "this" object.
         */
        constructor(testObj: Object);

        /**
         * The queue steps.
         * @private {!Array<!goog.testing.JsTdAsyncWrapper.Step_>}
         */
        private steps_: any /*missing*/;

        /**
         * A delegate that is used within a defer call.
         * @private {?goog.testing.JsTdAsyncWrapper.Queue}
         */
        private delegate_: any /*missing*/;

        /**
         * thisArg that should be used by default for addCallback function calls.
         * @private {!Object}
         */
        private testObj_: any /*missing*/;

        /**
         * @param {string|function(!goog.testing.JsTdAsyncWrapper.Pool_=)} stepName
         *     The name of the current testing step, or the fn parameter if
         *     no stepName is desired.
         * @param {function(!goog.testing.JsTdAsyncWrapper.Pool_=)=} opt_fn A function
         *   that will be called.
         */
        defer(stepName: string|((_0: any) => void), opt_fn?: (_0: any) => void): void;

        /**
         * Starts the execution.
         * @return {!goog.Promise<void>}
         */
        startExecuting(): goog.Promise<void>;

        /**
         * Executes the next step on the queue waiting for all pool callbacks and then
         * starts executing any delegate queues before it finishes.
         * @param {function()} callback
         * @param {function(*)} errback
         * @private
         */
        private executeNextStep_(callback: () => void, errback: (_0: any) => void): void;

        /**
         * Execute the delegate queue.
         * @param {function()} callback
         * @param {function(*)} errback
         * @private
         */
        private executeDelegate_(callback: () => void, errback: (_0: any) => void): void;

        /**
         * @param {function(*)} errback
         * @param {*} reason
         * @param {string} stepName
         * @private
         */
        private handleError_(errback: (_0: any) => void, reason: any, stepName: string): void;
    }

    /**
     * A step to be executed.
     * @private
     */
    class Step_ extends __Step_ {}
    abstract class __Step_ {
        /**
         * @param {string} name
         * @param {function(!goog.testing.JsTdAsyncWrapper.Pool_=)} fn
         */
        constructor(name: string, fn: (_0: any) => void);

        /** @final {string} */
        name: any /*missing*/;

        /** @final {function(!goog.testing.JsTdAsyncWrapper.Pool_=)} */
        fn: any /*missing*/;
    }

    /**
     * A fake pool that mimics the JSTD AsyncTestCase's pool object.
     * @private
     * @final
     */
    class Pool_ extends __Pool_ {}
    abstract class __Pool_ {
        /**
         * @param {!Object} testObj The test object containing all test methods. This
         *     object is passed into queue callbacks as the "this" object.
         * @param {function()} callback
         * @param {function(*)} errback
         */
        constructor(testObj: Object, callback: () => void, errback: (_0: any) => void);

        /** @private {number} */
        private outstandingCallbacks_: any /*missing*/;

        /** @private {function()} */
        private callback_: any /*missing*/;

        /** @private {function(*)} */
        private errback_: any /*missing*/;

        /**
         * thisArg that should be used by default for defer function calls.
         * @private {!Object}
         */
        private testObj_: any /*missing*/;

        /** @private {boolean} */
        private callbackCalled_: any /*missing*/;

        /**
         * @return {function()}
         */
        noop(): () => void;

        /**
         * @param {function(...*):*} fn The function to add to the pool.
         * @param {?number=} opt_n The number of permitted uses of the given callback;
         *     defaults to one.
         * @param {?number=} opt_timeout The timeout in milliseconds.
         *     This is not supported in the adapter for now. Specifying this argument
         *     will result in a test failure.
         * @param {?string=} opt_description The callback description.
         * @return {function()}
         */
        addCallback(
            fn: (_0: any[]) => any, opt_n?: number|null, opt_timeout?: number|null, opt_description?: string|null
        ): () => void;

        /**
         * @param {function(...*):*} fn The function to add to the pool.
         * @param {?number=} opt_n The number of permitted uses of the given callback;
         *     defaults to one.
         * @param {?number=} opt_timeout The timeout in milliseconds.
         *     This is not supported in the adapter for now. Specifying this argument
         *     will result in a test failure.
         * @param {?string=} opt_description The callback description.
         * @return {function()}
         */
        add(fn: (_0: any[]) => any, opt_n?: number|null, opt_timeout?: number|null, opt_description?: string|null):
            () => void;

        /**
         * @param {string} msg The message to print if the error callback gets called.
         * @return {function()}
         */
        addErrback(msg: string): () => void;

        /**
         * Completes the pool if there are no outstanding callbacks.
         */
        maybeComplete(): void;
    }

    /**
     * Wraps an object's methods by passing in a Queue that is based on the JSTD
     * async API. The queue exposes a promise that resolves when the queue
     * completes. This promise can be used in JsUnit tests.
     * @param {!Object} original The original JSTD test object. The object should
     *     contain methods such as testXyz or setUp.
     * @return {!Object} A object that has all test methods wrapped in a fake
     *     testing queue.
     */
    function convertToAsyncTestObj(original: Object): Object;
}
