/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.testing.asserts' {
    export = goog.testing.asserts;
}

declare namespace goog.testing.asserts {
    /**
     * The return value of the equality predicate passed to findDifferences below,
     * in cases where the predicate can't test the input variables for equality.
     * @type {?string}
     */
    let EQUALITY_PREDICATE_CANT_PROCESS: string|null;

    /**
     * The return value of the equality predicate passed to findDifferences below,
     * in cases where the input vriables are equal.
     * @type {?string}
     */
    let EQUALITY_PREDICATE_VARS_ARE_EQUAL: string|null;

    /**
     * Determines if two items of any type match, and formulates an error message
     * if not.
     * @param {*} expected Expected argument to match.
     * @param {*} actual Argument as a result of performing the test.
     * @param {(function(string, *, *): ?string)=} opt_equalityPredicate An optional
     *     function that can be used to check equality of variables. It accepts 3
     *     arguments: type-of-variables, var1, var2 (in that order) and returns an
     *     error message if the variables are not equal,
     *     goog.testing.asserts.EQUALITY_PREDICATE_VARS_ARE_EQUAL if the variables
     *     are equal, or
     *     goog.testing.asserts.EQUALITY_PREDICATE_CANT_PROCESS if the predicate
     *     couldn't check the input variables. The function will be called only if
     *     the types of var1 and var2 are identical.
     * @return {?string} Null on success, error message on failure.
     */
    function findDifferences(
        expected: any, actual: any, opt_equalityPredicate?: ((_0: string, _1: any, _2: any) => string | null)
    ): string|null;

    /**
     * Raises a JsUnit exception with the given comment. If the exception is
     * unexpectedly caught during a unit test, it will be rethrown so that it is
     * seen by the test framework.
     * @param {string} comment A summary for the exception.
     * @param {string=} opt_message A description of the exception.
     */
    function raiseException(comment: string, opt_message?: string): void;
}
