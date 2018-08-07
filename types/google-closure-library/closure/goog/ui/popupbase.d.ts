/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../fx/transition.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.PopupBase' {
    import alias = goog.ui.PopupBase;
    export default alias;
}

declare module 'goog:goog.ui.PopupBase.Type' {
    import alias = goog.ui.PopupBase.Type;
    export default alias;
}

declare module 'goog:goog.ui.PopupBase.EventType' {
    import alias = goog.ui.PopupBase.EventType;
    export default alias;
}

declare namespace goog.ui {
    /**
     * The PopupBase class provides functionality for showing and hiding a generic
     * container element. It also provides the option for hiding the popup element
     * if the user clicks outside the popup or the popup loses focus.
     *
     * @extends {goog.events.EventTarget}
     */
    class PopupBase extends __PopupBase {}
    abstract class __PopupBase extends goog.events.__EventTarget {
        /**
         * @param {Element=} opt_element A DOM element for the popup.
         * @param {goog.ui.PopupBase.Type=} opt_type Type of popup.
         */
        constructor(opt_element?: Element, opt_type?: goog.ui.PopupBase.Type);

        /**
         * An event handler to manage the events easily
         * @type {goog.events.EventHandler<!goog.ui.PopupBase>}
         * @private
         */
        private handler_: goog.events.EventHandler<goog.ui.PopupBase>;

        /**
         * The popup dom element that this Popup wraps.
         * @type {Element}
         * @private
         */
        private element_: Element;

        /**
         * Whether the Popup dismisses itself it the user clicks outside of it or the
         * popup loses focus
         * @type {boolean}
         * @private
         */
        private autoHide_: boolean;

        /**
         * Mouse events without auto hide partner elements will not dismiss the popup.
         * @type {Array<Element>}
         * @private
         */
        private autoHidePartners_: Element[];

        /**
         * Clicks outside the popup but inside this element will cause the popup to
         * hide if autoHide_ is true. If this is null, then the entire document is used.
         * For example, you can use a body-size div so that clicks on the browser
         * scrollbar do not dismiss the popup.
         * @type {Element}
         * @private
         */
        private autoHideRegion_: Element;

        /**
         * Whether the popup is currently being shown.
         * @type {boolean}
         * @private
         */
        private isVisible_: boolean;

        /**
         * Whether the popup should hide itself asynchrously. This was added because
         * there are cases where hiding the element in mouse down handler in IE can
         * cause textinputs to get into a bad state if the element that had focus is
         * hidden.
         * @type {boolean}
         * @private
         */
        private shouldHideAsync_: boolean;

        /**
         * The time when the popup was last shown.
         * @type {number}
         * @private
         */
        private lastShowTime_: number;

        /**
         * The time when the popup was last hidden.
         * @type {number}
         * @private
         */
        private lastHideTime_: number;

        /**
         * Whether to hide when the escape key is pressed.
         * @type {boolean}
         * @private
         */
        private hideOnEscape_: boolean;

        /**
         * Whether to enable cross-iframe dismissal.
         * @type {boolean}
         * @private
         */
        private enableCrossIframeDismissal_: boolean;

        /**
         * The type of popup
         * @type {goog.ui.PopupBase.Type}
         * @private
         */
        private type_: goog.ui.PopupBase.Type;

        /**
         * Transition to play on showing the popup.
         * @type {goog.fx.Transition|undefined}
         * @private
         */
        private showTransition_: goog.fx.Transition|undefined;

        /**
         * Transition to play on hiding the popup.
         * @type {goog.fx.Transition|undefined}
         * @private
         */
        private hideTransition_: goog.fx.Transition|undefined;

        /**
         * @return {goog.ui.PopupBase.Type} The type of popup this is.
         */
        getType(): goog.ui.PopupBase.Type;

        /**
         * Specifies the type of popup to use.
         *
         * @param {goog.ui.PopupBase.Type} type Type of popup.
         */
        setType(type: goog.ui.PopupBase.Type): void;

        /**
         * Returns whether the popup should hide itself asynchronously using a timeout
         * instead of synchronously.
         * @return {boolean} Whether to hide async.
         */
        shouldHideAsync(): boolean;

        /**
         * Sets whether the popup should hide itself asynchronously using a timeout
         * instead of synchronously.
         * @param {boolean} b Whether to hide async.
         */
        setShouldHideAsync(b: boolean): void;

        /**
         * Returns the dom element that should be used for the popup.
         *
         * @return {Element} The popup element.
         */
        getElement(): Element;

        /**
         * Specifies the dom element that should be used for the popup.
         *
         * @param {Element} elt A DOM element for the popup.
         */
        setElement(elt: Element): void;

