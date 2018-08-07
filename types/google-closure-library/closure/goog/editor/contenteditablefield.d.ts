/// <reference path="../../../globals.d.ts"/>
/// <reference path="./field.d.ts"/>

declare module 'goog:goog.editor.ContentEditableField' {
    import alias = goog.editor.ContentEditableField;
    export default alias;
}

declare namespace goog.editor {
    /**
     * This class encapsulates an editable field that is just a contentEditable
     * div.
     *
     * To see events fired by this object, please see the base class.
     *
     * @extends {goog.editor.Field}
     */
    class ContentEditableField extends __ContentEditableField {}
    abstract class __ContentEditableField extends goog.editor.__Field {
        /**
         * @param {string} id An identifer for the field. This is used to find the
         *     field and the element associated with this field.
         * @param {Document=} opt_doc The document that the element with the given
         *     id can be found in.
         */
        constructor(id: string, opt_doc?: Document);
    }
}
