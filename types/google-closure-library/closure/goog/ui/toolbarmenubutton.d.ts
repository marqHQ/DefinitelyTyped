/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menubutton.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./menu.d.ts"/>
/// <reference path="./buttonrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.ToolbarMenuButton' {
    import alias = goog.ui.ToolbarMenuButton;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A menu button control for a toolbar.
     *
     * @extends {goog.ui.MenuButton}
     */
    class ToolbarMenuButton extends __ToolbarMenuButton {}
    abstract class __ToolbarMenuButton extends goog.ui.__MenuButton {
        /**
         * @param {goog.ui.ControlContent} content Text caption or existing DOM
         *     structure to display as the button's caption.
         * @param {goog.ui.Menu=} opt_menu Menu to render under the button when clicked.
         * @param {goog.ui.ButtonRenderer=} opt_renderer Optional renderer used to
         *     render or decorate the button; defaults to
         *     {@link goog.ui.ToolbarMenuButtonRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(
            content: goog.ui.ControlContent,
            opt_menu?: goog.ui.Menu,
            opt_renderer?: goog.ui.ButtonRenderer,
            opt_domHelper?: goog.dom.DomHelper
        );
    }
}
