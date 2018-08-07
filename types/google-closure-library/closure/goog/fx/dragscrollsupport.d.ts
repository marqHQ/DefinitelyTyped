/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="../timer/timer.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>
/// <reference path="../math/rect.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.fx.DragScrollSupport' {
    import alias = goog.fx.DragScrollSupport;
    export default alias;
}

declare namespace goog.fx {
    /**
     * A scroll support class. Currently this class will automatically scroll
     * a scrollable container node and scroll it by a fixed amount at a timed
     * interval when the mouse is moved above or below the container or in vertical
     * margin areas. Intended for use in drag and drop. This could potentially be
     * made more general and could support horizontal scrolling.
     *
     * @struct
     * @extends {goog.Disposable}
     * @see ../demos/dragscrollsupport.html
     */
    class DragScrollSupport extends __DragScrollSupport {}
    abstract class __DragScrollSupport extends goog.__Disposable {
        /**
         * @param {Element} containerNode A container that can be scrolled.
         * @param {number=} opt_margin Optional margin to use while scrolling.
         * @param {boolean=} opt_externalMouseMoveTracking Whether mouse move events
         *     are tracked externally by the client object which calls the mouse move
         *     event handler, useful when events are generated for more than one source
         *     element and/or are not real mousemove events.
         */
        constructor(containerNode: Element, opt_margin?: number, opt_externalMouseMoveTracking?: boolean);

        /**
         * Whether scrolling should be constrained to happen only when the cursor is
         * inside the container node.
         * @private {boolean}
         */
        private constrainScroll_: any /*missing*/;

        /**
         * Whether horizontal scrolling is allowed.
         * @private {boolean}
         */
        private horizontalScrolling_: any /*missing*/;

        /**
         * The container to be scrolled.
         * @type {Element}
         * @private
         */
        private containerNode_: Element;

        /**
         * Scroll timer that will scroll the container until it is stopped.
         * It will scroll when the mouse is outside the scrolling area of the
         * container.
         *
         * @type {goog.Timer}
         * @private
         */
        private scrollTimer_: goog.Timer;

        /**
         * EventHandler used to set up and tear down listeners.
         * @type {goog.events.EventHandler<!goog.fx.DragScrollSupport>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.fx.DragScrollSupport>;

        /**
         * The current scroll delta.
         * @type {goog.math.Coordinate}
         * @private
         */
        private scrollDelta_: goog.math.Coordinate;

        /**
         * The container bounds.
         * @type {goog.math.Rect}
         * @private
         */
        private containerBounds_: goog.math.Rect;

        /**
         * The margin for triggering a scroll.
         * @type {number}
         * @private
         */
        private margin_: number;

        /**
         * The bounding rectangle which if left triggers scrolling.
         * @type {goog.math.Rect}
         * @private
         */
        private scrollBounds_: goog.math.Rect;

        /**
         * Sets whether scrolling should be constrained to happen only when the cursor
         * is inside the container node.
         * NOTE: If a margin is not set, then it does not make sense to
         * contain the scroll, because in that case scroll will never be triggered.
         * @param {boolean} constrain Whether scrolling should be constrained to happen
         *     only when the cursor is inside the container node.
         */
        setConstrainScroll(constrain: boolean): void;

        /**
         * Sets whether horizontal scrolling is allowed.
         * @param {boolean} scrolling Whether horizontal scrolling is allowed.
         */
        setHorizontalScrolling(scrolling: boolean): void;

        /**
         * Constrains the container bounds with respect to the margin.
         *
         * @param {goog.math.Rect} bounds The container element.
         * @return {goog.math.Rect} The bounding rectangle used to calculate scrolling
         *     direction.
         * @private
         */
        private constrainBounds_(bounds: goog.math.Rect): goog.math.Rect;

        /**
         * Attaches listeners and activates automatic scrolling.
         * @param {boolean} externalMouseMoveTracking Whether to enable internal
         *     mouse move event handling.
         * @private
         */
        private setupListeners_(externalMouseMoveTracking: boolean): void;

        /**
         * Handler for timer tick event, scrolls the container by one scroll step if
         * needed.
         * @param {goog.events.Event} event Timer tick event.
         * @private
         */
        private onTick_(event: goog.events.Event): void;

        /**
         * Handler for mouse moves events.
         * @param {goog.events.Event} event Mouse move event.
         */
        onMouseMove(event: goog.events.Event): void;

        /**
         * Gets whether the input coordinate is in the container bounds.
         * @param {number} x The x coordinate.
         * @param {number} y The y coordinate.
         * @return {boolean} Whether the input coordinate is in the container bounds.
         * @private
         */
        private isInContainerBounds_(x: number, y: number): boolean;

        /**
         * Calculates scroll delta.
         *
         * @param {number} coordinate Current mouse pointer coordinate.
         * @param {number} min The coordinate value below which scrolling up should be
         *     started.
         * @param {number} rangeLength The length of the range in which scrolling should
         *     be disabled and above which scrolling down should be started.
         * @return {number} The calculated scroll delta.
         * @protected
         */
        protected calculateScrollDelta(coordinate: number, min: number, rangeLength: number): number;
    }
}

declare namespace goog.fx.DragScrollSupport {
    /**
     * The suggested scrolling margin.
     * @type {number}
     */
    let MARGIN: number;
}
