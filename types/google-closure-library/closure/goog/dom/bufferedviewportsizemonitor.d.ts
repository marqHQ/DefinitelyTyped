/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./viewportsizemonitor.d.ts"/>
/// <reference path="../math/size.d.ts"/>
/// <reference path="../events/events.d.ts"/>

declare module 'goog:goog.dom.BufferedViewportSizeMonitor' {
    import alias = goog.dom.BufferedViewportSizeMonitor;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Creates a new BufferedViewportSizeMonitor.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class BufferedViewportSizeMonitor extends __BufferedViewportSizeMonitor {}
    abstract class __BufferedViewportSizeMonitor extends goog.events.__EventTarget {
        /**
         * @param {!goog.dom.ViewportSizeMonitor} viewportSizeMonitor The
         *     underlying viewport size monitor.
         * @param {number=} opt_bufferMs The buffer time, in ms. If not specified, this
         *     value defaults to {@link #RESIZE_EVENT_DELAY_MS_}.
         */
        constructor(viewportSizeMonitor: goog.dom.ViewportSizeMonitor, opt_bufferMs?: number);

        /**
         * Delay for the resize event.
         * @private {goog.async.Delay}
         */
        private resizeDelay_: any /*missing*/;

        /**
         * The underlying viewport size monitor.
         * @type {goog.dom.ViewportSizeMonitor}
         * @private
         */
        private viewportSizeMonitor_: goog.dom.ViewportSizeMonitor;

        /**
         * The current size of the viewport.
         * @type {goog.math.Size}
         * @private
         */
        private currentSize_: goog.math.Size;

        /**
         * The resize buffer time in ms.
         * @type {number}
         * @private
         */
        private resizeBufferMs_: number;

        /**
         * Listener key for the viewport size monitor.
         * @type {goog.events.Key}
         * @private
         */
        private listenerKey_: goog.events.Key;

        /**
         * Handles resize events on the underlying ViewportMonitor.
         * @private
         */
        private handleResize_(): void;

        /**
         * Window resize callback that determines whether to reflow the view contents.
         * @private
         */
        private onWindowResize_(): void;

        /**
         * Returns the current size of the viewport.
         * @return {goog.math.Size?} The current viewport size.
         */
        getSize(): goog.math.Size|null;
    }
}

declare namespace goog.dom.BufferedViewportSizeMonitor {
    /**
     * Additional events to dispatch.
     * @enum {string}
     */
    enum EventType { RESIZE_HEIGHT, RESIZE_WIDTH }
}
