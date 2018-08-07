/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.testing.PseudoRandom' {
    import alias = goog.testing.PseudoRandom;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Class for unit testing code that uses Math.random. Generates deterministic
     * random numbers.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class PseudoRandom extends __PseudoRandom {}
    abstract class __PseudoRandom extends goog.__Disposable {
        /**
         * @param {number=} opt_seed The seed to use.
         * @param {boolean=} opt_install Whether to install the PseudoRandom at
         *     construction time.
         */
        constructor(opt_seed?: number, opt_install?: boolean);

        /**
         * The seed of the random sequence and also the next returned value (before
         * normalization). Must be between 1 and M - 1 (inclusive).
         * @type {number}
         * @private
         */
        private seed_: number;

        /**
         * Whether this PseudoRandom has been installed.
         * @type {boolean}
         * @private
         */
        private installed_: boolean;

        /**
         * The original Math.random function.
         * @type {function(): number}
         * @private
         */
        private mathRandom_: () => number;

        /**
         * Installs this PseudoRandom as the system number generator.
         */
        install(): void;

        /**
         * Uninstalls the PseudoRandom.
         */
        uninstall(): void;

        /**
         * Seed the generator.
         *
         * @param {number=} opt_seed The seed to use.
         */
        seed(opt_seed?: number): void;

        /**
         * @return {number} The next number in the sequence.
         */
        random(): number;
    }
}

declare namespace goog.testing.PseudoRandom {
    /**
     * Constant used as part of the algorithm.
     * @type {number}
     */
    let A: number;

    /**
     * Constant used as part of the algorithm. 2^31 - 1.
     * @type {number}
     */
    let M: number;

    /**
     * Constant used as part of the algorithm. It is equal to M / A.
     * @type {number}
     */
    let Q: number;

    /**
     * Constant used as part of the algorithm. It is equal to M % A.
     * @type {number}
     */
    let R: number;

    /**
     * Constant used as part of the algorithm to get values from range [0, 1).
     * @type {number}
     */
    let ONE_OVER_M_MINUS_ONE: number;
}
