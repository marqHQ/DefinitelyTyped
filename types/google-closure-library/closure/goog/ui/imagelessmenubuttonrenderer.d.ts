/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menubuttonrenderer.d.ts"/>

declare module 'goog:goog.ui.ImagelessMenuButtonRenderer' {
    import alias = goog.ui.ImagelessMenuButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Custom renderer for {@link goog.ui.MenuButton}s. Imageless buttons can
     * contain almost arbitrary HTML content, will flow like inline elements, but
     * can be styled like block-level elements.
     *
     * @deprecated These contain a lot of unnecessary DOM for modern user agents.
     *     Please use a simpler button renderer like css3buttonrenderer.
     * @extends {goog.ui.MenuButtonRenderer}
     * @final
     */
    class ImagelessMenuButtonRenderer extends __ImagelessMenuButtonRenderer {}
    abstract class __ImagelessMenuButtonRenderer extends goog.ui.__MenuButtonRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.ImagelessMenuButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
