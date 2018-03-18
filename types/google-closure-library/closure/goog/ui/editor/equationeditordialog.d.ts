/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractdialog.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>

declare namespace goog.ui.editor {
    class EquationEditorDialog extends __EquationEditorDialog {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __EquationEditorDialog extends goog.ui.editor.__AbstractDialog {
        /**
         * Equation editor dialog (based on goog.ui.editor.AbstractDialog).
         * @param {Object} context The context that this dialog runs in.
         * @param {goog.dom.DomHelper} domHelper DomHelper to be used to create the
         *     dialog's dom structure.
         * @param {string} equation Initial equation.
         * @param {string} helpUrl URL pointing to help documentation.
         * @constructor
         * @extends {goog.ui.editor.AbstractDialog}
         * @final
         */
        constructor(context: Object, domHelper: goog.dom.DomHelper, equation: string, helpUrl: string);
    }
}
