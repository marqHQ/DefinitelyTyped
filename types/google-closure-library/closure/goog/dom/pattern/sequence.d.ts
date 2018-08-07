/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractpattern.d.ts"/>

declare module 'goog:goog.dom.pattern.Sequence' {
    import alias = goog.dom.pattern.Sequence;
    export default alias;
}

declare namespace goog.dom.pattern {
    /**
     * Pattern object that matches a sequence of other patterns.
     *
     * @extends {goog.dom.pattern.AbstractPattern}
     * @final
     */
    class Sequence extends __Sequence {}
    abstract class __Sequence extends goog.dom.pattern.__AbstractPattern {
        /**
         * @param {Array<goog.dom.pattern.AbstractPattern>} patterns Ordered array of
         *     patterns to match.
         * @param {boolean=} opt_ignoreWhitespace Optional flag to ignore text nodes
         *     consisting entirely of whitespace.  The default is to not ignore them.
         */
        constructor(patterns: goog.dom.pattern.AbstractPattern[], opt_ignoreWhitespace?: boolean);

        /**
         * Ordered array of patterns to match.
         *
         * @type {Array<goog.dom.pattern.AbstractPattern>}
         */
        patterns: goog.dom.pattern.AbstractPattern[];

        /**
         * Whether or not to ignore whitespace only Text nodes.
         *
         * @private {boolean}
         */
        private ignoreWhitespace_: any /*missing*/;

        /**
         * Position in the patterns array we have reached by successful matches.
         *
         * @private {number}
         */
        private currentPosition_: any /*missing*/;
    }
}

declare namespace goog.dom.pattern.Sequence {
}
