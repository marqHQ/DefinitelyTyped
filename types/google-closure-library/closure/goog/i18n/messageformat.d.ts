/// <reference path="../../../globals.d.ts"/>
/// <reference path="./numberformat.d.ts"/>

declare module 'goog:goog.i18n.MessageFormat' {
    import alias = goog.i18n.MessageFormat;
    export default alias;
}

declare namespace goog.i18n {
    /**
     * Constructor of MessageFormat.
     * @final
     */
    class MessageFormat extends __MessageFormat {}
    abstract class __MessageFormat {
        /**
         * @param {string} pattern The pattern we parse and apply positional parameters
         *     to.
         */
        constructor(pattern: string);

        /**
         * The pattern we parse and apply positional parameters to.
         * @type {?string}
         * @private
         */
        private pattern_: string|null;

        /**
         * All encountered literals during parse stage. Indices tell us the order of
         * replacement.
         * @type {?Array<string>}
         * @private
         */
        private initialLiterals_: string[]|null;

        /**
         * Working array with all encountered literals during parse and format stages.
         * Indices tell us the order of replacement.
         * @type {?Array<string>}
         * @private
         */
        private literals_: string[]|null;

        /**
         * Input pattern gets parsed into objects for faster formatting.
         * @type {?Array<!Object>}
         * @private
         */
        private parsedPattern_: Object[]|null;

        /**
         * Locale aware number formatter.
         * @type {!goog.i18n.NumberFormat}
         * @private
         */
        private numberFormatter_: goog.i18n.NumberFormat;

        /**
         * Formats a message, treating '#' with special meaning representing
         * the number (plural_variable - offset).
         * @param {!Object} namedParameters Parameters that either
         *     influence the formatting or are used as actual data.
         *     I.e. in call to fmt.format({'NUM_PEOPLE': 5, 'NAME': 'Angela'}),
         *     object {'NUM_PEOPLE': 5, 'NAME': 'Angela'} holds positional parameters.
         *     1st parameter could mean 5 people, which could influence plural format,
         *     and 2nd parameter is just a data to be printed out in proper position.
         * @return {string} Formatted message.
         */
        format(namedParameters: Object): string;

        /**
         * Formats a message, treating '#' as literary character.
         * @param {!Object} namedParameters Parameters that either
         *     influence the formatting or are used as actual data.
         *     I.e. in call to fmt.format({'NUM_PEOPLE': 5, 'NAME': 'Angela'}),
         *     object {'NUM_PEOPLE': 5, 'NAME': 'Angela'} holds positional parameters.
         *     1st parameter could mean 5 people, which could influence plural format,
         *     and 2nd parameter is just a data to be printed out in proper position.
         * @return {string} Formatted message.
         */
        formatIgnoringPound(namedParameters: Object): string;

        /**
         * Formats a message.
         * @param {!Object} namedParameters Parameters that either
         *     influence the formatting or are used as actual data.
         *     I.e. in call to fmt.format({'NUM_PEOPLE': 5, 'NAME': 'Angela'}),
         *     object {'NUM_PEOPLE': 5, 'NAME': 'Angela'} holds positional parameters.
         *     1st parameter could mean 5 people, which could influence plural format,
         *     and 2nd parameter is just a data to be printed out in proper position.
         * @param {boolean} ignorePound If true, treat '#' in plural messages as a
         *     literary character, else treat it as an ICU syntax character, resolving
         *     to the number (plural_variable - offset).
         * @return {string} Formatted message.
         * @private
         */
        private format_(namedParameters: Object, ignorePound: boolean): string;

        /**
         * Parses generic block and returns a formatted string.
         * @param {!Array<!goog.i18n.MessageFormat.TypeVal_>} parsedPattern
         *     Holds parsed tree.
         * @param {!Object} namedParameters Parameters that either influence
         *     the formatting or are used as actual data.
         * @param {boolean} ignorePound If true, treat '#' in plural messages as a
         *     literary character, else treat it as an ICU syntax character, resolving
         *     to the number (plural_variable - offset).
         * @param {!Array<string>} result Each formatting stage appends its product
         *     to the result.
         * @private
         */
        private formatBlock_(parsedPattern: any[], namedParameters: Object, ignorePound: boolean, result: string[]):
            void;

        /**
         * Formats simple placeholder.
         * @param {!Object} parsedPattern JSON object containing placeholder info.
         * @param {!Object} namedParameters Parameters that are used as actual data.
         * @param {!Array<string>} result Each formatting stage appends its product
         *     to the result.
         * @private
         */
        private formatSimplePlaceholder_(parsedPattern: Object, namedParameters: Object, result: string[]): void;

