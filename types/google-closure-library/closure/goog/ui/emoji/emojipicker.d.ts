/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../component.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="./emojipalette.d.ts"/>
/// <reference path="../tabpane.d.ts"/>
/// <reference path="./emoji.d.ts"/>

declare module 'goog:goog.ui.emoji.EmojiPicker' {
    import alias = goog.ui.emoji.EmojiPicker;
    export default alias;
}

declare namespace goog.ui.emoji {
    /**
     * Creates a new, empty emoji picker. An emoji picker is a grid of emoji, each
     * cell of the grid containing a single emoji. The picker may contain multiple
     * pages of emoji.
     *
     * When a user selects an emoji, by either clicking or pressing enter, the
     * picker fires a goog.ui.Component.EventType.ACTION event with the id. The
     * client listens on this event and in the handler can retrieve the id of the
     * selected emoji and do something with it, for instance, inserting an image
     * tag into a rich text control. An emoji picker does not maintain state. That
     * is, once an emoji is selected, the emoji picker does not remember which emoji
     * was selected.
     *
     * The emoji picker is implemented as a tabpane with each tabpage being a table.
     * Each of the tables are the same size to prevent jittering when switching
     * between pages.
     *
     * @extends {goog.ui.Component}
     */
    class EmojiPicker extends __EmojiPicker {}
    abstract class __EmojiPicker extends goog.ui.__Component {
        /**
         * @param {string} defaultImgUrl Url of the img that should be used to fill up
         *     the cells in the emoji table, to prevent jittering. Should be the same
         *     size as the emoji.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(defaultImgUrl: string, opt_domHelper?: goog.dom.DomHelper);

        /**
         * Emoji that this picker displays.
         *
         * @type {Array<Object>}
         * @private
         */
        private emoji_: Object[];

        /**
         * Pages of this emoji picker.
         *
         * @type {Array<goog.ui.emoji.EmojiPalette>}
         * @private
         */
        private pages_: goog.ui.emoji.EmojiPalette[];

        /**
         * Keeps track of which pages in the picker have been loaded. Used for delayed
         * loading of tabs.
         *
         * @type {Array<boolean>}
         * @private
         */
        private pageLoadStatus_: boolean[];

        /**
         * Tabpane to hold the pages of this emojipicker.
         *
         * @type {goog.ui.TabPane}
         * @private
         */
        private tabPane_: goog.ui.TabPane;

        /** @private {goog.ui.emoji.Emoji} */
        private selectedEmoji_: any /*missing*/;

        /** @private {goog.ui.emoji.EmojiPaletteRenderer} */
        private renderer_: any /*missing*/;

        /**
         * Number of rows per grid of emoji.
         *
         * @type {number}
         * @private
         */
        private numRows_: number;

        /**
         * Number of columns per grid of emoji.
         *
         * @type {number}
         * @private
         */
        private numCols_: number;

        /**
         * Whether the number of rows in the picker should be automatically determined
         * by the specified number of columns so as to minimize/eliminate jitter when
         * switching between tabs.
         *
         * @type {boolean}
         * @private
         */
        private autoSizeByColumnCount_: boolean;

        /**
         * Location of the tabs for the picker tabpane.
         *
         * @type {goog.ui.TabPane.TabLocation}
         * @private
         */
        private tabLocation_: goog.ui.TabPane.TabLocation;

        /**
         * Whether the component is focusable.
         * @type {boolean}
         * @private
         */
        private focusable_: boolean;

        /**
         * Url of the img that should be used for cells in the emoji picker that are
         * not filled with emoji, i.e., after all the emoji have already been placed
         * on a page.
         *
         * @type {string}
         * @private
         */
        private defaultImgUrl_: string;

        /**
         * If present, indicates a prefix that should be prepended to all URLs
         * of images in this emojipicker. This provides an optimization if the URLs
         * are long, so that the client does not have to send a long string for each
         * emoji.
         *
         * @type {string|undefined}
         * @private
         */
        private urlPrefix_: string|undefined;

        /**
         * If true, delay loading the images for the emojipalettes until after
         * construction. This gives a better user experience before the images are in
         * the cache, since other widgets waiting for construction of the emojipalettes
         * won't have to wait for all the images (which may be a substantial amount) to
         * load.
         *
         * @type {boolean}
         * @private
         */
        private delayedLoad_: boolean;

        /**
         * Whether to use progressive rendering in the emojipicker's palette, if using
         * sprited imgs. If true, then uses img tags, which most browsers render
         * progressively (i.e., as the data comes in). If false, then uses div tags
         * with the background-image, which some newer browsers render progressively
         * but older ones do not.
         *
         * @type {boolean}
         * @private
         */
        private progressiveRender_: boolean;

