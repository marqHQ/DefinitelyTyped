/// <reference path="../../../globals.d.ts"/>
/// <reference path="./date.d.ts"/>
/// <reference path="../iter/iter.d.ts"/>

declare module 'goog:goog.date.DateRange' {
    import alias = goog.date.DateRange;
    export default alias;
}

declare module 'goog:goog.date.DateRange.StandardDateRangeKeys' {
    import alias = goog.date.DateRange.StandardDateRangeKeys;
    export default alias;
}

declare module 'goog:goog.date.DateRange.Iterator' {
    import alias = goog.date.DateRange.Iterator;
    export default alias;
}

declare namespace goog.date {
    /**
     * Constructs a date range.
     * @struct
     * @final
     */
    class DateRange extends __DateRange {}
    abstract class __DateRange {
        /**
         * @param {goog.date.Date} startDate The first date in the range.
         * @param {goog.date.Date} endDate The last date in the range.
         */
        constructor(startDate: goog.date.Date, endDate: goog.date.Date);

        /**
         * The first date in the range.
         * @type {goog.date.Date}
         * @private
         */
        private startDate_: goog.date.Date;

        /**
         * The last date in the range.
         * @type {goog.date.Date}
         * @private
         */
        private endDate_: goog.date.Date;

        /**
         * @return {goog.date.Date} The first date in the range.
         */
        getStartDate(): goog.date.Date;

        /**
         * @return {goog.date.Date} The last date in the range.
         */
        getEndDate(): goog.date.Date;

        /**
         * Tests if a date falls within this range.
         *
         * @param {goog.date.Date} date The date to test.
         * @return {boolean} Whether the date is in the range.
         */
        contains(date: goog.date.Date): boolean;

        /**
         * @return {!goog.date.DateRange.Iterator} An iterator over the date range.
         */
        iterator(): goog.date.DateRange.Iterator;
    }
}

declare namespace goog.date.DateRange {
    /**
     * Creates an iterator over the dates in a {@link goog.date.DateRange}.
     * @struct
     * @extends {goog.iter.Iterator<goog.date.Date>}
     * @final
     */
    class Iterator extends __Iterator {}
    abstract class __Iterator extends goog.iter.__Iterator<goog.date.Date> {
        /**
         * @param {goog.date.DateRange} dateRange The date range to iterate.
         */
        constructor(dateRange: goog.date.DateRange);

        /**
         * The next date.
         * @type {goog.date.Date}
         * @private
         */
        private nextDate_: goog.date.Date;

        /**
         * The end date, expressed as an integer: YYYYMMDD.
         * @type {number}
         * @private
         */
        private endDate_: number;
    }

    /**
     * The first possible day, as far as this class is concerned.
     * @type {goog.date.Date}
     */
    let MINIMUM_DATE: goog.date.Date;

    /**
     * The last possible day, as far as this class is concerned.
     * @type {goog.date.Date}
     */
    let MAXIMUM_DATE: goog.date.Date;

    /**
     * Tests two {@link goog.date.DateRange} objects for equality.
     * @param {goog.date.DateRange} a A date range.
     * @param {goog.date.DateRange} b A date range.
     * @return {boolean} Whether |a| is the same range as |b|.
     */
    function equals(a: goog.date.DateRange, b: goog.date.DateRange): boolean;

    /**
     * Returns the range from yesterday to yesterday.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that includes only yesterday.
     */
    function yesterday(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Returns the range from today to today.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that includes only today.
     */
    function today(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Returns the range that includes the seven days that end yesterday.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that includes the seven days that
     *     end yesterday.
     */
    function last7Days(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Returns the range that starts the first of this month and ends the last day
     * of this month.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that starts the first of this month
     *     and ends the last day of this month.
     */
    function thisMonth(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Returns the range that starts the first of last month and ends the last day
     * of last month.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that starts the first of last month
     *     and ends the last day of last month.
     */
    function lastMonth(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Returns the seven-day range that starts on the first day of the week
     * (see {@link goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK}) on or before today.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that starts the Monday on or before
     *     today and ends the Sunday on or after today.
     */
    function thisWeek(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Returns the seven-day range that ends the day before the first day of
     * the week (see {@link goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK}) that
     * contains today.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that starts seven days before the
     *     Monday on or before today and ends the Sunday on or before yesterday.
     */
    function lastWeek(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Returns the range that starts seven days before the Monday on or before
     * today and ends the Friday before today.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that starts seven days before the
     *     Monday on or before today and ends the Friday before today.
     */
    function lastBusinessWeek(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Returns the range that includes all days between January 1, 1900 and
     * December 31, 9999.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The range that includes all days between
     *     January 1, 1900 and December 31, 9999.
     */
    function allTime(opt_today?: goog.date.Date): goog.date.DateRange;

    /**
     * Standard date range keys. Equivalent to the enum IDs in
     * DateRange.java http://go/datarange.java
     *
     * @enum {string}
     */
    enum StandardDateRangeKeys {
        YESTERDAY,
        TODAY,
        LAST_7_DAYS,
        THIS_MONTH,
        LAST_MONTH,
        THIS_WEEK,
        LAST_WEEK,
        LAST_BUSINESS_WEEK,
        ALL_TIME
    }

    /**
     * @param {string} dateRangeKey A standard date range key.
     * @param {goog.date.Date=} opt_today The date to consider today.
     *     Defaults to today.
     * @return {!goog.date.DateRange} The date range that corresponds to that key.
     * @throws {Error} If no standard date range with that key exists.
     */
    function standardDateRange(dateRangeKey: string, opt_today?: goog.date.Date): goog.date.DateRange;
}
