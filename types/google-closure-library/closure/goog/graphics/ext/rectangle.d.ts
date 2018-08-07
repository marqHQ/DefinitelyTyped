/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./strokeandfillelement.d.ts"/>
/// <reference path="./group.d.ts"/>

declare module 'goog:goog.graphics.ext.Rectangle' {
    import alias = goog.graphics.ext.Rectangle;
    export default alias;
}

declare namespace goog.graphics.ext {
    /**
     * Wrapper for a graphics rectangle element.
     * @extends {goog.graphics.ext.StrokeAndFillElement}
     * @final
     */
    class Rectangle extends __Rectangle {}
    abstract class __Rectangle extends goog.graphics.ext.__StrokeAndFillElement {
        /**
         * @param {goog.graphics.ext.Group} group Parent for this element.
         */
        constructor(group: goog.graphics.ext.Group);
    }
}
