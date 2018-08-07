/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../editor/plugin.d.ts"/>

declare module 'goog:goog.demos.editor.HelloWorld' {
    import alias = goog.demos.editor.HelloWorld;
    export default alias;
}

declare namespace goog.demos.editor {
    /**
     * Plugin to insert 'Hello World!' into an editable field.
     * @extends {goog.editor.Plugin}
     * @final
     */
    class HelloWorld extends __HelloWorld {}
    abstract class __HelloWorld extends goog.editor.__Plugin {
        /**
         */
        constructor();
    }
}

declare namespace goog.demos.editor.HelloWorld {
    /**
     * Commands implemented by this plugin.
     * @enum {string}
     */
    enum COMMAND { HELLO_WORLD }
}
