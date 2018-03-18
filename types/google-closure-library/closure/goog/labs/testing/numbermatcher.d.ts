/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./matcher.d.ts"/>

declare namespace goog.labs.testing {
    /**
     * The GreaterThan matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class GreaterThanMatcher extends __GreaterThanMatcher {}
    abstract class __GreaterThanMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {number} value The value to compare.
         *
         */
        constructor(value: number);

        /**
         * @type {number}
         * @private
         */
        private value_: number;

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
     * The lessThan matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class LessThanMatcher extends __LessThanMatcher {}
    abstract class __LessThanMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {number} value The value to compare.
         *
         */
        constructor(value: number);

        /**
         * @type {number}
         * @private
         */
        private value_: number;

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
     * The GreaterThanEqualTo matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class GreaterThanEqualToMatcher extends __GreaterThanEqualToMatcher {}
    abstract class __GreaterThanEqualToMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {number} value The value to compare.
         *
         */
        constructor(value: number);

        /**
         * @type {number}
         * @private
         */
        private value_: number;

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
     * The LessThanEqualTo matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class LessThanEqualToMatcher extends __LessThanEqualToMatcher {}
    abstract class __LessThanEqualToMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {number} value The value to compare.
         *
         */
        constructor(value: number);

        /**
         * @type {number}
         * @private
         */
        private value_: number;

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
     * The EqualTo matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class EqualToMatcher extends __EqualToMatcher {}
    abstract class __EqualToMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {number} value The value to compare.
         *
         */
        constructor(value: number);

        /**
         * @type {number}
         * @private
         */
        private value_: number;

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
     * The CloseTo matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class CloseToMatcher extends __CloseToMatcher {}
    abstract class __CloseToMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {number} value The value to compare.
         * @param {number} range The range to check within.
         *
         */
        constructor(value: number, range: number);

        /**
         * @type {number}
         * @private
         */
        private value_: number;

        /**
         * @type {number}
         * @private
         */
        private range_: number;

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
     * Matches any number value.
     *
     * @constructor @struct @implements {goog.labs.testing.Matcher} @final
     */
    function AnyNumberMatcher(): void;
}
