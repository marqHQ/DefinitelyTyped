/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./matcher.d.ts"/>

declare module 'goog:goog.labs.testing.ObjectEqualsMatcher' {
    import alias = goog.labs.testing.ObjectEqualsMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.IsUndefinedMatcher' {
    import alias = goog.labs.testing.IsUndefinedMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.IsNullOrUndefinedMatcher' {
    import alias = goog.labs.testing.IsNullOrUndefinedMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.IsNullMatcher' {
    import alias = goog.labs.testing.IsNullMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.InstanceOfMatcher' {
    import alias = goog.labs.testing.InstanceOfMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.HasPropertyMatcher' {
    import alias = goog.labs.testing.HasPropertyMatcher;
    export default alias;
}

declare module 'goog:goog.labs.testing.AnyObjectMatcher' {
    import alias = goog.labs.testing.AnyObjectMatcher;
    export default alias;
}

declare namespace goog.labs.testing {
    /**
     * The Equals matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class ObjectEqualsMatcher extends __ObjectEqualsMatcher {}
    abstract class __ObjectEqualsMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {!Object} expectedObject The expected object.
         *
         */
        constructor(expectedObject: Object);

        /**
         * @type {!Object}
         * @private
         */
        private object_: Object;

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
     * The HasProperty matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class HasPropertyMatcher extends __HasPropertyMatcher {}
    abstract class __HasPropertyMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {string} property Name of the property to test.
         *
         */
        constructor(property: string);

        /**
         * @type {string}
         * @private
         */
        private property_: string;

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
     * The InstanceOf matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class InstanceOfMatcher extends __InstanceOfMatcher {}
    abstract class __InstanceOfMatcher implements goog.labs.testing.Matcher {
        /**
         * @param {!Object} object The expected class object.
         *
         */
        constructor(object: Object);

        /**
         * @type {!Object}
         * @private
         */
        private object_: Object;

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
     * The IsNullOrUndefined matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class IsNullOrUndefinedMatcher extends __IsNullOrUndefinedMatcher {}
    abstract class __IsNullOrUndefinedMatcher implements goog.labs.testing.Matcher {
        /**
         */
        constructor();

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
     * The IsNull matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class IsNullMatcher extends __IsNullMatcher {}
    abstract class __IsNullMatcher implements goog.labs.testing.Matcher {
        /**
         */
        constructor();

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
     * The IsUndefined matcher.
     *
     * @struct
     * @implements {goog.labs.testing.Matcher}
     * @final
     */
    class IsUndefinedMatcher extends __IsUndefinedMatcher {}
    abstract class __IsUndefinedMatcher implements goog.labs.testing.Matcher {
        /**
         */
        constructor();

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
     * Matches any object value.
     *
     * @constructor @struct @implements {goog.labs.testing.Matcher} @final
     */
    function AnyObjectMatcher(): void;
}
