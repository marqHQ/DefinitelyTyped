/// <reference path="../../../globals.d.ts"/>
/// <reference path="./popup.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>
/// <reference path="../structs/set.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>
/// <reference path="../positioning/abstractposition.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../positioning/viewportposition.d.ts"/>
/// <reference path="../positioning/anchoredposition.d.ts"/>

declare module 'goog:goog.ui.Tooltip' {
    import alias = goog.ui.Tooltip;
    export default alias;
}

declare module 'goog:goog.ui.Tooltip.State' {
    import alias = goog.ui.Tooltip.State;
    export default alias;
}

declare module 'goog:goog.ui.Tooltip.ElementTooltipPosition' {
    import alias = goog.ui.Tooltip.ElementTooltipPosition;
    export default alias;
}

declare module 'goog:goog.ui.Tooltip.CursorTooltipPosition' {
    import alias = goog.ui.Tooltip.CursorTooltipPosition;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Tooltip widget. Can be attached to one or more elements and is shown, with a
     * slight delay, when the the cursor is over the element or the element gains
     * focus.
     *
     * @extends {goog.ui.Popup}
     */
    class Tooltip extends __Tooltip {}
    abstract class __Tooltip extends goog.ui.__Popup {
        /**
         * @param {Element|string=} opt_el Element to display tooltip for, either
         *     element reference or string id.
         * @param {?string=} opt_str Text message to display in tooltip.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_el?: Element|string, opt_str?: string|null, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Dom Helper
         * @type {goog.dom.DomHelper}
         * @private
         */
        private dom_: goog.dom.DomHelper;

        /**
         * Cursor position relative to the page.
         * @type {!goog.math.Coordinate}
         * @protected
         */
        protected cursorPosition: goog.math.Coordinate;

        /**
         * Elements this widget is attached to.
         * @type {goog.structs.Set}
         * @private
         */
        private elements_: goog.structs.Set<any>;

        /**
         * Keyboard focus event handler for elements inside the tooltip.
         * @private {goog.events.FocusHandler}
         */
        private tooltipFocusHandler_: any /*missing*/;

        /**
         * Active element reference. Used by the delayed show functionality to keep
         * track of the element the mouse is over or the element with focus.
         * @type {Element}
         * @private
         */
        private activeEl_: Element;

        /**
         * CSS class name for tooltip.
         *
         * @type {string}
         */
        className: string;

        /**
         * Delay in milliseconds since the last mouseover or mousemove before the
         * tooltip is displayed for an element.
         *
         * @type {number}
         * @private
         */
        private showDelayMs_: number;

        /**
         * Timer for when to show.
         *
         * @type {number|undefined}
         * @protected
         */
        protected showTimer: number|undefined;

        /**
         * Delay in milliseconds before tooltips are hidden.
         *
         * @type {number}
         * @private
         */
        private hideDelayMs_: number;

        /**
         * Timer for when to hide.
         *
         * @type {number|undefined}
         * @protected
         */
        protected hideTimer: number|undefined;

        /**
         * Element that triggered the tooltip.  Note that if a second element triggers
         * this tooltip, anchor becomes that second element, even if its show is
         * cancelled and the original tooltip survives.
         *
         * @type {Element|undefined}
         * @protected
         */
        protected anchor: Element|undefined;

        /**
         * Whether the anchor has seen the cursor move or has received focus since the
         * tooltip was last shown. Used to ignore mouse over events triggered by view
         * changes and UI updates.
         * @type {boolean|undefined}
         * @private
         */
        private seenInteraction_: boolean|undefined;

        /**
         * Whether the cursor must have moved before the tooltip will be shown.
         * @type {boolean|undefined}
         * @private
         */
        private requireInteraction_: boolean|undefined;

        /**
         * If this tooltip's element contains another tooltip that becomes active, this
         * property identifies that tooltip so that we can check if this tooltip should
         * not be hidden because the nested tooltip is active.
         * @type {goog.ui.Tooltip}
         * @private
         */
        private childTooltip_: goog.ui.Tooltip;

        /**
         * If this tooltip is inside another tooltip's element, then it may have
         * prevented that tooltip from hiding.  When this tooltip hides, we'll need
         * to check if the parent should be hidden as well.
         * @type {goog.ui.Tooltip}
         * @private
         */
        private parentTooltip_: goog.ui.Tooltip;

        /**
         * Returns the dom helper that is being used on this component.
         * @return {goog.dom.DomHelper} The dom helper used on this component.
         */
        getDomHelper(): goog.dom.DomHelper;

        /**
         * @return {goog.ui.Tooltip} Active tooltip in a child element, or null if none.
         * @protected
         */
        protected getChildTooltip(): goog.ui.Tooltip;

        /**
         * Attach to element. Tooltip will be displayed when the cursor is over the
         * element or when the element has been active for a few milliseconds.
         *
         * @param {Element|string} el Element to display tooltip for, either element
         *                            reference or string id.
         */
        attach(el: Element|string): void;

