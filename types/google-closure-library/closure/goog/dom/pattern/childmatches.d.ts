/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./allchildren.d.ts"/>
/// <reference path="./abstractpattern.d.ts"/>

declare module 'goog:goog.dom.pattern.ChildMatches' {
    import alias = goog.dom.pattern.ChildMatches;
    export default alias;
}

declare namespace goog.dom.pattern {
    /**
     * Pattern object that matches any nodes at or below the current tree depth.
     *
     * @extends {goog.dom.pattern.AllChildren}
     * @final
     */
    class ChildMatches extends __ChildMatches {}
    abstract class __ChildMatches extends goog.dom.pattern.__AllChildren {
        /**
         * @param {goog.dom.pattern.AbstractPattern} childPattern Pattern to collect
         *     child matches of.
         * @param {number=} opt_minimumMatches Enforce a minimum nuber of matches.
         *     Defaults to 0.
         */
        constructor(childPattern: goog.dom.pattern.AbstractPattern, opt_minimumMatches?: number);

        /**
         * The child pattern to collect matches from.
         *
         * @private {goog.dom.pattern.AbstractPattern}
         */
        private childPattern_: any /*missing*/;

        /**
         * Array of matched child nodes.
         *
         * @type {Array<Node>}
         */
        matches: Node[];

        /**
         * Minimum number of matches.
         *
         * @private {number}
         */
        private minimumMatches_: any /*missing*/;

        /**
         * Whether the pattern has recently matched or failed to match and will need
         * to be reset when starting a new round of matches.
         *
         * @private {boolean}
         */
        private needsReset_: any /*missing*/;
    }
}
