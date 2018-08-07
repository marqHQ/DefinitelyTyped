/// <reference path="../../../globals.d.ts"/>
/// <reference path="../date/datelike.d.ts"/>
/// <reference path="./timezone.d.ts"/>

declare module 'goog:goog.i18n.DateTimeFormat' {
    import alias = goog.i18n.DateTimeFormat;
    export default alias;
}

declare module 'goog:goog.i18n.DateTimeFormat.Format' {
    import alias = goog.i18n.DateTimeFormat.Format;
    export default alias;
}

declare namespace goog.i18n {
    /**
     * Construct a DateTimeFormat object based on current locale.
     * @final
     */
    class DateTimeFormat extends __DateTimeFormat {}
    abstract class __DateTimeFormat {
        /**
         * @param {string|number} pattern pattern specification or pattern type.
         * @param {!Object=} opt_dateTimeSymbols Optional symbols to use for this
         *     instance rather than the global symbols.
         *     You can use some of the predefined SHORT / MEDIUM / LONG / FULL patterns,
         *     or the common patterns defined in goog.i18n.DateTimePatterns.
         *     Examples:
         *     <code><pre>
         *       var fmt = new goog.i18n.DateTimeFormat(
         *           goog.i18n.DateTimeFormat.Format.FULL_DATE);
         *       var fmt = new goog.i18n.DateTimeFormat(
         *           goog.i18n.DateTimePatterns.MONTH_DAY_YEAR_MEDIUM);
         *     </pre></code>
         *
         * {@see goog.i18n.DateTimeFormat.Format}
         * {@see goog.i18n.DateTimePatterns}
         */
        constructor(pattern: string|number, opt_dateTimeSymbols?: Object);

        /**
         * Data structure that with all the locale info needed for date formatting.
         * (day/month names, most common patterns, rules for week-end, etc.)
         * @private {!goog.i18n.DateTimeSymbolsType}
         */
        private dateTimeSymbols_: any /*missing*/;

        /**
         * Apply specified pattern to this formatter object.
         * @param {string} pattern String specifying how the date should be formatted.
         * @private
         */
        private applyPattern_(pattern: string): void;

        /**
         * Format the given date object according to preset pattern and current locale.
         * @param {goog.date.DateLike} date The Date object that is being formatted.
         * @param {goog.i18n.TimeZone=} opt_timeZone optional, if specified, time
         *    related fields will be formatted based on its setting. When this field
         *    is not specified, "undefined" will be pass around and those function
         *    that really need time zone service will create a default one.
         * @return {string} Formatted string for the given date.
         *    Throws an error if the date is null or if one tries to format a date-only
         *    object (for instance goog.date.Date) using a pattern with time fields.
         */
        format(date: goog.date.DateLike, opt_timeZone?: goog.i18n.TimeZone): string;

        /**
         * Apply a predefined pattern as identified by formatType, which is stored in
         * locale specific repository.
         * @param {number} formatType A number that identified the predefined pattern.
         * @private
         */
        private applyStandardPattern_(formatType: number): void;

        /**
         * Localizes a string potentially containing numbers, replacing ASCII digits
         * with native digits if specified so by the locale. Leaves other characters.
         * @param {string} input the string to be localized, using ASCII digits.
         * @return {string} localized string, potentially using native digits.
         * @private
         */
        private localizeNumbers_(input: string): string;

