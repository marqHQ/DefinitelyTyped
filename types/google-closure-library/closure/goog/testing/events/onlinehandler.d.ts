/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="../../net/networkstatusmonitor.d.ts"/>

declare namespace goog.testing.events {
    /**
     * NetworkStatusMonitor test double.
     * @extends {goog.events.EventTarget}
     * @implements {goog.net.NetworkStatusMonitor}
     * @final
     */
    class OnlineHandler extends __OnlineHandler {}
    abstract class __OnlineHandler extends goog.events.__EventTarget implements goog.net.NetworkStatusMonitor {
        /**
         * @param {boolean} initialState The initial online state of the mock.
         */
        constructor(initialState: boolean);

        /**
         * Whether the mock is online.
         * @private {boolean}
         */
        private online_: any /*missing*/;

        /**
         * Sets the online state.
         * @param {boolean} newOnlineState The new online state.
         */
        setOnline(newOnlineState: boolean): void;

        /**
         * @return {boolean} Whether the system is online or otherwise.
         */
        isOnline(): boolean;
    }
}
