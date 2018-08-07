/// <reference path="../../../globals.d.ts"/>
/// <reference path="./activitymonitor.d.ts"/>
/// <reference path="../events/eventtype.d.ts"/>

declare module 'goog:goog.ui.MockActivityMonitor' {
    import alias = goog.ui.MockActivityMonitor;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A mock implementation of goog.ui.ActivityMonitor for unit testing. Clients
     * of this class should override goog.now to return a synthetic time from
     * the unit test.
     * @extends {goog.ui.ActivityMonitor}
     * @final
     */
    class MockActivityMonitor extends __MockActivityMonitor {}
    abstract class __MockActivityMonitor extends goog.ui.__ActivityMonitor {
        /**
         */
        constructor();

        /**
         * Tracks whether an event has been fired. Used by simulateEvent.
         * @type {boolean}
         * @private
         */
        private eventFired_: boolean;

        /**
         * Simulates an event that updates the user to being non-idle.
         * @param {goog.events.EventType=} opt_type The type of event that made the user
         *     not idle. If not specified, defaults to MOUSEMOVE.
         */
        simulateEvent(opt_type?: goog.events.EventType): void;
    }
}
