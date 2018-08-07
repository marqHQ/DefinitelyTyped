/// <reference path="../../../globals.d.ts"/>
/// <reference path="./button.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./buttonrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ToggleButton' {
    import alias = goog.ui.ToggleButton;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A toggle button, with checkbox-like semantics.  Rendered using
     * {@link goog.ui.CustomButtonRenderer} by default, though any
     * {@link goog.ui.ButtonRenderer} would work.
     *
     * @extends {goog.ui.Button}
     */
    class ToggleButton extends __ToggleButton {}
    abstract class __ToggleButton extends goog.ui.__Button {
        /**
         * @param {goog.ui.ControlContent} content Text caption or existing DOM
         *     structure to display as the button's caption.
         * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
         *     decorate the button; defaults to {@link goog.ui.CustomButtonRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(
            content: goog.ui.ControlContent, opt_renderer?: goog.ui.ButtonRenderer, opt_domHelper?: goog.dom.DomHelper
        );
    }
}
