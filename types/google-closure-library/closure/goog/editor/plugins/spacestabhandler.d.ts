/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstracttabhandler.d.ts"/>

declare namespace goog.editor.plugins {
    /**
     * Plugin to handle tab keys when not in lists to add 4 spaces.
     * @extends {goog.editor.plugins.AbstractTabHandler}
     * @final
     */
    class SpacesTabHandler extends __SpacesTabHandler {}
    abstract class __SpacesTabHandler extends goog.editor.plugins.__AbstractTabHandler {
        /**
         */
        constructor();
    }
}
