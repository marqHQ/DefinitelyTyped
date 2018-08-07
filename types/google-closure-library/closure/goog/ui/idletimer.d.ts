/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./activitymonitor.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.IdleTimer' {
    import alias = goog.ui.IdleTimer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Event target that will give notification of state changes between active and
     * idle. This class is designed to require few resources while the user is
     * active.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class IdleTimer extends __IdleTimer {}
    abstract class __IdleTimer extends goog.events.__EventTarget {
        /**
         * @param {number} idleThreshold Amount of time in ms at which we consider the
         *     user has gone idle.
         * @param {goog.ui.ActivityMonitor=} opt_activityMonitor The activity monitor
         *     keeping track of user interaction. Defaults to a default-constructed
         *     activity monitor. If a default activity monitor is used then this class
         *     will dispose of it. If an activity monitor is passed in then the caller
         *     remains responsible for disposing of it.
         */
        constructor(idleThreshold: number, opt_activityMonitor?: goog.ui.ActivityMonitor);

        /**
         * The amount of time in ms at which we consider the user has gone idle
         * @type {number}
         * @private
         */
        private idleThreshold_: number;

        /**
         * The activity monitor keeping track of user interaction
         * @type {goog.ui.ActivityMonitor}
         * @private
         */
        private activityMonitor_: goog.ui.ActivityMonitor;

        /**
         * Cached onActivityTick_ bound to the object for later use
         * @type {Function}
         * @private
         */
        private boundOnActivityTick_: Function;

        /**
         * Whether a listener is currently registered for an idle timer event. On
         * initialization, the user is assumed to be active.
         * @type {boolean}
         * @private
         */
        private hasActivityListener_: boolean;

        /**
         * Handle to the timer ID used for checking ongoing activity, or null
         * @type {?number}
         * @private
         */
        private onActivityTimerId_: number|null;

        /**
         * Whether the user is currently idle
         * @type {boolean}
         * @private
         */
        private isIdle_: boolean;

        /**
         * Gets the default activity monitor used by this class. If a default has not
         * been created yet, then a new one will be created.
         * @return {!goog.ui.ActivityMonitor} The default activity monitor.
         * @private
         */
        private getDefaultActivityMonitor_(): goog.ui.ActivityMonitor;

        /**
         * Removes the reference to the default activity monitor. If there are no more
         * references then the default activity monitor gets disposed.
         * @private
         */
        private maybeDisposeDefaultActivityMonitor_(): void;

        /**
         * Checks whether the user is active. If the user is still active, then a timer
         * is started to check again later.
         * @private
         */
        private maybeStillActive_(): void;

        /**
         * Handler for the timeout used for checking ongoing activity
         * @private
         */
        private onActivityTick_(): void;

        /**
         * Transitions from the active state to the idle state
         * @private
         */
        private becomeIdle_(): void;

        /**
         * Handler for idle timer events when the user does something interactive
         * @param {goog.events.Event} e The event object.
         * @private
         */
        private onActivity_(e: goog.events.Event): void;

        /**
         * Transitions from the idle state to the active state
         * @private
         */
        private becomeActive_(): void;

        /**
         * Removes the activity listener, if necessary
         * @private
         */
        private removeActivityListener_(): void;

        /**
         * @return {number} the amount of time at which we consider the user has gone
         *     idle in ms.
         */
        getIdleThreshold(): number;

        /**
         * @return {goog.ui.ActivityMonitor} the activity monitor keeping track of user
         *     interaction.
         */
        getActivityMonitor(): goog.ui.ActivityMonitor;

        /**
         * Returns true if there has been no user action for at least the specified
         * interval, and false otherwise
         * @return {boolean} true if the user is idle, false otherwise.
         */
        isIdle(): boolean;
    }
}

declare namespace goog.ui.IdleTimer {
    /**
     * Event constants for the idle timer event target
     * @enum {string}
     */
    enum Event { BECOME_ACTIVE, BECOME_IDLE }
}
