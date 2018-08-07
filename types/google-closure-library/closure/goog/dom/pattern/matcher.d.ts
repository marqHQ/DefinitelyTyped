/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractpattern.d.ts"/>
/// <reference path="../tagiterator.d.ts"/>

declare module 'goog:goog.dom.pattern.Matcher' {
    import alias = goog.dom.pattern.Matcher;
    export default alias;
}

declare namespace goog.dom.pattern {
    /**
     * Given a set of patterns and a root node, this class tests the patterns in
     * parallel.
     *
     * It is not (yet) a smart matcher - it doesn't do any advanced backtracking.
     * Given the pattern <code>DIV, SPAN</code> the matcher will not match
     * <code>DIV, DIV, SPAN</code> because it starts matching at the first
     * <code>DIV</code>, fails to match <code>SPAN</code> at the second, and never
     * backtracks to try again.
     *
     * It is also possible to have a set of complex patterns that when matched in
     * parallel will miss some possible matches.  Running multiple times will catch
     * all matches eventually.
     *
     * @final
     */
    class Matcher extends __Matcher {}
    abstract class __Matcher {
        /**
         */
        constructor();

        /**
         * Array of patterns to attempt to match in parallel.
         *
         * @private {Array<goog.dom.pattern.AbstractPattern>}
         */
        private patterns_: any /*missing*/;

        /**
         * Array of callbacks to call when a pattern is matched.  The indexing is the
         * same as the {@link #patterns_} array.
         *
         * @private {Array<Function>}
         */
        private callbacks_: any /*missing*/;

        /**
         * Adds a pattern to be matched.  The callback can return an object whose keys
         * are processing instructions.
         *
         * @param {goog.dom.pattern.AbstractPattern} pattern The pattern to add.
         * @param {Function} callback Function to call when a match is found.  Uses
         *     the above semantics.
         */
        addPattern(pattern: goog.dom.pattern.AbstractPattern, callback: Function): void;

        /**
         * Resets all the patterns.
         *
         * @private
         */
        private reset_(): void;

        /**
         * Test the given node against all patterns.
         *
         * @param {goog.dom.TagIterator} position A position in a node walk that is
         *     located at the token to process.
         * @return {boolean} Whether a pattern modified the position or tree
         *     and its callback resulted in DOM structure or position modification.
         * @private
         */
        private matchToken_(position: goog.dom.TagIterator): boolean;

        /**
         * Match the set of patterns against a match tree.
         *
         * @param {Node} node The root node of the tree to match.
         */
        match(node: Node): void;
    }
}
