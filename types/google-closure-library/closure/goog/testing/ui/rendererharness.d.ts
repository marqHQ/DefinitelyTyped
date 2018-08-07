/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../disposable/disposable.d.ts"/>
/// <reference path="../../ui/controlrenderer.d.ts"/>
/// <reference path="../../ui/control.d.ts"/>

declare module 'goog:goog.testing.ui.RendererHarness' {
    import alias = goog.testing.ui.RendererHarness;
    export default alias;
}

declare namespace goog.testing.ui {
    /**
     * A driver for testing renderers.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class RendererHarness extends __RendererHarness {}
    abstract class __RendererHarness extends goog.__Disposable {
        /**
         * @param {goog.ui.ControlRenderer} renderer A renderer to test.
         * @param {Element} renderParent The parent of the element where controls will
         *     be rendered.
         * @param {Element} decorateParent The parent of the element where controls will
         *     be decorated.
         */
        constructor(renderer: goog.ui.ControlRenderer, renderParent: Element, decorateParent: Element);

        /**
         * The renderer under test.
         * @type {goog.ui.ControlRenderer}
         * @private
         */
        private renderer_: goog.ui.ControlRenderer;

        /**
         * The parent of the element where controls will be rendered.
         * @type {Element}
         * @private
         */
        private renderParent_: Element;

        /**
         * The original HTML of the render element.
         * @type {string}
         * @private
         */
        private renderHtml_: string;

        /**
         * The parent of the element where controls will be decorated.
         * @type {Element}
         * @private
         */
        private decorateParent_: Element;

        /**
         * The original HTML of the decorated element.
         * @type {string}
         * @private
         */
        private decorateHtml_: string;

        /**
         * A control to create by decoration.
         * @type {goog.ui.Control}
         * @private
         */
        private decorateControl_: goog.ui.Control;

        /**
         * A control to create by rendering.
         * @type {goog.ui.Control}
         * @private
         */
        private renderControl_: goog.ui.Control;

        /**
         * Whether all the necessary assert methods have been called.
         * @type {boolean}
         * @private
         */
        private verified_: boolean;

        /**
         * Attach a control and render its DOM.
         * @param {goog.ui.Control} control A control.
         * @return {Element} The element created.
         */
        attachControlAndRender(control: goog.ui.Control): Element;

        /**
         * Attach a control and decorate the element given in the constructor.
         * @param {goog.ui.Control} control A control.
         * @return {Element} The element created.
         */
        attachControlAndDecorate(control: goog.ui.Control): Element;

        /**
         * Assert that the rendered element and the decorated element match.
         */
        assertDomMatches(): void;
    }
}
