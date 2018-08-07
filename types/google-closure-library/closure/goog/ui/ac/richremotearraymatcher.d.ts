/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./remotearraymatcher.d.ts"/>

declare module 'goog:goog.ui.ac.RichRemoteArrayMatcher' {
    import alias = goog.ui.ac.RichRemoteArrayMatcher;
    export default alias;
}

declare namespace goog.ui.ac {
    /**
     * An array matcher that requests rich matches via ajax and converts them into
     * rich rows.
     *
     * @extends {goog.ui.ac.RemoteArrayMatcher}
     */
    class RichRemoteArrayMatcher extends __RichRemoteArrayMatcher {}
    abstract class __RichRemoteArrayMatcher extends goog.ui.ac.__RemoteArrayMatcher {
        /**
         * @param {string} url The Uri which generates the auto complete matches.  The
         *     search term is passed to the server as the 'token' query param.
         * @param {boolean=} opt_noSimilar If true, request that the server does not do
         *     similarity matches for the input token against the dictionary.
         *     The value is sent to the server as the 'use_similar' query param which is
         *     either "1" (opt_noSimilar==false) or "0" (opt_noSimilar==true).
         */
        constructor(url: string, opt_noSimilar?: boolean);

        /**
         * A function(rows) that is called before the array matches are returned.
         * It runs client-side and filters the results given by the server before
         * being rendered by the client.
         * @type {Function}
         * @private
         */
        private rowFilter_: Function;

        /**
         * A function(type, response) converting the type and the server response to
         * an object with two methods: render(node, token) and select(target).
         * @private {goog.ui.ac.RichRemoteArrayMatcher.RowBuilder}
         */
        private rowBuilder_(type: any /* jsdoc error */, response: any /* jsdoc error */): void;

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

declare namespace goog.ui.ac.RichRemoteArrayMatcher {
    /**
     * @typedef {function(string, *): {
     *   render: (function(!Element, string)|undefined),
     *   select: (function(!Element)|undefined)
     * }}
     */
    interface RowBuilder {
        (_0: string,
         _1: any): {render: ((_0: Element, _1: string) => void)|undefined; select: ((_0: Element) => void) | undefined};
    }
}
