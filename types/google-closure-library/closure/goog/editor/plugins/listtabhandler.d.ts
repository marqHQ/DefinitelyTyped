/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstracttabhandler.d.ts"/>

declare module 'goog:goog.editor.plugins.ListTabHandler' {
    import alias = goog.editor.plugins.ListTabHandler;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Plugin to handle tab keys in lists to indent and outdent.
     * @extends {goog.editor.plugins.AbstractTabHandler}
     * @final
     */
    class ListTabHandler extends __ListTabHandler {}
    abstract class __ListTabHandler extends goog.editor.plugins.__AbstractTabHandler {
        /**
         */
        constructor();
    }
}
