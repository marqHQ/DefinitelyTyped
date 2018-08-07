/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>

declare module 'goog:goog.ui.DrilldownRow' {
    import alias = goog.ui.DrilldownRow;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Builds a DrilldownRow component, which can overlay a tree
     * structure onto sections of an HTML table.
     *
     * @extends {goog.ui.Component}
     * @final
     */
    class DrilldownRow extends __DrilldownRow {}
    abstract class __DrilldownRow extends goog.ui.__Component {
        /**
         * @param {!goog.ui.DrilldownRow.DrilldownRowProperties=} opt_properties
         *   Optional properties.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_properties?: goog.ui.DrilldownRow.DrilldownRowProperties, opt_domHelper?: goog.dom.DomHelper);

        /**
         * String of HTML to initialize the DOM structure for the table row.
         * Should have the form '<tr attr="etc">Row contents here</tr>'.
         * @type {!goog.html.SafeHtml}
         * @private
         */
        private html_: goog.html.SafeHtml;

        /**
         * Controls whether this component's children will show when it shows.
         * @type {boolean}
         * @private
         */
        private expanded_: boolean;

        /**
         * If this component's DOM element is created from a string of
         * HTML, this is the function to call when it is entered into the DOM tree.
         * @type {Function} args are DrilldownRow and goog.events.EventHandler
         *   of the DrilldownRow.
         * @private
         */
        private decoratorFn_: Function;

        /**
         * Is the DrilldownRow to be displayed?  If it is rendered, this mirrors
         * the style.display of the DrilldownRow's row.
         * @type {boolean}
         * @private
         */
        private displayed_: boolean;

        /**
         * Finds the numeric index of this child within its parent Component.
         * Throws an exception if it has no parent.
         *
         * @return {number} index of this within the children of the parent Component.
         */
        findIndex(): number;

        /**
         * Returns the expanded state of the DrilldownRow.
         *
         * @return {boolean} true iff this is expanded.
         */
        isExpanded(): boolean;

        /**
         * Sets the expanded state of this DrilldownRow: makes all children
         * displayable or not displayable corresponding to the expanded state.
         *
         * @param {boolean} expanded whether this should be expanded or not.
         */
        setExpanded(expanded: boolean): void;

        /**
         * Returns this DrilldownRow's level in the tree.  Top level is 1.
         *
         * @return {number} depth of this DrilldownRow in its tree of drilldowns.
         */
        getDepth(): number;

        /**
         * Turn display of a DrilldownRow on or off.  If the DrilldownRow has not
         * yet been rendered, this renders it.  This propagates the effect
         * of the change recursively as needed -- children displaying iff the
         * parent is displayed and expanded.
         *
         * @param {boolean} display state, true iff display is desired.
         * @private
         */
        private setDisplayable_(display: boolean): void;

        /**
         * True iff this and all its DrilldownRow parents are displayable.  The
         * value is an approximation to actual visibility, since it does not
         * look at whether DOM nodes containing the top-level component have
         * display: none, visibility: hidden or are otherwise not displayable.
         * So this visibility is relative to the top-level component.
         *
         * @return {boolean} visibility of this relative to its top-level drilldown.
         * @private
         */
        private isVisible_(): boolean;

        /**
         * Get the recursively rightmost child that is in the document.
         *
         * @return {goog.ui.DrilldownRow} rightmost child currently entered in
         *     the document, potentially this DrilldownRow.  If this is in the
         *     document, result is non-null.
         * @private
         */
        private lastRenderedLeaf_(): goog.ui.DrilldownRow;

        /**
         * Search this node's direct children for the last one that is in the
         * document and is before the given child.
         * @param {goog.ui.DrilldownRow} child The child to stop the search at.
         * @return {goog.ui.Component?} The last child component before the given child
         *     that is in the document.
         * @private
         */
        private previousRenderedChild_(child: goog.ui.DrilldownRow): goog.ui.Component|null;
    }
}

declare namespace goog.ui.DrilldownRow {
    /**
     * Used to define properties for a new DrilldownRow. Properties can contain:
     *   loaded: initializes the isLoaded property, defaults to true.
     *   expanded: DrilldownRow expanded or not, default is true.
     *   html: Relevant and required for DrilldownRows to be added as
     *     children.  Ignored when decorating an existing table row.
     *   decorator: Function that accepts one DrilldownRow argument, and
     *     should customize and style the row.  The default is to call
     *     goog.ui.DrilldownRow.decorator.
     * @typedef {{
     *   loaded: (boolean|undefined),
     *   expanded: (boolean|undefined),
     *   html: (!goog.html.SafeHtml|undefined),
     *   decorator: (Function|undefined)
     * }}
     */
    interface DrilldownRowProperties {
        loaded: boolean|undefined;
        expanded: boolean|undefined;
        html: goog.html.SafeHtml|undefined;
        decorator: Function|undefined;
    }

    /**
     * Example object with properties of the form accepted by the class
     * constructor.  These are educational and show the compiler that
     * these properties can be set so it doesn't emit warnings.
     */
    let sampleProperties: any /*missing*/;

    /**
     * This static function is a default decorator that adds HTML at the
     * beginning of the first cell to display indentation and an expander
     * image; sets up a click handler on the toggler; initializes a class
     * for the row: either goog-drilldown-expanded or
     * goog-drilldown-collapsed, depending on the initial state of the
     * DrilldownRow; and sets up a click event handler on the toggler
     * element.
     *
     * This creates a DIV with class=toggle.  Your application can set up
     * CSS style rules something like this:
     *
     * tr.goog-drilldown-expanded .toggle {
     *   background-image: url('minus.png');
     * }
     *
     * tr.goog-drilldown-collapsed .toggle {
     *   background-image: url('plus.png');
     * }
     *
     * These background images show whether the DrilldownRow is expanded.
     *
     * @param {goog.ui.DrilldownRow} selfObj DrilldownRow to be decorated.
     */
    function decorate(selfObj: goog.ui.DrilldownRow): void;
}
