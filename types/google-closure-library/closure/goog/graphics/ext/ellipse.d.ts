/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./strokeandfillelement.d.ts"/>
/// <reference path="./group.d.ts"/>

declare module 'goog:goog.graphics.ext.Ellipse' {
    import alias = goog.graphics.ext.Ellipse;
    export default alias;
}

declare namespace goog.graphics.ext {
    /**
     * Wrapper for a graphics ellipse element.
     * @extends {goog.graphics.ext.StrokeAndFillElement}
     * @final
     */
    class Ellipse extends __Ellipse {}
    abstract class __Ellipse extends goog.graphics.ext.__StrokeAndFillElement {
        /**
         * @param {goog.graphics.ext.Group} group Parent for this element.
         */
        constructor(group: goog.graphics.ext.Group);
    }
}
