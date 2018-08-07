/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractpattern.d.ts"/>
/// <reference path="../tagiterator.d.ts"/>

declare module 'goog:goog.dom.pattern.Tag' {
    import alias = goog.dom.pattern.Tag;
    export default alias;
}

declare namespace goog.dom.pattern {
    /**
     * Pattern object that matches an tag.
     *
     * @extends {goog.dom.pattern.AbstractPattern}
     */
    class Tag extends __Tag {}
    abstract class __Tag extends goog.dom.pattern.__AbstractPattern {
        /**
         * @param {string|RegExp} tag Name of the tag.  Also will accept a regular
         *     expression to match against the tag name.
         * @param {goog.dom.TagWalkType} type Type of token to match.
         * @param {Object=} opt_attrs Optional map of attribute names to desired values.
         *     This pattern will only match when all attributes are present and match
         *     the string or regular expression value provided here.
         * @param {Object=} opt_styles Optional map of CSS style names to desired
         *     values. This pattern will only match when all styles are present and
         *     match the string or regular expression value provided here.
         * @param {Function=} opt_test Optional function that takes the element as a
         *     parameter and returns true if this pattern should match it.
         */
        constructor(
            tag: string|RegExp, type: goog.dom.TagWalkType, opt_attrs?: Object, opt_styles?: Object, opt_test?: Function
        );

        /**
         * The tag to match.
         *
         * @private {string|RegExp}
         */
        private tag_: any /*missing*/;

        /**
         * The type of token to match.
         *
         * @private {goog.dom.TagWalkType}
         */
        private type_: any /*missing*/;

        /**
         * The attributes to test for.
         *
         * @private {Object}
         */
        private attrs_: any /*missing*/;

        /**
         * The styles to test for.
         *
         * @private {Object}
         */
        private styles_: any /*missing*/;

        /**
         * Function that takes the element as a parameter and returns true if this
         * pattern should match it.
         *
         * @private {Function}
         */
        private test_: any /*missing*/;
    }
}
