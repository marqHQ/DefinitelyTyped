/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>
/// <reference path="./checkbox.d.ts"/>

declare module 'goog:goog.ui.CheckboxRenderer' {
    import alias = goog.ui.CheckboxRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.Checkbox}s.  Extends the superclass
     * to support checkbox states:
     * @extends {goog.ui.ControlRenderer}
     */
    class CheckboxRenderer extends __CheckboxRenderer {}
    abstract class __CheckboxRenderer extends goog.ui.__ControlRenderer {
        /**
         */
        constructor();

        /**
         * Updates the appearance of the control in response to a checkbox state
         * change.
         * @param {Element} element Checkbox element.
         * @param {goog.ui.Checkbox.State} state Updated checkbox state.
         */
        setCheckboxState(element: Element, state: goog.ui.Checkbox.State): void;

        /**
         * Gets the checkbox's ARIA (accessibility) state from its checked state.
         * @param {goog.ui.Checkbox.State} state Checkbox state.
         * @return {string} The value of goog.a11y.aria.state.CHECKED. Either 'true',
         *     'false', or 'mixed'.
         * @private
         */
        private ariaStateFromCheckState_(state: goog.ui.Checkbox.State): string;

        /**
         * Takes a single {@link goog.ui.Checkbox.State}, and returns the
         * corresponding CSS class name.
         * @param {goog.ui.Checkbox.State} state Checkbox state.
         * @return {string} CSS class representing the given state.
         * @protected
         * @suppress {missingRequire} goog.ui.Checkbox
         */
        protected getClassForCheckboxState(state: goog.ui.Checkbox.State): string;
    }
}

declare namespace goog.ui.CheckboxRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
