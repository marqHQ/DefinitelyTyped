/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>

declare module 'goog:goog.editor.plugins.Emoticons' {
    import alias = goog.editor.plugins.Emoticons;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Plugin for generating emoticons.
     *
     * @extends {goog.editor.Plugin}
     * @final
     */
    class Emoticons extends __Emoticons {}
    abstract class __Emoticons extends goog.editor.__Plugin {
        /**
         */
        constructor();
    }
}

declare namespace goog.editor.plugins.Emoticons {
    /** The emoticon command. */
    let COMMAND: any /*missing*/;
}
