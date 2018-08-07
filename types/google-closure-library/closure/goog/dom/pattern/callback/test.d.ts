/// <reference path="../../../../../globals.d.ts"/>

declare module 'goog:goog.dom.pattern.callback.Test' {
    import alias = goog.dom.pattern.callback.Test;
    export default alias;
}

declare namespace goog.dom.pattern.callback {
    /**
     * Callback class for testing for at least one match.
     * @final
     */
    class Test extends __Test {}
    abstract class __Test {
        /**
         */
        constructor();

        /**
         * Whether or not the pattern matched.
         *
         * @type {boolean}
         */
        matched: boolean;

        /**
         * The callback function.  Suitable as a callback for
         * {@link goog.dom.pattern.Matcher}.
         * @private {Function}
         */
        private callback_: any /*missing*/;

        /**
         * Get a bound callback function that is suitable as a callback for
         * {@link goog.dom.pattern.Matcher}.
         *
         * @return {!Function} A callback function.
         */
        getCallback(): Function;

        /**
         * Reset the counter.
         */
        reset(): void;
    }
}
