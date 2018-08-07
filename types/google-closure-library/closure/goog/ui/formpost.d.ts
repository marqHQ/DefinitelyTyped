/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>

declare module 'goog:goog.ui.FormPost' {
    import alias = goog.ui.FormPost;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Creates a formpost object.
     * @extends {goog.ui.Component}
     * @final
     */
    class FormPost extends __FormPost {}
    abstract class __FormPost extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_dom The DOM helper.
         */
        constructor(opt_dom?: goog.dom.DomHelper);

        /**
         * Constructs a POST request and directs the browser as if a form were
         * submitted.
         * @param {Object} parameters Object with parameter values. Values can be
         *     strings, numbers, or arrays of strings or numbers.
         * @param {string=} opt_url The destination URL. If not specified, uses the
         *     current URL for window for the DOM specified in the constructor.
         * @param {string=} opt_target An optional name of a window in which to open the
         *     URL. If not specified, uses the window for the DOM specified in the
         *     constructor.
         */
        post(parameters: Object, opt_url?: string, opt_target?: string): void;

        /**
         * Creates hidden inputs in a form to match parameters.
         * @param {!Element} form The form element.
         * @param {Object} parameters Object with parameter values. Values can be
         *     strings, numbers, or arrays of strings or numbers.
         * @private
         */
        private setParameters_(form: Element, parameters: Object): void;

        /**
         * Creates a hidden <input> tag.
         * @param {string} name The name of the input.
         * @param {string} value The value of the input.
         * @return {!goog.html.SafeHtml}
         * @private
         */
        private createInput_(name: string, value: string): goog.html.SafeHtml;
    }
}
