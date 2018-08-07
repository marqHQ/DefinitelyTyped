/// <reference path="../../../globals.d.ts"/>
/// <reference path="./debugwindow.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>

declare module 'goog:goog.debug.FancyWindow' {
    import alias = goog.debug.FancyWindow;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Provides a Fancy extension to the DebugWindow class.  Allows filtering based
     * on loggers and levels.
     *
     * @extends {goog.debug.DebugWindow}
     */
    class FancyWindow extends __FancyWindow {}
    abstract class __FancyWindow extends goog.debug.__DebugWindow {
        /**
         * @param {string=} opt_identifier Idenitifier for this logging class.
         * @param {string=} opt_prefix Prefix pre-pended to messages.
         */
        constructor(opt_identifier?: string, opt_prefix?: string);

        /** @private {goog.dom.DomHelper} */
        private dh_: any /*missing*/;

        /**
         * Show the options menu.
         * @return {boolean} false.
         * @private
         */
        private openOptions_(): boolean;

        /**
         * Make a drop down for the log levels.
         * @param {string} id Logger id.
         * @param {string} selected What log level is currently selected.
         * @return {Element} The newly created 'select' DOM element.
         * @private
         */
        private getDropDown_(id: string, selected: string): Element;

        /**
         * Close the options menu.
         * @return {boolean} The value false.
         * @private
         */
        private closeOptions_(): boolean;

        /**
         * Resizes the log elements
         * @private
         */
        private resizeStuff_(): void;

        /**
         * Handles the user clicking the exit button, disabled the debug window and
         * closes the popup.
         * @param {Event} e Event object.
         * @private
         */
        private exit_(e: Event): void;

        /**
         * Return the default HTML for the debug window
         * @return {!goog.html.SafeHtml} Html.
         * @private
         */
        private getHtml_(): goog.html.SafeHtml;

        /**
         * Write logger levels to localStorage if possible.
         * @private
         */
        private writeOptionsToLocalStorage_(): void;

        /**
         * Sync logger levels with any values stored in localStorage.
         * @private
         */
        private readOptionsFromLocalStorage_(): void;
    }
}

declare namespace goog.debug.FancyWindow {
    /**
     * Constant indicating if we are able to use localStorage to persist filters
     * @type {boolean}
     */
    let HAS_LOCAL_STORE: boolean;

    /**
     * Constant defining the prefix to use when storing log levels
     * @type {string}
     */
    let LOCAL_STORE_PREFIX: string;
}
