/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>

declare module 'goog:goog.editor.plugins.HeaderFormatter' {
    import alias = goog.editor.plugins.HeaderFormatter;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Applies header styles to text.
     * @extends {goog.editor.Plugin}
     * @final
     */
    class HeaderFormatter extends __HeaderFormatter {}
    abstract class __HeaderFormatter extends goog.editor.__Plugin {
        /**
         */
        constructor();
    }
}

declare namespace goog.editor.plugins.HeaderFormatter {
    /**
     * Commands that can be passed as the optional argument to execCommand.
     * @enum {string}
     */
    enum HEADER_COMMAND { H1, H2, H3, H4 }
}
