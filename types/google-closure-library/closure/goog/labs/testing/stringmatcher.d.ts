/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./matcher.d.ts"/>

declare module 'goog:goog.labs.testing.StringContainsInOrderMatcher' {
    import alias = goog.labs.testing.StringContainsInOrderMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.StartsWithMatcher' {
    import alias = goog.labs.testing.StartsWithMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.RegexMatcher' {
    import alias = goog.labs.testing.RegexMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.EqualsMatcher' {
    import alias = goog.labs.testing.EqualsMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.EqualToIgnoringWhitespaceMatcher' {
    import alias = goog.labs.testing.EqualToIgnoringWhitespaceMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.EndsWithMatcher' {
    import alias = goog.labs.testing.EndsWithMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.ContainsStringMatcher' {
    import alias = goog.labs.testing.ContainsStringMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.AnyStringMatcher' {
    import alias = goog.labs.testing.AnyStringMatcher;
    export default alias;
}

declare namespace goog.labs.testing {
    /**
     * The ContainsString matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class ContainsStringMatcher extends __ContainsStringMatcher {}
    abstract class __ContainsStringMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {string} value The expected string.
         *
         */
        constructor(value: string);

        /**
         * @type {string}
         * @private
         */
        private value_: string;

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
     * The EndsWith matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class EndsWithMatcher extends __EndsWithMatcher {}
    abstract class __EndsWithMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {string} value The expected string.
         *
         */
        constructor(value: string);

        /**
         * @type {string}
         * @private
         */
        private value_: string;

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
     * The EqualToIgnoringWhitespace matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class EqualToIgnoringWhitespaceMatcher extends __EqualToIgnoringWhitespaceMatcher {}
    abstract class __EqualToIgnoringWhitespaceMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {string} value The expected string.
         *
         */
        constructor(value: string);

        /**
         * @type {string}
         * @private
         */
        private value_: string;

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
     * The Equals matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class EqualsMatcher extends __EqualsMatcher {}
    abstract class __EqualsMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {string} value The expected string.
         *
         */
        constructor(value: string);

        /**
         * @type {string}
         * @private
         */
        private value_: string;

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
     * The MatchesRegex matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class RegexMatcher extends __RegexMatcher {}
    abstract class __RegexMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {!RegExp} regex The expected regex.
         *
         */
        constructor(regex: RegExp);

        /**
         * @type {!RegExp}
         * @private
         */
        private regex_: RegExp;

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
     * The StartsWith matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class StartsWithMatcher extends __StartsWithMatcher {}
    abstract class __StartsWithMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {string} value The expected string.
         *
         */
        constructor(value: string);

        /**
         * @type {string}
         * @private
         */
        private value_: string;

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
     * The StringContainsInOrdermatcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class StringContainsInOrderMatcher extends __StringContainsInOrderMatcher {}
    abstract class __StringContainsInOrderMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {Array<string>} values The expected string values.
         *
         */
        constructor(values: string[]);

        /**
         * @type {Array<string>}
         * @private
         */
        private values_: string[];

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
     * Matches any string value.
     *
     * @constructor @struct @implements {goog.labs.testing.Matcher} @final
     */
    function AnyStringMatcher(): void;
}
