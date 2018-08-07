/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./matcher.d.ts"/>

declare module 'goog:goog.labs.testing.IsNotMatcher' {
    import alias = goog.labs.testing.IsNotMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.AnyOfMatcher' {
    import alias = goog.labs.testing.AnyOfMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.AllOfMatcher' {
    import alias = goog.labs.testing.AllOfMatcher;
    export default alias;
}

declare namespace goog.labs.testing {
    /**
     * The AllOf matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class AllOfMatcher extends __AllOfMatcher {}
    abstract class __AllOfMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {!Array<!goog.labs.testing.Matcher>} matchers Input matchers.
         *
         */
        constructor(matchers: goog.labs.testing.Matcher[]);

        /**
         * @type {!Array<!goog.labs.testing.Matcher>}
         * @private
         */
        private matchers_: goog.labs.testing.Matcher[];

        /**
         * Determines whether a value matches the constraints of the match.
         *
         * @param {*} value The object to match.
         * @return {boolean} Whether the input value matches this matcher.
         */
        matches(value: any): boolean;

        /**
         * Describes why the matcher failed.
         *
         * @param {*} value The value that didn't match.
         * @param {string=} opt_description A partial description to which the reason
         *     will be appended.
         *
         * @return {string} Description of why the matcher failed.
         */
        describe(value: any, opt_description?: string): string;
    }

    /**
     * The AnyOf matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class AnyOfMatcher extends __AnyOfMatcher {}
    abstract class __AnyOfMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {!Array<!goog.labs.testing.Matcher>} matchers Input matchers.
         *
         */
        constructor(matchers: goog.labs.testing.Matcher[]);

        /**
         * @type {!Array<!goog.labs.testing.Matcher>}
         * @private
         */
        private matchers_: goog.labs.testing.Matcher[];

        /**
         * Determines whether a value matches the constraints of the match.
         *
         * @param {*} value The object to match.
         * @return {boolean} Whether the input value matches this matcher.
         */
        matches(value: any): boolean;

        /**
         * Describes why the matcher failed.
         *
         * @param {*} value The value that didn't match.
         * @param {string=} opt_description A partial description to which the reason
         *     will be appended.
         *
         * @return {string} Description of why the matcher failed.
         */
        describe(value: any, opt_description?: string): string;
    }

    /**
     * The IsNot matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class IsNotMatcher extends __IsNotMatcher {}
    abstract class __IsNotMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {!goog.labs.testing.Matcher} matcher The matcher to negate.
         *
         */
        constructor(matcher: goog.labs.testing.Matcher);

        /**
         * @type {!goog.labs.testing.Matcher}
         * @private
         */
        private matcher_: goog.labs.testing.Matcher;

        /**
         * Determines whether a value matches the constraints of the match.
         *
         * @param {*} value The object to match.
         * @return {boolean} Whether the input value matches this matcher.
         */
        matches(value: any): boolean;

        /**
         * Describes why the matcher failed.
         *
         * @param {*} value The value that didn't match.
         * @param {string=} opt_description A partial description to which the reason
         *     will be appended.
         *
         * @return {string} Description of why the matcher failed.
         */
        describe(value: any, opt_description?: string): string;
    }
}
