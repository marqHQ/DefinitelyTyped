/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.debug.RelativeTimeProvider' {
    import alias = goog.debug.RelativeTimeProvider;
    export default alias;
}

declare namespace goog.debug {
    /**
     * A simple object to keep track of a timestamp considered the start of
     * something. The main use is for the logger system to maintain a start time
     * that is occasionally reset. For example, in Gmail, we reset this relative
     * time at the start of a user action so that timings are offset from the
     * beginning of the action. This class also provides a singleton as the default
     * behavior for most use cases is to share the same start time.
     *
     * @final
     */
    class RelativeTimeProvider extends __RelativeTimeProvider {}
    abstract class __RelativeTimeProvider {
        /**
         */
        constructor();

        /**
         * The start time.
         * @type {number}
         * @private
         */
        private relativeTimeStart_: number;

        /**
         * Sets the start time to the specified time.
         * @param {number} timeStamp The start time.
         */
        set(timeStamp: number): void;

        /**
         * Resets the start time to now.
         */
        reset(): void;

        /**
         * @return {number} The start time.
         */
        get(): number;
    }
}

declare namespace goog.debug.RelativeTimeProvider {
    /**
     * @return {goog.debug.RelativeTimeProvider} The default instance.
     */
    function getDefaultInstance(): goog.debug.RelativeTimeProvider;
}