        /**
         * Detach from element(s).
         *
         * @param {Element|string=} opt_el Element to detach from, either element
         *                                reference or string id. If no element is
         *                                specified all are detached.
         */
        detach(opt_el?: Element|string): void;

        /**
         * Detach from element.
         *
         * @param {Element} el Element to detach from.
         * @private
         */
        private detachElement_(el: Element): void;

        /**
         * Sets delay in milliseconds before tooltip is displayed for an element.
         *
         * @param {number} delay The delay in milliseconds.
         */
        setShowDelayMs(delay: number): void;

        /**
         * @return {number} The delay in milliseconds before tooltip is displayed for an
         *     element.
         */
        getShowDelayMs(): number;

        /**
         * Sets delay in milliseconds before tooltip is hidden once the cursor leavs
         * the element.
         *
         * @param {number} delay The delay in milliseconds.
         */
        setHideDelayMs(delay: number): void;

        /**
         * @return {number} The delay in milliseconds before tooltip is hidden once the
         *     cursor leaves the element.
         */
        getHideDelayMs(): number;

        /**
         * Sets tooltip message as plain text.
         *
         * @param {string} str Text message to display in tooltip.
         */
        setText(str: string): void;

        /**
         * Sets tooltip message as HTML markup.
         * @param {!goog.html.SafeHtml} html HTML message to display in tooltip.
         */
        setSafeHtml(html: goog.html.SafeHtml): void;

        /**
         * Handler for keyboard focus events of elements inside the tooltip's content
         * element. This should only be invoked if this.getElement() != null.
         * @private
         */
        private registerContentFocusEvents_(): void;

        /**
         * @return {string} The tooltip message as plain text.
         */
        getText(): string;

        /**
         * @return {string} The tooltip message as HTML as plain string.
         */
        getHtml(): string;

        /**
         * @return {goog.ui.Tooltip.State} Current state of tooltip.
         */
        getState(): goog.ui.Tooltip.State;

        /**
         * Sets whether tooltip requires the mouse to have moved or the anchor receive
         * focus before the tooltip will be shown.
         * @param {boolean} requireInteraction Whether tooltip should require some user
         *     interaction before showing tooltip.
         */
        setRequireInteraction(requireInteraction: boolean): void;

        /**
         * Returns true if the coord is in the tooltip.
         * @param {goog.math.Coordinate} coord Coordinate being tested.
         * @return {boolean} Whether the coord is in the tooltip.
         */
        isCoordinateInTooltip(coord: goog.math.Coordinate): boolean;

        /**
         * Called by timer from mouse over handler. Shows tooltip if cursor is still
         * over the same element.
         *
         * @param {Element} el Element to show tooltip for.
         * @param {goog.positioning.AbstractPosition=} opt_pos Position to display popup
         *     at.
         */
        maybeShow(el: Element, opt_pos?: goog.positioning.AbstractPosition): void;

        /**
         * @return {goog.structs.Set} Elements this widget is attached to.
         * @protected
         */
        protected getElements(): goog.structs.Set<any>;

        /**
         * @return {Element} Active element reference.
         */
        getActiveElement(): Element;

        /**
         * @param {Element} activeEl Active element reference.
         * @protected
         */
        protected setActiveElement(activeEl: Element): void;

        /**
         * Shows tooltip for a specific element.
         *
         * @param {Element} el Element to show tooltip for.
         * @param {goog.positioning.AbstractPosition=} opt_pos Position to display popup
         *     at.
         */
        showForElement(el: Element, opt_pos?: goog.positioning.AbstractPosition): void;

        /**
         * Sets tooltip position and shows it.
         *
         * @param {Element} el Element to show tooltip for.
         * @param {goog.positioning.AbstractPosition=} opt_pos Position to display popup
         *     at.
         * @private
         */
        private positionAndShow_(el: Element, opt_pos?: goog.positioning.AbstractPosition): void;

        /**
         * Called by timer from mouse out handler. Hides tooltip if cursor is still
         * outside element and tooltip, or if a child of tooltip has the focus.
         * @param {?Element|undefined} el Tooltip's anchor when hide timer was started.
         */
        maybeHide(el: Element|null|undefined): void;

        /**
         * @return {boolean} Whether tooltip element contains an active child tooltip,
         *     and should thus not be hidden.  When the child tooltip is hidden, it
         *     will check if the parent should be hidden, too.
         * @protected
         */
        protected hasActiveChild(): boolean;

        /**
         * Saves the current mouse cursor position to `this.cursorPosition`.
         * @param {goog.events.BrowserEvent} event MOUSEOVER or MOUSEMOVE event.
         * @private
         */
        private saveCursorPosition_(event: goog.events.BrowserEvent): void;

