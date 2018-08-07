/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./strokeandfillelement.d.ts"/>
/// <reference path="./group.d.ts"/>
/// <reference path="./path.d.ts"/>
/// <reference path="../path.d.ts"/>
/// <reference path="../../math/rect.d.ts"/>

declare module 'goog:goog.graphics.ext.Shape' {
    import alias = goog.graphics.ext.Shape;
    export default alias;
}

declare namespace goog.graphics.ext {
    /**
     * Wrapper for a graphics shape element.
     * @extends {goog.graphics.ext.StrokeAndFillElement}
     * @final
     */
    class Shape extends __Shape {}
    abstract class __Shape extends goog.graphics.ext.__StrokeAndFillElement {
        /**
         * @param {goog.graphics.ext.Group} group Parent for this element.
         * @param {!goog.graphics.ext.Path} path  The path to draw.
         * @param {boolean=} opt_autoSize Optional flag to specify the path should
         *     automatically resize to fit the element.  Defaults to false.
         */
        constructor(group: goog.graphics.ext.Group, path: goog.graphics.ext.Path, opt_autoSize?: boolean);

        /**
         * Whether or not to automatically resize the shape's path when the element
         * itself is resized.
         * @type {boolean}
         * @private
         */
        private autoSize_: boolean;

        /**
         * The original path, specified by the caller.
         * @type {goog.graphics.Path}
         * @private
         */
        private path_: goog.graphics.Path;

        /**
         * The bounding box of the original path.
         * @type {goog.math.Rect?}
         * @private
         */
        private boundingBox_: goog.math.Rect|null;

        /**
         * The scaled path.
         * @type {goog.graphics.Path}
         * @private
         */
        private scaledPath_: goog.graphics.Path;

        /**
         * Get the path drawn by this shape.
         * @return {goog.graphics.Path?} The path drawn by this shape.
         */
        getPath(): goog.graphics.Path|null;

        /**
         * Set the path to draw.
         * @param {goog.graphics.ext.Path} path The path to draw.
         */
        setPath(path: goog.graphics.ext.Path): void;

        /**
         * Scale the internal path to fit.
         * @private
         */
        private scaleAndSetPath_(): void;
    }
}
