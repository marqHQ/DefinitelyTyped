/// <reference path="../../../globals.d.ts"/>
/// <reference path="./iframeloadmonitor.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.net.MultiIframeLoadMonitor' {
    import alias = goog.net.MultiIframeLoadMonitor;
    export default alias;
}

declare namespace goog.net {
    /**
     * Provides a wrapper around IframeLoadMonitor, to allow the caller to wait for
     * multiple iframes to load.
     *
     * @final
     */
    class MultiIframeLoadMonitor extends __MultiIframeLoadMonitor {}
    abstract class __MultiIframeLoadMonitor {
        /**
         * @param {Array<HTMLIFrameElement>} iframes Array of iframe elements to
         *     wait until they are loaded.
         * @param {function():void} callback The callback to invoke once the frames have
         *     loaded.
         * @param {boolean=} opt_hasContent true if the monitor should wait until the
         *     iframes have content (body.firstChild != null).
         */
        constructor(iframes: HTMLIFrameElement[], callback: () => void, opt_hasContent?: boolean);

        /**
         * Array of IframeLoadMonitors we use to track the loaded status of any
         * currently unloaded iframes.
         * @type {Array<goog.net.IframeLoadMonitor>}
         * @private
         */
        private pendingIframeLoadMonitors_: goog.net.IframeLoadMonitor[];

        /**
         * Callback which is invoked when all of the iframes are loaded.
         * @type {function():void}
         * @private
         */
        private callback_: () => void;

        /**
         * Handles a pending iframe load monitor load event.
         * @param {goog.events.Event} e The goog.net.IframeLoadMonitor.LOAD_EVENT event.
         */
        handleEvent(e: goog.events.Event): void;

        /**
         * Stops monitoring the iframes, cleaning up any associated resources. In
         * general, the object cleans up its own resources before invoking the
         * callback, so this API should only be used if the caller wants to stop the
         * monitoring before the iframes are loaded (for example, if the caller is
         * implementing a timeout).
         */
        stopMonitoring(): void;
    }
}
