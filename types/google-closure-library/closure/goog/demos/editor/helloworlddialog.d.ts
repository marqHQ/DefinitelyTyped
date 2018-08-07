/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../ui/editor/abstractdialog.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.demos.editor.HelloWorldDialog' {
    import alias = goog.demos.editor.HelloWorldDialog;
    export default alias;
}

declare module 'goog:goog.demos.editor.HelloWorldDialog.OkEvent' {
    import alias = goog.demos.editor.HelloWorldDialog.OkEvent;
    export default alias;
}

declare namespace goog.demos.editor {
    /**
     * Creates a dialog to let the user enter a customized hello world message.
     * @extends {goog.ui.editor.AbstractDialog}
     * @final
     */
    class HelloWorldDialog extends __HelloWorldDialog {}
    abstract class __HelloWorldDialog extends goog.ui.editor.__AbstractDialog {
        /**
         * @param {goog.dom.DomHelper} domHelper DomHelper to be used to create the
         * dialog's dom structure.
         */
        constructor(domHelper: goog.dom.DomHelper);

        /**
         * Input element where the user will type their hello world message.
         * @type {HTMLInputElement}
         * @private
         */
        private input_: HTMLInputElement;

        /**
         * Creates the DOM structure that makes up the dialog's content area.
         * @return {Element} The DOM structure that makes up the dialog's content area.
         * @private
         */
        private createContent_(): Element;

        /**
         * Returns the hello world message currently typed into the dialog's input.
         * @return {?string} The hello world message currently typed into the dialog's
         *     input, or null if called before the input is created.
         * @private
         */
        private getMessage_(): string|null;
    }
}

declare namespace goog.demos.editor.HelloWorldDialog {
    /**
     * OK event object for the hello world dialog.
     * @extends {goog.events.Event}
     * @final
     */
    class OkEvent extends __OkEvent {}
    abstract class __OkEvent extends goog.events.__Event {
        /**
         * @param {string} message Customized hello world message chosen by the user.
         */
        constructor(message: string);

        /**
         * Customized hello world message chosen by the user.
         * @type {string}
         */
        message: string;
    }
}
