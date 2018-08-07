/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../a11y/aria/roles.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.ZippyEvent' {
    import alias = goog.ui.ZippyEvent;
    export default alias;
}

declare module 'goog:goog.ui.Zippy' {
    import alias = goog.ui.Zippy;
    export default alias;
}

declare module 'goog:goog.ui.Zippy.Events' {
    import alias = goog.ui.Zippy.Events;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Zippy widget. Expandable/collapsible container, clicking the header toggles
     * the visibility of the content.
     *
     * @extends {goog.events.EventTarget}
     */
    class Zippy extends __Zippy {}
    abstract class __Zippy extends goog.events.__EventTarget {
        /**
         * @param {Element|string|null} header Header element, either element
         *     reference, string id or null if no header exists.
         * @param {Element|string|function():Element=} opt_content Content element
         *     (if any), either element reference or string id.  If skipped, the caller
         *     should handle the TOGGLE event in its own way. If a function is passed,
         *     then if will be called to create the content element the first time the
         *     zippy is expanded.
         * @param {boolean=} opt_expanded Initial expanded/visibility state. If
         *     undefined, attempts to infer the state from the DOM. Setting visibility
         *     using one of the standard Soy templates guarantees correct inference.
         * @param {Element|string=} opt_expandedHeader Element to use as the header when
         *     the zippy is expanded.
         * @param {goog.dom.DomHelper=} opt_domHelper An optional DOM helper.
         * @param {goog.a11y.aria.Role<string>=} opt_role ARIA role, default TAB.
         */
        constructor(
            header: Element|string|null,
            opt_content?: Element|string|(() => Element),
            opt_expanded?: boolean,
            opt_expandedHeader?: Element|string,
            opt_domHelper?: goog.dom.DomHelper,
            opt_role?: goog.a11y.aria.Role
        );

        /**
         * DomHelper used to interact with the document, allowing components to be
         * created in a different window.
         * @type {!goog.dom.DomHelper}
         * @private
         */
        private dom_: goog.dom.DomHelper;

        /**
         * Header element or null if no header exists.
         * @type {Element}
         * @private
         */
        private elHeader_: Element;

        /**
         * When present, the header to use when the zippy is expanded.
         * @type {Element}
         * @private
         */
        private elExpandedHeader_: Element;

        /**
         * Function that will create the content element, or false if there is no such
         * function.
         * @type {?function():Element}
         * @private
         */
        private lazyCreateFunc_: (() => Element)|null;

        /**
         * ARIA role.
         * @type {goog.a11y.aria.Role<string>}
         * @private
         */
        private role_: goog.a11y.aria.Role;

        /**
         * Content element.
         * @type {Element}
         * @private
         */
        private elContent_: Element;

        /**
         * Expanded state.
         * @type {boolean}
         * @private
         */
        private expanded_: boolean;

        /**
         * A keyboard events handler. If there are two headers it is shared for both.
         * @type {goog.events.EventHandler<!goog.ui.Zippy>}
         * @private
         */
        private keyboardEventHandler_: goog.events.EventHandler<goog.ui.Zippy>;

        /**
         * The keyhandler used for listening on most key events. This takes care of
         * abstracting away some of the browser differences.
         * @private {!goog.events.KeyHandler}
         */
        private keyHandler_: any /*missing*/;

        /**
         * A mouse events handler. If there are two headers it is shared for both.
         * @type {goog.events.EventHandler<!goog.ui.Zippy>}
         * @private
         */
        private mouseEventHandler_: goog.events.EventHandler<goog.ui.Zippy>;

        /**
         * Whether to listen for and handle mouse events; defaults to true.
         * @type {boolean}
         * @private
         */
        private handleMouseEvents_: boolean;

        /**
         * Whether to listen for and handle key events; defaults to true.
         * @type {boolean}
         * @private
         */
        private handleKeyEvents_: boolean;

        /**
         * @return {goog.a11y.aria.Role} The ARIA role to be applied to Zippy element.
         */
        getAriaRole(): goog.a11y.aria.Role;

