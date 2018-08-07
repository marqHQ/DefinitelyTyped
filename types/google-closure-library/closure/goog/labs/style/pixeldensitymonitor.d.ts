/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare module 'goog:goog.labs.style.PixelDensityMonitor' {
    import alias = goog.labs.style.PixelDensityMonitor;
    export default alias;
}

declare module 'goog:goog.labs.style.PixelDensityMonitor.EventType' {
    import alias = goog.labs.style.PixelDensityMonitor.EventType;
    export default alias;
}

declare module 'goog:goog.labs.style.PixelDensityMonitor.Density' {
    import alias = goog.labs.style.PixelDensityMonitor.Density;
    export default alias;
}

declare namespace goog.labs.style {
    /**
     * Monitors the window for changes to the ratio between device and screen
     * pixels, e.g. when the user moves the window from a high density screen to a
     * screen with normal density. Dispatches
     * goog.labs.style.PixelDensityMonitor.EventType.CHANGE events when the density
     * changes between the two predefined values NORMAL and HIGH.
     *
     * This class uses the window.devicePixelRatio value which is supported in
     * WebKit and FF18. If the value does not exist, it will always return a
     * NORMAL density. It requires support for MediaQueryList to detect changes to
     * the devicePixelRatio.
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class PixelDensityMonitor extends __PixelDensityMonitor {}
    abstract class __PixelDensityMonitor extends goog.events.__EventTarget {
        /**
         * @param {!goog.dom.DomHelper=} opt_domHelper The DomHelper which contains the
         *     document associated with the window to listen to. Defaults to the one in
         *     which this code is executing.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * @type {Window}
         * @private
         */
        private window_: Window;

        /**
         * The last density that was reported so that changes can be detected.
         * @type {goog.labs.style.PixelDensityMonitor.Density}
         * @private
         */
        private lastDensity_: goog.labs.style.PixelDensityMonitor.Density;

        /**
         * @type {function (MediaQueryList)}
         * @private
         */
        private listener_: (_0: MediaQueryList) => void;

        /**
         * The media query list for a query that detects high density, if supported
         * by the browser. Because matchMedia returns a new object for every call, it
         * needs to be saved here so the listener can be removed when disposing.
         * @type {?MediaQueryList}
         * @private
         */
        private mediaQueryList_: MediaQueryList|null;

        /**
         * Starts monitoring for changes in pixel density.
         */
        start(): void;

        /**
         * @return {goog.labs.style.PixelDensityMonitor.Density} The density for the
         *     window.
         */
        getDensity(): goog.labs.style.PixelDensityMonitor.Density;

        /**
         * Handles a change to the media query and checks whether the density has
         * changed since the last call.
         * @param {MediaQueryList} mql The list of changed media queries.
         * @private
         */
        private handleMediaQueryChange_(mql: MediaQueryList): void;
    }
}

declare namespace goog.labs.style.PixelDensityMonitor {
    /**
     * The two different pixel density modes on which the various ratios between
     * physical and device pixels are mapped.
     * @enum {number}
     */
    enum Density { NORMAL, HIGH }

    /**
     * The events fired by the PixelDensityMonitor.
     * @enum {string}
     */
    enum EventType { CHANGE }
}
