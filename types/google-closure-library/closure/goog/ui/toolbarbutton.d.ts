/// <reference path="../../../globals.d.ts"/>
/// <reference path="./button.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./buttonrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ToolbarButton' {
    import alias = goog.ui.ToolbarButton;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A button control for a toolbar.
     *
     * @extends {goog.ui.Button}
     */
    class ToolbarButton extends __ToolbarButton {}
    abstract class __ToolbarButton extends goog.ui.__Button {
        /**
         * @param {goog.ui.ControlContent} content Text caption or existing DOM
         *     structure to display as the button's caption.
         * @param {goog.ui.ButtonRenderer=} opt_renderer Optional renderer used to
         *     render or decorate the button; defaults to
         *     {@link goog.ui.ToolbarButtonRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(
            content: goog.ui.ControlContent, opt_renderer?: goog.ui.ButtonRenderer, opt_domHelper?: goog.dom.DomHelper
        );
    }
}
