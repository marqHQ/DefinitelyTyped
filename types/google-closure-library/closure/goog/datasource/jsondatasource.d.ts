/// <reference path="../../../globals.d.ts"/>
/// <reference path="./jsdatasource.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>

declare module 'goog:goog.ds.JsonDataSource' {
    import alias = goog.ds.JsonDataSource;
    export default alias;
}

declare namespace goog.ds {
    /**
     * Data source whose backing is a JSON-like service, in which
     * retreiving the resource specified by URL with the additional parameter
     * callback. The resource retreived is executable JavaScript that
     * makes a call to the named function with a JavaScript object literal
     * as the only parameter.
     *
     * Example URI could be:
     * http://www.google.com/data/search?q=monkey&callback=mycb
     * which might return the JS:
     * mycb({searchresults:
     *   [{uri: 'http://www.monkey.com', title: 'Site About Monkeys'}]});
     *
     * TODO(user): Evaluate using goog.net.Jsonp here.
     *
     * A URI of an empty string will mean that no request is made
     * and the data source will be a data source with no child nodes
     *
     * @extends {goog.ds.JsDataSource}
     * @final
     */
    class JsonDataSource extends __JsonDataSource {}
    abstract class __JsonDataSource extends goog.ds.__JsDataSource {
        /**
         * @param {string|goog.Uri} uri URI for the request.
         * @param {string} name Name of the datasource.
         * @param {string=} opt_callbackParamName The parameter name that is used to
         *     specify the callback. Defaults to 'callback'.
         *
         */
        constructor(uri: string|goog.Uri, name: string, opt_callbackParamName?: string);

        /**
         * This is the callback parameter name that is added to the uri.
         * @type {string}
         * @private
         */
        private callbackParamName_: string;

        /**
         * Default load state is NOT_LOADED
         * @private
         */
        private loadState_: any /*missing*/;

        /**
         * Receives data from a Json request
         * @param {Object} obj The JSON data.
         */
        receiveData(obj: Object): void;
    }
}
