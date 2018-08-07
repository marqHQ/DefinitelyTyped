/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./propertyreplacer.d.ts"/>
/// <reference path="../promise/thenable.d.ts"/>

declare module 'goog:goog.testing.MockClock' {
    import alias = goog.testing.MockClock;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Class for unit testing code that uses setTimeout and clearTimeout.
     *
     * NOTE: If you are using MockClock to test code that makes use of
     *       goog.fx.Animation, then you must either:
     *
     * 1. Install and dispose of the MockClock in setUpPage() and tearDownPage()
     *    respectively (rather than setUp()/tearDown()).
     *
     * or
     *
     * 2. Ensure that every test clears the animation queue by calling
     *    mockClock.tick(x) at the end of each test function (where `x` is large
     *    enough to complete all animations).
     *
     * Otherwise, if any animation is left pending at the time that
     * MockClock.dispose() is called, that will permanently prevent any future
     * animations from playing on the page.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class MockClock extends __MockClock {}
    abstract class __MockClock extends goog.__Disposable {
        /**
         * @param {boolean=} opt_autoInstall Install the MockClock at construction time.
         */
        constructor(opt_autoInstall?: boolean);

        /**
         * Reverse-order queue of timers to fire.
         *
         * The last item of the queue is popped off.  Insertion happens from the
         * right.  For example, the expiration times for each element of the queue
         * might be in the order 300, 200, 200.
         *
         * @type {Array<{
         *    timeoutKey: number, millis: number,
         *    runAtMillis: number, funcToCall: Function, recurring: boolean}>}
         * @private
         */
        private queue_:
            {timeoutKey: number; millis: number; runAtMillis: number; funcToCall: Function; recurring: boolean}[];

        /**
         * Set of timeouts that should be treated as cancelled.
         *
         * Rather than removing cancelled timers directly from the queue, this set
         * simply marks them as deleted so that they can be ignored when their
         * turn comes up.  The keys are the timeout keys that are cancelled, each
         * mapping to true.
         *
         * @private {Object<number, boolean>}
         */
        private deletedKeys_: any /*missing*/;

        /**
         * Count of the number of setTimeout/setInterval/etc. calls received by this
         * instance.
         * @type {number}
         * @private
         */
        private timeoutsMade_: number;

        /**
         * Count of the number of timeout/interval/etc. callbacks triggered by this
         * instance.
         * @type {number}
         * @private
         */
        private callbacksTriggered_: number;

        /**
         * PropertyReplacer instance which overwrites and resets setTimeout,
         * setInterval, etc. or null if the MockClock is not installed.
         * @type {goog.testing.PropertyReplacer}
         * @private
         */
        private replacer_: goog.testing.PropertyReplacer;

        /**
         * The current simulated time in milliseconds.
         * @type {number}
         * @private
         */
        private nowMillis_: number;

        /**
         * Additional delay between the time a timeout was set to fire, and the time
         * it actually fires.  Useful for testing workarounds for this Firefox 2 bug:
         * https://bugzilla.mozilla.org/show_bug.cgi?id=291386
         * May be negative.
         * @type {number}
         * @private
         */
        private timeoutDelay_: number;

        /**
         * Installs the MockClock by overriding the global object's implementation of
         * setTimeout, setInterval, clearTimeout and clearInterval.
         */
        install(): void;

        /**
         * Installs the mocks for requestAnimationFrame and cancelRequestAnimationFrame.
         * @private
         */
        private replaceRequestAnimationFrame_(): void;

        /**
         * Removes the MockClock's hooks into the global object's functions and revert
         * to their original values.
         */
        uninstall(): void;

        /**
         * Resets the MockClock, removing all timeouts that are scheduled and resets
         * the fake timer count.
         */
        reset(): void;

        /**
         * Resets the async queue when this clock resets.
         * @private
         */
        private resetAsyncQueue_(): void;

        /**
         * Sets the amount of time between when a timeout is scheduled to fire and when
         * it actually fires.
         * @param {number} delay The delay in milliseconds.  May be negative.
         */
        setTimeoutDelay(delay: number): void;

        /**
         * @return {number} delay The amount of time between when a timeout is
         *     scheduled to fire and when it actually fires, in milliseconds.  May
         *     be negative.
         */
        getTimeoutDelay(): number;

        /**
         * Increments the MockClock's time by a given number of milliseconds, running
         * any functions that are now overdue.
         * @param {number=} opt_millis Number of milliseconds to increment the counter.
         *     If not specified, clock ticks 1 millisecond.
         * @return {number} Current mock time in milliseconds.
         */
        tick(opt_millis?: number): number;

