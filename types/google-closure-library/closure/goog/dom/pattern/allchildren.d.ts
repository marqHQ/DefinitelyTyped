/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractpattern.d.ts"/>

declare module 'goog:goog.dom.pattern.AllChildren' {
    import alias = goog.dom.pattern.AllChildren;
    export default alias;
}

declare namespace goog.dom.pattern {
    /**
     * Pattern object that matches any nodes at or below the current tree depth.
     *
     * @extends {goog.dom.pattern.AbstractPattern}
     */
    class AllChildren extends __AllChildren {}
    abstract class __AllChildren extends goog.dom.pattern.__AbstractPattern {
        /**
         */
        constructor();

        /**
         * Tracks the matcher's depth to detect the end of the tag.
         *
         * @private {number}
         */
        private depth_: any /*missing*/;
    }
}
