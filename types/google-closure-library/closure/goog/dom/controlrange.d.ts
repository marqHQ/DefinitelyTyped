/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractmultirange.d.ts"/>
/// <reference path="./savedrange.d.ts"/>
/// <reference path="./abstractrange.d.ts"/>

declare module 'goog:goog.dom.ControlRangeIterator' {
    import alias = goog.dom.ControlRangeIterator;
    export default alias;
}

declare module 'goog:goog.dom.ControlRange' {
    import alias = goog.dom.ControlRange;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Create a new control selection with no properties.  Do not use this
     * constructor: use one of the goog.dom.Range.createFrom* methods instead.
     * @extends {goog.dom.AbstractMultiRange}
     * @final
     */
    class ControlRange extends __ControlRange {}
    abstract class __ControlRange extends goog.dom.__AbstractMultiRange {
        /**
         */
        constructor();

        /**
         * The IE control range obejct.
         * @private {Object}
         */
        private range_: any /*missing*/;

        /**
         * Cached list of elements.
         * @private {Array<Element>}
         */
        private elements_: any /*missing*/;

        /**
         * Cached sorted list of elements.
         * @private {Array<Element>}
         */
        private sortedElements_: any /*missing*/;

        /**
         * Clear cached values.
         * @private
         */
        private clearCachedValues_(): void;

        /**
         * @return {!Array<Element>} Array of elements in the control range.
         */
        getElements(): Element[];

        /**
         * @return {!Array<Element>} Array of elements comprising the control range,
         *     sorted by document order.
         */
        getSortedElements(): Element[];
    }

    /**
     * A SavedRange implementation using DOM endpoints.
     * @extends {goog.dom.SavedRange}
     * @private
     */
    class DomSavedControlRange_ extends __DomSavedControlRange_ {}
    abstract class __DomSavedControlRange_ extends goog.dom.__SavedRange {
        /**
         * @param {goog.dom.ControlRange} range The range to save.
         */
        constructor(range: goog.dom.ControlRange);

        /**
         * The element list.
         * @type {Array<Element>}
         * @private
         */
        private elements_: Element[];
    }

    /**
     * Subclass of goog.dom.TagIterator that iterates over a DOM range.  It
     * adds functions to determine the portion of each text node that is selected.
     *
     * @extends {goog.dom.RangeIterator}
     * @final
     */
    class ControlRangeIterator extends __ControlRangeIterator {}
    abstract class __ControlRangeIterator extends goog.dom.__RangeIterator {
        /**
         * @param {goog.dom.ControlRange?} range The range to traverse.
         */
        constructor(range: goog.dom.ControlRange|null);

        /**
         * The first node in the selection.
         * @private {Node}
         */
        private startNode_: any /*missing*/;

        /**
         * The last node in the selection.
         * @private {Node}
         */
        private endNode_: any /*missing*/;

        /**
         * The list of elements left to traverse.
         * @private {Array<Element>?}
         */
        private elements_: any /*missing*/;
    }
}

declare namespace goog.dom.ControlRange {
    /**
     * Create a new range wrapper from the given browser range object.  Do not use
     * this method directly - please use goog.dom.Range.createFrom* instead.
     * @param {Object} controlRange The browser range object.
     * @return {!goog.dom.ControlRange} A range wrapper object.
     */
    function createFromBrowserRange(controlRange: Object): goog.dom.ControlRange;

    /**
     * Create a new range wrapper that selects the given element.  Do not use
     * this method directly - please use goog.dom.Range.createFrom* instead.
     * @param {...Element} var_args The element(s) to select.
     * @return {!goog.dom.ControlRange} A range wrapper object.
     */
    function createFromElements(...var_args: Element[]): goog.dom.ControlRange;
}
