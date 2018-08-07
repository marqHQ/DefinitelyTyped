/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./dom.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.dom.FontSizeMonitor' {
    import alias = goog.dom.FontSizeMonitor;
    export default alias;
}

declare module 'goog:goog.dom.FontSizeMonitor.EventType' {
    import alias = goog.dom.FontSizeMonitor.EventType;
    export default alias;
}

declare namespace goog.dom {
    /**
     * This class can be used to monitor changes in font size.  Instances will
     * dispatch a `goog.dom.FontSizeMonitor.EventType.CHANGE` event.
     * Example usage:
     * <pre>
     * var fms = new goog.dom.FontSizeMonitor();
     * goog.events.listen(fms, goog.dom.FontSizeMonitor.EventType.CHANGE,
     *     function(e) {
     *       alert('Font size was changed');
     *     });
     * </pre>
     * @extends {goog.events.EventTarget}
     * @final
     */
    class FontSizeMonitor extends __FontSizeMonitor {}
    abstract class __FontSizeMonitor extends goog.events.__EventTarget {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper DOM helper object that is used to
         *     determine where to insert the DOM nodes used to determine when the font
         *     size changes.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * Offscreen iframe which we use to detect resize events.
         * @type {HTMLElement}
         * @private
         */
        private sizeElement_: HTMLElement;

        /**
         * Last measured width of the iframe element.
         * @type {number}
         * @private
         */
        private lastWidth_: number;

        /**
         * Handles the onresize event of the iframe and dispatches a change event in
         * case its size really changed.
         * @param {goog.events.BrowserEvent} e The event object.
         * @private
         */
        private handleResize_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.dom.FontSizeMonitor {
    /**
     * The event types that the FontSizeMonitor fires.
     * @enum {string}
     */
    enum EventType { CHANGE }

    /**
     * Constant for the change event.
     * @type {string}
     * @deprecated Use `goog.dom.FontSizeMonitor.EventType.CHANGE` instead.
     */
    let CHANGE_EVENT: string;
}
