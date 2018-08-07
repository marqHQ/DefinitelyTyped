/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.labs.testing.JsonFuzzing' {
    import alias = goog.labs.testing.JsonFuzzing;
    export default alias;
}

declare namespace goog.labs.testing {
    /**
     * The JSON fuzzing generator.
     *
     * @struct
     */
    class JsonFuzzing extends __JsonFuzzing {}
    abstract class __JsonFuzzing {
        /**
         * @param {!goog.labs.testing.JsonFuzzing.Options=} opt_options Configuration
         *     for the fuzzing json generator.
         * @param {number=} opt_seed The seed for the random generator.
         */
        constructor(opt_options?: goog.labs.testing.JsonFuzzing.Options, opt_seed?: number);

        /**
         * The config options.
         * @private {!goog.labs.testing.JsonFuzzing.Options}
         */
        private options_: any /*missing*/;

        /**
         * The random generator
         * @private {!goog.testing.PseudoRandom}
         */
        private random_: any /*missing*/;

        /**
         * The depth limit, which defaults to 5.
         * @private {number}
         */
        private maxDepth_: any /*missing*/;

        /**
         * Gets a fuzzily-generated JSON object (an array).
         *
         * TODO(user): whitespaces
         *
         * @return {!Array} A new JSON compliant array object.
         */
        newArray(): any[];

        /**
         * Gets a new integer.
         *
         * @param {number} min Inclusive
         * @param {number} max Exclusive
         * @return {number} A random integer
         */
        nextInt(min: number, max: number): number;

        /**
         * Gets a new element type, randomly.
         *
         * @return {number} 0 for message and 1 for array.
         * @private
         */
        private nextElmType_(): number;

        /**
         * Get a new field type, randomly.
         *
         * @return {!goog.labs.testing.JsonFuzzing.FieldType_} the field type.
         * @private
         */
        private nextFieldType_(): any;

        /**
         * Gets a new element.
         *
         * @param {number} depth The depth
         * @return {!Object} a random element, msg or array
         * @private
         */
        private nextElm_(depth: number): Object;

        /**
         * Gets a new message.
         *
         * @param {number} depth The depth
         * @return {!Object} a random message.
         * @private
         */
        private nextMessage_(depth: number): Object;

        /**
         * Gets a new array.
         *
         * @param {number} depth The depth
         * @return {!Array} a random array.
         * @private
         */
        private nextArray_(depth: number): any[];

        /**
         * Gets a new boolean.
         *
         * @return {boolean} a random boolean.
         * @private
         */
        private nextBoolean_(): boolean;

        /**
         * Gets a new number.
         *
         * @return {number} a random number..
         * @private
         */
        private nextNumber_(): number;
    }
}

declare namespace goog.labs.testing.JsonFuzzing {
    /**
     * Configuration spec.
     *
     * jsonSize: default to [1, 10) for the entire JSON object (array)
     * numFields: default to [0, 5)
     * arraySize: default to [0, 5) for the length of nested arrays
     * maxDepth: default to 5
     *
     * @typedef {{
     *   jsonSize: number,
     *   numFields: number,
     *   arraySize: number,
     *   maxDepth: number
     * }}
     */
    interface Options {
        jsonSize: number;
        numFields: number;
        arraySize: number;
        maxDepth: number;
    }
}