        /**
         * Returns whether the Popup dismisses itself when the user clicks outside of
         * it.
         * @return {boolean} Whether the Popup autohides on an external click.
         */
        getAutoHide(): boolean;

        /**
         * Sets whether the Popup dismisses itself when the user clicks outside of it.
         * @param {boolean} autoHide Whether to autohide on an external click.
         */
        setAutoHide(autoHide: boolean): void;

        /**
         * Mouse events that occur within an autoHide partner will not hide a popup
         * set to autoHide.
         * @param {!Element} partner The auto hide partner element.
         */
        addAutoHidePartner(partner: Element): void;

        /**
         * Removes a previously registered auto hide partner.
         * @param {!Element} partner The auto hide partner element.
         */
        removeAutoHidePartner(partner: Element): void;

        /**
         * @return {boolean} Whether the Popup autohides on the escape key.
         */
        getHideOnEscape(): boolean;

        /**
         * Sets whether the Popup dismisses itself on the escape key.
         * @param {boolean} hideOnEscape Whether to autohide on the escape key.
         */
        setHideOnEscape(hideOnEscape: boolean): void;

        /**
         * @return {boolean} Whether cross iframe dismissal is enabled.
         */
        getEnableCrossIframeDismissal(): boolean;

        /**
         * Sets whether clicks in other iframes should dismiss this popup.  In some
         * cases it should be disabled, because it can cause spurious
         * @param {boolean} enable Whether to enable cross iframe dismissal.
         */
        setEnableCrossIframeDismissal(enable: boolean): void;

        /**
         * Returns the region inside which the Popup dismisses itself when the user
         * clicks, or null if it's the entire document.
         * @return {Element} The DOM element for autohide, or null if it hasn't been
         *     set.
         */
        getAutoHideRegion(): Element;

        /**
         * Sets the region inside which the Popup dismisses itself when the user
         * clicks.
         * @param {Element} element The DOM element for autohide.
         */
        setAutoHideRegion(element: Element): void;

        /**
         * Sets transition animation on showing and hiding the popup.
         * @param {goog.fx.Transition=} opt_showTransition Transition to play on
         *     showing the popup.
         * @param {goog.fx.Transition=} opt_hideTransition Transition to play on
         *     hiding the popup.
         */
        setTransition(opt_showTransition?: goog.fx.Transition, opt_hideTransition?: goog.fx.Transition): void;

        /**
         * Returns the time when the popup was last shown.
         *
         * @return {number} time in ms since epoch when the popup was last shown, or
         * -1 if the popup was never shown.
         */
        getLastShowTime(): number;

        /**
         * Returns the time when the popup was last hidden.
         *
         * @return {number} time in ms since epoch when the popup was last hidden, or
         * -1 if the popup was never hidden or is currently showing.
         */
        getLastHideTime(): number;

        /**
         * Returns the event handler for the popup. All event listeners belonging to
         * this handler are removed when the tooltip is hidden. Therefore,
         * the recommended usage of this handler is to listen on events in
         * {@link #onShow}.
         * @return {goog.events.EventHandler<T>} Event handler for this popup.
         * @protected
         * @this {T}
         * @template T
         */
        protected getHandler(): goog.events.EventHandler<this>;

        /**
         * Helper to throw exception if the popup is showing.
         * @private
         */
        private ensureNotVisible_(): void;

        /**
         * Returns whether the popup is currently visible.
         *
         * @return {boolean} whether the popup is currently visible.
         */
        isVisible(): boolean;

        /**
         * Returns whether the popup is currently visible or was visible within about
         * 150 ms ago. This is used by clients to handle a very specific, but common,
         * popup scenario. The button that launches the popup should close the popup
         * on mouse down if the popup is alrady open. The problem is that the popup
         * closes itself during the capture phase of the mouse down and thus the button
         * thinks it's hidden and this should show it again. This method provides a
         * good heuristic for clients. Typically in their event handler they will have
         * code that is:
         *
         * if (menu.isOrWasRecentlyVisible()) {
         *   menu.setVisible(false);
         * } else {
         *   ... // code to position menu and initialize other state
         *   menu.setVisible(true);
         * }
         * @return {boolean} Whether the popup is currently visible or was visible
         *     within about 150 ms ago.
         */
        isOrWasRecentlyVisible(): boolean;

        /**
         * Sets whether the popup should be visible. After this method
         * returns, isVisible() will always return the new state, even if
         * there is a transition.
         *
         * @param {boolean} visible Desired visibility state.
         */
        setVisible(visible: boolean): void;

        /**
         * Repositions the popup according to the current state.
         * Should be overriden by subclases.
         */
        reposition: any /*missing*/;

