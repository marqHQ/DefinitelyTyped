/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../palette.d.ts"/>
/// <reference path="../paletterenderer.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="./emoji.d.ts"/>
/// <reference path="../../net/imageloader.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.ui.emoji.EmojiPalette' {
    import alias = goog.ui.emoji.EmojiPalette;
    export default alias;
}

declare namespace goog.ui.emoji {
    /**
     * A page of emoji to be displayed in an EmojiPicker.
     *
     * @extends {goog.ui.Palette}
     * @final
     */
    class EmojiPalette extends __EmojiPalette {}
    abstract class __EmojiPalette extends goog.ui.__Palette {
        /**
         * @param {Array<Array<?>>} emoji List of emoji for this page.
         * @param {?string=} opt_urlPrefix Prefix that should be prepended to all URL.
         * @param {goog.ui.PaletteRenderer=} opt_renderer Renderer used to render or
         *     decorate the palette; defaults to {@link goog.ui.PaletteRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(
            emoji: any[][],
            opt_urlPrefix?: string|null,
            opt_renderer?: goog.ui.PaletteRenderer,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * All the different emoji that this palette can display. Maps emoji ids
         * (string) to the goog.ui.emoji.Emoji for that id.
         *
         * @type {Object}
         * @private
         */
        private emojiCells_: Object;

        /**
         * Map of emoji id to index into this.emojiCells_.
         *
         * @type {Object}
         * @private
         */
        private emojiMap_: Object;

        /**
         * List of the animated emoji in this palette. Each internal array is of type
         * [HTMLDivElement, goog.ui.emoji.Emoji], and represents the palette item
         * for that animated emoji, and the Emoji object.
         *
         * @type {Array<Array<(HTMLDivElement|goog.ui.emoji.Emoji)>>}
         * @private
         */
        private animatedEmoji_: HTMLDivElement|goog.ui.emoji.Emoji[][];

        /**
         * Palette items that are displayed on this page of the emoji picker. Each
         * item is a div wrapped around a div or an img.
         *
         * @type {Array<HTMLDivElement>}
         * @private
         */
        private emoji_: HTMLDivElement[];

        /**
         * Indicates a prefix that should be prepended to all URLs of images in this
         * emojipalette. This provides an optimization if the URLs are long, so that
         * the client does not have to send a long string for each emoji.
         *
         * @type {string}
         * @private
         */
        private urlPrefix_: string;

        /**
         * Whether the emoji images have been loaded.
         *
         * @type {boolean}
         * @private
         */
        private imagesLoaded_: boolean;

        /**
         * Image loader for loading animated emoji.
         *
         * @type {goog.net.ImageLoader}
         * @private
         */
        private imageLoader_: goog.net.ImageLoader;

        /**
         * Helps create an array of emoji palette items from an array of emoji
         * properties. Each element will be either a div with background-image set to
         * a sprite, or an img element pointing directly to an emoji, and all elements
         * are wrapped with an outer div for alignment issues (i.e., this allows
         * centering the inner div).
         *
         * @param {Object} emojiGroup The group of emoji for this page.
         * @return {!Array<!HTMLDivElement>} The emoji items.
         * @private
         */
        private getEmojiArrayFromProperties_(emojiGroup: Object): HTMLDivElement[];

        /**
         * Sends off requests for all the animated emoji and replaces their static
         * sprites when the images are done downloading.
         */
        loadAnimatedEmoji(): void;

        /**
         * Handles image load events from the ImageLoader.
         *
         * @param {goog.events.Event} e The event object.
         * @private
         */
        private handleImageLoad_(e: goog.events.Event): void;

        /**
         * Returns the image loader that this palette uses. Used for testing.
         *
         * @return {goog.net.ImageLoader} the image loader.
         */
        getImageLoader(): goog.net.ImageLoader;

        /**
         * Returns a goomoji id from an img or the containing td, or null if none
         * exists for that element.
         *
         * @param {Element} el The element to get the Goomoji id from.
         * @return {?string} A goomoji id from an img or the containing td, or null if
         *     none exists for that element.
         * @private
         */
        private getGoomojiIdFromElement_(el: Element): string|null;

        /**
         * @return {goog.ui.emoji.Emoji} The currently selected emoji from this palette.
         */
        getSelectedEmoji(): goog.ui.emoji.Emoji;

        /**
         * @return {number} The number of emoji managed by this palette.
         */
        getNumberOfEmoji(): number;

        /**
         * Returns the index of the specified emoji within this palette.
         *
         * @param {string} id Id of the emoji to look up.
         * @return {number} The index of the specified emoji within this palette.
         */
        getEmojiIndex(id: string): number;
    }
}
