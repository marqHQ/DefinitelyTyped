/// <reference path="../../../globals.d.ts"/>
/// <reference path="./element.d.ts"/>
/// <reference path="./abstractgraphics.d.ts"/>

declare module 'goog:goog.graphics.GroupElement' {
    import alias = goog.graphics.GroupElement;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * Interface for a graphics group element.
     * You should not construct objects from this constructor. The graphics
     * will return the object for you.
     * @extends {goog.graphics.Element}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     */
    class GroupElement extends __GroupElement {}
    abstract class __GroupElement extends goog.graphics.__Element {
        /**
         * @param {Element} element The DOM element to wrap.
         * @param {goog.graphics.AbstractGraphics} graphics The graphics creating
         *     this element.
         */
        constructor(element: Element, graphics: goog.graphics.AbstractGraphics);

        /**
         * Remove all drawing elements from the group.
         */
        clear: any /*missing*/;

        /**
         * Set the size of the group element.
         * @param {number|string} width The width of the group element.
         * @param {number|string} height The height of the group element.
         */
        setSize(width: number|string, height: number|string): void;
    }
}