        /**
         * Handler for mouse over events.
         *
         * @param {goog.events.BrowserEvent} event Event object.
         * @protected
         */
        protected handleMouseOver(event: goog.events.BrowserEvent): void;

        /**
         * Find anchor containing the given element, if any.
         *
         * @param {Element} el Element that triggered event.
         * @return {Element} Element in elements_ array that contains given element,
         *     or null if not found.
         * @protected
         */
        protected getAnchorFromElement(el: Element): Element;

        /**
         * Handler for mouse move events.
         *
         * @param {goog.events.BrowserEvent} event MOUSEMOVE event.
         * @protected
         */
        protected handleMouseMove(event: goog.events.BrowserEvent): void;

        /**
         * Handler for focus events.
         *
         * @param {goog.events.BrowserEvent} event Event object.
         * @protected
         */
        protected handleFocus(event: goog.events.BrowserEvent): void;

        /**
         * Return a Position instance for repositioning the tooltip. Override in
         * subclasses to customize the way repositioning is done.
         *
         * @param {goog.ui.Tooltip.Activation} activationType Information about what
         *    kind of event caused the popup to be shown.
         * @return {!goog.positioning.AbstractPosition} The position object used
         *    to position the tooltip.
         * @protected
         */
        protected getPositioningStrategy(activationType: goog.ui.Tooltip.Activation): goog.positioning.AbstractPosition;

        /**
         * Looks for an active tooltip whose element contains this tooltip's anchor.
         * This allows us to prevent hides until they are really necessary.
         *
         * @private
         */
        private checkForParentTooltip_(): void;

        /**
         * Handler for mouse out and blur events.
         *
         * @param {goog.events.BrowserEvent} event Event object.
         * @protected
         */
        protected handleMouseOutAndBlur(event: goog.events.BrowserEvent): void;

        /**
         * Handler for mouse over events for the tooltip element.
         *
         * @param {goog.events.BrowserEvent} event Event object.
         * @protected
         */
        protected handleTooltipMouseOver(event: goog.events.BrowserEvent): void;

        /**
         * Handler for mouse out events for the tooltip element.
         *
         * @param {goog.events.BrowserEvent} event Event object.
         * @protected
         */
        protected handleTooltipMouseOut(event: goog.events.BrowserEvent): void;

        /**
         * Helper method, starts timer that calls maybeShow. Parameters are passed to
         * the maybeShow method.
         *
         * @param {Element} el Element to show tooltip for.
         * @param {goog.positioning.AbstractPosition=} opt_pos Position to display popup
         *     at.
         * @protected
         */
        protected startShowTimer(el: Element, opt_pos?: goog.positioning.AbstractPosition): void;

        /**
         * Helper method called to clear the show timer.
         *
         * @protected
         */
        protected clearShowTimer(): void;

        /**
         * Helper method called to start the close timer.
         * @protected
         */
        protected startHideTimer(): void;

        /**
         * Helper method called to clear the close timer.
         * @protected
         */
        protected clearHideTimer(): void;
    }
}

declare namespace goog.ui.Tooltip {
    /**
     * Popup position implementation that positions the popup (the tooltip in this
     * case) based on the cursor position. It's positioned below the cursor to the
     * right if there's enough room to fit all of it inside the Viewport. Otherwise
     * it's displayed as far right as possible either above or below the element.
     *
     * Used to position tooltips triggered by the cursor.
     *
     * @extends {goog.positioning.ViewportPosition}
     * @final
     */
    class CursorTooltipPosition extends __CursorTooltipPosition {}
    abstract class __CursorTooltipPosition extends goog.positioning.__ViewportPosition {
        /**
         * @param {number|!goog.math.Coordinate} arg1 Left position or coordinate.
         * @param {number=} opt_arg2 Top position.
         */
        constructor(arg1: number|goog.math.Coordinate, opt_arg2?: number);
    }

    /**
     * Popup position implementation that positions the popup (the tooltip in this
     * case) based on the element position. It's positioned below the element to the
     * right if there's enough room to fit all of it inside the Viewport. Otherwise
     * it's displayed as far right as possible either above or below the element.
     *
     * Used to position tooltips triggered by focus changes.
     *
     * @extends {goog.positioning.AnchoredPosition}
     */
    class ElementTooltipPosition extends __ElementTooltipPosition {}
    abstract class __ElementTooltipPosition extends goog.positioning.__AnchoredPosition {
        /**
         * @param {Element} element The element to anchor the popup at.
         */
        constructor(element: Element);
    }

    /**
     * Possible states for the tooltip to be in.
     * @enum {number}
     */
    enum State { INACTIVE, WAITING_TO_SHOW, SHOWING, WAITING_TO_HIDE, UPDATING }

    /**
     * Popup activation types. Used to select a positioning strategy.
     * @enum {number}
     */
    enum Activation { CURSOR, FOCUS }
}
