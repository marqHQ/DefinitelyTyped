/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractbubbleplugin.d.ts"/>

declare namespace goog.editor.plugins.equation {
    class EquationBubble extends __EquationBubble {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __EquationBubble extends goog.editor.plugins.__AbstractBubblePlugin {
        /**
         * Property bubble plugin for equations.
         *
         * @constructor
         * @extends {goog.editor.plugins.AbstractBubblePlugin}
         * @final
         */
        constructor();
    }
}
