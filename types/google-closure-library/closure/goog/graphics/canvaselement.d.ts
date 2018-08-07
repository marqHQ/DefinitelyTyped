/// <reference path="../../../globals.d.ts"/>
/// <reference path="./groupelement.d.ts"/>
/// <reference path="./canvasgraphics.d.ts"/>
/// <reference path="./element.d.ts"/>
/// <reference path="./ellipseelement.d.ts"/>
/// <reference path="./stroke.d.ts"/>
/// <reference path="./fill.d.ts"/>
/// <reference path="./path.d.ts"/>
/// <reference path="./rectelement.d.ts"/>
/// <reference path="./pathelement.d.ts"/>
/// <reference path="./textelement.d.ts"/>
/// <reference path="./font.d.ts"/>
/// <reference path="./imageelement.d.ts"/>

declare module 'goog:goog.graphics.CanvasTextElement' {
    import alias = goog.graphics.CanvasTextElement;
    export default alias;
}

declare module 'goog:goog.graphics.CanvasRectElement' {
    import alias = goog.graphics.CanvasRectElement;
    export default alias;
}

declare module 'goog:goog.graphics.CanvasPathElement' {
    import alias = goog.graphics.CanvasPathElement;
    export default alias;
}

declare module 'goog:goog.graphics.CanvasImageElement' {
    import alias = goog.graphics.CanvasImageElement;
    export default alias;
}

declare module 'goog:goog.graphics.CanvasGroupElement' {
    import alias = goog.graphics.CanvasGroupElement;
    export default alias;
}

