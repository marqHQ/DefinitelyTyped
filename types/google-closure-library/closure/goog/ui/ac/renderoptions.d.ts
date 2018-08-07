/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.ui.ac.RenderOptions' {
    import alias = goog.ui.ac.RenderOptions;
    export default alias;
}

declare namespace goog.ui.ac {
    /**
     * A simple class that contains options for rendering a set of autocomplete
     * matches.  Used as an optional argument in the callback from the matcher.
     */
    class RenderOptions extends __RenderOptions {}
    abstract class __RenderOptions {
        /**
         */
        constructor();

        /**
         * Whether the current highlighting is to be preserved when displaying the new
         * set of matches.
         * @type {boolean}
         * @private
         */
        private preserveHilited_: boolean;

        /**
         * Whether the first match is to be highlighted.  When undefined the autoHilite
         * flag of the autocomplete is used.
         * @type {boolean|undefined}
         * @private
         */
        private autoHilite_: boolean|undefined;

        /**
         * @param {boolean} flag The new value for the preserveHilited_ flag.
         */
        setPreserveHilited(flag: boolean): void;

        /**
         * @return {boolean} The value of the preserveHilited_ flag.
         */
        getPreserveHilited(): boolean;

        /**
         * @param {boolean} flag The new value for the autoHilite_ flag.
         */
        setAutoHilite(flag: boolean): void;

        /**
         * @return {boolean|undefined} The value of the autoHilite_ flag.
         */
        getAutoHilite(): boolean|undefined;
    }
}
