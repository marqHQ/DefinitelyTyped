/// <reference path="../../../../globals.d.ts"/>

declare namespace goog.demos.editor {
    class EquationEditor extends __EquationEditor {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __EquationEditor {
        /**
         * @constructor
         * @final
         */
        constructor();

        /**
         * Creates a new editor and opens the dialog.
         * @param {string} initialEquation The initial equation value to use.
         */
        openEditor(initialEquation: string): void;
    }
}
