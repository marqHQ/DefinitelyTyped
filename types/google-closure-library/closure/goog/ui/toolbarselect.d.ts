/// <reference path="../../../globals.d.ts"/>
/// <reference path="./select.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./menu.d.ts"/>
/// <reference path="./menubuttonrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ToolbarSelect' {
    import alias = goog.ui.ToolbarSelect;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A select control for a toolbar.
     *
     * @extends {goog.ui.Select}
     */
    class ToolbarSelect extends __ToolbarSelect {}
    abstract class __ToolbarSelect extends goog.ui.__Select {
        /**
         * @param {goog.ui.ControlContent} caption Default caption or existing DOM
         *     structure to display as the button's caption when nothing is selected.
         * @param {goog.ui.Menu=} opt_menu Menu containing selection options.
         * @param {goog.ui.MenuButtonRenderer=} opt_renderer Renderer used to
         *     render or decorate the control; defaults to
         *     {@link goog.ui.ToolbarMenuButtonRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(
            caption: goog.ui.ControlContent,
            opt_menu?: goog.ui.Menu,
            opt_renderer?: goog.ui.MenuButtonRenderer,
            opt_domHelper?: goog.dom.DomHelper
        );
    }
}
