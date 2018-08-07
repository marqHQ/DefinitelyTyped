/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.graphics.Fill' {
    import alias = goog.graphics.Fill;
    export default alias;
}

declare namespace goog.graphics {
    /**
     * Creates a fill object
     * @deprecated goog.graphics is deprecated. It existed to abstract over browser
     *     differences before the canvas tag was widely supported.  See
     *     http://en.wikipedia.org/wiki/Canvas_element for details.
     */
    class Fill extends __Fill {}
    abstract class __Fill {
        /**
         */
        constructor();

        /**
         * @return {string} The start color of a gradient fill.
         */
        getColor1(): string;

        /**
         * @return {string} The end color of a gradient fill.
         */
        getColor2(): string;
    }
}