        /**
         * Whether to require the caller to manually specify when to start loading
         * animated emoji. This is primarily for unittests to be able to test the
         * structure of the emojipicker palettes before and after the animated emoji
         * have been loaded.
         *
         * @type {boolean}
         * @private
         */
        private manualLoadOfAnimatedEmoji_: boolean;

        /**
         * Index of the active page in the picker.
         *
         * @type {number}
         * @private
         */
        private activePage_: number;

        /**
         * Adds a group of emoji to the picker.
         *
         * @param {string|Element} title Title for the group.
         * @param {Array<Array<string>>} emojiGroup A new group of emoji to be added
         *    Each internal array contains [emojiUrl, emojiId].
         */
        addEmojiGroup(title: string|Element, emojiGroup: string[][]): void;

        /**
         * Gets the number of rows per grid in the emoji picker.
         *
         * @return {number} number of rows per grid.
         */
        getNumRows(): number;

        /**
         * Gets the number of columns per grid in the emoji picker.
         *
         * @return {number} number of columns per grid.
         */
        getNumColumns(): number;

        /**
         * Sets the number of rows per grid in the emoji picker. This should only be
         * called before the picker has been rendered.
         *
         * @param {number} numRows Number of rows per grid.
         */
        setNumRows(numRows: number): void;

        /**
         * Sets the number of columns per grid in the emoji picker. This should only be
         * called before the picker has been rendered.
         *
         * @param {number} numCols Number of columns per grid.
         */
        setNumColumns(numCols: number): void;

        /**
         * Sets whether to automatically size the emojipicker based on the number of
         * columns and the number of emoji in each group, so as to reduce jitter.
         *
         * @param {boolean} autoSize Whether to automatically size the picker.
         */
        setAutoSizeByColumnCount(autoSize: boolean): void;

        /**
         * Sets the location of the tabs in relation to the emoji grids. This should
         * only be called before the picker has been rendered.
         *
         * @param {goog.ui.TabPane.TabLocation} tabLocation The location of the tabs.
         */
        setTabLocation(tabLocation: goog.ui.TabPane.TabLocation): void;

        /**
         * Sets whether loading of images should be delayed until after dom creation.
         * Thus, this function must be called before {@link #createDom}. If set to true,
         * the client must call {@link #loadImages} when they wish the images to be
         * loaded.
         *
         * @param {boolean} shouldDelay Whether to delay loading the images.
         */
        setDelayedLoad(shouldDelay: boolean): void;

        /**
         * Sets whether to require the caller to manually specify when to start loading
         * animated emoji. This is primarily for unittests to be able to test the
         * structure of the emojipicker palettes before and after the animated emoji
         * have been loaded. This only affects sprited emojipickers with sprite data
         * for animated emoji.
         *
         * @param {boolean} manual Whether to load animated emoji manually.
         */
        setManualLoadOfAnimatedEmoji(manual: boolean): void;

        /**
         * Returns true if the component is focusable, false otherwise.  The default
         * is true.  Focusable components always have a tab index and allocate a key
         * handler to handle keyboard events while focused.
         * @return {boolean} Whether the component is focusable.
         */
        isFocusable(): boolean;

        /**
         * Sets whether the component is focusable.  The default is true.
         * Focusable components always have a tab index and allocate a key handler to
         * handle keyboard events while focused.
         * @param {boolean} focusable Whether the component is focusable.
         */
        setFocusable(focusable: boolean): void;

        /**
         * Sets the URL prefix for the emoji URLs.
         *
         * @param {string} urlPrefix Prefix that should be prepended to all URLs.
         */
        setUrlPrefix(urlPrefix: string): void;

        /**
         * Sets the progressive rendering aspect of this emojipicker. Must be called
         * before createDom to have an effect.
         *
         * @param {boolean} progressive Whether this picker should render progressively.
         */
        setProgressiveRender(progressive: boolean): void;

        /**
         * Adjusts the number of rows to be the maximum row count out of all the emoji
         * groups, in order to prevent jitter in switching among the tabs.
         *
         * @private
         */
        private adjustNumRowsIfNecessary_(): void;

        /**
         * Causes the emoji imgs to be loaded into the picker. Used for delayed loading.
         * No-op if delayed loading is not set.
         */
        loadImages(): void;

        /**
         * Used by unittests to manually load the animated emoji for this picker.
         */
        manuallyLoadAnimatedEmoji(): void;

