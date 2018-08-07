/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../math/rect.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.ScrollFloater' {
    import alias = goog.ui.ScrollFloater;
    export default alias;
}

declare module 'goog:goog.ui.ScrollFloater.EventType' {
    import alias = goog.ui.ScrollFloater.EventType;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Creates a ScrollFloater; see file overview for details.
     *
     * @extends {goog.ui.Component}
     */
    class ScrollFloater extends __ScrollFloater {}
    abstract class __ScrollFloater extends goog.ui.__Component {
        /**
         * @param {Element=} opt_parentElement Where to attach the element when it's
         *     floating.  Default is the document body.  If the floating element
         *     contains form inputs, it will be necessary to attach it to the
         *     corresponding form element, or to an element in the DOM subtree under
         *     the form element.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_parentElement?: Element, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The element to which the scroll-floated element will be attached
         * when it is floating.
         * @type {Element}
         * @private
         */
        private parentElement_: Element;

        /**
         * The original styles applied to the element before it began floating;
         * used to restore those styles when the element stops floating.
         * @type {Object}
         * @private
         */
        private originalStyles_: Object;

        /**
         * A vertical offset from which to start floating the element.  This is
         * useful in cases when there are 'position:fixed' elements covering up
         * part of the viewport.
         * @type {number}
         * @private
         */
        private viewportTopOffset_: number;

        /**
         * An element used to define the boundaries within which the floater can
         * be positioned.
         * @type {Element}
         * @private
         */
        private containerElement_: Element;

        /**
         * Container element's bounding rectangle.
         * @type {goog.math.Rect}
         * @private
         */
        private containerBounds_: goog.math.Rect;

        /**
         * Element's original bounding rectangle.
         * @type {goog.math.Rect}
         * @private
         */
        private originalBounds_: goog.math.Rect;

        /**
         * Element's top offset when it's not floated or pinned.
         * @type {number}
         * @private
         */
        private originalTopOffset_: number;

        /**
         * Element's left offset when it's not floated or pinned.
         * @type {number}
         * @private
         */
        private originalLeftOffset_: number;

        /**
         * The placeholder element dropped in to hold the layout for
         * the floated element.
         * @type {Element}
         * @private
         */
        private placeholder_: Element;

        /**
         * Whether scrolling is enabled for this element; true by default.
         * The {@link #setScrollingEnabled} method can be used to change this value.
         * @type {boolean}
         * @private
         */
        private scrollingEnabled_: boolean;

        /**
         * A flag indicating whether this instance is currently pinned to the bottom
         * of the container element.
         * @type {boolean}
         * @private
         */
        private pinned_: boolean;

        /**
         * A flag indicating whether this instance is currently floating.
         * @type {boolean}
         * @private
         */
        private floating_: boolean;

        /**
         * Forces the component to update the cached element positions and sizes and
         * to re-evaluate whether the the component should be docked, floated or
         * pinned.
         */
        update(): void;

        /**
         * Sets whether the element should be floated if it scrolls out of view.
         * @param {boolean} enable Whether floating is enabled for this element.
         */
        setScrollingEnabled(enable: boolean): void;

        /**
         * @return {boolean} Whether the component is enabled for scroll-floating.
         */
        isScrollingEnabled(): boolean;

        /**
         * @return {boolean} Whether the component is currently scroll-floating.
         */
        isFloating(): boolean;

        /**
         * @return {boolean} Whether the component is currently pinned to the bottom
         *     of the container.
         */
        isPinned(): boolean;

        /**
         * @param {number} offset A vertical offset from the top of the viewport, from
         *    which to start floating the element. Default is 0. This is useful in cases
         *    when there are 'position:fixed' elements covering up part of the viewport.
         */
        setViewportTopOffset(offset: number): void;

        /**
         * @param {Element} container An element used to define the boundaries within
         *     which the floater can be positioned. If not specified, scrolling the page
         *     down far enough may result in the floated element extending past the
         *     containing element as it is being scrolled out of the viewport. In some
         *     cases, such as a list with a sticky header, this may be undesirable. If
         *     the container element is specified and the floated element extends past
         *     the bottom of the container, the element will be pinned to the bottom of
         *     the container.
         */
        setContainerElement(container: Element): void;

        /**
         * When a scroll event occurs, compares the element's position to the current
         * document scroll position, and stops or starts floating behavior if needed.
         * @param {goog.events.Event=} opt_e The event, which is ignored.
         * @private
         */
        private handleScroll_(opt_e?: goog.events.Event): void;

        /**
         * Pins the element to the bottom of the container, making as much of the
         * element visible as possible without extending past it.
         * @private
         */
        private pin_(): void;

        /**
         * Begins floating behavior, making the element position:fixed (or IE hacked
         * equivalent) and inserting a placeholder where it used to be to keep the
         * layout from shifting around. For IE < 7 users, we only support floating at
         * the top.
         * @param {goog.ui.ScrollFloater.FloatMode_} floatMode The position at which we
         *     should float.
         * @private
         */
        private float_(floatMode: any): void;

        /**
         * Stops floating behavior, returning element to its original state.
         * @return {boolean} True if the the element has been docked.  False if the
         *     element is already docked or the event was cancelled.
         * @private
         */
        private dock_(): boolean;

        /**
         * Handle horizontal scroll events by updating the left offset position. This
         * cannot change the floating or docked state and is only valid while the
         * element is floating.
         * @private
         */
        private updateFloatingLeftPosition_(): void;

        /**
         * @private
         */
        private storeOriginalStyles_(): void;

        /**
         * @private
         */
        private restoreOriginalStyles_(): void;

        /**
         * Determines whether we need to apply the position hack to emulated position:
         * fixed on this browser.
         * @return {boolean} Whether the current browser needs the position hack.
         * @private
         */
        private needsIePositionHack_(): boolean;

        /**
         * Sets some magic CSS properties that make float-scrolling work smoothly
         * in IE6 (and IE7 in quirks mode). Without this hack, the floating element
         * will appear jumpy when you scroll the document. This involves modifying
         * the background of the HTML element (or BODY in quirks mode). If there's
         * already a background image in use this is not required.
         * For further reading, see
         * http://annevankesteren.nl/2005/01/position-fixed-in-ie
         * @private
         */
        private applyIeBgHack_(): void;
    }
}

declare namespace goog.ui.ScrollFloater {
    /**
     * Events dispatched by this component.
     * @enum {string}
     */
    enum EventType { FLOAT, DOCK, PIN }
}
