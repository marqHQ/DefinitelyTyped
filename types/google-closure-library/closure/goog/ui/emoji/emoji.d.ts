/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.ui.emoji.Emoji' {
    import alias = goog.ui.emoji.Emoji;
    export default alias;
}

declare namespace goog.ui.emoji {
    /**
     * Creates an emoji.
     *
     * A simple wrapper for an emoji.
     *
     * @final
     */
    class Emoji extends __Emoji {}
    abstract class __Emoji {
        /**
         * @param {string} url URL pointing to the source image for the emoji.
         * @param {string} id The id of the emoji, e.g., 'std.1'.
         * @param {number=} opt_height The height of the emoji, if undefined the
         *     natural height of the emoji is used.
         * @param {number=} opt_width The width of the emoji, if undefined the natural
         *     width of the emoji is used.
         * @param {string=} opt_altText The alt text for the emoji image, eg. the
         *     unicode character representation of the emoji.
         */
        constructor(url: string, id: string, opt_height?: number, opt_width?: number, opt_altText?: string);

        /**
         * The URL pointing to the source image for the emoji
         *
         * @type {string}
         * @private
         */
        private url_: string;

        /**
         * The id of the emoji
         *
         * @type {string}
         * @private
         */
        private id_: string;

        /**
         * The height of the emoji
         *
         * @type {?number}
         * @private
         */
        private height_: number|null;

        /**
         * The width of the emoji
         *
         * @type {?number}
         * @private
         */
        private width_: number|null;

        /**
         * The unicode of the emoji
         *
         * @type {?string}
         * @private
         */
        private altText_: string|null;

        /**
         * @return {string} The URL for this emoji.
         */
        getUrl(): string;

        /**
         * @return {string} The id of this emoji.
         */
        getId(): string;

        /**
         * @return {?number} The height of this emoji.
         */
        getHeight(): number|null;

        /**
         * @return {?number} The width of this emoji.
         */
        getWidth(): number|null;

        /**
         * @return {?string} The alt text for the emoji image, eg. the unicode character
         *     representation of the emoji.
         */
        getAltText(): string|null;
    }
}

declare namespace goog.ui.emoji.Emoji {
    /**
     * The name of the goomoji attribute, used for emoji image elements.
     * @type {string}
     * @deprecated Use goog.ui.emoji.Emoji.DATA_ATTRIBUTE instead.
     */
    let ATTRIBUTE: string;

    /**
     * The name of the goomoji data-attribute, used for emoji image elements. Data
     * attributes are the preferred way in HTML5 to set custom attributes.
     * @type {string}
     */
    let DATA_ATTRIBUTE: string;
}
