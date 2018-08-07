/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>

declare module 'goog:goog.editor.plugins.LoremIpsum' {
    import alias = goog.editor.plugins.LoremIpsum;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * A plugin that manages lorem ipsum state of editable fields.
     * @extends {goog.editor.Plugin}
     * @final
     */
    class LoremIpsum extends __LoremIpsum {}
    abstract class __LoremIpsum extends goog.editor.__Plugin {
        /**
         * @param {string} message The lorem ipsum message.
         */
        constructor(message: string);

        /**
         * The lorem ipsum message.
         * @type {string}
         * @private
         */
        private message_: string;

        /**
         * Whether the field is currently filled with lorem ipsum text.
         * @type {boolean}
         * @private
         */
        private usingLorem_: boolean;

        /**
         * Set the lorem ipsum text in a goog.editor.Field if needed.
         * @private
         */
        private updateLorem_(): void;

        /**
         * Clear an EditableField's lorem ipsum and put in initial text if needed.
         *
         * If using click-to-edit mode (where Trogedit manages whether the field
         * is editable), this works for both editable and uneditable fields.
         *
         * TODO(user): Is this really necessary? See TODO below.
         * @param {boolean=} opt_placeCursor Whether to place the cursor in the field
         *     after clearing lorem.
         * @private
         */
        private clearLorem_(opt_placeCursor?: boolean): void;
    }
}
