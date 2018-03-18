/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractdialogplugin.d.ts"/>

declare namespace goog.editor.plugins {
    class EquationEditorPlugin extends __EquationEditorPlugin {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __EquationEditorPlugin extends goog.editor.plugins.__AbstractDialogPlugin {
        /**
         * A plugin that opens the equation editor in a dialog window.
         * @param {string=} opt_helpUrl A URL pointing to help documentation.
         * @constructor
         * @extends {goog.editor.plugins.AbstractDialogPlugin}
         * @final
         */
        constructor(opt_helpUrl?: string);
    }
}
