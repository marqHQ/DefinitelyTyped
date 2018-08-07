/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.CookieEditor' {
    import alias = goog.ui.CookieEditor;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Displays and edits the value of a cookie.
     * @extends {goog.ui.Component}
     * @final
     */
    class CookieEditor extends __CookieEditor {}
    abstract class __CookieEditor extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * Cookie key.
         * @type {?string}
         * @private
         */
        private cookieKey_: string|null;

        /**
         * Text area.
         * @type {HTMLTextAreaElement}
         * @private
         */
        private textAreaElem_: HTMLTextAreaElement;

        /**
         * Clear button.
         * @type {HTMLButtonElement}
         * @private
         */
        private clearButtonElem_: HTMLButtonElement;

        /**
         * Invalid value warning text.
         * @type {HTMLSpanElement}
         * @private
         */
        private valueWarningElem_: HTMLSpanElement;

        /**
         * Update button.
         * @type {HTMLButtonElement}
         * @private
         */
        private updateButtonElem_: HTMLButtonElement;

        /**
         * Sets the cookie which this component will edit.
         * @param {string} cookieKey Cookie key.
         */
        selectCookie(cookieKey: string): void;

        /**
         * Handles user clicking clear button.
         * @param {!goog.events.Event} e The click event.
         * @private
         */
        private handleClear_(e: goog.events.Event): void;

        /**
         * Handles user clicking update button.
         * @param {!goog.events.Event} e The click event.
         * @private
         */
        private handleUpdate_(e: goog.events.Event): void;
    }
}
