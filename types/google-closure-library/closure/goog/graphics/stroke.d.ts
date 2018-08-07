/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.graphics.Stroke' {
    import alias = goog.graphics.Stroke;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * Creates an immutable stroke object.
     *
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     */
    class Stroke extends __Stroke {}
    abstract class __Stroke {
        /**
         * @param {number|string} width The width of the stroke.
         * @param {string} color The color of the stroke.
         * @param {number=} opt_opacity The opacity of the background fill. The value
         *    must be greater than or equal to zero (transparent) and less than or
         *    equal to 1 (opaque).
         */
        constructor(width: number|string, color: string, opt_opacity?: number);

        /**
         * The width of the stroke.
         * @type {number|string}
         * @private
         */
        private width_: number|string;

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
         * @return {number|string} The width of this stroke.
         */
        getWidth(): number|string;

        /**
         * @return {string} The color of this stroke.
         */
        getColor(): string;

        /**
         * @return {number} The opacity of this fill.
         */
        getOpacity(): number;
    }
}
