/// <reference path="../../../../../globals.d.ts"/>
/// <reference path="../../../../../closure/goog/structs/map.d.ts"/>

declare module 'goog:goog.text.LoremIpsum' {
    import alias = goog.text.LoremIpsum;
    export default alias;
}

declare namespace goog.text {
    /**
     * Generates random strings of "lorem ipsum" text, based on the word
     * distribution of a sample text, using the words in a dictionary.
     */
    class LoremIpsum extends __LoremIpsum {}
    abstract class __LoremIpsum {
        /**
         */
        constructor();

        /**
         * Words that can be used in the generated output.
         * Maps a word-length to a list of words of that length.
         * @type {goog.structs.Map}
         * @private
         */
        private words_: goog.structs.Map<any, any>;

        /**
         * Chains of three words that appear in the sample text
         * Maps a pair of word-lengths to a third word-length and an optional
         * piece of trailing punctuation (for example, a period, comma, etc.).
         * @type {goog.structs.Map}
         * @private
         */
        private chains_: goog.structs.Map<any, any>;

        /** @private {!Object<string, !Array>} */
        private chainKeys_: any /*missing*/;

        /**
         * Pairs of word-lengths that can appear at the beginning of sentences.
         * @type {Array}
         */
        starts_: any[];

        /**
         * Averange sentence length in words.
         * @type {number}
         * @private
         */
        private sentenceMean_: number;

        /**
         * Sigma (sqrt of variance) for the sentence length in words.
         * @type {number}
         * @private
         */
        private sentenceSigma_: number;

        /**
         * Averange paragraph length in sentences.
         * @type {number}
         * @private
         */
        private paragraphMean_: number;

        /**
         * Sigma (sqrt of variance) for the paragraph length in sentences.
         * @type {number}
         * @private
         */
        private paragraphSigma_: number;

        /**
         * Generates the chains and starts values required for sentence generation.
         * @param {string} sample The same text.
         * @private
         */
        private generateChains_(sample: string): void;

        /**
         * Calculates the mean and standard deviation of sentence and paragraph lengths.
         * @param {string} sample The same text.
         * @private
         */
        private generateStatistics_(sample: string): void;

        /**
         * Calculates the mean and standard deviation of the lengths of sentences
         * (in words) in a sample text.
         * @param {string} sample The same text.
         * @private
         */
        private generateSentenceStatistics_(sample: string): void;

        /**
         * Calculates the mean and standard deviation of the lengths of paragraphs
         * (in sentences) in a sample text.
         * @param {string} sample The same text.
         * @private
         */
        private generateParagraphStatistics_(sample: string): void;

        /**
         * Sets the generator to use a given selection of words for generating
         * sentences with.
         * @param {string} dictionary The dictionary to use.
         * @private
         */
        private initializeDictionary_(dictionary: string): void;

        /**
         * Picks a random starting chain.
         * @return {Array<string>} The starting key.
         * @private
         */
        private chooseRandomStart_(): string[];

        /**
         * Generates a single sentence, of random length.
         * @param {boolean=} opt_startWithLorem Whether to start the setnence with the
         *     standard "Lorem ipsum..." first sentence.
         * @return {string} The generated sentence.
         */
        generateSentence(opt_startWithLorem?: boolean): string;

        /**
         * Generates a single lorem ipsum paragraph, of random length.
         * @param {boolean=} opt_startWithLorem Whether to start the sentence with the
         *     standard "Lorem ipsum..." first sentence.
         * @return {string} The generated sentence.
         */
        generateParagraph(opt_startWithLorem?: boolean): string;

        /**
         * Sample that the generated text is based on .
         * @private {string}
         */
        private sample_: any /*missing*/;

        /**
         * Dictionary of words.
         * @private {string}
         */
        private dictionary_: any /*missing*/;
    }
}

declare namespace goog.text.LoremIpsum {
    /**
     * Find the number in the list of values that is closest to the target.
     * @param {Array<number>|Array<string>} values The values.
     * @param {number} target The target value.
     * @return {number} The closest value.
     */
    function chooseClosest(values: number[]|string[], target: number): number;
}
