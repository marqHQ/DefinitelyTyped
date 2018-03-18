/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./matcher.d.ts"/>

declare namespace goog.labs.testing {
    /**
     * The HasEntries matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class HasEntriesMatcher extends __HasEntriesMatcher {}
    abstract class __HasEntriesMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {!Object} entries The entries to check in the object.
         *
         */
        constructor(entries: Object);

        /**
         * @type {Object}
         * @private
         */
        private entries_: Object;

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
     * The HasEntry matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class HasEntryMatcher extends __HasEntryMatcher {}
    abstract class __HasEntryMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {string} key The key for the entry.
         * @param {*} value The value for the key.
         *
         */
        constructor(key: string, value: any);

        /**
         * @type {string}
         * @private
         */
        private key_: string;

        /**
         * @type {*}
         * @private
         */
        private value_: any;

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
     * The HasKey matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class HasKeyMatcher extends __HasKeyMatcher {}
    abstract class __HasKeyMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {string} key The key to check in the object.
         *
         */
        constructor(key: string);

        /**
         * @type {string}
         * @private
         */
        private key_: string;

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
     * The HasValue matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class HasValueMatcher extends __HasValueMatcher {}
    abstract class __HasValueMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {*} value The value to check in the object.
         *
         */
        constructor(value: any);

        /**
         * @type {*}
         * @private
         */
        private value_: any;

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
