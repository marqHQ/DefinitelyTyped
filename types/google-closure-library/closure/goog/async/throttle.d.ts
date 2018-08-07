/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.async.Throttle' {
    import alias = goog.async.Throttle;
    export default alias;
}

declare module 'goog:goog.Throttle' {
    import alias = goog.Throttle;
    export default alias;
}

declare namespace goog.async {
    /**
     * Throttle will perform an action that is passed in no more than once
     * per interval (specified in milliseconds). If it gets multiple signals
     * to perform the action while it is waiting, it will only perform the action
     * once at the end of the interval.
     * @struct
     * @extends {goog.Disposable}
     * @final
     * @template T
     */
    class Throttle<T> extends __Throttle<T> {}
    abstract class __Throttle<T> extends goog.__Disposable {
        /**
         * @param {function(this: T, ...?)} listener Function to callback when the
         *     action is triggered.
         * @param {number} interval Interval over which to throttle. The listener can
         *     only be called once per interval.
         * @param {T=} opt_handler Object in whose scope to call the listener.
         */
        constructor(listener: (this: T, _0: any[]) => void, interval: number, opt_handler?: T);

        /**
         * Function to callback
         * @type {function(this: T, ...?)}
         * @private
         */
        private listener_: (this: T, _0: any[]) => void;

        /**
         * Interval for the throttle time
         * @type {number}
         * @private
         */
        private interval_: number;

        /**
         * Cached callback function invoked after the throttle timeout completes
         * @type {Function}
         * @private
         */
        private callback_: Function;

        /**
         * The last arguments passed into `fire`.
         * @private {!IArrayLike}
         */
        private args_: any /*missing*/;

        /**
         * Indicates that the action is pending and needs to be fired.
         * @type {boolean}
         * @private
         */
        private shouldFire_: boolean;

        /**
         * Indicates the count of nested pauses currently in effect on the throttle.
         * When this count is not zero, fired actions will be postponed until the
         * throttle is resumed enough times to drop the pause count to zero.
         * @type {number}
         * @private
         */
        private pauseCount_: number;

        /**
         * Timer for scheduling the next callback
         * @type {?number}
         * @private
         */
        private timer_: number|null;

        /**
         * Notifies the throttle that the action has happened. It will throttle the call
         * so that the callback is not called too often according to the interval
         * parameter passed to the constructor, passing the arguments from the last call
         * of this function into the throttled function.
         * @param {...?} var_args Arguments to pass on to the throttled function.
         */
        fire(...var_args: any[]): void;

        /**
         * Cancels any pending action callback. The throttle can be restarted by
         * calling {@link #fire}.
         */
        stop(): void;

        /**
         * Pauses the throttle.  All pending and future action callbacks will be
         * delayed until the throttle is resumed.  Pauses can be nested.
         */
        pause(): void;

        /**
         * Resumes the throttle.  If doing so drops the pausing count to zero, pending
         * action callbacks will be executed as soon as possible, but still no sooner
         * than an interval's delay after the previous call.  Future action callbacks
         * will be executed as normal.
         */
        resume(): void;

        /**
         * Handler for the timer to fire the throttle
         * @private
         */
        private onTimer_(): void;

        /**
         * Calls the callback
         * @private
         */
        private doAction_(): void;
    }
}

declare namespace goog {
    /**
     * A deprecated alias.
     * @deprecated Use goog.async.Throttle instead.
     * @final
     */
    class Throttle extends __Throttle {}
    abstract class __Throttle {
        /**
         */
        constructor();
    }
}
