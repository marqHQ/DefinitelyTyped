/// <reference path="../../../globals.d.ts"/>
/// <reference path="./colormenubuttonrenderer.d.ts"/>

declare namespace goog.ui {
    class ColorButtonRenderer extends __ColorButtonRenderer {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __ColorButtonRenderer extends goog.ui.__ColorMenuButtonRenderer {
        /**
         * Renderer for {@link goog.ui.ColorButton}s.
         * Uses {@link goog.ui.ColorMenuButton}s but disables the dropdown.
         *
         * @constructor
         * @extends {goog.ui.ColorMenuButtonRenderer}
         * @final
         */
        constructor();
    }
}

declare namespace goog.ui.ColorButtonRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer. Additionally, applies class to the button's caption.
     * @type {string}
     */
    let CSS_CLASS: string;
}
