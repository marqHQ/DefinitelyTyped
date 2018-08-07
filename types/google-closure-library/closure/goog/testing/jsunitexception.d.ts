/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.testing.JsUnitException' {
    import alias = goog.testing.JsUnitException;
    export default alias;
}

declare namespace goog.testing {
    /**
     * @extends {Error}
     * @final
     */
    class JsUnitException extends __JsUnitException {}
    abstract class __JsUnitException extends Error {
        /**
         * @param {string} comment A summary for the exception.
         * @param {?string=} opt_message A description of the exception.
         */
        constructor(comment: string, opt_message?: string|null);
    }
}
