/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractpattern.d.ts"/>

declare module 'goog:goog.dom.pattern.Repeat' {
    import alias = goog.dom.pattern.Repeat;
    export default alias;
}

declare namespace goog.dom.pattern {
    /**
     * Pattern object that matches a repetition of another pattern.
     * @extends {goog.dom.pattern.AbstractPattern}
     * @final
     */
    class Repeat extends __Repeat {}
    abstract class __Repeat extends goog.dom.pattern.__AbstractPattern {
        /**
         * @param {goog.dom.pattern.AbstractPattern} pattern The pattern to
         *     repetitively match.
         * @param {number=} opt_minimum The minimum number of times to match.  Defaults
         *     to 0.
         * @param {number=} opt_maximum The maximum number of times to match.  Defaults
         *     to unlimited.
         */
        constructor(pattern: goog.dom.pattern.AbstractPattern, opt_minimum?: number, opt_maximum?: number);

        /**
         * Pattern to repetitively match.
         *
         * @private {goog.dom.pattern.AbstractPattern}
         */
        private pattern_: any /*missing*/;

        /**
         * Minimum number of times to match the pattern.
         *
         * @private {number}
         */
        private minimum_: any /*missing*/;

        /**
         * Optional maximum number of times to match the pattern. A `null` value
         * will be treated as infinity.
         *
         * @private {?number}
         */
        private maximum_: any /*missing*/;

        /**
         * The matched nodes.
         *
         * @type {Array<Node>}
         */
        matches: Node[];

        /**
         * Number of times the pattern has matched.
         *
         * @type {number}
         */
        count: number;

        /**
         * Whether the pattern has recently matched or failed to match and will need
         * to be reset when starting a new round of matches.
         *
         * @private {boolean}
         */
        private needsReset_: any /*missing*/;
    }
}
