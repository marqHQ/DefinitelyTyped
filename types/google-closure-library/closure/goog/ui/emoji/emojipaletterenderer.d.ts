/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../paletterenderer.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="./spriteinfo.d.ts"/>

declare module 'goog:goog.ui.emoji.EmojiPaletteRenderer' {
    import alias = goog.ui.emoji.EmojiPaletteRenderer;
    export default alias;
}

declare namespace goog.ui.emoji {
    /**
     * Renders an emoji palette.
     *
     * @extends {goog.ui.PaletteRenderer}
     */
    class EmojiPaletteRenderer extends __EmojiPaletteRenderer {}
    abstract class __EmojiPaletteRenderer extends goog.ui.__PaletteRenderer {
        /**
         * @param {?string} defaultImgUrl Url of the img that should be used to fill up
         *     the cells in the emoji table, to prevent jittering. Will be stretched
         *     to the emoji cell size. A good image is a transparent dot.
         */
        constructor(defaultImgUrl: string|null);

        /**
         * Url of the img that should be used for cells in the emoji palette that are
         * not filled with emoji, i.e., after all the emoji have already been placed
         * on a page.
         *
         * @type {?string}
         * @private
         */
        private defaultImgUrl_: string|null;

        /**
         * Creates a palette item from the given emoji data.
         *
         * @param {goog.dom.DomHelper} dom DOM helper for constructing DOM elements.
         * @param {string} id Goomoji id for the emoji.
         * @param {goog.ui.emoji.SpriteInfo} spriteInfo Spriting info for the emoji.
         * @param {string} displayUrl URL of the image served for this cell, whether
         *     an individual emoji image or a sprite.
         * @return {!HTMLDivElement} The palette item for this emoji.
         */
        createPaletteItem(
            dom: goog.dom.DomHelper, id: string, spriteInfo: goog.ui.emoji.SpriteInfo, displayUrl: string
        ): HTMLDivElement;

        /**
         * Modifies a palette item containing an animated emoji, in response to the
         * animated emoji being successfully downloaded.
         *
         * @param {Element} item The palette item to update.
         * @param {Image} animatedImg An Image object containing the animated emoji.
         */
        updateAnimatedPaletteItem(item: Element, animatedImg: HTMLImageElement): void;

        /**
         * Builds the inner contents of a palette item out of sprite metadata.
         *
         * @param {goog.dom.DomHelper} dom DOM helper for constructing DOM elements.
         * @param {goog.ui.emoji.SpriteInfo} spriteInfo The metadata to create the css
         *     for the sprite.
         * @param {string} displayUrl The URL of the image for this cell.
         * @return {HTMLDivElement} The inner element for a palette item.
         */
        buildElementFromSpriteMetadata(
            dom: goog.dom.DomHelper, spriteInfo: goog.ui.emoji.SpriteInfo, displayUrl: string
        ): HTMLDivElement;
    }
}

declare namespace goog.ui.emoji.EmojiPaletteRenderer {
    /** @override */
    function getCssClass(): void;
}
