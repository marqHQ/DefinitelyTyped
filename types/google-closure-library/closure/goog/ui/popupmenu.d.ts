/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menu.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./menurenderer.d.ts"/>
/// <reference path="../structs/map.d.ts"/>
/// <reference path="../positioning/positioning.d.ts"/>
/// <reference path="../math/box.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../positioning/abstractposition.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.PopupMenu' {
    import alias = goog.ui.PopupMenu;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A basic menu class.
     * @extends {goog.ui.Menu}
     */
    class PopupMenu extends __PopupMenu {}
    abstract class __PopupMenu extends goog.ui.__Menu {
        /**
         * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         * @param {?goog.ui.MenuRenderer=} opt_renderer Renderer used to render or
         *     decorate the container; defaults to {@link goog.ui.MenuRenderer}.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper|null, opt_renderer?: goog.ui.MenuRenderer|null);

        /**
         * Map of attachment points for the menu.  Key -> Object
         * @type {!goog.structs.Map}
         * @private
         */
        private targets_: goog.structs.Map<any, any>;

        /**
         * If true, then if the menu will toggle off if it is already visible.
         * @type {boolean}
         * @private
         */
        private toggleMode_: boolean;

        /**
         * Time that the menu was last shown.
         * @type {number}
         * @private
         */
        private lastHide_: number;

        /**
         * Current element where the popup menu is anchored.
         * @type {?Element}
         * @private
         */
        private currentAnchor_: Element|null;

        /**
         * Attaches the menu to a new popup position and anchor element.  A menu can
         * only be attached to an element once, since attaching the same menu for
         * multiple positions doesn't make sense.
         *
         * @param {?Element} element Element whose click event should trigger the menu.
         * @param {?goog.positioning.Corner=} opt_targetCorner Corner of the target that
         *     the menu should be anchored to.
         * @param {goog.positioning.Corner=} opt_menuCorner Corner of the menu that
         *     should be anchored.
         * @param {boolean=} opt_contextMenu Whether the menu should show on
         *     {@link goog.events.EventType.CONTEXTMENU} events, false if it should
         *     show on {@link goog.events.EventType.MOUSEDOWN} events. Default is
         *     MOUSEDOWN.
         * @param {?goog.math.Box=} opt_margin Margin for the popup used in positioning
         *     algorithms.
         */
        attach(
            element: Element|null,
            opt_targetCorner?: goog.positioning.Corner|null,
            opt_menuCorner?: goog.positioning.Corner,
            opt_contextMenu?: boolean,
            opt_margin?: goog.math.Box|null
        ): void;

        /**
         * Handles keyboard actions on the PopupMenu, according to
         * http://www.w3.org/WAI/PF/aria-practices/#menubutton.
         *
         * <p>If the ESC key is pressed, the menu is hidden (which is handled by
         * this.onAction_), and the focus is returned to the element whose click event
         * triggered opening of the menu.
         *
         * <p>If the SPACE or ENTER keys are pressed, the highlighted menu item's
         * listeners are fired.
         *
         * @param {Element} element Element whose click event triggered the menu.
         * @param {!goog.events.BrowserEvent} e The key down event.
         * @private
         */
        private onMenuKeyboardAction_(element: Element, e: goog.events.BrowserEvent): void;

        /**
         * Creates an object describing how the popup menu should be attached to the
         * anchoring element based on the given parameters. The created object is
         * stored, keyed by `element` and is retrievable later by invoking
         * {@link #getAttachTarget(element)} at a later point.
         *
         * Subclass may add more properties to the returned object, as needed.
         *
         * @param {?Element} element Element whose click event should trigger the menu.
         * @param {?goog.positioning.Corner=} opt_targetCorner Corner of the target that
         *     the menu should be anchored to.
         * @param {?goog.positioning.Corner=} opt_menuCorner Corner of the menu that
         *     should be anchored.
         * @param {boolean=} opt_contextMenu Whether the menu should show on
         *     {@link goog.events.EventType.CONTEXTMENU} events, false if it should
         *     show on {@link goog.events.EventType.MOUSEDOWN} events. Default is
         *     MOUSEDOWN.
         * @param {?goog.math.Box=} opt_margin Margin for the popup used in positioning
         *     algorithms.
         *
         * @return {?Object} An object that describes how the popup menu should be
         *     attached to the anchoring element.
         *
         * @protected
         */
        protected createAttachTarget(
            element: Element|null,
            opt_targetCorner?: goog.positioning.Corner|null,
            opt_menuCorner?: goog.positioning.Corner|null,
            opt_contextMenu?: boolean,
            opt_margin?: goog.math.Box|null
        ): Object|null;

        /**
         * Returns the object describing how the popup menu should be attach to given
         * element or `null`. The object is created and the association is formed
         * when {@link #attach} is invoked.
         *
         * @param {?Element} element DOM element.
         * @return {?Object} The object created when {@link attach} is invoked on
         *     `element`. Returns `null` if the element does not trigger
         *     the menu (i.e. {@link attach} has never been invoked on
         *     `element`).
         * @protected
         */
        protected getAttachTarget(element: Element|null): Object|null;

        /**
         * @param {?Element} element Any DOM element.
         * @return {boolean} Whether clicking on the given element will trigger the
         *     menu.
         *
         * @protected
         */
        protected isAttachTarget(element: Element|null): boolean;

        /**
         * @return {?Element} The current element where the popup is anchored, if it's
         *     visible.
         */
        getAttachedElement(): Element|null;

        /**
         * Attaches two event listeners to a target. One with corresponding event type,
         * and one with the KEYDOWN event type for accessibility purposes.
         * @param {?Object} target The target to attach an event to.
         * @private
         */
        private attachEvent_(target: Object|null): void;

        /**
         * Detaches all listeners
         */
        detachAll(): void;

        /**
         * Detaches a menu from a given element.
         * @param {?Element} element Element whose click event should trigger the menu.
         */
        detach(element: Element|null): void;

        /**
         * Detaches an event listener to a target
         * @param {!Object} target The target to detach events from.
         * @private
         */
        private detachEvent_(target: Object): void;

        /**
         * Sets whether the menu should toggle if it is already open.  For context
         * menus this should be false, for toolbar menus it makes more sense to be true.
         * @param {boolean} toggle The new toggle mode.
         */
        setToggleMode(toggle: boolean): void;

        /**
         * Gets whether the menu is in toggle mode
         * @return {boolean} toggle.
         */
        getToggleMode(): boolean;

        /**
         * Show the menu using given positioning object.
         * @param {?goog.positioning.AbstractPosition} position The positioning
         *     instance.
         * @param {goog.positioning.Corner=} opt_menuCorner The corner of the menu to be
         *     positioned.
         * @param {?goog.math.Box=} opt_margin A margin specified in pixels.
         * @param {?Element=} opt_anchor The element which acts as visual anchor for
         *     this menu.
         */
        showWithPosition(
            position: goog.positioning.AbstractPosition|null,
            opt_menuCorner?: goog.positioning.Corner,
            opt_margin?: goog.math.Box|null,
            opt_anchor?: Element|null
        ): void;

        /**
         * Show the menu at a given attached target.
         * @param {!Object} target Popup target.
         * @param {number} x The client-X associated with the show event.
         * @param {number} y The client-Y associated with the show event.
         * @protected
         */
        protected showMenu(target: Object, x: number, y: number): void;

        /**
         * Shows the menu immediately at the given client coordinates.
         * @param {number} x The client-X associated with the show event.
         * @param {number} y The client-Y associated with the show event.
         * @param {goog.positioning.Corner=} opt_menuCorner Corner of the menu that
         *     should be anchored.
         */
        showAt(x: number, y: number, opt_menuCorner?: goog.positioning.Corner): void;

        /**
         * Shows the menu immediately attached to the given element
         * @param {?Element} element The element to show at.
         * @param {goog.positioning.Corner} targetCorner The corner of the target to
         *     anchor to.
         * @param {goog.positioning.Corner=} opt_menuCorner Corner of the menu that
         *     should be anchored.
         */
        showAtElement(
            element: Element|null, targetCorner: goog.positioning.Corner, opt_menuCorner?: goog.positioning.Corner
        ): void;

        /**
         * Hides the menu.
         */
        hide(): void;

        /**
         * Returns whether the menu is currently visible or was visible within about
         * 150 ms ago.  This stops the menu toggling back on if the toggleMode == false.
         * @return {boolean} Whether the popup is currently visible or was visible
         *     within about 150 ms ago.
         */
        isOrWasRecentlyVisible(): boolean;

        /**
         * Used to stop the menu toggling back on if the toggleMode == false.
         * @return {boolean} Whether the menu was recently hidden.
         * @protected
         */
        protected wasRecentlyHidden(): boolean;

        /**
         * Dismiss the popup menu when an action fires.
         * @param {?goog.events.Event=} opt_e The optional event.
         * @private
         */
        private onAction_(opt_e?: goog.events.Event|null): void;

        /**
         * Handles a browser click event on one of the popup targets.
         * @param {?goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onTargetClick_(e: goog.events.BrowserEvent|null): void;

        /**
         * Handles a KEYDOWN browser event on one of the popup targets.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onTargetKeyboardAction_(e: goog.events.BrowserEvent): void;

        /**
         * Handles a browser event on one of the popup targets.
         * @param {?goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onTargetActivation_(e: goog.events.BrowserEvent|null): void;

        /**
         * Handles click events that propagate to the document.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @protected
         */
        protected onDocClick(e: goog.events.BrowserEvent): void;
    }
}
