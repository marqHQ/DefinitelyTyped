/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.async.ConditionalDelay' {
    import alias = goog.async.ConditionalDelay;
    export default alias;
}

declare namespace goog.async {
    /**
     * A ConditionalDelay object invokes the associated function after a specified
     * interval delay and checks its return value. If the function returns
     * `true` the conditional delay is cancelled and {@see #onSuccess}
     * is called. Otherwise this object keeps to invoke the deferred function until
     * either it returns `true` or the timeout is exceeded. In the latter case
     * the {@see #onFailure} method will be called.
     *
     * The interval duration and timeout can be specified each time the delay is
     * started. Calling start on an active delay will reset the timer.
     *
     * @struct
     * @extends {goog.Disposable}
     */
    class ConditionalDelay extends __ConditionalDelay {}
    abstract class __ConditionalDelay extends goog.__Disposable {
        /**
         * @param {function():boolean} listener Function to call when the delay
         *     completes. Should return a value that type-converts to `true` if
         *     the call succeeded and this delay should be stopped.
         * @param {Object=} opt_handler The object scope to invoke the function in.
         */
        constructor(listener: () => boolean, opt_handler?: Object);

        /**
         * The delay interval in milliseconds to between the calls to the callback.
         * Note, that the callback may be invoked earlier than this interval if the
         * timeout is exceeded.
         * @private {number}
         */
        private interval_: number;

        /**
         * The timeout timestamp until which the delay is to be executed.
         * A negative value means no timeout.
         * @private {number}
         */
        private runUntil_: number;

        /**
         * True if the listener has been executed, and it returned `true`.
         * @private {boolean}
         */
        private isDone_: boolean;

        /**
         * The function that will be invoked after a delay.
         * @private {function():boolean}
         */
        private listener_: () => boolean;

        /**
         * The object context to invoke the callback in.
         * @private {Object|undefined}
         */
        private handler_: object|null|undefined;

        /**
         * The underlying goog.async.Delay delegate object.
         * @private {goog.async.Delay}
         */
        private delay_: goog.async.Delay<any>;

        /**
         * Starts the delay timer. The provided listener function will be called
         * repeatedly after the specified interval until the function returns
         * `true` or the timeout is exceeded. Calling start on an active timer
         * will stop the timer first.
         * @param {number=} opt_interval The time interval between the function
         *     invocations (in milliseconds). Default is 0.
         * @param {number=} opt_timeout The timeout interval (in milliseconds). Takes
         *     precedence over the `opt_interval`, i.e. if the timeout is less
         *     than the invocation interval, the function will be called when the
         *     timeout is exceeded. A negative value means no timeout. Default is 0.
         */
        start(opt_interval?: number, opt_timeout?: number): void;

        /**
         * Stops the delay timer if it is active. No action is taken if the timer is not
         * in use.
         */
        stop(): void;

        /**
         * @return {boolean} True if the delay is currently active, false otherwise.
         */
        isActive(): boolean;

        /**
         * @return {boolean} True if the listener has been executed and returned
         *     `true` since the last call to {@see #start}.
         */
        isDone(): boolean;

        /**
         * Called when the listener has been successfully executed and returned
         * `true`. The {@see #isDone} method should return `true` by now.
         * Designed for inheritance, should be overridden by subclasses or on the
         * instances if they care.
         */
        onSuccess(): void;

        /**
         * Called when this delayed call is cancelled because the timeout has been
         * exceeded, and the listener has never returned `true`.
         * Designed for inheritance, should be overridden by subclasses or on the
         * instances if they care.
         */
        onFailure(): void;

        /**
         * A callback function for the underlying `goog.async.Delay` object. When
         * executed the listener function is called, and if it returns `true`
         * the delay is stopped and the {@see #onSuccess} method is invoked.
         * If the timeout is exceeded the delay is stopped and the
         * {@see #onFailure} method is called.
         * @private
         */
        private onTick_(): void;
    }
}
