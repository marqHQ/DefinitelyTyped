/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="../net/networkstatusmonitor.d.ts"/>
/// <reference path="../timer/timer.d.ts"/>

declare module 'goog:goog.events.OnlineHandler' {
    import alias = goog.events.OnlineHandler;
    export default alias;
}

declare module 'goog:goog.events.OnlineHandler.EventType' {
    import alias = goog.events.OnlineHandler.EventType;
    export default alias;
}

declare namespace goog.events {
    /**
     * Basic object for detecting whether the online state changes.
     * @extends {goog.events.EventTarget}
     * @implements {goog.net.NetworkStatusMonitor}
     */
    class OnlineHandler extends __OnlineHandler {}
    abstract class __OnlineHandler extends goog.events.__EventTarget implements goog.net.NetworkStatusMonitor {
        /**
         */
        constructor();

        /**
         * @private {goog.events.EventHandler<!goog.events.OnlineHandler>}
         */
        private eventHandler_: any /*missing*/;

        /**
         * Stores the last value of the online state so we can detect if this has
         * changed.
         * @type {boolean}
         * @private
         */
        private online_: boolean;

        /**
         * The timer object used to poll the online state.
         * @type {goog.Timer}
         * @private
         */
        private timer_: goog.Timer;

        /**
         * Called every time the timer ticks to see if the state has changed and when
         * the online state changes the method handleChange_ is called.
         * @private
         */
        private handleTick_(): void;

        /**
         * Called when the online state changes.  This dispatches the
         * `ONLINE` and `OFFLINE` events respectively.
         * @private
         */
        private handleChange_(): void;

        /**
         * @return {boolean} Whether the system is online or otherwise.
         */
        isOnline(): boolean;
    }
}

declare namespace goog.events.OnlineHandler {
    /**
     * Enum for the events dispatched by the OnlineHandler.
     * @enum {string}
     * @deprecated Use goog.net.NetworkStatusMonitor.EventType instead.
     */
    enum EventType { ONLINE, OFFLINE }
}
