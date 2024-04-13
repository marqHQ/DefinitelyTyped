/// <reference path="./date.d.ts"/>

declare namespace goog.date {
    /**
     * Constructs a date range.
     */
    class DateRange {
        private noStructuralTyping_goog_date_DateRange: any;
        /**
         * Constructs a date range.
         * @param startDate The first date in the range.
         * @param endDate The last date in the range.
         */
        constructor(startDate: goog.date.Date, endDate: goog.date.Date);
        /**
         * Tests if a date falls within this range.
         * @param date The date to test.
         */
        contains(date: goog.date.Date): boolean;
        getEndDate(): goog.date.Date;
        getStartDate(): goog.date.Date;
        iterator(): goog.date.DateRange.Iterator;
        /**
         * The last possible day, as far as this class is concerned.
         */
        static MAXIMUM_DATE: goog.date.Date;
        /**
         * The first possible day, as far as this class is concerned.
         */
        static MINIMUM_DATE: goog.date.Date;
        /**
         * Returns the range that includes all days between January 1, 1900 and
         * December 31, 9999.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static allTime(opt_today?: goog.date.Date): goog.date.DateRange;
        /**
         * Tests two {@link goog.date.DateRange} objects for equality.
         * @param a A date range.
         * @param b A date range.
         */
        static equals(a: goog.date.DateRange, b: goog.date.DateRange): boolean;
        /**
         * Returns the range that includes the seven days that end yesterday.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static last7Days(opt_today?: goog.date.Date): goog.date.DateRange;
        /**
         * Returns the range that starts seven days before the Monday on or before
         * today and ends the Friday before today.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static lastBusinessWeek(
            opt_today?: goog.date.Date
        ): goog.date.DateRange;
        /**
         * Returns the range that starts the first of last month and ends the last day
         * of last month.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static lastMonth(opt_today?: goog.date.Date): goog.date.DateRange;
        /**
         * Returns the seven-day range that ends the day before the first day of
         * the week (see {@link goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK}) that
         * contains today.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static lastWeek(opt_today?: goog.date.Date): goog.date.DateRange;
        static standardDateRange(
            dateRangeKey: string,
            opt_today?: goog.date.Date
        ): goog.date.DateRange;
        /**
         * Returns the range that starts the first of this month and ends the last day
         * of this month.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static thisMonth(opt_today?: goog.date.Date): goog.date.DateRange;
        /**
         * Returns the seven-day range that starts on the first day of the week
         * (see {@link goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK}) on or before today.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static thisWeek(opt_today?: goog.date.Date): goog.date.DateRange;
        /**
         * Returns the range from today to today.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static today(opt_today?: goog.date.Date): goog.date.DateRange;
        /**
         * Returns the range from yesterday to yesterday.
         * @param opt_today The date to consider today. Defaults to today.
         */
        static yesterday(opt_today?: goog.date.Date): goog.date.DateRange;
    }
}
declare module "goog:goog.date.DateRange" {
    import DateRange = goog.date.DateRange;
    export default DateRange;
}
// Generated from /home/ty/dev/closure-library/closure/goog/date/daterange.js
declare namespace goog.date.DateRange {
    /**
     * Creates an iterator over the dates in a {@link goog.date.DateRange}.
     */
    class Iterator extends goog.iter.Iterator<goog.date.Date> {
        private noStructuralTyping_goog_date_DateRange_Iterator: any;
        /**
         * Creates an iterator over the dates in a {@link goog.date.DateRange}.
         * @param dateRange The date range to iterate.
         */
        constructor(dateRange: goog.date.DateRange);
        next(): IteratorResult<goog.date.Date>;
        /**
         * TODO(user): Please do not remove - this will be cleaned up centrally.
         */
        nextValueOrThrow(): goog.date.Date;
    }
}

declare module "goog:goog.date.DateRange.Iterator" {
    import Iterator = goog.date.DateRange.Iterator;
    export default Iterator;
}

declare namespace goog.date.DateRange {
    /**
     * Standard date range keys. Equivalent to the enum IDs in
     * DateRange.java http://go/datarange.java
     */
    /**
     * Standard date range keys. Equivalent to the enum IDs in
     * DateRange.java http://go/datarange.java
     */
    enum StandardDateRangeKeys {
        ALL_TIME = "alltime",
        LAST_7_DAYS = "last7days",
        LAST_BUSINESS_WEEK = "lastbusinessweek",
        LAST_MONTH = "lastmonth",
        LAST_WEEK = "lastweek",
        THIS_MONTH = "thismonth",
        THIS_WEEK = "thisweek",
        TODAY = "today",
        YESTERDAY = "yesterday",
    }
}

declare module "goog:goog.date.DateRange.StandardDateRangeKeys" {
    import StandardDateRangeKeys = goog.date.DateRange.StandardDateRangeKeys;
    export default StandardDateRangeKeys;
}
