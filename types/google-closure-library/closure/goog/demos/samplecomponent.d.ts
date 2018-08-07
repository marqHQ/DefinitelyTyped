/// <reference path="../../../globals.d.ts"/>
/// <reference path="../ui/component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/keyhandler.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.demos.SampleComponent' {
    import alias = goog.demos.SampleComponent;
    export default alias;
}

declare namespace goog.demos {
    /**
     * A simple box that changes colour when clicked. This class demonstrates the
     * goog.ui.Component API, and is keyboard accessible, as per
     * http://wiki/Main/ClosureKeyboardAccessible
     *
     * @extends {goog.ui.Component}
     * @final
     */
    class SampleComponent extends __SampleComponent {}
    abstract class __SampleComponent extends goog.ui.__Component {
        /**
         * @param {string=} opt_label A label to display. Defaults to "Click Me" if none
         *     provided.
         * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
         *
         */
        constructor(opt_label?: string, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The label to display.
         * @type {string}
         * @private
         */
        private initialLabel_: string;

        /**
         * The current color.
         * @type {string}
         * @private
         */
        private color_: string;

        /**
         * Keyboard handler for this object. This object is created once the
         * component's DOM element is known.
         *
         * @type {goog.events.KeyHandler?}
         * @private
         */
        private kh_: goog.events.KeyHandler|null;

        /**
         * Changes the color of the element.
         * @private
         */
        private changeColor_(): void;

        /**
         * Gets the current label text.
         *
         * @return {string} The current text set into the label, or empty string if
         *     none set.
         */
        getLabelText(): string;

        /**
         * Handles DIV element clicks, causing the DIV's colour to change.
         * @param {goog.events.Event} event The click event.
         * @private
         */
        private onDivClicked_(event: goog.events.Event): void;

        /**
         * Fired when user presses a key while the DIV has focus. If the user presses
         * space or enter, the color will be changed.
         * @param {goog.events.Event} event The key event.
         * @private
         */
        private onKey_(event: goog.events.Event): void;

        /**
         * Sets the current label text. Has no effect if component is not rendered.
         *
         * @param {string} text The text to set as the label.
         */
        setLabelText(text: string): void;
    }
}