        /**
         * Takes a promise and then ticks the mock clock. If the promise successfully
         * resolves, returns the value produced by the promise. If the promise is
         * rejected, it throws the rejection as an exception. If the promise is not
         * resolved at all, throws an exception.
         * Also ticks the general clock by the specified amount.
         * Only works with goog.Thenable, hence goog.Promise. Does NOT work with native
         * browser promises.
         *
         * @param {!goog.Thenable<T>} promise A promise that should be resolved after
         *     the mockClock is ticked for the given opt_millis.
         * @param {number=} opt_millis Number of milliseconds to increment the counter.
         *     If not specified, clock ticks 1 millisecond.
         * @return {T}
         * @template T
         */
        tickPromise<T>(promise: goog.Thenable<T>, opt_millis?: number): T;

        /**
         * @return {number} The number of timeouts or intervals that have been
         * scheduled. A setInterval call is only counted once.
         */
        getTimeoutsMade(): number;

        /**
         * @return {number} The number of timeout or interval callbacks that have been
         * triggered. For setInterval, each callback is counted separately.
         */
        getCallbacksTriggered(): number;

        /**
         * @return {number} The MockClock's current time in milliseconds.
         */
        getCurrentTime(): number;

        /**
         * @param {number} timeoutKey The timeout key.
         * @return {boolean} Whether the timer has been set and not cleared,
         *     independent of the timeout's expiration.  In other words, the timeout
         *     could have passed or could be scheduled for the future.  Either way,
         *     this function returns true or false depending only on whether the
         *     provided timeoutKey represents a timeout that has been set and not
         *     cleared.
         */
        isTimeoutSet(timeoutKey: number): boolean;

        /**
         * Runs any function that is scheduled before a certain time.  Timeouts can
         * be made to fire early or late if timeoutDelay_ is non-0.
         * @param {number} endTime The latest time in the range, in milliseconds.
         * @private
         */
        private runFunctionsWithinRange_(endTime: number): void;

        /**
         * Schedules a function to be run at a certain time.
         * @param {number} timeoutKey The timeout key.
         * @param {Function} funcToCall The function to call.
         * @param {number} millis The number of milliseconds to call it in.
         * @param {boolean} recurring Whether to function call should recur.
         * @private
         */
        private scheduleFunction_(timeoutKey: number, funcToCall: Function, millis: number, recurring: boolean): void;

        /**
         * Schedules a function to be called after `millis` milliseconds.
         * Mock implementation for setTimeout.
         * @param {Function} funcToCall The function to call.
         * @param {number=} opt_millis The number of milliseconds to call it after.
         * @return {number} The number of timeouts created.
         * @private
         */
        private setTimeout_(funcToCall: Function, opt_millis?: number): number;

        /**
         * Schedules a function to be called every `millis` milliseconds.
         * Mock implementation for setInterval.
         * @param {Function} funcToCall The function to call.
         * @param {number=} opt_millis The number of milliseconds between calls.
         * @return {number} The number of timeouts created.
         * @private
         */
        private setInterval_(funcToCall: Function, opt_millis?: number): number;

        /**
         * Schedules a function to be called when an animation frame is triggered.
         * Mock implementation for requestAnimationFrame.
         * @param {Function} funcToCall The function to call.
         * @return {number} The number of timeouts created.
         * @private
         */
        private requestAnimationFrame_(funcToCall: Function): number;

        /**
         * Schedules a function to be called immediately after the current JS
         * execution.
         * Mock implementation for setImmediate.
         * @param {Function} funcToCall The function to call.
         * @return {number} The number of timeouts created.
         * @private
         */
        private setImmediate_(funcToCall: Function): number;

        /**
         * Clears a timeout.
         * Mock implementation for clearTimeout.
         * @param {number} timeoutKey The timeout key to clear.
         * @private
         */
        private clearTimeout_(timeoutKey: number): void;

        /**
         * Clears an interval.
         * Mock implementation for clearInterval.
         * @param {number} timeoutKey The interval key to clear.
         * @private
         */
        private clearInterval_(timeoutKey: number): void;

        /**
         * Clears a requestAnimationFrame.
         * Mock implementation for cancelRequestAnimationFrame.
         * @param {number} timeoutKey The requestAnimationFrame key to clear.
         * @private
         */
        private cancelRequestAnimationFrame_(timeoutKey: number): void;
    }
}

declare namespace goog.testing.MockClock {
    /**
     * Default wait timeout for mocking requestAnimationFrame (in milliseconds).
     *
     * @type {number}
     * @const
     */
    const REQUEST_ANIMATION_FRAME_TIMEOUT: number;

    /**
     * ID to use for next timeout.  Timeout IDs must never be reused, even across
     * MockClock instances.
     * @public {number}
     */
    let nextId: any /*missing*/;

    /**
     * The real set timeout for reference.
     * @const @private {!Function}
     */
    const REAL_SETTIMEOUT_: any /*missing*/;
}
