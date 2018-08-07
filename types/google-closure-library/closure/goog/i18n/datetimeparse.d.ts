/// <reference path="../../../globals.d.ts"/>
/// <reference path="../date/datelike.d.ts"/>

declare module 'goog:goog.i18n.DateTimeParse' {
    import alias = goog.i18n.DateTimeParse;
    export default alias;
}

declare namespace goog.i18n {
    /**
     * Construct a DateTimeParse based on current locale.
     * @final
     */
    class DateTimeParse extends __DateTimeParse {}
    abstract class __DateTimeParse {
        /**
         * @param {string|number} pattern pattern specification or pattern type.
         * @param {!Object=} opt_dateTimeSymbols Optional symbols to use for this
         *     instance rather than the global symbols.
         */
        constructor(pattern: string|number, opt_dateTimeSymbols?: Object);

        /**
         * Data structure with all the locale info needed for date formatting.
         * (day/month names, most common patterns, rules for week-end, etc.)
         * @const @private {!goog.i18n.DateTimeSymbolsType}
         */
        readonly dateTimeSymbols_: any /*missing*/;

        /**
         * Apply a pattern to this Parser. The pattern string will be parsed and saved
         * in "compiled" form.
         * Note: this method is somewhat similar to the pattern parsing method in
         *       datetimeformat. If you see something wrong here, you might want
         *       to check the other.
         * @param {string} pattern It describes the format of date string that need to
         *     be parsed.
         * @private
         */
        private applyPattern_(pattern: string): void;

        /**
         * Apply a predefined pattern to this Parser.
         * @param {number} formatType A constant used to identified the predefined
         *     pattern string stored in locale repository.
         * @private
         */
        private applyStandardPattern_(formatType: number): void;

        /**
         * Parse the given string and fill info into date object. This version does
         * not validate the input.
         * @param {string} text The string being parsed.
         * @param {goog.date.DateLike} date The Date object to hold the parsed date.
         * @param {number=} opt_start The position from where parse should begin.
         * @return {number} How many characters parser advanced.
         */
        parse(text: string, date: goog.date.DateLike, opt_start?: number): number;

        /**
         * Parse the given string and fill info into date object. This version will
         * validate the input and make sure it is a valid date/time.
         * @param {string} text The string being parsed.
         * @param {goog.date.DateLike} date The Date object to hold the parsed date.
         * @param {number=} opt_start The position from where parse should begin.
         * @return {number} How many characters parser advanced.
         */
        strictParse(text: string, date: goog.date.DateLike, opt_start?: number): number;

        /**
         * Parse the given string and fill info into date object.
         * @param {string} text The string being parsed.
         * @param {goog.date.DateLike} date The Date object to hold the parsed date.
         * @param {number} start The position from where parse should begin.
         * @param {boolean} validation If true, input string need to be a valid
         *     date/time string.
         * @return {number} How many characters parser advanced.
         * @private
         */
        private internalParse_(text: string, date: goog.date.DateLike, start: number, validation: boolean): number;

        /**
         * Calculate character repeat count in pattern.
         *
         * @param {string} pattern It describes the format of date string that need to
         *     be parsed.
         * @param {number} start The position of pattern character.
         *
         * @return {number} Repeat count.
         * @private
         */
        private getNextCharCount_(pattern: string, start: number): number;

        /**
         * Check if the pattern part is a numeric field.
         *
         * @param {Object} part pattern part to be examined.
         *
         * @return {boolean} true if the pattern part is numeric field.
         * @private
         */
        private isNumericField_(part: Object): boolean;

        /**
         * Identify the start of an abutting numeric fields' run. Taking pattern
         * "HHmmss" as an example. It will try to parse 2/2/2 characters of the input
         * text, then if that fails, 1/2/2. We only adjust the width of the leftmost
         * field; the others remain fixed. This allows "123456" => 12:34:56, but
         * "12345" => 1:23:45. Likewise, for the pattern "yyyyMMdd" we try 4/2/2,
         * 3/2/2, 2/2/2, and finally 1/2/2. The first field of connected numeric
         * fields will be marked as abutStart, its width can be reduced to accommodate
         * others.
         *
         * @private
         */
        private markAbutStart_(): void;

