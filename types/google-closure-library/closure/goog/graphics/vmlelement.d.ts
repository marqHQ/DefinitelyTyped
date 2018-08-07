/// <reference path="../../../globals.d.ts"/>
/// <reference path="./groupelement.d.ts"/>
/// <reference path="./vmlgraphics.d.ts"/>
/// <reference path="./ellipseelement.d.ts"/>
/// <reference path="./stroke.d.ts"/>
/// <reference path="./fill.d.ts"/>
/// <reference path="./rectelement.d.ts"/>
/// <reference path="./pathelement.d.ts"/>
/// <reference path="./textelement.d.ts"/>
/// <reference path="./imageelement.d.ts"/>

declare module 'goog:goog.graphics.VmlTextElement' {
    import alias = goog.graphics.VmlTextElement;
    export default alias;
}

declare module 'goog:goog.graphics.VmlRectElement' {
    import alias = goog.graphics.VmlRectElement;
    export default alias;
}

declare module 'goog:goog.graphics.VmlPathElement' {
    import alias = goog.graphics.VmlPathElement;
    export default alias;
}

declare module 'goog:goog.graphics.VmlImageElement' {
    import alias = goog.graphics.VmlImageElement;
    export default alias;
}

declare module 'goog:goog.graphics.VmlGroupElement' {
    import alias = goog.graphics.VmlGroupElement;
    export default alias;
}

declare module 'goog:goog.graphics.VmlEllipseElement' {
    import alias = goog.graphics.VmlEllipseElement;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * Thin wrapper for VML group elements.
     * This is an implementation of the goog.graphics.GroupElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.GroupElement}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class VmlGroupElement extends __VmlGroupElement {}
    abstract class __VmlGroupElement extends goog.graphics.__GroupElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.VmlGraphics} graphics The graphics creating
         *     this element.
         */
        constructor(element: Element, graphics: goog.graphics.VmlGraphics);

        /**
         * @return {boolean} True if this group is the root canvas element.
         * @private
         */
        private isRootElement_(): boolean;
    }

    /**
     * Thin wrapper for VML ellipse elements.
     * This is an implementation of the goog.graphics.EllipseElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.EllipseElement}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class VmlEllipseElement extends __VmlEllipseElement {}
    abstract class __VmlEllipseElement extends goog.graphics.__EllipseElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.VmlGraphics} graphics  The graphics creating
         *     this element.
         * @param {number} cx Center X coordinate.
         * @param {number} cy Center Y coordinate.
         * @param {number} rx Radius length for the x-axis.
         * @param {number} ry Radius length for the y-axis.
         * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill?} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.VmlGraphics,
            cx: number,
            cy: number,
            rx: number,
            ry: number,
            stroke: goog.graphics.Stroke|null,
            fill: goog.graphics.Fill|null
        );

        /**
         * X coordinate of the ellipse center.
         * @type {number}
         */
        cx: number;

        /**
         * Y coordinate of the ellipse center.
         * @type {number}
         */
        cy: number;

        /**
         * Radius length for the x-axis.
         * @type {number}
         */
        rx: number;

        /**
         * Radius length for the y-axis.
         * @type {number}
         */
        ry: number;
    }

    /**
     * Thin wrapper for VML rectangle elements.
     * This is an implementation of the goog.graphics.RectElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.RectElement}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class VmlRectElement extends __VmlRectElement {}
    abstract class __VmlRectElement extends goog.graphics.__RectElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.VmlGraphics} graphics The graphics creating
         *     this element.
         * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill?} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.VmlGraphics,
            stroke: goog.graphics.Stroke|null,
            fill: goog.graphics.Fill|null
        );
    }

    /**
     * Thin wrapper for VML path elements.
     * This is an implementation of the goog.graphics.PathElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.PathElement}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class VmlPathElement extends __VmlPathElement {}
    abstract class __VmlPathElement extends goog.graphics.__PathElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.VmlGraphics} graphics The graphics creating
         *     this element.
         * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill?} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.VmlGraphics,
            stroke: goog.graphics.Stroke|null,
            fill: goog.graphics.Fill|null
        );
    }

    /**
     * Thin wrapper for VML text elements.
     * This is an implementation of the goog.graphics.TextElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.TextElement}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class VmlTextElement extends __VmlTextElement {}
    abstract class __VmlTextElement extends goog.graphics.__TextElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.VmlGraphics} graphics The graphics creating
         *     this element.
         * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill?} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.VmlGraphics,
            stroke: goog.graphics.Stroke|null,
            fill: goog.graphics.Fill|null
        );
    }

    /**
     * Thin wrapper for VML image elements.
     * This is an implementation of the goog.graphics.ImageElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.ImageElement}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class VmlImageElement extends __VmlImageElement {}
    abstract class __VmlImageElement extends goog.graphics.__ImageElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.VmlGraphics} graphics The graphics creating
         *     this element.
         */
        constructor(element: Element, graphics: goog.graphics.VmlGraphics);
    }
}
