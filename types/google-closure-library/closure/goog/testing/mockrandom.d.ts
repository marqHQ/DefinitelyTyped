/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.testing.MockRandom' {
    import alias = goog.testing.MockRandom;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Class for unit testing code that uses Math.random.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class MockRandom extends __MockRandom {}
    abstract class __MockRandom extends goog.__Disposable {
        /**
         * @param {Array<number>} sequence The sequence of numbers to return. This
         *     object will modify this array.
         * @param {boolean=} opt_install Whether to install the MockRandom at
         *     construction time.
         */
        constructor(sequence: number[], opt_install?: boolean);

        /**
         * The sequence of numbers to be returned by calls to random()
         * @type {!Array<number>}
         * @private
         */
        private sequence_: number[];

        /**
         * The original Math.random function.
         * @type {function(): number}
         * @private
         */
        private mathRandom_: () => number;

        /**
         * Whether to throw an exception when Math.random() is called when there is
         * nothing left in the sequence.
         * @type {boolean}
         * @private
         */
        private strictlyFromSequence_: boolean;

        /**
         * Whether this MockRandom has been installed.
         * @type {boolean}
         * @private
         */
        private installed_: boolean;

        /**
         * Installs this MockRandom as the system number generator.
         */
        install(): void;

        /**
         * @return {number} The next number in the sequence. If there are no more values
         *     left, this will return a random number, unless
         *     `this.strictlyFromSequence_` is true, in which case an error will
         *     be thrown.
         */
        random(): number;

        /**
         * @return {boolean} Whether there are more numbers left in the sequence.
         */
        hasMoreValues(): boolean;

        /**
         * Injects new numbers into the beginning of the sequence.
         * @param {!Array<number>|number} values Number or array of numbers to inject.
         */
        inject(values: number[]|number): void;

        /**
         * Uninstalls the MockRandom.
         */
        uninstall(): void;

        /**
         * @param {boolean} strictlyFromSequence Whether to throw an exception when
         *     Math.random() is called when there is nothing left in the sequence.
         */
        setStrictlyFromSequence(strictlyFromSequence: boolean): void;
    }
}
