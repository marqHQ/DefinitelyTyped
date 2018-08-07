/// <reference path="../../../globals.d.ts"/>
/// <reference path="./buttonrenderer.d.ts"/>
/// <reference path="./control.d.ts"/>

declare module 'goog:goog.ui.NativeButtonRenderer' {
    import alias = goog.ui.NativeButtonRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Renderer for {@link goog.ui.Button}s.  Renders and decorates native HTML
     * button elements.  Since native HTML buttons have built-in support for many
     * features, overrides many expensive (and redundant) superclass methods to
     * be no-ops.
     * @extends {goog.ui.ButtonRenderer}
     */
    class NativeButtonRenderer extends __NativeButtonRenderer {}
    abstract class __NativeButtonRenderer extends goog.ui.__ButtonRenderer {
        /**
         */
        constructor();

        /**
         * Sets up the button control such that it doesn't waste time adding
         * functionality that is already natively supported by native browser
         * buttons.
         * @param {goog.ui.Control} button Button control to configure.
         * @private
         */
        private setUpNativeButton_(button: goog.ui.Control): void;
    }
}
