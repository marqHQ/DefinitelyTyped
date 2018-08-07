/// <reference path="../../../globals.d.ts"/>
/// <reference path="./groupelement.d.ts"/>
/// <reference path="./svggraphics.d.ts"/>
/// <reference path="./ellipseelement.d.ts"/>
/// <reference path="./stroke.d.ts"/>
/// <reference path="./fill.d.ts"/>
/// <reference path="./rectelement.d.ts"/>
/// <reference path="./pathelement.d.ts"/>
/// <reference path="./textelement.d.ts"/>
/// <reference path="./imageelement.d.ts"/>

declare module 'goog:goog.graphics.SvgTextElement' {
    import alias = goog.graphics.SvgTextElement;
    export default alias;
}

declare module 'goog:goog.graphics.SvgRectElement' {
    import alias = goog.graphics.SvgRectElement;
    export default alias;
}

declare module 'goog:goog.graphics.SvgPathElement' {
    import alias = goog.graphics.SvgPathElement;
    export default alias;
}

declare module 'goog:goog.graphics.SvgImageElement' {
    import alias = goog.graphics.SvgImageElement;
    export default alias;
}

declare module 'goog:goog.graphics.SvgGroupElement' {
    import alias = goog.graphics.SvgGroupElement;
    export default alias;
}

declare module 'goog:goog.graphics.SvgEllipseElement' {
    import alias = goog.graphics.SvgEllipseElement;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * Thin wrapper for SVG group elements.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.GroupElement}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class SvgGroupElement extends __SvgGroupElement {}
    abstract class __SvgGroupElement extends goog.graphics.__GroupElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.SvgGraphics} graphics The graphics creating
         *     this element.
         */
        constructor(element: Element, graphics: goog.graphics.SvgGraphics);
    }

    /**
     * Thin wrapper for SVG ellipse elements.
     * This is an implementation of the goog.graphics.EllipseElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.EllipseElement}
     * @final
     */
    class SvgEllipseElement extends __SvgEllipseElement {}
    abstract class __SvgEllipseElement extends goog.graphics.__EllipseElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.SvgGraphics} graphics The graphics creating
         *     this element.
         * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill?} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.SvgGraphics,
            stroke: goog.graphics.Stroke|null,
            fill: goog.graphics.Fill|null
        );
    }

    /**
     * Thin wrapper for SVG rectangle elements.
     * This is an implementation of the goog.graphics.RectElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.RectElement}
     * @final
     */
    class SvgRectElement extends __SvgRectElement {}
    abstract class __SvgRectElement extends goog.graphics.__RectElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.SvgGraphics} graphics The graphics creating
         *     this element.
         * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill?} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.SvgGraphics,
            stroke: goog.graphics.Stroke|null,
            fill: goog.graphics.Fill|null
        );
    }

    /**
     * Thin wrapper for SVG path elements.
     * This is an implementation of the goog.graphics.PathElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.PathElement}
     * @final
     */
    class SvgPathElement extends __SvgPathElement {}
    abstract class __SvgPathElement extends goog.graphics.__PathElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.SvgGraphics} graphics The graphics creating
         *     this element.
         * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill?} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.SvgGraphics,
            stroke: goog.graphics.Stroke|null,
            fill: goog.graphics.Fill|null
        );
    }

    /**
     * Thin wrapper for SVG text elements.
     * This is an implementation of the goog.graphics.TextElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.TextElement}
     * @final
     */
    class SvgTextElement extends __SvgTextElement {}
    abstract class __SvgTextElement extends goog.graphics.__TextElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.SvgGraphics} graphics The graphics creating
         *     this element.
         * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
         * @param {goog.graphics.Fill?} fill The fill to use for this element.
         */
        constructor(
            element: Element,
            graphics: goog.graphics.SvgGraphics,
            stroke: goog.graphics.Stroke|null,
            fill: goog.graphics.Fill|null
        );
    }

    /**
     * Thin wrapper for SVG image elements.
     * This is an implementation of the goog.graphics.ImageElement interface.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.ImageElement}
     * @final
     */
    class SvgImageElement extends __SvgImageElement {}
    abstract class __SvgImageElement extends goog.graphics.__ImageElement {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.SvgGraphics} graphics The graphics creating
         *     this element.
         */
        constructor(element: Element, graphics: goog.graphics.SvgGraphics);
    }
}
