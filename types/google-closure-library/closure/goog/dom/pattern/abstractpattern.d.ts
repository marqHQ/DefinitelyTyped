/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../tagiterator.d.ts"/>
/// <reference path="./pattern.d.ts"/>

declare module 'goog:goog.dom.pattern.AbstractPattern' {
    import alias = goog.dom.pattern.AbstractPattern;
    export default alias;
}

declare namespace goog.dom.pattern {
    /**
     * Base pattern class for DOM matching.
     *
     */
    class AbstractPattern extends __AbstractPattern {}
    abstract class __AbstractPattern {
        /**
         */
        constructor();

        /**
         * The first node matched by this pattern.
         * @type {Node}
         */
        matchedNode: Node;

        /**
         * Reset any internal state this pattern keeps.
         */
        reset(): void;

        /**
         * Test whether this pattern matches the given token.
         *
         * @param {Node} token Token to match against.
         * @param {goog.dom.TagWalkType} type The type of token.
         * @return {goog.dom.pattern.MatchType} `MATCH` if the pattern matches.
         */
        matchToken(token: Node, type: goog.dom.TagWalkType): goog.dom.pattern.MatchType;
    }
}
