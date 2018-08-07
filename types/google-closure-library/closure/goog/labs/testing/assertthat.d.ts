/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../debug/error.d.ts"/>
/// <reference path="./matcher.d.ts"/>

declare module 'goog:goog.labs.testing.assertThat' {
    import alias = goog.labs.testing.assertThat;
    export default alias;
}

declare module 'goog:goog.labs.testing.MatcherError' {
    import alias = goog.labs.testing.MatcherError;
    export default alias;
}

declare namespace goog.labs.testing {
    /**
     * Error thrown when a Matcher fails to match the input value.
     * @extends {goog.debug.Error}
     * @final
     */
    class MatcherError extends __MatcherError {}
    abstract class __MatcherError extends goog.debug.__Error {
        /**
         * @param {string=} opt_message The error message.
         */
        constructor(opt_message?: string);
    }

    /**
     * Asserts that the actual value evaluated by the matcher is true.
     *
     * @param {*} actual The object to assert by the matcher.
     * @param {!goog.labs.testing.Matcher} matcher A matcher to verify values.
     * @param {string=} opt_reason Description of what is asserted.
     *
     */
    function assertThat(actual: any, matcher: goog.labs.testing.Matcher, opt_reason?: string): void;
}
