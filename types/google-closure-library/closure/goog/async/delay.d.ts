/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.async.Delay' {
    import alias = goog.async.Delay;
    export default alias;
}

declare module 'goog:goog.Delay' {
    import alias = goog.Delay;
    export default alias;
}

declare namespace goog.async {
    /**
     * A Delay object invokes the associated function after a specified delay. The
     * interval duration can be specified once in the constructor, or can be defined
     * each time the delay is started. Calling start on an active delay will reset
     * the timer.
     *
     * @template THIS
     * @struct
     * @extends {goog.Disposable}
     * @final
     */
    class Delay<THIS> extends __Delay<THIS> {}
    abstract class __Delay<THIS> extends goog.__Disposable {
        /**
         * @param {function(this:THIS)} listener Function to call when the
         *     delay completes.
         * @param {number=} opt_interval The default length of the invocation delay (in
         *     milliseconds).
         * @param {THIS=} opt_handler The object scope to invoke the function in.
         */
        constructor(listener: (this: THIS) => void, opt_interval?: number, opt_handler?: THIS);

        /**
         * The function that will be invoked after a delay.
         * @private {function(this:THIS)}
         */
        private listener_: any /*missing*/;

        /**
         * The default amount of time to delay before invoking the callback.
         * @type {number}
         * @private
         */
        private interval_: number;

        /**
         * The object context to invoke the callback in.
         * @type {Object|undefined}
         * @private
         */
        private handler_: Object|undefined;

        /**
         * Cached callback function invoked when the delay finishes.
         * @type {Function}
         * @private
         */
        private callback_: Function;

        /**
         * Identifier of the active delay timeout, or 0 when inactive.
         * @type {number}
         * @private
         */
        private id_: number;

        /**
         * Starts the delay timer. The provided listener function will be called after
         * the specified interval. Calling start on an active timer will reset the
         * delay interval.
         * @param {number=} opt_interval If specified, overrides the object's default
         *     interval with this one (in milliseconds).
         */
        start(opt_interval?: number): void;

        /**
         * Starts the delay timer if it's not already active.
         * @param {number=} opt_interval If specified and the timer is not already
         *     active, overrides the object's default interval with this one (in
         *     milliseconds).
         */
        startIfNotActive(opt_interval?: number): void;

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
    }
}

declare namespace goog {
    /**
     * A deprecated alias.
     * @deprecated Use goog.async.Delay instead.
     * @final
     */
    class Delay extends __Delay {}
    abstract class __Delay {
        /**
         */
        constructor();
    }
}
