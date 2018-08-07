/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>
/// <reference path="./control.d.ts"/>

declare module 'goog:goog.ui.TextareaRenderer' {
    import alias = goog.ui.TextareaRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Renderer for {@link goog.ui.Textarea}s.  Renders and decorates native HTML
     * textarea elements.  Since native HTML textareas have built-in support for
     * many features, overrides many expensive (and redundant) superclass methods to
     * be no-ops.
     * @extends {goog.ui.ControlRenderer}
     */
    class TextareaRenderer extends __TextareaRenderer {}
    abstract class __TextareaRenderer extends goog.ui.__ControlRenderer {
        /**
         */
        constructor();

        /**
         * Sets up the textarea control such that it doesn't waste time adding
         * functionality that is already natively supported by browser
         * textareas.
         * @param {goog.ui.Control} textarea Textarea control to configure.
         * @private
         */
        private setUpTextarea_(textarea: goog.ui.Control): void;
    }
}

declare namespace goog.ui.TextareaRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
