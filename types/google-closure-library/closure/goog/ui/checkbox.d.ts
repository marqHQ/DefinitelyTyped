/// <reference path="../../../globals.d.ts"/>
/// <reference path="./control.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./checkboxrenderer.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.Checkbox' {
    import alias = goog.ui.Checkbox;
    export default alias;
}

declare module 'goog:goog.ui.Checkbox.State' {
    import alias = goog.ui.Checkbox.State;
    export default alias;
}

declare namespace goog.ui {
    /**
     * 3-state checkbox widget. Fires CHECK or UNCHECK events before toggled and
     * CHANGE event after toggled by user.
     * The checkbox can also be enabled/disabled and get focused and highlighted.
     *
     * @extends {goog.ui.Control}
     */
    class Checkbox extends __Checkbox {}
    abstract class __Checkbox extends goog.ui.__Control {
        /**
         * @param {goog.ui.Checkbox.State=} opt_checked Checked state to set.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         * @param {goog.ui.CheckboxRenderer=} opt_renderer Renderer used to render or
         *     decorate the checkbox; defaults to {@link goog.ui.CheckboxRenderer}.
         */
        constructor(
            opt_checked?: goog.ui.Checkbox.State,
            opt_domHelper?: goog.dom.DomHelper,
            opt_renderer?: goog.ui.CheckboxRenderer
        );

        /**
         * Checked state of the checkbox.
         * @type {goog.ui.Checkbox.State}
         * @private
         */
        private checked_: goog.ui.Checkbox.State;

        /**
         * Label element bound to the checkbox.
         * @type {Element}
         * @private
         */
        private label_: Element;

        /**
         * @return {goog.ui.Checkbox.State} Checked state of the checkbox.
         */
        getChecked(): goog.ui.Checkbox.State;

        /**
         * @return {boolean} Whether the checkbox is not checked.
         */
        isUnchecked(): boolean;

        /**
         * @return {boolean} Whether the checkbox is in partially checked state.
         */
        isUndetermined(): boolean;

        /**
         * Sets the checked state for the checkbox.  Unlike {@link #setChecked},
         * doesn't update the checkbox's DOM.  Considered protected; to be called
         * only by renderer code during element decoration.
         * @param {goog.ui.Checkbox.State} checked New checkbox state.
         */
        setCheckedInternal(checked: goog.ui.Checkbox.State): void;

        /**
         * Binds an HTML element to the checkbox which if clicked toggles the checkbox.
         * Behaves the same way as the 'label' HTML tag. The label element has to be the
         * direct or non-direct ancestor of the checkbox element because it will get the
         * focus when keyboard support is implemented.
         * Note: Control#enterDocument also sets aria-label on the element but
         * Checkbox#enterDocument sets aria-labeledby on the same element which
         * overrides the aria-label in all modern screen readers.
         *
         * @param {?Element} label The label control to set. If null, only the checkbox
         *     reacts to clicks.
         */
        setLabel(label: Element|null): void;

        /**
         * Toggles the checkbox. State transitions:
         * <ul>
         *   <li>unchecked -> checked
         *   <li>undetermined -> checked
         *   <li>checked -> unchecked
         * </ul>
         */
        toggle(): void;

        /**
         * Handles the click event.
         * @param {!goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleClickOrSpace_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.ui.Checkbox {
    /**
     * Possible checkbox states.
     * @enum {?boolean}
     */
    enum State { CHECKED, UNCHECKED, UNDETERMINED }
}
