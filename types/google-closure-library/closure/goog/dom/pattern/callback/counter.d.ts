/// <reference path="../../../../../globals.d.ts"/>

declare module 'goog:goog.dom.pattern.callback.Counter' {
    import alias = goog.dom.pattern.callback.Counter;
    export default alias;
}

declare namespace goog.dom.pattern.callback {
    /**
     * Callback class for counting matches.
     * @final
     */
    class Counter extends __Counter {}
    abstract class __Counter {
        /**
         */
        constructor();

        /**
         * The count of objects matched so far.
         *
         * @type {number}
         */
        count: number;

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
