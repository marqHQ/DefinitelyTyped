/// <reference path="../../../../../globals.d.ts"/>
/// <reference path="../../custombuttonrenderer.d.ts"/>

declare module 'goog:goog.ui.style.app.ButtonRenderer' {
    import alias = goog.ui.style.app.ButtonRenderer;
    export default alias;
}

declare namespace goog.ui.style.app {
    /**
     * Custom renderer for {@link goog.ui.Button}s. Imageless buttons can contain
     * almost arbitrary HTML content, will flow like inline elements, but can be
     * styled like block-level elements.
     *
     * @extends {goog.ui.CustomButtonRenderer}
     */
    class ButtonRenderer extends __ButtonRenderer {}
    abstract class __ButtonRenderer extends goog.ui.__CustomButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.style.app.ButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;

    /**
     * Array of arrays of CSS classes that we want composite classes added and
     * removed for in IE6 and lower as a workaround for lack of multi-class CSS
     * selector support.
     * @type {Array<Array<string>>}
     */
    let IE6_CLASS_COMBINATIONS: string[][];
}