        /**
         * @return {HTMLElement} The content element.
         */
        getContentElement(): HTMLElement;

        /**
         * @return {Element} The visible header element.
         */
        getVisibleHeaderElement(): Element;

        /**
         * Expands content pane.
         */
        expand(): void;

        /**
         * Collapses content pane.
         */
        collapse(): void;

        /**
         * Toggles expanded state.
         */
        toggle(): void;

        /**
         * Sets expanded state.
         *
         * @param {boolean} expanded Expanded/visibility state.
         */
        setExpanded(expanded: boolean): void;

        /**
         * Sets expanded internal state.
         *
         * @param {boolean} expanded Expanded/visibility state.
         * @protected
         */
        protected setExpandedInternal(expanded: boolean): void;

        /**
         * @return {boolean} Whether the zippy is expanded.
         */
        isExpanded(): boolean;

        /**
         * Updates the header element's className and ARIA (accessibility) EXPANDED
         * state.
         *
         * @param {boolean} expanded Expanded/visibility state.
         * @protected
         */
        protected updateHeaderClassName(expanded: boolean): void;

        /**
         * @return {boolean} Whether the Zippy handles its own key events.
         */
        isHandleKeyEvents(): boolean;

        /**
         * @return {boolean} Whether the Zippy handles its own mouse events.
         */
        isHandleMouseEvents(): boolean;

        /**
         * Sets whether the Zippy handles it's own keyboard events.
         * @param {boolean} enable Whether the Zippy handles keyboard events.
         */
        setHandleKeyboardEvents(enable: boolean): void;

        /**
         * Sets whether the Zippy handles it's own mouse events.
         * @param {boolean} enable Whether the Zippy handles mouse events.
         */
        setHandleMouseEvents(enable: boolean): void;

        /**
         * Enables keyboard events handling for the passed header element.
         * @param {Element} header The header element.
         * @private
         */
        private enableKeyboardEventsHandling_(header: Element): void;

        /**
         * Enables mouse events handling for the passed header element.
         * @param {Element} header The header element.
         * @private
         */
        private enableMouseEventsHandling_(header: Element): void;

        /**
         * KeyDown event handler for header element. Enter and space toggles expanded
         * state.
         *
         * @param {!goog.events.BrowserEvent} event KeyDown event.
         * @private
         */
        private onHeaderKeyDown_(event: goog.events.BrowserEvent): void;

        /**
         * Click event handler for header element.
         *
         * @param {!goog.events.BrowserEvent} event Click event.
         * @private
         */
        private onHeaderClick_(event: goog.events.BrowserEvent): void;

        /**
         * Dispatch an ACTION event whenever there is user interaction with the header.
         * Please note that after the zippy state change is completed a TOGGLE event
         * will be dispatched. However, the TOGGLE event is dispatch on every toggle,
         * including programmatic call to `#toggle`.
         * @param {!goog.events.BrowserEvent} triggeringEvent
         * @private
         */
        private dispatchActionEvent_(triggeringEvent: goog.events.BrowserEvent): void;
    }

    /**
     * Object representing a zippy toggle event.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class ZippyEvent extends __ZippyEvent {}
    abstract class __ZippyEvent extends goog.events.__Event {
        /**
         * @param {string} type Event type.
         * @param {goog.ui.Zippy} target Zippy widget initiating event.
         * @param {boolean} expanded Expanded state.
         * @param {!goog.events.BrowserEvent=} opt_triggeringEvent
         */
        constructor(
            type: string, target: goog.ui.Zippy, expanded: boolean, opt_triggeringEvent?: goog.events.BrowserEvent
        );

        /**
         * The expanded state.
         * @type {boolean}
         */
        expanded: boolean;

        /**
         * For ACTION events, the key or mouse event that triggered this event, if
         * there was one.
         * @type {?goog.events.BrowserEvent}
         */
        triggeringEvent: goog.events.BrowserEvent|null;
    }
}

declare namespace goog.ui.Zippy {
    /**
     * Constants for event names
     *
     * @const
     */
    const Events: any /*missing*/;
}
