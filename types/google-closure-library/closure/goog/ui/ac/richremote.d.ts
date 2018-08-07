/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./remote.d.ts"/>
/// <reference path="./richremotearraymatcher.d.ts"/>

declare module 'goog:goog.ui.ac.RichRemote' {
    import alias = goog.ui.ac.RichRemote;
    export default alias;
}

declare namespace goog.ui.ac {
    /**
     * Factory class to create a rich autocomplete widget that autocompletes an
     * inputbox or textarea from data provided via ajax.  The server returns a
     * complex data structure that is used with client-side javascript functions to
     * render the results.
     *
     * @extends {goog.ui.ac.Remote}
     */
    class RichRemote extends __RichRemote {}
    abstract class __RichRemote extends goog.ui.ac.__Remote {
        /**
         * @param {string} url The Uri which generates the auto complete matches.
         * @param {Element} input Input element or text area.
         * @param {boolean=} opt_multi Whether to allow multiple entries; defaults
         *     to false.
         * @param {boolean=} opt_useSimilar Whether to use similar matches; e.g.
         *     "gost" => "ghost".
         */
        constructor(url: string, input: Element, opt_multi?: boolean, opt_useSimilar?: boolean);

        /**
         * Set the filter that is called before the array matches are returned.
         * @param {Function} rowFilter A function(rows) that returns an array of rows as
         *     a subset of the rows input array.
         */
        setRowFilter(rowFilter: Function): void;

        /**
         * Sets the function building the rows.
         * @param {goog.ui.ac.RichRemoteArrayMatcher.RowBuilder} rowBuilder
         *     A function(type, response) converting the type and the server response to
         *     an object with two methods: render(node, token) and select(target).
         */
        setRowBuilder(rowBuilder: goog.ui.ac.RichRemoteArrayMatcher.RowBuilder): void;
    }
}
