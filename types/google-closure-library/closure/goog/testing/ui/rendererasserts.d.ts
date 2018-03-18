/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../ui/controlrenderer.d.ts"/>

declare namespace goog.testing.ui.rendererasserts {
    /**
     * Assert that a control renderer constructor doesn't call getCssClass.
     *
     * @param {function(new:goog.ui.ControlRenderer)} rendererClassUnderTest The
     *     renderer constructor to test.
     */
    function assertNoGetCssClassCallsInConstructor(rendererClassUnderTest: (this: goog.ui.ControlRenderer) => void):
        void;
}
