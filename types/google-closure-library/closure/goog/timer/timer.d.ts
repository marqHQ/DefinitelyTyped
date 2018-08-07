/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../promise/thenable.d.ts"/>
/// <reference path="../promise/promise.d.ts"/>

declare module 'goog:goog.Timer' {
    import alias = goog.Timer;
    export default alias;
}

declare namespace goog {
    /**
     * Class for handling timing events.
     *
     * @extends {goog.events.EventTarget}
     */
    class Timer extends __Timer {}
    abstract class __Timer extends goog.events.__EventTarget {
        /**
         * @param {number=} opt_interval Number of ms between ticks (default: 1ms).
         * @param {Object=} opt_timerObject  An object that has `setTimeout`,
         *     `setInterval`, `clearTimeout` and `clearInterval`
         *     (e.g., `window`).
         */
        constructor(opt_interval?: number, opt_timerObject?: Object);

        /**
         * Number of ms between ticks
         * @private {number}
         */
        private interval_: any /*missing*/;

        /**
         * An object that implements `setTimeout`, `setInterval`,
         * `clearTimeout` and `clearInterval`. We default to the window
         * object. Changing this on {@link goog.Timer.prototype} changes the object
         * for all timer instances which can be useful if your environment has some
         * other implementation of timers than the `window` object.
         * @private {{setTimeout:!Function, clearTimeout:!Function}}
         */
        private timerObject_: any /*missing*/;

        /**
         * Cached `tick_` bound to the object for later use in the timer.
         * @private {Function}
         * @const
         */
        private readonly boundTick_: any /*missing*/;

        /**
         * Firefox browser often fires the timer event sooner (sometimes MUCH sooner)
         * than the requested timeout. So we compare the time to when the event was
         * last fired, and reschedule if appropriate. See also
         * {@link goog.Timer.intervalScale}.
         * @private {number}
         */
        private last_: any /*missing*/;

        /**
         * Whether this timer is enabled
         * @type {boolean}
         */
        enabled: boolean;

        /**
         * Variable for storing the result of `setInterval`.
         * @private {?number}
         */
        private timer_: any /*missing*/;

        /**
         * Gets the interval of the timer.
         * @return {number} interval Number of ms between ticks.
         */
        getInterval(): number;

        /**
         * Sets the interval of the timer.
         * @param {number} interval Number of ms between ticks.
         */
        setInterval(interval: number): void;

        /**
         * Callback for the `setTimeout` used by the timer.
         * @private
         */
        private tick_(): void;

        /**
         * Dispatches the TICK event. This is its own method so subclasses can override.
         */
        dispatchTick(): void;

        /**
         * Starts the timer.
         */
        start(): void;

        /**
         * Stops the timer.
         */
        stop(): void;
    }
}

declare namespace goog.Timer {
    /**
     * An object that implements `setTimeout`, `setInterval`,
     * `clearTimeout` and `clearInterval`. We default to the global
     * object. Changing `goog.Timer.defaultTimerObject` changes the object for
     * all timer instances which can be useful if your environment has some other
     * implementation of timers you'd like to use.
     * @type {{setTimeout, clearTimeout}}
     */
    let defaultTimerObject: {setTimeout: any /*missing*/; clearTimeout: any /*missing*/};

    /**
     * Variable that controls the timer error correction. If the timer is called
     * before the requested interval times `intervalScale`, which often
     * happens on Mozilla, the timer is rescheduled.
     * @see {@link #last_}
     * @type {number}
     */
    let intervalScale: number;

    /**
     * Constant for the timer's event type.
     * @const
     */
    const TICK: any /*missing*/;

    /**
     * Calls the given function once, after the optional pause.
     * <p>
     * The function is always called asynchronously, even if the delay is 0. This
     * is a common trick to schedule a function to run after a batch of browser
     * event processing.
     *
     * @param {function(this:SCOPE)|{handleEvent:function()}|null} listener Function
     *     or object that has a handleEvent method.
     * @param {number=} opt_delay Milliseconds to wait; default is 0.
     * @param {SCOPE=} opt_handler Object in whose scope to call the listener.
     * @return {number} A handle to the timer ID.
     * @template SCOPE
     */
    function callOnce<SCOPE>(
        listener: ((this: SCOPE) => void)|({handleEvent: () => void})|null, opt_delay?: number, opt_handler?: SCOPE
    ): number;

    /**
     * Clears a timeout initiated by {@link #callOnce}.
     * @param {?number} timerId A timer ID.
     */
    function clear(timerId: number|null): void;

    /**
     * @param {number} delay Milliseconds to wait.
     * @param {(RESULT|goog.Thenable<RESULT>|Thenable)=} opt_result The value
     *     with which the promise will be resolved.
     * @return {!goog.Promise<RESULT>} A promise that will be resolved after
     *     the specified delay, unless it is canceled first.
     * @template RESULT
     */
    function promise<RESULT>(delay: number, opt_result?: RESULT|IThenable<RESULT>): goog.Promise<RESULT>;
}