        /**
         * Skip space in the string.
         *
         * @param {string} text input string.
         * @param {Array<number>} pos where skip start, and return back where the skip
         *     stops.
         * @private
         */
        private skipSpace_(text: string, pos: number[]): void;

        /**
         * Protected method that converts one field of the input string into a
         * numeric field value.
         *
         * @param {string} text the time text to be parsed.
         * @param {Array<number>} pos Parse position.
         * @param {Object} part the pattern part for this field.
         * @param {number} digitCount when > 0, numeric parsing must obey the count.
         * @param {goog.i18n.DateTimeParse.MyDate_} cal object that holds parsed value.
         *
         * @return {boolean} True if it parses successfully.
         * @private
         */
        private subParse_(text: string, pos: number[], part: Object, digitCount: number, cal: any): boolean;

        /**
         * Parse year field. Year field is special because
         * 1) two digit year need to be resolved.
         * 2) we allow year to take a sign.
         * 3) year field participate in abut processing.
         *
         * @param {string} text the time text to be parsed.
         * @param {Array<number>} pos Parse position.
         * @param {number} start where this field start.
         * @param {number} value integer value of year.
         * @param {Object} part the pattern part for this field.
         * @param {goog.i18n.DateTimeParse.MyDate_} cal object to hold parsed value.
         *
         * @return {boolean} True if successful.
         * @private
         */
        private subParseYear_(text: string, pos: number[], start: number, value: number, part: Object, cal: any):
            boolean;

        /**
         * Parse Month field.
         *
         * @param {string} text the time text to be parsed.
         * @param {Array<number>} pos Parse position.
         * @param {goog.i18n.DateTimeParse.MyDate_} cal object to hold parsed value.
         * @param {number} value numeric value if this field is expressed using
         *      numeric pattern, or -1 if not.
         *
         * @return {boolean} True if parsing successful.
         * @private
         */
        private subParseMonth_(text: string, pos: number[], cal: any, value: number): boolean;

        /**
         * Parse Quarter field.
         *
         * @param {string} text the time text to be parsed.
         * @param {Array<number>} pos Parse position.
         * @param {goog.i18n.DateTimeParse.MyDate_} cal object to hold parsed value.
         * @param {number} value numeric value if this field is expressed using
         *      numeric pattern, or -1 if not.
         *
         * @return {boolean} True if parsing successful.
         * @private
         */
        private subParseQuarter_(text: string, pos: number[], cal: any, value: number): boolean;

        /**
         * Parse Day of week field.
         * @param {string} text the time text to be parsed.
         * @param {Array<number>} pos Parse position.
         * @param {goog.i18n.DateTimeParse.MyDate_} cal object to hold parsed value.
         *
         * @return {boolean} True if successful.
         * @private
         */
        private subParseDayOfWeek_(text: string, pos: number[], cal: any): boolean;

        /**
         * Parse fractional seconds field.
         *
         * @param {number} value parsed numeric value.
         * @param {Array<number>} pos current parse position.
         * @param {number} start where this field start.
         * @param {goog.i18n.DateTimeParse.MyDate_} cal object to hold parsed value.
         *
         * @return {boolean} True if successful.
         * @private
         */
        private subParseFractionalSeconds_(value: number, pos: number[], start: number, cal: any): boolean;

        /**
         * Parse GMT type timezone.
         *
         * @param {string} text the time text to be parsed.
         * @param {Array<number>} pos Parse position.
         * @param {goog.i18n.DateTimeParse.MyDate_} cal object to hold parsed value.
         *
         * @return {boolean} True if successful.
         * @private
         */
        private subparseTimeZoneInGMT_(text: string, pos: number[], cal: any): boolean;

