/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.async.Debouncer' {
    import alias = goog.async.Debouncer;
    export default alias;
}

declare namespace goog.async {
    /**
     * Debouncer will perform a specified action exactly once for any sequence of
     * signals fired repeatedly so long as they are fired less than a specified
     * interval apart (in milliseconds). Whether it receives one signal or multiple,
     * it will always wait until a full interval has elapsed since the last signal
     * before performing the action.
     * @struct
     * @extends {goog.Disposable}
     * @final
     * @template T
     */
    class Debouncer<T> extends __Debouncer<T> {}
    abstract class __Debouncer<T> extends goog.__Disposable {
        /**
         * @param {function(this: T, ...?)} listener Function to callback when the
         *     action is triggered.
         * @param {number} interval Interval over which to debounce. The listener will
         *     only be called after the full interval has elapsed since the last signal.
         * @param {T=} opt_handler Object in whose scope to call the listener.
         */
        constructor(listener: (this: T, ...args: any[]) => void, interval: number, opt_handler?: T);

        /**
         * Function to callback
         * @const @private {function(this: T, ...?)}
         */
        private readonly listener_: (this: T, ...args: any[]) => void;

        /**
         * Interval for the debounce time
         * @const @private {number}
         */
        private readonly interval_: number;

        /**
         * Cached callback function invoked after the debounce timeout completes
         * @const @private {!Function}
         */
        private readonly callback_: Function|null;

        /**
         * Indicates that the action is pending and needs to be fired.
         * @private {boolean}
         */
        private shouldFire_: boolean;

        /**
         * Indicates the count of nested pauses currently in effect on the debouncer.
         * When this count is not zero, fired actions will be postponed until the
         * debouncer is resumed enough times to drop the pause count to zero.
         * @private {number}
         */
        private pauseCount_: number;

        /**
         * Timer for scheduling the next callback
         * @private {?number}
         */
        private timer_: number|null;

        /**
         * When set this is a timestamp. On the onfire we want to reschedule the
         * callback so it ends up at this time.
         * @private {?number}
         */
        private refireAt_: number|null;

        /**
         * The last arguments passed into `fire`.
         * @private {!IArrayLike}
         */
        private args_: IArrayLike<any>;

        /**
         * Notifies the debouncer that the action has happened. It will debounce the
         * call so that the callback is only called after the last action in a sequence
         * of actions separated by periods less the interval parameter passed to the
         * constructor, passing the arguments from the last call of this function into
         * the debounced function.
         * @param {...?} var_args Arguments to pass on to the debounced function.
         */
        fire(...var_args: any[]): void;

        /**
         * Cancels any pending action callback. The debouncer can be restarted by
         * calling {@link #fire}.
         */
        stop(): void;

        /**
         * Pauses the debouncer. All pending and future action callbacks will be delayed
         * until the debouncer is resumed. Pauses can be nested.
         */
        pause(): void;

        /**
         * Resumes the debouncer. If doing so drops the pausing count to zero, pending
         * action callbacks will be executed as soon as possible, but still no sooner
         * than an interval's delay after the previous call. Future action callbacks
         * will be executed as normal.
         */
        resume(): void;

        /**
         * Handler for the timer to fire the debouncer.
         * @private
         */
        private onTimer_(): void;

        /**
         * Calls the callback.
         * @private
         */
        private doAction_(): void;
    }
}
