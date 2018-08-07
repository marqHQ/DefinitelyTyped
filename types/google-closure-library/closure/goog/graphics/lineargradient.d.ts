/// <reference path="../../../globals.d.ts"/>
/// <reference path="./fill.d.ts"/>

declare module 'goog:goog.graphics.LinearGradient' {
    import alias = goog.graphics.LinearGradient;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * Creates an immutable linear gradient fill object.
     *
     * @extends {goog.graphics.Fill}
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     * @final
     */
    class LinearGradient extends __LinearGradient {}
    abstract class __LinearGradient extends goog.graphics.__Fill {
        /**
         * @param {number} x1 Start X position of the gradient.
         * @param {number} y1 Start Y position of the gradient.
         * @param {number} x2 End X position of the gradient.
         * @param {number} y2 End Y position of the gradient.
         * @param {string} color1 Start color of the gradient.
         * @param {string} color2 End color of the gradient.
         * @param {?number=} opt_opacity1 Start opacity of the gradient, both or neither
         *     of opt_opacity1 and opt_opacity2 have to be set.
         * @param {?number=} opt_opacity2 End opacity of the gradient.
         */
        constructor(
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            color1: string,
            color2: string,
            opt_opacity1?: number|null,
            opt_opacity2?: number|null
        );

        /**
         * Start X position of the gradient.
         * @type {number}
         * @private
         */
        private x1_: number;

        /**
         * Start Y position of the gradient.
         * @type {number}
         * @private
         */
        private y1_: number;

        /**
         * End X position of the gradient.
         * @type {number}
         * @private
         */
        private x2_: number;

        /**
         * End Y position of the gradient.
         * @type {number}
         * @private
         */
        private y2_: number;

        /**
         * Start color of the gradient.
         * @type {string}
         * @private
         */
        private color1_: string;

        /**
         * End color of the gradient.
         * @type {string}
         * @private
         */
        private color2_: string;

        /**
         * Start opacity of the gradient.
         * @type {?number}
         * @private
         */
        private opacity1_: number|null;

        /**
         * End opacity of the gradient.
         * @type {?number}
         * @private
         */
        private opacity2_: number|null;

        /**
         * @return {number} The start X position of the gradient.
         */
        getX1(): number;

        /**
         * @return {number} The start Y position of the gradient.
         */
        getY1(): number;

        /**
         * @return {number} The end X position of the gradient.
         */
        getX2(): number;

        /**
         * @return {number} The end Y position of the gradient.
         */
        getY2(): number;

        /**
         * @return {?number} The start opacity of the gradient.
         */
        getOpacity1(): number|null;

        /**
         * @return {?number} The end opacity of the gradient.
         */
        getOpacity2(): number|null;
    }
}
