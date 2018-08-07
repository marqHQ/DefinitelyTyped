/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/browserevent.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.labs.dom.PageVisibilityState' {
    import alias = goog.labs.dom.PageVisibilityState;
    export default alias;
}

declare module 'goog:goog.labs.dom.PageVisibilityMonitor' {
    import alias = goog.labs.dom.PageVisibilityMonitor;
    export default alias;
}

declare module 'goog:goog.labs.dom.PageVisibilityEvent' {
    import alias = goog.labs.dom.PageVisibilityEvent;
    export default alias;
}

declare namespace goog.labs.dom {
    /**
     * This event handler allows you to catch page visibility change events.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class PageVisibilityMonitor extends __PageVisibilityMonitor {}
    abstract class __PageVisibilityMonitor extends goog.events.__EventTarget {
        /**
         * @param {!goog.dom.DomHelper=} opt_domHelper
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * @private {!goog.dom.DomHelper}
         */
        private domHelper_: any /*missing*/;

        /**
         * @private {?string}
         */
        private eventType_: any /*missing*/;

        /**
         * @private {goog.events.Key}
         */
        private eventKey_: any /*missing*/;

        /**
         * @return {?string} The visibility change event type, or null if not supported.
         *     Memoized for performance.
         * @private
         */
        private getBrowserEventType_(): string|null;

        /**
         * @return {?string} The browser-specific document.hidden property.  Memoized
         *     for performance.
         * @private
         */
        private getHiddenPropertyName_(): string|null;

        /**
         * @return {boolean} Whether the visibility API is prefixed.
         * @private
         */
        private isPrefixed_(): boolean;

        /**
         * @return {?string} The browser-specific document.visibilityState property.
         *     Memoized for performance.
         * @private
         */
        private getVisibilityStatePropertyName_(): string|null;

        /**
         * @return {boolean} Whether the visibility API is supported.
         */
        isSupported(): boolean;

        /**
         * @return {boolean} Whether the page is visible.
         */
        isHidden(): boolean;

        /**
         * @return {?goog.labs.dom.PageVisibilityState} The page visibility state, or
         *     null if not supported.
         */
        getVisibilityState(): goog.labs.dom.PageVisibilityState|null;

        /**
         * Handles the events on the element.
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         * @private
         */
        private handleChange_(e: goog.events.BrowserEvent): void;
    }

    /**
     * A page visibility change event.
     * @extends {goog.events.Event}
     * @final
     */
    class PageVisibilityEvent extends __PageVisibilityEvent {}
    abstract class __PageVisibilityEvent extends goog.events.__Event {
        /**
         * @param {boolean} hidden Whether the page is hidden.
         * @param {goog.labs.dom.PageVisibilityState} visibilityState A more detailed
         *     visibility state.
         */
        constructor(hidden: boolean, visibilityState: goog.labs.dom.PageVisibilityState);

        /**
         * Whether the page is hidden.
         * @type {boolean}
         */
        hidden: boolean;

        /**
         * A more detailed visibility state.
         * @type {goog.labs.dom.PageVisibilityState}
         */
        visibilityState: goog.labs.dom.PageVisibilityState;
    }

    /**
     * The different visibility states.
     * @enum {string}
     */
    enum PageVisibilityState { HIDDEN, VISIBLE, PRERENDER, UNLOADED }
}
