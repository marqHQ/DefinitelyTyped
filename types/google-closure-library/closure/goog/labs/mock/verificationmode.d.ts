/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.labs.mock.verification' {
    export = goog.labs.mock.verification;
}

declare module 'goog:goog.labs.mock.verification.VerificationMode' {
    import alias = goog.labs.mock.verification.VerificationMode;
    export default alias;
}

declare namespace goog.labs.mock.verification {
    interface VerificationMode {
        /**
         * Returns true if the recorded number of invocations,
         * `actualNumberOfInvocations`, meets the expectations of this mode.
         *
         * TODO(user): Have this take in an object which contains the complete
         * call record in order to allow more interesting verifications.
         *
         * @param {number} actualNumberOfInvocations
         * @return {boolean}
         */
        verify(actualNumberOfInvocations: number): boolean;

        /**
         * Returns a description of what this VerificationMode expected.
         *
         * @return {string}
         */
        describe(): string;
    }

    /**
     * Returns a `VerificationMode` which verifies a method was called
     * exactly `expectedNumberOfInvocations` times.
     *
     * @param {number} expectedNumberOfInvocations
     * @return {!goog.labs.mock.verification.VerificationMode}
     */
    function times(expectedNumberOfInvocations: number): goog.labs.mock.verification.VerificationMode;

    /**
     * Returns a `VerificationMode` which verifies a method was called at
     * least `minimumNumberOfInvocations` times.
     *
     * @param {number} minimumNumberOfInvocations
     * @return {!goog.labs.mock.verification.VerificationMode}
     */
    function atLeast(minimumNumberOfInvocations: number): goog.labs.mock.verification.VerificationMode;

    /**
     * Returns a `VerificationMode` which verifies a method was called at
     * most `maxNumberOfInvocations` times.
     *
     * @param {number} maxNumberOfInvocations
     * @return {!goog.labs.mock.verification.VerificationMode}
     */
    function atMost(maxNumberOfInvocations: number): goog.labs.mock.verification.VerificationMode;

    /**
     * Returns a `VerificationMode` which verifies a method was never
     * called. An alias for `VerificatonMode.times(0)`.
     *
     * @return {!goog.labs.mock.verification.VerificationMode}
     */
    function never(): goog.labs.mock.verification.VerificationMode;
}
