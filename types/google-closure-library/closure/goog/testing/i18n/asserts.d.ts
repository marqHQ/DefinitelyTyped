/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.testing.i18n.asserts' {
    export = goog.testing.i18n.asserts;
}

declare namespace goog.testing.i18n.asserts {
    /**
     * Asserts that the two values are "almost equal" from i18n perspective
     * (based on a manually maintained and validated whitelist).
     * @param {string} expected The expected value.
     * @param {string} actual The actual value.
     */
    function assertI18nEquals(expected: string, actual: string): void;
}
