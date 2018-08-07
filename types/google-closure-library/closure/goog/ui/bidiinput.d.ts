/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/inputhandler.d.ts"/>

declare module 'goog:goog.ui.BidiInput' {
    import alias = goog.ui.BidiInput;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default implementation of BidiInput.
     *
     * @extends {goog.ui.Component}
     */
    class BidiInput extends __BidiInput {}
    abstract class __BidiInput extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper  Optional DOM helper.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * The input handler that provides the input event.
         * @type {goog.events.InputHandler?}
         * @private
         */
        private inputHandler_: goog.events.InputHandler|null;

        /**
         * Initializes the events and initial text direction.
         * Called from either decorate or createDom, after the input field has
         * been created.
         * @private
         */
        private init_(): void;

        /**
         * Set the direction of the input element based on the current value. If the
         * value does not have any strongly directional characters, remove the dir
         * attribute so that the direction is inherited instead.
         * This method is called when the user changes the input element value, or
         * when a program changes the value using
         * {@link goog.ui.BidiInput#setValue}
         * @private
         */
        private setDirection_(): void;

        /**
         * Returns the direction of the input element.
         * @return {?string} Return 'rtl' for right-to-left text,
         *     'ltr' for left-to-right text, or null if the value itself is not
         *     enough to determine directionality (e.g. an empty value), and the
         *     direction is inherited from a parent element (typically the body
         *     element).
         */
        getDirection(): string|null;

        /**
         * Sets the value of the underlying input field, and sets the direction
         * according to the given value.
         * @param {string} value  The Value to set in the underlying input field.
         */
        setValue(value: string): void;

        /**
         * Returns the value of the underlying input field.
         * @return {string} Value of the underlying input field.
         */
        getValue(): string;
    }
}