declare module 'goog:goog.graphics.CanvasEllipseElement' {
    import alias = goog.graphics.CanvasEllipseElement;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * Object representing a group of objects in a canvas.
     * This is an implementation of the goog.graphics.GroupElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.GroupElement}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class CanvasGroupElement extends __CanvasGroupElement {}
    abstract class __CanvasGroupElement extends goog.graphics.__GroupElement {
        /**
         * @param {goog.graphics.CanvasGraphics} graphics The graphics creating
         *     this element.
         */
        constructor(graphics: goog.graphics.CanvasGraphics);

        /**
         * Children contained by this group.
         * @type {Array<goog.graphics.Element>}
         * @private
         */
        private children_: goog.graphics.Element[];

        /**
         * Append a child to the group.  Does not draw it
         * @param {goog.graphics.Element} element The child to append.
         */
        appendChild(element: goog.graphics.Element): void;

        /**
         * Draw the group.
         * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
         */
        draw(ctx: CanvasRenderingContext2D): void;

        /**
         * Removes an element from the group.
         * @param {!goog.graphics.Element} elem the element to remove.
         */
        removeElement(elem: goog.graphics.Element): void;
    }

    /**
     * Thin wrapper for canvas ellipse elements.
     * This is an implementation of the goog.graphics.EllipseElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.EllipseElement}
     * @final
     */
    class CanvasEllipseElement extends __CanvasEllipseElement {}
    abstract class __CanvasEllipseElement extends goog.graphics.__EllipseElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.CanvasGraphics} graphics  The graphics creating
         *     this element.
         * @param {number} cx Center X coordinate.
         * @param {number} cy Center Y coordinate.
         * @param {number} rx Radius length for the x-axis.
         * @param {number} ry Radius length for the y-axis.
         * @param {goog.graphics.Stroke} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.CanvasGraphics,
            cx: number,
            cy: number,
            rx: number,
            ry: number,
            stroke: goog.graphics.Stroke,
            fill: goog.graphics.Fill
        );

        /**
         * X coordinate of the ellipse center.
         * @type {number}
         * @private
         */
        private cx_: number;

        /**
         * Y coordinate of the ellipse center.
         * @type {number}
         * @private
         */
        private cy_: number;

        /**
         * Radius length for the x-axis.
         * @type {number}
         * @private
         */
        private rx_: number;

        /**
         * Radius length for the y-axis.
         * @type {number}
         * @private
         */
        private ry_: number;

        /**
         * Internal path approximating an ellipse.
         * @type {goog.graphics.Path}
         * @private
         */
        private path_: goog.graphics.Path;

        /**
         * Internal path element that actually does the drawing.
         * @type {goog.graphics.CanvasPathElement}
         * @private
         */
        private pathElement_: goog.graphics.CanvasPathElement;

        /**
         * Sets up the path.
         * @private
         */
        private setUpPath_(): void;

        /**
         * Draw the ellipse.  Should be treated as package scope.
         * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
         */
        draw(ctx: CanvasRenderingContext2D): void;
    }

    /**
     * Thin wrapper for canvas rectangle elements.
     * This is an implementation of the goog.graphics.RectElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.RectElement}
     * @final
     */
    class CanvasRectElement extends __CanvasRectElement {}
    abstract class __CanvasRectElement extends goog.graphics.__RectElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.CanvasGraphics} graphics The graphics creating
         *     this element.
         * @param {number} x X coordinate (left).
         * @param {number} y Y coordinate (top).
         * @param {number} w Width of rectangle.
         * @param {number} h Height of rectangle.
         * @param {goog.graphics.Stroke} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.CanvasGraphics,
            x: number,
            y: number,
            w: number,
            h: number,
            stroke: goog.graphics.Stroke,
            fill: goog.graphics.Fill
        );

        /**
         * X coordinate of the top left corner.
         * @type {number}
         * @private
         */
        private x_: number;

        /**
         * Y coordinate of the top left corner.
         * @type {number}
         * @private
         */
        private y_: number;

        /**
         * Width of the rectangle.
         * @type {number}
         * @private
         */
        private w_: number;

        /**
         * Height of the rectangle.
         * @type {number}
         * @private
         */
        private h_: number;

        /**
         * Whether the rectangle has been drawn yet.
         * @type {boolean}
         * @private
         */
        private drawn_: boolean;

        /**
         * Draw the rectangle.  Should be treated as package scope.
         * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
         */
        draw(ctx: CanvasRenderingContext2D): void;
    }

    /**
     * Thin wrapper for canvas path elements.
     * This is an implementation of the goog.graphics.PathElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.PathElement}
     * @final
     */
    class CanvasPathElement extends __CanvasPathElement {}
    abstract class __CanvasPathElement extends goog.graphics.__PathElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.CanvasGraphics} graphics The graphics creating
         *     this element.
         * @param {!goog.graphics.Path} path The path object to draw.
         * @param {goog.graphics.Stroke} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.CanvasGraphics,
            path: goog.graphics.Path,
            stroke: goog.graphics.Stroke,
            fill: goog.graphics.Fill
        );

        /**
         * Whether the shape has been drawn yet.
         * @type {boolean}
         * @private
         */
        private drawn_: boolean;

        /**
         * The path to draw.
         * @type {goog.graphics.Path}
         * @private
         */
        private path_: goog.graphics.Path;

        /**
         * Draw the path.  Should be treated as package scope.
         * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
         * @suppress {deprecated} goog.graphics is deprecated.
         */
        draw(ctx: CanvasRenderingContext2D): void;
    }

    /**
     * Thin wrapper for canvas text elements.
     * This is an implementation of the goog.graphics.TextElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.TextElement}
     * @final
     */
    class CanvasTextElement extends __CanvasTextElement {}
    abstract class __CanvasTextElement extends goog.graphics.__TextElement {
        /**
         * @param {!goog.graphics.CanvasGraphics} graphics The graphics creating
         *     this element.
         * @param {string} text The text to draw.
         * @param {number} x1 X coordinate of start of line.
         * @param {number} y1 Y coordinate of start of line.
         * @param {number} x2 X coordinate of end of line.
         * @param {number} y2 Y coordinate of end of line.
         * @param {?string} align Horizontal alignment: left (default), center, right.
         * @param {!goog.graphics.Font} font Font describing the font properties.
         * @param {goog.graphics.Stroke} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill} fill The fill to use for this element.
         */
        constructor(
            graphics: goog.graphics.CanvasGraphics,
            text: string,
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            align: string|null,
            font: goog.graphics.Font,
            stroke: goog.graphics.Stroke,
            fill: goog.graphics.Fill
        );

        /**
         * The text to draw.
         * @type {string}
         * @private
         */
        private text_: string;

        /**
         * X coordinate of the start of the line the text is drawn on.
         * @type {number}
         * @private
         */
        private x1_: number;

        /**
         * Y coordinate of the start of the line the text is drawn on.
         * @type {number}
         * @private
         */
        private y1_: number;

        /**
         * X coordinate of the end of the line the text is drawn on.
         * @type {number}
         * @private
         */
        private x2_: number;

        /**
         * Y coordinate of the end of the line the text is drawn on.
         * @type {number}
         * @private
         */
        private y2_: number;

        /**
         * Horizontal alignment: left (default), center, right.
         * @type {string}
         * @private
         */
        private align_: string;

        /**
         * Font object describing the font properties.
         * @type {goog.graphics.Font}
         * @private
         */
        private font_: goog.graphics.Font;

        /**
         * The inner element that contains the text.
         * @type {Element}
         * @private
         */
        private innerElement_: Element;

        /**
         * Draw the text.  Should be treated as package scope.
         * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
         */
        draw(ctx: CanvasRenderingContext2D): void;

        /**
         * Update the styles of the DIVs.
         * @private
         */
        private updateStyle_(): void;

        /**
         * Update the text content.
         * @private
         */
        private updateText_(): void;
    }

    /**
     * Thin wrapper for canvas image elements.
     * This is an implementation of the goog.graphics.ImageElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.ImageElement}
     * @final
     */
    class CanvasImageElement extends __CanvasImageElement {}
    abstract class __CanvasImageElement extends goog.graphics.__ImageElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.CanvasGraphics} graphics The graphics creating
         *     this element.
         * @param {number} x X coordinate (left).
         * @param {number} y Y coordinate (top).
         * @param {number} w Width of rectangle.
         * @param {number} h Height of rectangle.
         * @param {string} src Source of the image.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.CanvasGraphics,
            x: number,
            y: number,
            w: number,
            h: number,
            src: string
        );

        /**
         * X coordinate of the top left corner.
         * @type {number}
         * @private
         */
        private x_: number;

        /**
         * Y coordinate of the top left corner.
         * @type {number}
         * @private
         */
        private y_: number;

        /**
         * Width of the rectangle.
         * @type {number}
         * @private
         */
        private w_: number;

        /**
         * Height of the rectangle.
         * @type {number}
         * @private
         */
        private h_: number;

        /**
         * URL of the image source.
         * @type {string}
         * @private
         */
        private src_: string;

        /**
         * Whether the image has been drawn yet.
         * @type {boolean}
         * @private
         */
        private drawn_: boolean;

        /**
         * Draw the image.  Should be treated as package scope.
         * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
         */
        draw(ctx: CanvasRenderingContext2D): void;

        /**
         * Handle an image load.
         * @param {Element} img The image element that finished loading.
         * @private
         */
        private handleImageLoad_(img: Element): void;
    }
}
