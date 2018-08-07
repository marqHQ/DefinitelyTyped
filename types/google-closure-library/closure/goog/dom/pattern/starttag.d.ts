/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./tag.d.ts"/>

declare module 'goog:goog.dom.pattern.StartTag' {
    import alias = goog.dom.pattern.StartTag;
    export default alias;
}

declare namespace goog.dom.pattern {
    /**
     * Pattern object that matches an opening tag.
     *
     * @extends {goog.dom.pattern.Tag}
     */
    class StartTag extends __StartTag {}
    abstract class __StartTag extends goog.dom.pattern.__Tag {
        /**
         * @param {string|RegExp} tag Name of the tag.  Also will accept a regular
         *     expression to match against the tag name.
         * @param {Object=} opt_attrs Optional map of attribute names to desired values.
         *     This pattern will only match when all attributes are present and match
         *     the string or regular expression value provided here.
         * @param {Object=} opt_styles Optional map of CSS style names to desired
         *     values. This pattern will only match when all styles are present and
         *     match the string or regular expression value provided here.
         * @param {Function=} opt_test Optional function that takes the element as a
         *     parameter and returns true if this pattern should match it.
         */
        constructor(tag: string|RegExp, opt_attrs?: Object, opt_styles?: Object, opt_test?: Function);
    }
}
