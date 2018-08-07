/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../../../closure/goog/disposable/disposable.d.ts"/>
/// <reference path="../../../../closure/goog/events/event.d.ts"/>

declare module 'goog:svgpan.SvgPan' {
    import alias = svgpan.SvgPan;
    export default alias;
}

declare namespace svgpan {
    /**
     * Instantiates an SvgPan object.
     * @extends {goog.Disposable}
     */
    class SvgPan extends __SvgPan {}
    abstract class __SvgPan extends goog.__Disposable {
        /**
         * @param {string=} opt_graphElementId The id of the graph element.
         * @param {Element=} opt_root An optional document root.
         */
        constructor(opt_graphElementId?: string, opt_root?: Element);

        /** @private {Element} */
        private root_: any /*missing*/;

        /** @private {?string} */
        private graphElementId_: any /*missing*/;

        /** @private {boolean} */
        private cancelNextClick_: any /*missing*/;

        /** @private {boolean} */
        private enablePan_: any /*missing*/;

        /** @private {boolean} */
        private enableZoom_: any /*missing*/;

        /** @private {boolean} */
        private enableDrag_: any /*missing*/;

        /** @private {number} */
        private zoomScale_: any /*missing*/;

        /** @private {svgpan.SvgPan.State} */
        private state_: any /*missing*/;

        /** @private {Element} */
        private svgRoot_: any /*missing*/;

        /** @private {Element} */
        private stateTarget_: any /*missing*/;

        /** @private {SVGPoint} */
        private stateOrigin_: any /*missing*/;

        /** @private {SVGMatrix} */
        private stateTf_: any /*missing*/;

        /** @private {goog.events.MouseWheelHandler} */
        private mouseWheelHandler_: any /*missing*/;

        /**
         * Enables/disables panning the entire SVG (default = true).
         * @param {boolean} enabled Whether or not to allow panning.
         */
        setPanEnabled(enabled: boolean): void;

        /**
         * Enables/disables zooming (default = true).
         * @param {boolean} enabled Whether or not to allow zooming (default = true).
         */
        setZoomEnabled(enabled: boolean): void;

        /**
         * Enables/disables dragging individual SVG objects (default = false).
         * @param {boolean} enabled Whether or not to allow dragging of objects.
         */
        setDragEnabled(enabled: boolean): void;

        /**
         * Sets the sensitivity of mousewheel zooming (default = 0.4).
         * @param {number} scale The new zoom scale.
         */
        setZoomScale(scale: number): void;

        /**
         * Registers mouse event handlers.
         * @private
         */
        private setupHandlers_(): void;

        /**
         * Retrieves the root element for SVG manipulation. The element is then cached.
         * @param {Document} svgDoc The document.
         * @return {Element} The svg root.
         * @private
         */
        private getRoot_(svgDoc: Document): Element;

        /**
         * Instantiates an SVGPoint object with given event coordinates.
         * @param {!goog.events.Event} evt The event with coordinates.
         * @return {SVGPoint} The created point.
         * @private
         */
        private getEventPoint_(evt: goog.events.Event): SVGPoint;

        /**
         * Instantiates an SVGPoint object with given coordinates.
         * @param {number} x The x coordinate.
         * @param {number} y The y coordinate.
         * @return {SVGPoint} The created point.
         * @private
         */
        private newPoint_(x: number, y: number): SVGPoint;

        /**
         * Sets the current transform matrix of an element.
         * @param {Element} element The element.
         * @param {SVGMatrix} matrix The transform matrix.
         * @private
         */
        private setCtm_(element: Element, matrix: SVGMatrix): void;

        /**
         * Handle mouse wheel event.
         * @param {!goog.events.Event} evt The event.
         * @private
         */
        private handleMouseWheel_(evt: goog.events.Event): void;

        /**
         * Handle mouse move event.
         * @param {!goog.events.Event} evt The event.
         * @private
         */
        private handleMouseMove_(evt: goog.events.Event): void;

        /**
         * Handles mouse motion for the given coordinates.
         * @param {number} x The x coordinate.
         * @param {number} y The y coordinate.
         * @param {Document} svgDoc The svg document.
         */
        handleMove(x: number, y: number, svgDoc: Document): void;

        /**
         * Handle click event.
         * @param {!goog.events.Event} evt The event.
         * @private
         */
        private handleMouseDown_(evt: goog.events.Event): void;

        /**
         * Handle mouse button release event.
         * @param {!goog.events.Event} evt The event.
         * @private
         */
        private handleMouseUp_(evt: goog.events.Event): void;

        /**
         * Ends pan/drag mode.
         */
        endPanOrDrag(): void;

        /**
         * Handle mouse clicks.
         * @param {!goog.events.Event} evt The event.
         * @private
         */
        private handleMouseClick_(evt: goog.events.Event): void;

        /**
         * Returns the current state.
         * @return {!svgpan.SvgPan.State}
         */
        getState(): svgpan.SvgPan.State;
    }
}

declare namespace svgpan.SvgPan {
    /**
     * @enum {string}
     */
    enum State { NONE, PAN, DRAG }
}
