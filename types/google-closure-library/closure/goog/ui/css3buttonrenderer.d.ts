/// <reference path="../../../globals.d.ts"/>
/// <reference path="./buttonrenderer.d.ts"/>

declare module 'goog:goog.ui.Css3ButtonRenderer' {
    import alias = goog.ui.Css3ButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Custom renderer for {@link goog.ui.Button}s. Css3 buttons can contain
     * almost arbitrary HTML content, will flow like inline elements, but can be
     * styled like block-level elements.
     *
     * @extends {goog.ui.ButtonRenderer}
     * @final
     */
    class Css3ButtonRenderer extends __Css3ButtonRenderer {}
    abstract class __Css3ButtonRenderer extends goog.ui.__ButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.Css3ButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
