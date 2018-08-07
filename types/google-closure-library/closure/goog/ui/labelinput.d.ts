/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.LabelInput' {
    import alias = goog.ui.LabelInput;
    export default alias;
}

declare namespace goog.ui {
    /**
     * This creates the label input object.
     * @extends {goog.ui.Component}
     */
    class LabelInput extends __LabelInput {}
    abstract class __LabelInput extends goog.ui.__Component {
        /**
         * @param {string=} opt_label The text to show as the label.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_label?: string, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The text to show as the label.
         * @type {string}
         * @private
         */
        private label_: string;

        /**
         * Variable used to store the element value on keydown and restore it on
         * keypress.  See {@link #handleEscapeKeys_}
         * @type {?string}
         * @private
         */
        private ffKeyRestoreValue_: string|null;

        /**
         * The label restore delay after leaving the input.
         * @type {number} Delay for restoring the label.
         * @protected
         */
        protected labelRestoreDelayMs: number;

        /** @private {boolean} */
        private inFocusAndSelect_: any /*missing*/;

        /** @private {boolean} */
        private formAttached_: any /*missing*/;

        /**
         * @type {goog.events.EventHandler}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<any>;

        /**
         * @type {boolean}
         * @private
         */
        private hasFocus_: boolean;

        /**
         * Attaches the events we need to listen to.
         * @private
         */
        private attachEvents_(): void;

        /**
         * Adds a listener to the form so that we can clear the input before it is
         * submitted.
         * @private
         */
        private attachEventsToForm_(): void;

        /**
         * Stops listening to the events.
         * @private
         */
        private detachEvents_(): void;

        /**
         * The CSS class name to add to the input when the user has not entered a
         * value.
         */
        labelCssClassName: any /*missing*/;

        /**
         * Handler for the focus event.
         * @param {goog.events.Event} e The event object passed in to the event handler.
         * @private
         */
        private handleFocus_(e: goog.events.Event): void;

        /**
         * Handler for the blur event.
         * @param {goog.events.Event} e The event object passed in to the event handler.
         * @private
         */
        private handleBlur_(e: goog.events.Event): void;

        /**
         * Handler for key events in Firefox.
         *
         * If the escape key is pressed when a text input has not been changed manually
         * since being focused, the text input will revert to its previous value.
         * Firefox does not honor preventDefault for the escape key. The revert happens
         * after the keydown event and before every keypress. We therefore store the
         * element's value on keydown and restore it on keypress. The restore value is
         * nullified on keyup so that {@link #getValue} returns the correct value.
         *
         * IE and Chrome don't have this problem, Opera blurs in the input box
         * completely in a way that preventDefault on the escape key has no effect.
         *
         * @param {goog.events.BrowserEvent} e The event object passed in to
         *     the event handler.
         * @private
         */
        private handleEscapeKeys_(e: goog.events.BrowserEvent): void;

        /**
         * Handler for the submit event of the form element.
         * @param {goog.events.Event} e The event object passed in to the event handler.
         * @private
         */
        private handleFormSubmit_(e: goog.events.Event): void;

        /**
         * Restore value after submit
         * @private
         */
        private handleAfterSubmit_(): void;

        /**
         * Handler for the load event the window. This is needed because
         * IE sets defaultValue upon load.
         * @param {Event} e The event object passed in to the event handler.
         * @private
         */
        private handleWindowLoad_(e: Event): void;

        /**
         * @return {boolean} Whether the control is currently focused on.
         */
        hasFocus(): boolean;

        /**
         * @return {boolean} Whether the value has been changed by the user.
         */
        hasChanged(): boolean;

        /**
         * Clears the value of the input element without resetting the default text.
         */
        clear(): void;

        /**
         * Clears the value of the input element and resets the default text.
         */
        reset(): void;

        /**
         * Use this to set the value through script to ensure that the label state is
         * up to date
         * @param {string} s The new value for the input.
         */
        setValue(s: string): void;

        /**
         * Returns the current value of the text box, returning an empty string if the
         * search box is the default value
         * @return {string} The value of the input box.
         */
        getValue(): string;

        /**
         * Sets the label text as aria-label, and placeholder when supported.
         * @param {string} label The text to show as the label.
         */
        setLabel(label: string): void;

        /**
         * @return {string} The text to show as the label.
         */
        getLabel(): string;

        /**
         * Checks the state of the input element
         * @private
         */
        private check_(): void;

        /**
         * This method focuses the input and selects all the text. If the value hasn't
         * changed it will set the value to the label so that the label text is
         * selected.
         */
        focusAndSelect(): void;

        /**
         * Enables/Disables the label input.
         * @param {boolean} enabled Whether to enable (true) or disable (false) the
         *     label input.
         */
        setEnabled(enabled: boolean): void;

        /**
         * @return {boolean} True if the label input is enabled, false otherwise.
         */
        isEnabled(): boolean;

        /**
         * @private
         */
        private focusAndSelect_(): void;

        /**
         * Sets the value of the input element to label.
         * @private
         */
        private restoreLabel_(): void;
    }
}

declare namespace goog.ui.LabelInput {
}
