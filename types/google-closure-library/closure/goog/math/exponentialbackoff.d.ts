/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.math.ExponentialBackoff' {
    import alias = goog.math.ExponentialBackoff;
    export default alias;
}

declare namespace goog.math {
    /**
     * @struct
     *
     */
    class ExponentialBackoff extends __ExponentialBackoff {}
    abstract class __ExponentialBackoff {
        /**
         * @param {number} initialValue The initial backoff value.
         * @param {number} maxValue The maximum backoff value.
         * @param {number=} opt_randomFactor When set, adds randomness to the backoff
         *     and decay to avoid a thundering herd problem. Should be a number between
         *     0 and 1, where 0 means no randomness and 1 means a factor of 0x to 2x.
         * @param {number=} opt_backoffFactor The factor to backoff by. Defaults to 2.
         *     Should be a number greater than 1.
         * @param {number=} opt_decayFactor The factor to decay by. Defaults to 2.
         *     Should be a number between greater than one.
         */
        constructor(
            initialValue: number,
            maxValue: number,
            opt_randomFactor?: number,
            opt_backoffFactor?: number,
            opt_decayFactor?: number
        );

        /**
         * @type {number}
         * @private
         */
        private initialValue_: number;

        /**
         * @type {number}
         * @private
         */
        private maxValue_: number;

        /**
         * The current backoff value.
         * @type {number}
         * @private
         */
        private currValue_: number;

        /**
         * The current backoff value minus the random wait (if there is any).
         * @type {number}
         * @private
         */
        private currBaseValue_: number;

        /**
         * The random factor to apply to the backoff value to avoid a thundering herd
         * problem. Should be a number between 0 and 1, where 0 means no randomness
         * and 1 means a factor of 0x to 2x.
         * @type {number}
         * @private
         */
        private randomFactor_: number;

        /**
         * Factor to backoff by.
         * @type {number}
         * @private
         */
        private backoffFactor_: number;

        /**
         * Factor to decay by.
         * @type {number}
         * @private
         */
        private decayFactor_: number;

        /**
         * The number of backoffs that have happened.
         * @type {number}
         * @private
         */
        private currBackoffCount_: number;

        /**
         * The number of decays that have happened.
         * @type {number}
         * @private
         */
        private currDecayCount_: number;

        /**
         * Resets the backoff value to its initial value.
         */
        reset(): void;

        /**
         * @return {number} The current backoff value.
         */
        getValue(): number;

        /**
         * @return {number} The number of times this class has backed off.
         */
        getBackoffCount(): number;

        /**
         * @return {number} The number of times this class has decayed.
         */
        getDecayCount(): number;

        /**
         * Initiates a backoff.
         */
        backoff(): void;

        /**
         * Initiates a decay.
         */
        decay(): void;
    }
}
