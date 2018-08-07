/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.editor.plugins.AbstractTabHandler' {
    import alias = goog.editor.plugins.AbstractTabHandler;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Plugin to handle tab keys. Specific tab behavior defined by subclasses.
     *
     * @extends {goog.editor.Plugin}
     */
    class AbstractTabHandler extends __AbstractTabHandler {}
    abstract class __AbstractTabHandler extends goog.editor.__Plugin {
        /**
         */
        constructor();

        /**
         * Handle a tab key press.
         * @param {goog.events.Event} e The key event.
         * @return {boolean} Whether this event was handled by this plugin.
         * @protected
         */
        protected handleTabKey(e: goog.events.Event): boolean;
    }
}
