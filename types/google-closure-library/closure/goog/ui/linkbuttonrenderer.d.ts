/// <reference path="../../../globals.d.ts"/>
/// <reference path="./flatbuttonrenderer.d.ts"/>

declare module 'goog:goog.ui.LinkButtonRenderer' {
    import alias = goog.ui.LinkButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Link renderer for {@link goog.ui.Button}s.  Link buttons can contain
     * almost arbitrary HTML content, will flow like inline elements, but can be
     * styled like block-level elements.
     * @extends {goog.ui.FlatButtonRenderer}
     */
    class LinkButtonRenderer extends __LinkButtonRenderer {}
    abstract class __LinkButtonRenderer extends goog.ui.__FlatButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.LinkButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