        /**
         * Parse time zone offset.
         *
         * @param {string} text the time text to be parsed.
         * @param {Array<number>} pos Parse position.
         * @param {goog.i18n.DateTimeParse.MyDate_} cal object to hold parsed value.
         *
         * @return {boolean} True if successful.
         * @private
         */
        private parseTimeZoneOffset_(text: string, pos: number[], cal: any): boolean;

        /**
         * Parse an integer string and return integer value.
         *
         * @param {string} text string being parsed.
         * @param {Array<number>} pos parse position.
         *
         * @return {number} Converted integer value or -1 if the integer cannot be
         *     parsed.
         * @private
         */
        private parseInt_(text: string, pos: number[]): number;

        /**
         * Attempt to match the text at a given position against an array of strings.
         * Since multiple strings in the array may match (for example, if the array
         * contains "a", "ab", and "abc", all will match the input string "abcd") the
         * longest match is returned.
         *
         * @param {string} text The string to match to.
         * @param {Array<number>} pos parsing position.
         * @param {Array<string>} data The string array of matching patterns.
         *
         * @return {number} the new start position if matching succeeded; a negative
         *     number indicating matching failure.
         * @private
         */
        private matchString_(text: string, pos: number[], data: string[]): number;
    }
}

declare namespace goog.i18n.DateTimeParse {
    /**
     * This class hold the intermediate parsing result. After all fields are
     * consumed, final result will be resolved from this class.
     * @private
     */
    class MyDate_ extends __MyDate_ {}
    abstract class __MyDate_ {
        /**
         */
        constructor();

        /**
         * The date's era.
         * @type {?number}
         */
        era: number|null;

        /**
         * The date's year.
         * @type {?number}
         */
        year: number|null;

        /**
         * The date's month.
         * @type {?number}
         */
        month: number|null;

        /**
         * The date's day of month.
         * @type {?number}
         */
        day: number|null;

        /**
         * The date's hour.
         * @type {?number}
         */
        hours: number|null;

        /**
         * The date's before/afternoon denominator.
         * @type {?number}
         */
        ampm: number|null;

        /**
         * The date's minutes.
         * @type {?number}
         */
        minutes: number|null;

        /**
         * The date's seconds.
         * @type {?number}
         */
        seconds: number|null;

        /**
         * The date's milliseconds.
         * @type {?number}
         */
        milliseconds: number|null;

        /**
         * The date's timezone offset.
         * @type {?number}
         */
        tzOffset: number|null;

        /**
         * The date's day of week. Sunday is 0, Saturday is 6.
         * @type {?number}
         */
        dayOfWeek: number|null;

        /**
         * 2 digit year special handling. Assuming for example that the
         * defaultCenturyStart is 6/18/1903. This means that two-digit years will be
         * forced into the range 6/18/1903 to 6/17/2003. As a result, years 00, 01, and
         * 02 correspond to 2000, 2001, and 2002. Years 04, 05, etc. correspond
         * to 1904, 1905, etc. If the year is 03, then it is 2003 if the
         * other fields specify a date before 6/18, or 1903 if they specify a
         * date afterwards. As a result, 03 is an ambiguous year. All other
         * two-digit years are unambiguous.
         *
         * @param {number} year 2 digit year value before adjustment.
         * @return {number} disambiguated year.
         * @private
         */
        private setTwoDigitYear_(year: number): number;

        /**
         * Based on the fields set, fill a Date object. For those fields that not
         * set, use the passed in date object's value.
         *
         * @param {goog.date.DateLike} date Date object to be filled.
         * @param {boolean} validation If true, input string will be checked to make
         *     sure it is valid.
         *
         * @return {boolean} false if fields specify a invalid date.
         * @private
         */
        private calcDate_(date: goog.date.DateLike, validation: boolean): boolean;
    }

    /**
     * Number of years prior to now that the century used to
     * disambiguate two digit years will begin
     *
     * @type {number}
     */
    let ambiguousYearCenturyStart: number;
}
