/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractmultirange.d.ts"/>
/// <reference path="./textrange.d.ts"/>
/// <reference path="./savedrange.d.ts"/>
/// <reference path="./abstractrange.d.ts"/>

declare module 'goog:goog.dom.MultiRangeIterator' {
    import alias = goog.dom.MultiRangeIterator;
    export default alias;
}

declare module 'goog:goog.dom.MultiRange' {
    import alias = goog.dom.MultiRange;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Creates a new multi part range with no properties.  Do not use this
     * constructor: use one of the goog.dom.Range.createFrom* methods instead.
     * @extends {goog.dom.AbstractMultiRange}
     * @final
     */
    class MultiRange extends __MultiRange {}
    abstract class __MultiRange extends goog.dom.__AbstractMultiRange {
        /**
         */
        constructor();

        /**
         * Logging object.
         * @private {goog.log.Logger}
         */
        private logger_: any /*missing*/;

        /**
         * Array of browser sub-ranges comprising this multi-range.
         * @private {Array<Range>}
         */
        private browserRanges_: any /*missing*/;

        /**
         * Lazily initialized array of range objects comprising this multi-range.
         * @private {Array<goog.dom.TextRange>}
         */
        private ranges_: any /*missing*/;

        /**
         * Lazily computed sorted version of ranges_, sorted by start point.
         * @private {Array<goog.dom.TextRange>?}
         */
        private sortedRanges_: any /*missing*/;

        /**
         * Lazily computed container node.
         * @private {Node}
         */
        private container_: any /*missing*/;

        /**
         * Clears cached values.  Should be called whenever this.browserRanges_ is
         * modified.
         * @private
         */
        private clearCachedValues_(): void;

        /**
         * @return {!Array<goog.dom.TextRange>} An array of sub-ranges, sorted by start
         *     point.
         */
        getSortedRanges(): goog.dom.TextRange[];
    }

    /**
     * A SavedRange implementation using DOM endpoints.
     * @extends {goog.dom.SavedRange}
     * @private
     */
    class DomSavedMultiRange_ extends __DomSavedMultiRange_ {}
    abstract class __DomSavedMultiRange_ extends goog.dom.__SavedRange {
        /**
         * @param {goog.dom.MultiRange} range The range to save.
         */
        constructor(range: goog.dom.MultiRange);

        /**
         * Array of saved ranges.
         * @type {Array<goog.dom.SavedRange>}
         * @private
         */
        private savedRanges_: goog.dom.SavedRange[];
    }

    /**
     * Subclass of goog.dom.TagIterator that iterates over a DOM range.  It
     * adds functions to determine the portion of each text node that is selected.
     *
     * @extends {goog.dom.RangeIterator}
     * @final
     */
    class MultiRangeIterator extends __MultiRangeIterator {}
    abstract class __MultiRangeIterator extends goog.dom.__RangeIterator {
        /**
         * @param {goog.dom.MultiRange} range The range to traverse.
         */
        constructor(range: goog.dom.MultiRange);

        /**
         * The list of range iterators left to traverse.
         * @private {Array<goog.dom.RangeIterator>}
         */
        private iterators_: any /*missing*/;

        /**
         * The index of the current sub-iterator being traversed.
         * @private {number}
         */
        private currentIdx_: any /*missing*/;
    }
}

declare namespace goog.dom.MultiRange {
    /**
     * Creates a new range wrapper from the given browser selection object.  Do not
     * use this method directly - please use goog.dom.Range.createFrom* instead.
     * @param {Selection} selection The browser selection object.
     * @return {!goog.dom.MultiRange} A range wrapper object.
     */
    function createFromBrowserSelection(selection: Selection): goog.dom.MultiRange;

    /**
     * Creates a new range wrapper from the given browser ranges.  Do not
     * use this method directly - please use goog.dom.Range.createFrom* instead.
     * @param {Array<Range>} browserRanges The browser ranges.
     * @return {!goog.dom.MultiRange} A range wrapper object.
     */
    function createFromBrowserRanges(browserRanges: Range[]): goog.dom.MultiRange;

    /**
     * Creates a new range wrapper from the given goog.dom.TextRange objects.  Do
     * not use this method directly - please use goog.dom.Range.createFrom* instead.
     * @param {Array<goog.dom.TextRange>} textRanges The text range objects.
     * @return {!goog.dom.MultiRange} A range wrapper object.
     */
    function createFromTextRanges(textRanges: goog.dom.TextRange[]): goog.dom.MultiRange;
}
