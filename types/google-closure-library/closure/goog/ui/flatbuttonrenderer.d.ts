/// <reference path="../../../globals.d.ts"/>
/// <reference path="./buttonrenderer.d.ts"/>

declare module 'goog:goog.ui.FlatButtonRenderer' {
    import alias = goog.ui.FlatButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Flat renderer for {@link goog.ui.Button}s.  Flat buttons can contain
     * almost arbitrary HTML content, will flow like inline elements, but can be
     * styled like block-level elements.
     * @extends {goog.ui.ButtonRenderer}
     */
    class FlatButtonRenderer extends __FlatButtonRenderer {}
    abstract class __FlatButtonRenderer extends goog.ui.__ButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.FlatButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
