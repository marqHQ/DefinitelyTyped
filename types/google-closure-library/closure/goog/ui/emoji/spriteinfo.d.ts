/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.ui.emoji.SpriteInfo' {
    import alias = goog.ui.emoji.SpriteInfo;
    export default alias;
}

declare namespace goog.ui.emoji {
    /**
     * Creates a SpriteInfo object with the specified properties. If the image is
     * sprited via CSS, then only the first parameter needs a value. If the image
     * is sprited via metadata, then the first parameter should be left null.
     *
     * @final
     */
    class SpriteInfo extends __SpriteInfo {}
    abstract class __SpriteInfo {
        /**
         * @param {?string} cssClass CSS class to properly display the sprited image.
         * @param {string=} opt_url Url of the sprite image.
         * @param {number=} opt_width Width of the image being sprited.
         * @param {number=} opt_height Height of the image being sprited.
         * @param {number=} opt_xOffset Positive x offset of the image being sprited
         *     within the sprite.
         * @param {number=} opt_yOffset Positive y offset of the image being sprited
         *     within the sprite.
         * @param {boolean=} opt_animated Whether the sprite is animated.
         */
        constructor(
            cssClass: string|null,
            opt_url?: string,
            opt_width?: number,
            opt_height?: number,
            opt_xOffset?: number,
            opt_yOffset?: number,
            opt_animated?: boolean
        );

        /**
         * Name of the CSS class to properly display the sprited image.
         * @type {string}
         * @private
         */
        private cssClass_: string;

        /**
         * Url of the sprite image.
         * @type {string|undefined}
         * @private
         */
        private url_: string|undefined;

        /**
         * Width of the image being sprited.
         * @type {number|undefined}
         * @private
         */
        private width_: number|undefined;

        /**
         * Height of the image being sprited.
         * @type {number|undefined}
         * @private
         */
        private height_: number|undefined;

        /**
         * Positive x offset of the image being sprited within the sprite.
         * @type {number|undefined}
         * @private
         */
        private xOffset_: number|undefined;

        /**
         * Positive y offset of the image being sprited within the sprite.
         * @type {number|undefined}
         * @private
         */
        private yOffset_: number|undefined;

        /**
         * Whether the emoji specified by the sprite is animated.
         * @type {boolean}
         * @private
         */
        private animated_: boolean;

        /**
         * Returns the css class of the sprited image.
         * @return {?string} Name of the CSS class to properly display the sprited
         *     image.
         */
        getCssClass(): string|null;

        /**
         * Returns the url of the sprite image.
         * @return {?string} Url of the sprite image.
         */
        getUrl(): string|null;

        /**
         * Returns whether the emoji specified by this sprite is animated.
         * @return {boolean} Whether the emoji is animated.
         */
        isAnimated(): boolean;

        /**
         * Returns the width of the image being sprited, appropriate for a CSS value.
         * @return {string} The width of the image being sprited.
         */
        getWidthCssValue(): string;

        /**
         * Returns the height of the image being sprited, appropriate for a CSS value.
         * @return {string} The height of the image being sprited.
         */
        getHeightCssValue(): string;

        /**
         * Returns the x offset of the image being sprited within the sprite,
         * appropriate for a CSS value.
         * @return {string} The x offset of the image being sprited within the sprite.
         */
        getXOffsetCssValue(): string;

        /**
         * Returns the positive y offset of the image being sprited within the sprite,
         * appropriate for a CSS value.
         * @return {string} The y offset of the image being sprited within the sprite.
         */
        getYOffsetCssValue(): string;
    }
}

declare namespace goog.ui.emoji.SpriteInfo {
}
