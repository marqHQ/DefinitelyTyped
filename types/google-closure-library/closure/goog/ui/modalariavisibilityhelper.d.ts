/// <reference path="../../../globals.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ModalAriaVisibilityHelper' {
    import alias = goog.ui.ModalAriaVisibilityHelper;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Helper object to control aria visibility of the rest of the page (background)
     * for a given element. Example usage is to restrict screenreader focus to
     * a modal popup while it is visible.
     *
     * WARNING: This will work only if the element is rendered directly in the
     * 'body' element.
     *
     */
    class ModalAriaVisibilityHelper extends __ModalAriaVisibilityHelper {}
    abstract class __ModalAriaVisibilityHelper {
        /**
         * @param {!Element} element The given element.
         * @param {!goog.dom.DomHelper} domHelper DomHelper for the page.
         */
        constructor(element: Element, domHelper: goog.dom.DomHelper);

        /**
         * @private {!Element}
         */
        private element_: any /*missing*/;

        /**
         * @private {!goog.dom.DomHelper}
         */
        private dom_: any /*missing*/;

        /**
         * The elements set to aria-hidden when the popup was made visible.
         * @type {Array<!Element>}
         * @private
         */
        private hiddenElements_: Element[];

        /**
         * Sets aria-hidden on the rest of the page to restrict screen reader focus.
         * Top-level elements with an explicit aria-hidden state are not altered.
         * @param {boolean} hide Whether to hide or show the rest of the page.
         */
        setBackgroundVisibility(hide: boolean): void;
    }
}
