/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/events.d.ts"/>

declare module 'goog:goog.net.IframeLoadMonitor' {
    import alias = goog.net.IframeLoadMonitor;
    export default alias;
}

declare namespace goog.net {
    /**
     * The correct way to determine whether a same-domain iframe has completed
     * loading is different in IE and Firefox.  This class abstracts above these
     * differences, providing a consistent interface for:
     * <ol>
     * <li> Determing if an iframe is currently loaded
     * <li> Listening for an iframe that is not currently loaded, to finish loading
     * </ol>
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class IframeLoadMonitor extends __IframeLoadMonitor {}
    abstract class __IframeLoadMonitor extends goog.events.__EventTarget {
        /**
         * @param {HTMLIFrameElement} iframe An iframe.
         * @param {boolean=} opt_hasContent Whether to wait for the loaded iframe to
         *     have content in its document body.
         */
        constructor(iframe: HTMLIFrameElement, opt_hasContent?: boolean);

        /**
         * Iframe whose load state is monitored by this IframeLoadMonitor
         * @type {HTMLIFrameElement}
         * @private
         */
        private iframe_: HTMLIFrameElement;

        /**
         * Whether to wait for the loaded iframe to have content in its document body.
         * @type {boolean}
         * @private
         */
        private hasContent_: boolean;

        /**
         * Whether or not the iframe is loaded.
         * @type {boolean}
         * @private
         */
        private isLoaded_: boolean;

        /**
         * Key for iframe load listener, or null if not currently listening on the
         * iframe for a load event.
         * @type {goog.events.Key}
         * @private
         */
        private onloadListenerKey_: goog.events.Key;

        /**
         * Returns whether or not the iframe is loaded.
         * @return {boolean} whether or not the iframe is loaded.
         */
        isLoaded(): boolean;

        /**
         * Stops the poll timer if this IframeLoadMonitor is currently polling.
         * @private
         */
        private maybeStopTimer_(): void;

        /**
         * Returns the iframe whose load state this IframeLoader monitors.
         * @return {HTMLIFrameElement} the iframe whose load state this IframeLoader
         *     monitors.
         */
        getIframe(): HTMLIFrameElement;

        /**
         * Returns whether or not the iframe is loaded.  Determines this by inspecting
         * browser dependent properties of the iframe.
         * @return {boolean} whether or not the iframe is loaded.
         * @private
         */
        private isLoadedHelper_(): boolean;

        /**
         * Handles an event indicating that the loading status of the iframe has
         * changed.  In Firefox this is a goog.events.EventType.LOAD event, in IE
         * this is a goog.events.EventType.READYSTATECHANGED
         * @private
         */
        private handleLoad_(): void;
    }
}

declare namespace goog.net.IframeLoadMonitor {
    /**
     * Event type dispatched by a goog.net.IframeLoadMonitor when it internal iframe
     * finishes loading for the first time after construction of the
     * goog.net.IframeLoadMonitor
     * @type {string}
     */
    let LOAD_EVENT: string;
}
