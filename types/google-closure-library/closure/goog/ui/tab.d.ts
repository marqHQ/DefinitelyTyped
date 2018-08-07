/// <reference path="../../../globals.d.ts"/>
/// <reference path="./control.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./tabrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.ui.Tab' {
    import alias = goog.ui.Tab;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Tab control, designed to be hosted in a {@link goog.ui.TabBar}.  The tab's
     * DOM may be different based on the configuration of the containing tab bar,
     * so tabs should only be rendered or decorated as children of a tab bar.
     * @extends {goog.ui.Control}
     */
    class Tab extends __Tab {}
    abstract class __Tab extends goog.ui.__Control {
        /**
         * @param {goog.ui.ControlContent} content Text caption or DOM structure to
         *     display as the tab's caption (if any).
         * @param {goog.ui.TabRenderer=} opt_renderer Optional renderer used to render
         *     or decorate the tab.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(
            content: goog.ui.ControlContent, opt_renderer?: goog.ui.TabRenderer, opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * Tooltip text for the tab, displayed on hover (if any).
         * @type {string|undefined}
         * @private
         */
        private tooltip_: string|undefined;

        /**
         * @return {string|undefined} Tab tooltip text (if any).
         */
        getTooltip(): string|undefined;

        /**
         * Sets the tab tooltip text.  If the tab has already been rendered, updates
         * its tooltip.
         * @param {string} tooltip New tooltip text.
         */
        setTooltip(tooltip: string): void;

        /**
         * Sets the tab tooltip text.  Considered protected; to be called only by the
         * renderer during element decoration.
         * @param {string} tooltip New tooltip text.
         * @protected
         */
        protected setTooltipInternal(tooltip: string): void;
    }
}
