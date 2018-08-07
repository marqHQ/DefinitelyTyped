/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./element.d.ts"/>
/// <reference path="./group.d.ts"/>
/// <reference path="../strokeandfillelement.d.ts"/>
/// <reference path="../fill.d.ts"/>
/// <reference path="../stroke.d.ts"/>

declare module 'goog:goog.graphics.ext.StrokeAndFillElement' {
    import alias = goog.graphics.ext.StrokeAndFillElement;
    export default alias;
}

declare namespace goog.graphics.ext {
    /**
     * Interface for a graphics element that has a stroke and fill.
     * This is the base interface for ellipse, rectangle and other
     * shape interfaces.
     * You should not construct objects from this constructor. Use a subclass.
     * @extends {goog.graphics.ext.Element}
     */
    class StrokeAndFillElement extends __StrokeAndFillElement {}
    abstract class __StrokeAndFillElement extends goog.graphics.ext.__Element {
        /**
         * @param {goog.graphics.ext.Group} group Parent for this element.
         * @param {goog.graphics.StrokeAndFillElement} wrapper The thin wrapper to wrap.
         */
        constructor(group: goog.graphics.ext.Group, wrapper: goog.graphics.StrokeAndFillElement);

        /**
         * Sets the fill for this element.
         * @param {goog.graphics.Fill?} fill The fill object.
         */
        setFill(fill: goog.graphics.Fill|null): void;

        /**
         * Sets the stroke for this element.
         * @param {goog.graphics.Stroke?} stroke The stroke object.
         */
        setStroke(stroke: goog.graphics.Stroke|null): void;
    }
}