        /**
         * Formats Era field according to pattern specified.
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatEra_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Year field according to pattern specified
         *   Javascript Date object seems incapable handling 1BC and
         *   year before. It can show you year 0 which does not exists.
         *   following we just keep consistent with javascript's
         *   toString method. But keep in mind those things should be
         *   unsupported.
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatYear_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Month field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatMonth_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats (1..24) Hours field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats. This controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private format24Hours_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Fractional seconds field according to pattern
         * specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         *
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatFractionalSeconds_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Day of week field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatDayOfWeek_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Am/Pm field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatAmPm_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats (1..12) Hours field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} formatted string that represent this field.
         * @private
         */
        private format1To12Hours_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats (0..11) Hours field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} formatted string that represent this field.
         * @private
         */
        private format0To11Hours_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats (0..23) Hours field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} formatted string that represent this field.
         * @private
         */
        private format0To23Hours_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Standalone weekday field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} formatted string that represent this field.
         * @private
         */
        private formatStandaloneDay_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Standalone Month field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} formatted string that represent this field.
         * @private
         */
        private formatStandaloneMonth_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Quarter field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatQuarter_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Date field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatDate_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Minutes field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatMinutes_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats Seconds field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatSeconds_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats the week of year field according to pattern specified
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatWeekOfYear_(count: number, date: goog.date.DateLike): string;

        /**
         * Formats TimeZone field following RFC
         *
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date It holds the date object to be formatted.
         * @param {goog.i18n.TimeZone=} opt_timeZone This holds current time zone info.
         * @return {string} Formatted string that represent this field.
         * @private
         */
        private formatTimeZoneRFC_(count: number, date: goog.date.DateLike, opt_timeZone?: goog.i18n.TimeZone): string;

        /**
         * Generate GMT timeZone string for given date
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date Whose value being evaluated.
         * @param {goog.i18n.TimeZone=} opt_timeZone This holds current time zone info.
         * @return {string} GMT timeZone string.
         * @private
         */
        private formatTimeZone_(count: number, date: goog.date.DateLike, opt_timeZone?: goog.i18n.TimeZone): string;

        /**
         * Generate GMT timeZone string for given date
         * @param {!goog.date.DateLike} date Whose value being evaluated.
         * @param {goog.i18n.TimeZone=} opt_timeZone This holds current time zone info.
         * @return {string} GMT timeZone string.
         * @private
         */
        private formatTimeZoneId_(date: goog.date.DateLike, opt_timeZone?: goog.i18n.TimeZone): string;

        /**
         * Generate localized, location dependent time zone id
         * @param {number} count Number of time pattern char repeats, it controls
         *     how a field should be formatted.
         * @param {!goog.date.DateLike} date Whose value being evaluated.
         * @param {goog.i18n.TimeZone=} opt_timeZone This holds current time zone info.
         * @return {string} GMT timeZone string.
         * @private
         */
        private formatTimeZoneLocationId_(count: number, date: goog.date.DateLike, opt_timeZone?: goog.i18n.TimeZone):
            string;

        /**
         * Formatting one date field.
         * @param {string} patternStr The pattern string for the field being formatted.
         * @param {!goog.date.DateLike} date represents the real date to be formatted.
         * @param {!goog.date.DateLike} dateForDate used to resolve date fields
         *     for formatting.
         * @param {!goog.date.DateLike} dateForTime used to resolve time fields
         *     for formatting.
         * @param {goog.i18n.TimeZone=} opt_timeZone This holds current time zone info.
         * @return {string} string representation for the given field.
         * @private
         */
        private formatField_(
            patternStr: string,
            date: goog.date.DateLike,
            dateForDate: goog.date.DateLike,
            dateForTime: goog.date.DateLike,
            opt_timeZone?: goog.i18n.TimeZone
        ): string;
    }
}

declare namespace goog.i18n.DateTimeFormat {
    /**
     * Enum to identify predefined Date/Time format pattern.
     * @enum {number}
     */
    enum Format {
        FULL_DATE,
        LONG_DATE,
        MEDIUM_DATE,
        SHORT_DATE,
        FULL_TIME,
        LONG_TIME,
        MEDIUM_TIME,
        SHORT_TIME,
        FULL_DATETIME,
        LONG_DATETIME,
        MEDIUM_DATETIME,
        SHORT_DATETIME
    }

    /**
     * Sets if the usage of Ascii digits in formatting should be enforced in
     * formatted date/time even for locales where native digits are indicated.
     * Also sets whether to remove RLM unicode control characters when using
     * standard enumerated patterns (they exist e.g. in standard d/M/y for Arabic).
     * Production code should call this once before any `DateTimeFormat`
     * object is instantiated.
     * Caveats:
     *    * Enforcing ASCII digits affects all future formatting by new or existing
     * `DateTimeFormat` objects.
     *    * Removal of RLM characters only applies to `DateTimeFormat` objects
     * instantiated after this call.
     * @param {boolean} enforceAsciiDigits Whether Ascii digits should be enforced.
     */
    function setEnforceAsciiDigits(enforceAsciiDigits: boolean): void;

    /**
     * @return {boolean} Whether enforcing ASCII digits for all locales. See
     *     `#setEnforceAsciiDigits` for more details.
     */
    function isEnforceAsciiDigits(): boolean;

    /**
     * Localizes a string potentially containing numbers, replacing ASCII digits
     * with native digits if specified so by the locale. Leaves other characters.
     * @param {number|string} input the string to be localized, using ASCII digits.
     * @param {!Object=} opt_dateTimeSymbols Optional symbols to use rather than
     *     the global symbols.
     * @return {string} localized string, potentially using native digits.
     */
    function localizeNumbers(input: number|string, opt_dateTimeSymbols?: Object): string;
}
