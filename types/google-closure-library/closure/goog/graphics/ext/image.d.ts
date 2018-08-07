/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./element.d.ts"/>
/// <reference path="./group.d.ts"/>

declare module 'goog:goog.graphics.ext.Image' {
    import alias = goog.graphics.ext.Image;
    export default alias;
}

declare namespace goog.graphics.ext {
    /**
     * Wrapper for a graphics image element.
     * @extends {goog.graphics.ext.Element}
     * @final
     */
    class Image extends __Image {}
    abstract class __Image extends goog.graphics.ext.__Element {
        /**
         * @param {goog.graphics.ext.Group} group Parent for this element.
         * @param {string} src The path to the image to display.
         */
        constructor(group: goog.graphics.ext.Group, src: string);

        /**
         * Update the source of the image.
         * @param {string} src  Source of the image.
         */
        setSource(src: string): void;
    }
}
