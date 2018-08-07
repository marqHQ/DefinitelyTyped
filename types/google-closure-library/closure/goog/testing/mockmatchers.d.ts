/// <reference path="../../../globals.d.ts"/>
/// <reference path="./mock.d.ts"/>

declare module 'goog:goog.testing.mockmatchers' {
    export = goog.testing.mockmatchers;
}

declare module 'goog:goog.testing.mockmatchers.TypeOf' {
    import alias = goog.testing.mockmatchers.TypeOf;
    export default alias;
}

declare module 'goog:goog.testing.mockmatchers.SaveArgument' {
    import alias = goog.testing.mockmatchers.SaveArgument;
    export default alias;
}

declare module 'goog:goog.testing.mockmatchers.RegexpMatch' {
    import alias = goog.testing.mockmatchers.RegexpMatch;
    export default alias;
}

declare module 'goog:goog.testing.mockmatchers.ObjectEquals' {
    import alias = goog.testing.mockmatchers.ObjectEquals;
    export default alias;
}

declare module 'goog:goog.testing.mockmatchers.InstanceOf' {
    import alias = goog.testing.mockmatchers.InstanceOf;
    export default alias;
}

declare module 'goog:goog.testing.mockmatchers.IgnoreArgument' {
    import alias = goog.testing.mockmatchers.IgnoreArgument;
    export default alias;
}

declare module 'goog:goog.testing.mockmatchers.ArgumentMatcher' {
    import alias = goog.testing.mockmatchers.ArgumentMatcher;
    export default alias;
}

declare namespace goog.testing.mockmatchers {
    /**
     * A simple interface for executing argument matching.  A match in this case is
     * testing to see if a supplied object fits a given criteria.  True is returned
     * if the given criteria is met.
     */
    class ArgumentMatcher extends __ArgumentMatcher {}
    abstract class __ArgumentMatcher {
        /**
         * @param {Function=} opt_matchFn A function that evaluates a given argument
         *     and returns true if it meets a given criteria.
         * @param {?string=} opt_matchName The name expressing intent as part of
         *      an error message for when a match fails.
         */
        constructor(opt_matchFn?: Function, opt_matchName?: string|null);

        /**
         * A function that evaluates a given argument and returns true if it meets a
         * given criteria.
         * @type {Function}
         * @private
         */
        private matchFn_: Function;

        /**
         * A string indicating the match intent (e.g. isBoolean or isString).
         * @type {?string}
         * @private
         */
        private matchName_: string|null;

        /**
         * A function that takes a match argument and an optional MockExpectation
         * which (if provided) will get error information and returns whether or
         * not it matches.
         * @param {*} toVerify The argument that should be verified.
         * @param {goog.testing.MockExpectation?=} opt_expectation The expectation
         *     for this match.
         * @return {boolean} Whether or not a given argument passes verification.
         */
        matches(toVerify: any, opt_expectation?: goog.testing.MockExpectation|null): boolean;
    }

    /**
     * A matcher that verifies that an argument is an instance of a given class.
     * @extends {goog.testing.mockmatchers.ArgumentMatcher}
     * @final
     */
    class InstanceOf extends __InstanceOf {}
    abstract class __InstanceOf extends goog.testing.mockmatchers.__ArgumentMatcher {
        /**
         * @param {Function} ctor The class that will be used for verification.
         */
        constructor(ctor: Function);
    }

    /**
     * A matcher that verifies that an argument is of a given type (e.g. "object").
     * @extends {goog.testing.mockmatchers.ArgumentMatcher}
     * @final
     */
    class TypeOf extends __TypeOf {}
    abstract class __TypeOf extends goog.testing.mockmatchers.__ArgumentMatcher {
        /**
         * @param {string} type The type that a given argument must have.
         */
        constructor(type: string);
    }

    /**
     * A matcher that verifies that an argument matches a given RegExp.
     * @extends {goog.testing.mockmatchers.ArgumentMatcher}
     * @final
     */
    class RegexpMatch extends __RegexpMatch {}
    abstract class __RegexpMatch extends goog.testing.mockmatchers.__ArgumentMatcher {
        /**
         * @param {RegExp} regexp The regular expression that the argument must match.
         */
        constructor(regexp: RegExp);
    }

