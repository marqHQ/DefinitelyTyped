/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.async.AnimationDelay' {
    import alias = goog.async.AnimationDelay;
    export default alias;
}

declare namespace goog.async {
    /**
     * A delayed callback that pegs to the next animation frame
     * instead of a user configurable timeout. By design, this should have
     * the same interface as goog.async.Delay.
     *
     * Uses requestAnimationFrame and friends when available, but falls
     * back to a timeout of goog.async.AnimationDelay.TIMEOUT.
     *
     * For more on requestAnimationFrame and how you can use it to create smoother
     * animations, see:
     * @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     *
     * @template THIS
     * @struct
     * @extends {goog.Disposable}
     * @final
     */
    class AnimationDelay<THIS> extends __AnimationDelay<THIS> {}
    abstract class __AnimationDelay<THIS> extends goog.__Disposable {
        /**
         * @param {function(this:THIS, number)} listener Function to call
         *     when the delay completes. Will be passed the timestamp when it's called,
         *     in unix ms.
         * @param {Window=} opt_window The window object to execute the delay in.
         *     Defaults to the global object.
         * @param {THIS=} opt_handler The object scope to invoke the function in.
         */
        constructor(listener: (this: THIS, _0: number) => void, opt_window?: Window, opt_handler?: THIS);

        /**
         * Identifier of the active delay timeout, or event listener,
         * or null when inactive.
         * @private {goog.events.Key|number}
         */
        private id_: any /*missing*/;

        /**
         * If we're using dom listeners.
         * @private {?boolean}
         */
        private usingListeners_: any /*missing*/;

        /**
         * The function that will be invoked after a delay.
         * @const
         * @private
         */
        private readonly listener_: any /*missing*/;

        /**
         * The object context to invoke the callback in.
         * @const
         * @private {(THIS|undefined)}
         */
        private readonly handler_: any /*missing*/;

        /**
         * @private {Window}
         */
        private win_: any /*missing*/;

        /**
         * Cached callback function invoked when the delay finishes.
         * @private {function()}
         */
        private callback_: any /*missing*/;

        /**
         * Starts the delay timer. The provided listener function will be called
         * before the next animation frame.
         */
        start(): void;

        /**
         * Starts the delay timer if it's not already active.
         */
        startIfNotActive(): void;

        /**
         * Stops the delay timer if it is active. No action is taken if the timer is not
         * in use.
         */
        stop(): void;

        /**
         * Fires delay's action even if timer has already gone off or has not been
         * started yet; guarantees action firing. Stops the delay timer.
         */
        fire(): void;

        /**
         * Fires delay's action only if timer is currently active. Stops the delay
         * timer.
         */
        fireIfActive(): void;

        /**
         * @return {boolean} True if the delay is currently active, false otherwise.
         */
        isActive(): boolean;

        /**
         * Invokes the callback function after the delay successfully completes.
         * @private
         */
        private doAction_(): void;

        /**
         * @return {?function(function(number)): number} The requestAnimationFrame
         *     function, or null if not available on this browser.
         * @private
         */
        private getRaf_(): ((_0: (_0: number) => void) => number)|null;

        /**
         * @return {?function(number): undefined} The cancelAnimationFrame function,
         *     or null if not available on this browser.
         * @private
         */
        private getCancelRaf_(): ((_0: number) => undefined)|null;
    }
}

declare namespace goog.async.AnimationDelay {
    /**
     * Default wait timeout for animations (in milliseconds).  Only used for timed
     * animation, which uses a timer (setTimeout) to schedule animation.
     *
     * @type {number}
     * @const
     */
    const TIMEOUT: number;
}