        /**
         * Creates a page if it has not already been loaded. This has the side effects
         * of setting the load status of the page to true.
         *
         * @param {Array<Array<string>>} emoji Emoji for this page. See
         *     {@link addEmojiGroup} for more details.
         * @param {number} index Index of the page in the emojipicker.
         * @return {goog.ui.emoji.EmojiPalette} the emoji page.
         * @private
         */
        private createEmojiPage_(emoji: string[][], index: number): goog.ui.emoji.EmojiPalette;

        /**
         * Returns an array of emoji whose real URLs have been replaced with the
         * default img URL. Used for delayed loading.
         *
         * @param {Array<Array<string>>} emoji Original emoji array.
         * @return {!Array<!Array<string>>} emoji array with all emoji pointing to the
         *     default img.
         * @private
         */
        private getPlaceholderEmoji_(emoji: string[][]): string[][];

        /**
         * Creates an emoji page using placeholder emoji pointing to the default
         * img instead of the real emoji. Used for delayed loading.
         *
         * @param {Array<Array<string>>} emoji Emoji for this page. See
         *     {@link addEmojiGroup} for more details.
         * @return {!goog.ui.emoji.EmojiPalette} the emoji page.
         * @private
         */
        private createPlaceholderEmojiPage_(emoji: string[][]): goog.ui.emoji.EmojiPalette;

        /**
         * @return {string} CSS class for the root element of EmojiPicker.
         */
        getCssClass(): string;

        /**
         * Returns the currently selected emoji from this picker. If the picker is
         * using the URL prefix optimization, allocates a new emoji object with the
         * full URL. This method is meant to be used by clients of the emojipicker,
         * e.g., in a listener on goog.ui.component.EventType.ACTION that wants to use
         * the just-selected emoji.
         *
         * @return {goog.ui.emoji.Emoji} The currently selected emoji from this picker.
         */
        getSelectedEmoji(): goog.ui.emoji.Emoji;

        /**
         * Returns the number of emoji groups in this picker.
         *
         * @return {number} The number of emoji groups in this picker.
         */
        getNumEmojiGroups(): number;

        /**
         * Returns a page from the picker. This should be considered protected, and is
         * ONLY FOR TESTING.
         *
         * @param {number} index Index of the page to return.
         * @return {goog.ui.emoji.EmojiPalette?} the page at the specified index or null
         *     if none exists.
         */
        getPage(index: number): goog.ui.emoji.EmojiPalette|null;

        /**
         * Returns all the pages from the picker. This should be considered protected,
         * and is ONLY FOR TESTING.
         *
         * @return {Array<goog.ui.emoji.EmojiPalette>?} the pages in the picker or
         *     null if none exist.
         */
        getPages(): goog.ui.emoji.EmojiPalette[]|null;

        /**
         * Returns the tabpane if this is a multipage picker. This should be considered
         * protected, and is ONLY FOR TESTING.
         *
         * @return {goog.ui.TabPane} the tabpane if it is a multipage picker,
         *     or null if it does not exist or is a single page picker.
         */
        getTabPane(): goog.ui.TabPane;

        /**
         * @return {goog.ui.emoji.EmojiPalette} The active page of the emoji picker.
         * @private
         */
        private getActivePage_(): goog.ui.emoji.EmojiPalette;

        /**
         * Handles actions from the EmojiPalettes that this picker contains.
         *
         * @param {goog.ui.Component.EventType} e The event object.
         * @private
         */
        private onEmojiPaletteAction_(e: goog.ui.Component.EventType): void;

        /**
         * Handles changes in the active page in the tabpane.
         *
         * @param {goog.ui.TabPaneEvent} e The event object.
         * @private
         */
        private onPageChanged_(e: goog.ui.TabPaneEvent): void;

        /**
         * Loads a page into the picker if it has not yet been loaded.
         *
         * @param {number} index Index of the page to load.
         * @private
         * @suppress {deprecated} Using deprecated goog.ui.TabPane.
         */
        private loadPage_(index: number): void;
    }
}

declare namespace goog.ui.emoji.EmojiPicker {
    /**
     * Default number of rows per grid of emoji.
     *
     * @type {number}
     */
    let DEFAULT_NUM_ROWS: number;

    /**
     * Default number of columns per grid of emoji.
     *
     * @type {number}
     */
    let DEFAULT_NUM_COLS: number;

    /**
     * Default location of the tabs in relation to the emoji grids.
     *
     * @type {goog.ui.TabPane.TabLocation}
     */
    let DEFAULT_TAB_LOCATION: goog.ui.TabPane.TabLocation;
}
