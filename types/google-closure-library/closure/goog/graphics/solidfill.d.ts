/// <reference path="../../../globals.d.ts"/>
/// <reference path="./fill.d.ts"/>

declare module 'goog:goog.graphics.SolidFill' {
    import alias = goog.graphics.SolidFill;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * Creates an immutable solid color fill object.
     *
     * @extends {goog.graphics.Fill}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     */
    class SolidFill extends __SolidFill {}
    abstract class __SolidFill extends goog.graphics.__Fill {
        /**
         * @param {string} color The color of the background.
         * @param {number=} opt_opacity The opacity of the background fill. The value
         *    must be greater than or equal to zero (transparent) and less than or
         *    equal to 1 (opaque).
         */
        constructor(color: string, opt_opacity?: number);

        /**
         * The color with which to fill.
         * @type {string}
         * @private
         */
        private color_: string;

        /**
         * The opacity of the fill.
         * @type {number}
         * @private
         */
        private opacity_: number;

        /**
         * @return {string} The color of this fill.
         */
        getColor(): string;

        /**
         * @return {number} The opacity of this fill.
         */
        getOpacity(): number;
    }
}
