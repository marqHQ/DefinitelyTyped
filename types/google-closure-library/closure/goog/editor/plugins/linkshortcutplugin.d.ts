/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>

declare module 'goog:goog.editor.plugins.LinkShortcutPlugin' {
    import alias = goog.editor.plugins.LinkShortcutPlugin;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Plugin to add a keyboard shortcut for the link command
     * @extends {goog.editor.Plugin}
     * @final
     */
    class LinkShortcutPlugin extends __LinkShortcutPlugin {}
    abstract class __LinkShortcutPlugin extends goog.editor.__Plugin {
        /**
         */
        constructor();
    }
}
