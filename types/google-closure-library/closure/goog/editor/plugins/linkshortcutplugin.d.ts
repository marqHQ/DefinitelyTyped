/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>

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
