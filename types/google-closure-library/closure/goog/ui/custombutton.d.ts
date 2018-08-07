/// <reference path="../../../globals.d.ts"/>
/// <reference path="./button.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./buttonrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.CustomButton' {
    import alias = goog.ui.CustomButton;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A custom button control.  Identical to {@link goog.ui.Button}, except it
     * defaults its renderer to {@link goog.ui.CustomButtonRenderer}.  One could
     * just as easily pass `goog.ui.CustomButtonRenderer.getInstance()` to
     * the {@link goog.ui.Button} constructor and get the same result.  Provided
     * for convenience.
     *
     * @extends {goog.ui.Button}
     */
    class CustomButton extends __CustomButton {}
    abstract class __CustomButton extends goog.ui.__Button {
        /**
         * @param {goog.ui.ControlContent} content Text caption or existing DOM
         *    structure to display as the button's caption.
         * @param {goog.ui.ButtonRenderer=} opt_renderer Optional renderer used to
         *    render or decorate the button; defaults to
         *    {@link goog.ui.CustomButtonRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *    document interaction.
         */
        constructor(
            content: goog.ui.ControlContent, opt_renderer?: goog.ui.ButtonRenderer, opt_domHelper?: goog.dom.DomHelper
        );
    }
}
