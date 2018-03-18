/// <reference path="../../../globals.d.ts"/>

declare namespace exports {
    /**
     * Calls the first delegate, or returns undefined if none are given.
     * @param {!Array<T>} delegates
     * @param {function(T): R} mapper
     * @return {R|undefined}
     * @template T, R
     */
    function callFirst<T, R>(delegates: T[], mapper: (_0: T) => R): R|undefined;

    /**
     * Calls delegates until one returns a defined, non-null result.  Returns
     * undefined if no such element is found.
     * @param {!Array<T>} delegates
     * @param {function(T): R|undefined} mapper
     * @return {R|undefined}
     * @template T, R
     */
    function callUntilDefinedAndNotNull<T, R>(delegates: T[], mapper: ((_0: T) => R)|undefined): R|undefined;

    /**
     * Calls delegates until one returns a truthy result.  Returns false if no such
     * element is found.
     * @param {!Array<T>} delegates
     * @param {function(T): R} mapper
     * @return {boolean|R}
     * @template T, R
     */
    function callUntilTruthy<T, R>(delegates: T[], mapper: (_0: T) => R): boolean|R;
}
