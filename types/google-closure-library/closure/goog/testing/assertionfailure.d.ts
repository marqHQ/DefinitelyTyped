/// <reference path="../../../globals.d.ts"/>

declare namespace exports {
    /**
     * Tests that f raises exactaly one AssertionError and runs f while disabling
     * assertion errors. This is only intended to use in a few test files that is
     * guaranteed that will not affect anything for convenience. It is not intended
     * for broader consumption outside of those test files. We do not want to
     * encourage this pattern.
     *
     * @param {function():*} f function with a failing assertion.
     * @param {string=} opt_message error message the expected error should contain
     * @param {number=} opt_number of time the assertion should throw. Default is 1.
     * @return {*} the return value of f.
     */
    function withAssertionFailure(f: () => any, opt_message?: string, opt_number?: number): any;
}