    /**
     * A matcher that always returns true. It is useful when the user does not care
     * for some arguments.
     * For example: mockFunction('username', 'password', IgnoreArgument);
     * @extends {goog.testing.mockmatchers.ArgumentMatcher}
     * @final
     */
    class IgnoreArgument extends __IgnoreArgument {}
    abstract class __IgnoreArgument extends goog.testing.mockmatchers.__ArgumentMatcher {
        /**
         */
        constructor();
    }

    /**
     * A matcher that verifies that the argument is an object that equals the given
     * expected object, using a deep comparison.
     * @extends {goog.testing.mockmatchers.ArgumentMatcher}
     */
    class ObjectEquals extends __ObjectEquals {}
    abstract class __ObjectEquals extends goog.testing.mockmatchers.__ArgumentMatcher {
        /**
         * @param {Object} expectedObject An object to match against when
         *     verifying the argument.
         */
        constructor(expectedObject: Object);

        /** @private */
        private expectedObject_: any /*missing*/;
    }

    /**
     * A matcher that saves the argument that it is verifying so that your unit test
     * can perform extra tests with this argument later.  For example, if the
     * argument is a callback method, the unit test can then later call this
     * callback to test the asynchronous portion of the call.
     * @extends {goog.testing.mockmatchers.ArgumentMatcher}
     * @final
     */
    class SaveArgument extends __SaveArgument {}
    abstract class __SaveArgument extends goog.testing.mockmatchers.__ArgumentMatcher {
        /**
         * @param {goog.testing.mockmatchers.ArgumentMatcher|Function=} opt_matcher
         *     Argument matcher or matching function that will be used to validate the
         *     argument.  By default, argument will always be valid.
         * @param {?string=} opt_matchName The name expressing intent as part of
         *      an error message for when a match fails.
         */
        constructor(opt_matcher?: goog.testing.mockmatchers.ArgumentMatcher|Function, opt_matchName?: string|null);

        /**
         * Delegate match requests to this matcher.
         * @type {goog.testing.mockmatchers.ArgumentMatcher}
         * @private
         */
        private delegateMatcher_: goog.testing.mockmatchers.ArgumentMatcher;

        /**
         * Saved argument that was verified.
         * @type {*}
         */
        arg: any;
    }

    /**
     * An instance of the IgnoreArgument matcher. Returns true for all matches.
     * @type {goog.testing.mockmatchers.IgnoreArgument}
     */
    let ignoreArgument: goog.testing.mockmatchers.IgnoreArgument;

    /**
     * A matcher that verifies that an argument is an array.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isArray: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A matcher that verifies that an argument is a array-like.  A NodeList is an
     * example of a collection that is very close to an array.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isArrayLike: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A matcher that verifies that an argument is a date-like.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isDateLike: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A matcher that verifies that an argument is a string.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isString: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A matcher that verifies that an argument is a boolean.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isBoolean: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A matcher that verifies that an argument is a number.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isNumber: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A matcher that verifies that an argument is a function.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isFunction: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A matcher that verifies that an argument is an object.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isObject: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A matcher that verifies that an argument is like a DOM node.
     * @type {goog.testing.mockmatchers.ArgumentMatcher}
     */
    let isNodeLike: goog.testing.mockmatchers.ArgumentMatcher;

    /**
     * A function that checks to see if an array matches a given set of
     * expectations.  The expectations array can be a mix of ArgumentMatcher
     * implementations and values.  True will be returned if values are identical or
     * if a matcher returns a positive result.
     * @param {Array<?>} expectedArr An array of expectations which can be either
     *     values to check for equality or ArgumentMatchers.
     * @param {Array<?>} arr The array to match.
     * @param {goog.testing.MockExpectation?=} opt_expectation The expectation
     *     for this match.
     * @return {boolean} Whether or not the given array matches the expectations.
     */
    function flexibleArrayMatcher(expectedArr: any[], arr: any[], opt_expectation?: goog.testing.MockExpectation|null):
        boolean;
}
