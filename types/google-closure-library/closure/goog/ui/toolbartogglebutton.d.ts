/// <reference path="../../../globals.d.ts"/>
/// <reference path="./togglebutton.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./toolbarbuttonrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ToolbarToggleButton' {
    import alias = goog.ui.ToolbarToggleButton;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A toggle button control for a toolbar.
     *
     * @extends {goog.ui.ToggleButton}
     */
    class ToolbarToggleButton extends __ToolbarToggleButton {}
    abstract class __ToolbarToggleButton extends goog.ui.__ToggleButton {
        /**
         * @param {goog.ui.ControlContent} content Text caption or existing DOM
         *     structure to display as the button's caption.
         * @param {goog.ui.ToolbarButtonRenderer=} opt_renderer Optional renderer used
         *     to render or decorate the button; defaults to
         *     {@link goog.ui.ToolbarButtonRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(
            content: goog.ui.ControlContent,
            opt_renderer?: goog.ui.ToolbarButtonRenderer,
            opt_domHelper?: goog.dom.DomHelper
        );
    }
}