        /**
         * Does the work to show the popup.
         * @private
         */
        private show_(): void;

        /**
         * Hides the popup. This call is idempotent.
         *
         * @param {?Node=} opt_target Target of the event causing the hide.
         * @return {boolean} Whether the popup was hidden and not cancelled.
         * @private
         */
        private hide_(opt_target?: Node|null): boolean;

        /**
         * Continues hiding the popup. This is a continuation from hide_. It is
         * a separate method so that we can add a transition before hiding.
         * @param {?Node=} opt_target Target of the event causing the hide.
         * @private
         */
        private continueHidingPopup_(opt_target?: Node|null): void;

        /**
         * Shows the popup element.
         * @protected
         */
        protected showPopupElement(): void;

        /**
         * Hides the popup element.
         * @protected
         */
        protected hidePopupElement(): void;

        /**
         * Hides the popup by moving it offscreen.
         *
         * @private
         */
        private moveOffscreen_(): void;

        /**
         * Called before the popup is shown. Derived classes can override to hook this
         * event but should make sure to call the parent class method.
         *
         * @return {boolean} If anyone called preventDefault on the event object (or
         *     if any of the handlers returns false this will also return false.
         * @protected
         */
        protected onBeforeShow(): boolean;

        /**
         * Called after the popup is shown. Derived classes can override to hook this
         * event but should make sure to call the parent class method.
         * @protected
         */
        protected onShow(): void;

        /**
         * Called before the popup is hidden. Derived classes can override to hook this
         * event but should make sure to call the parent class method.
         *
         * @param {?Node=} opt_target Target of the event causing the hide.
         * @return {boolean} If anyone called preventDefault on the event object (or
         *     if any of the handlers returns false this will also return false.
         * @protected
         */
        protected onBeforeHide(opt_target?: Node|null): boolean;

        /**
         * Called after the popup is hidden. Derived classes can override to hook this
         * event but should make sure to call the parent class method.
         * @param {?Node=} opt_target Target of the event causing the hide.
         * @protected
         */
        protected onHide(opt_target?: Node|null): void;

        /**
         * Mouse down handler for the document on capture phase. Used to hide the
         * popup for auto-hide mode.
         *
         * @param {goog.events.BrowserEvent} e The event object.
         * @private
         */
        private onDocumentMouseDown_(e: goog.events.BrowserEvent): void;

        /**
         * Handles key-downs on the document to handle the escape key.
         *
         * @param {goog.events.BrowserEvent} e The event object.
         * @private
         */
        private onDocumentKeyDown_(e: goog.events.BrowserEvent): void;

        /**
         * Deactivate handler(IE) and blur handler (other browsers) for document.
         * Used to hide the popup for auto-hide mode.
         *
         * @param {goog.events.BrowserEvent} e The event object.
         * @private
         */
        private onDocumentBlur_(e: goog.events.BrowserEvent): void;

        /**
         * @param {Node} element The element to inspect.
         * @return {boolean} Returns true if the given element is one of the auto hide
         *     partners or is a child of an auto hide partner.
         * @private
         */
        private isOrWithinAutoHidePartner_(element: Node): boolean;

        /**
         * @param {Node} element The element to inspect.
         * @return {boolean} Returns true if the element is contained within
         *     the autohide region. If unset, the autohide region is the entire
         *     entire document.
         * @private
         */
        private isWithinAutoHideRegion_(element: Node): boolean;

        /**
         * @return {boolean} Whether the time since last show is less than the debounce
         *     delay.
         * @private
         */
        private shouldDebounce_(): boolean;
    }
}

declare namespace goog.ui.PopupBase {
    /**
     * Constants for type of Popup
     * @enum {string}
     */
    enum Type { TOGGLE_DISPLAY, MOVE_OFFSCREEN }

    /**
     * Constants for event type fired by Popup
     *
     * @enum {string}
     */
    enum EventType { BEFORE_SHOW, SHOW, BEFORE_HIDE, HIDE }

    /**
     * A time in ms used to debounce events that happen right after each other.
     *
     * A note about why this is necessary. There are two cases to consider.
     * First case, a popup will usually see a focus event right after it's launched
     * because it's typical for it to be launched in a mouse-down event which will
     * then move focus to the launching button. We don't want to think this is a
     * separate user action moving focus. Second case, a user clicks on the
     * launcher button to close the menu. In that case, we'll close the menu in the
     * focus event and then show it again because of the mouse down event, even
     * though the intention is to just close the menu. This workaround appears to
     * be the least intrusive fix.
     *
     * @type {number}
     */
    let DEBOUNCE_DELAY_MS: number;
}
