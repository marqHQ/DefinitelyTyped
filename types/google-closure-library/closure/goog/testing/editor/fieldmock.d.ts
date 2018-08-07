/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../loosemock.d.ts"/>
/// <reference path="../../dom/abstractrange.d.ts"/>

declare module 'goog:goog.testing.editor.FieldMock' {
    import alias = goog.testing.editor.FieldMock;
    export default alias;
}

declare namespace goog.testing.editor {
    /**
     * Mock of goog.editor.Field.
     * @extends {goog.testing.LooseMock}
     * @suppress {missingProperties} Mocks do not fit in the type system well.
     * @final
     */
    class FieldMock extends __FieldMock {}
    abstract class __FieldMock extends goog.testing.__LooseMock {
        /**
         * @param {Window=} opt_window Window the field would edit.  Defaults to
         *     `window`.
         * @param {Window=} opt_appWindow "AppWindow" of the field, which can be
         *     different from `opt_window` when mocking a field that uses an
         *     iframe. Defaults to `opt_window`.
         * @param {goog.dom.AbstractRange=} opt_range An object (mock or real) to be
         *     returned by getRange(). If omitted, a new goog.dom.Range is created
         *     from the window every time getRange() is called.
         */
        constructor(opt_window?: Window, opt_appWindow?: Window, opt_range?: goog.dom.AbstractRange);

        /**
         * @return {boolean} Whether we're in modal interaction mode.
         */
        inModalMode(): boolean;

        /**
         * @param {boolean} mode Sets whether we're in modal interaction mode.
         */
        setModalMode(mode: boolean): void;

        /**
         * @return {boolean} Whether the field is uneditable.
         */
        isUneditable(): boolean;

        /**
         * @param {boolean} isUneditable Whether the field is uneditable.
         */
        setUneditable(isUneditable: boolean): void;
    }
}
