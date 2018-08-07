/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../editor/plugins/abstractdialogplugin.d.ts"/>
/// <reference path="./helloworlddialog.d.ts"/>

declare module 'goog:goog.demos.editor.HelloWorldDialogPlugin' {
    import alias = goog.demos.editor.HelloWorldDialogPlugin;
    export default alias;
}

declare module 'goog:goog.demos.editor.HelloWorldDialogPlugin.Command' {
    import alias = goog.demos.editor.HelloWorldDialogPlugin.Command;
    export default alias;
}

declare namespace goog.demos.editor {
    /**
     * A plugin that opens the hello world dialog.
     * @extends {goog.editor.plugins.AbstractDialogPlugin}
     * @final
     */
    class HelloWorldDialogPlugin extends __HelloWorldDialogPlugin {}
    abstract class __HelloWorldDialogPlugin extends goog.editor.plugins.__AbstractDialogPlugin {
        /**
         */
        constructor();

        /**
         * Handles the OK event from the dialog by inserting the hello world message
         * into the field.
         * @param {goog.demos.editor.HelloWorldDialog.OkEvent} e OK event object.
         * @private
         */
        private handleOk_(e: goog.demos.editor.HelloWorldDialog.OkEvent): void;
    }
}

declare namespace goog.demos.editor.HelloWorldDialogPlugin {
    /**
     * Commands implemented by this plugin.
     * @enum {string}
     */
    enum Command { HELLO_WORLD_DIALOG }
}