        /**
         * Formats select block. Only one option is selected.
         * @param {!{argumentIndex:?}} parsedPattern JSON object containing select
         *     block info.
         * @param {!Object} namedParameters Parameters that either influence
         *     the formatting or are used as actual data.
         * @param {boolean} ignorePound If true, treat '#' in plural messages as a
         *     literary character, else treat it as an ICU syntax character, resolving
         *     to the number (plural_variable - offset).
         * @param {!Array<string>} result Each formatting stage appends its product
         *     to the result.
         * @private
         */
        private formatSelectBlock_(
            parsedPattern: {argumentIndex: any}, namedParameters: Object, ignorePound: boolean, result: string[]
        ): void;

        /**
         * Formats plural or selectordinal block. Only one option is selected and all #
         * are replaced.
         * @param {!{argumentIndex, argumentOffset}} parsedPattern JSON object
         *     containing plural block info.
         * @param {!Object} namedParameters Parameters that either influence
         *     the formatting or are used as actual data.
         * @param {function(number, number=):string} pluralSelector  A select function
         *     from goog.i18n.pluralRules or goog.i18n.ordinalRules which determines
         *     which plural/ordinal form to use based on the input number's cardinality.
         * @param {boolean} ignorePound If true, treat '#' in plural messages as a
         *     literary character, else treat it as an ICU syntax character, resolving
         *     to the number (plural_variable - offset).
         * @param {!Array<string>} result Each formatting stage appends its product
         *     to the result.
         * @private
         */
        private formatPluralOrdinalBlock_(
            parsedPattern: {argumentIndex: any /*missing*/; argumentOffset: any /*missing*/},
            namedParameters: Object,
            pluralSelector: (_0: number, _1: number) => string,
            ignorePound: boolean,
            result: string[]
        ): void;

        /**
         * Set up the MessageFormat.
         * Parses input pattern into an array, for faster reformatting with
         * different input parameters.
         * Parsing is locale independent.
         * @private
         */
        private init_(): void;

        /**
         * Replaces string literals with literal placeholders.
         * Literals are string of the form '}...', '{...' and '#...' where ... is
         * set of characters not containing '
         * Builds a dictionary so we can recover literals during format phase.
         * @param {string} pattern Pattern to clean up.
         * @return {string} Pattern with literals replaced with placeholders.
         * @private
         */
        private insertPlaceholders_(pattern: string): string;

        /**
         * Breaks pattern into strings and top level {...} blocks.
         * @param {string} pattern (sub)Pattern to be broken.
         * @return {!Array<goog.i18n.MessageFormat.TypeVal_>}
         * @private
         */
        private extractParts_(pattern: string): any[];

        /**
         * Detects which type of a block is the pattern.
         * @param {string} pattern Content of the block.
         * @return {goog.i18n.MessageFormat.BlockType_} One of the block types.
         * @private
         */
        private parseBlockType_(pattern: string): any;

        /**
         * Parses generic block.
         * @param {string} pattern Content of the block to parse.
         * @return {!Array<!Object>} Subblocks marked as strings, select...
         * @private
         */
        private parseBlock_(pattern: string): Object[];

        /**
         * Parses a select type of a block and produces JSON object for it.
         * @param {string} pattern Subpattern that needs to be parsed as select pattern.
         * @return {!Object} Object with select block info.
         * @private
         */
        private parseSelectBlock_(pattern: string): Object;

        /**
         * Parses a plural type of a block and produces JSON object for it.
         * @param {string} pattern Subpattern that needs to be parsed as plural pattern.
         * @return {!Object} Object with select block info.
         * @private
         */
        private parsePluralBlock_(pattern: string): Object;

        /**
         * Parses an ordinal type of a block and produces JSON object for it.
         * For example the input string:
         *  '{FOO, selectordinal, one {Message A}other {Message B}}'
         * Should result in the output object:
         * {
         *   argumentIndex: 'FOO',
         *   argumentOffest: 0,
         *   one: [ { type: 4, value: 'Message A' } ],
         *   other: [ { type: 4, value: 'Message B' } ]
         * }
         * @param {string} pattern Subpattern that needs to be parsed as plural pattern.
         * @return {!Object} Object with select block info.
         * @private
         */
        private parseOrdinalBlock_(pattern: string): Object;

        /**
         * Builds a placeholder from the last index of the array.
         * @param {!Array<string>} literals All literals encountered during parse.
         * @return {string} \uFDDF_ + last index + _.
         * @private
         */
        private buildPlaceholder_(literals: string[]): string;
    }
}

declare namespace goog.i18n.MessageFormat {
    /** @typedef {{ type: goog.i18n.MessageFormat.Element_, value: ? }} */
    interface TypeVal_ {
        type: any;
        value: any;
    }
}
