/// <reference path="../../../globals.d.ts"/>
/// <reference path="./fastdatanode.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ds.JsXmlHttpDataSource' {
    import alias = goog.ds.JsXmlHttpDataSource;
    export default alias;
}

declare namespace goog.ds {
    /**
     * Similar to JsonDataSource, with using XMLHttpRequest for transport
     * Currently requires the result be a valid JSON.
     *
     * @extends {goog.ds.FastDataNode}
     * @final
     */
    class JsXmlHttpDataSource extends __JsXmlHttpDataSource {}
    abstract class __JsXmlHttpDataSource extends goog.ds.__FastDataNode {
        /**
         * @param {(string|goog.Uri)} uri URI for the request.
         * @param {string} name Name of the datasource.
         * @param {string=} opt_startText Text to expect/strip before JS response.
         * @param {string=} opt_endText Text to expect/strip after JS response.
         * @param {boolean=} opt_usePost If true, use POST. Defaults to false (GET).
         *
         */
        constructor(
            uri: string|goog.Uri, name: string, opt_startText?: string, opt_endText?: string, opt_usePost?: boolean
        );

        /**
         * Delimiter for start of JSON data in response.
         * null = starts at first character of response
         * @type {string|undefined}
         * @private
         */
        private startText_: string|undefined;

        /**
         * Delimiter for end of JSON data in response.
         * null = ends at last character of response
         * @type {string|undefined}
         * @private
         */
        private endText_: string|undefined;

        /**
         * Sets the request data. This can be used if it is required to
         * send a specific body rather than build the body from the query
         * parameters. Only used in POST requests.
         * @param {string} data The data to send in the request body.
         */
        setQueryData(data: string): void;

        /**
         * Called on successful request.
         * @private
         */
        private success_(): void;

        /**
         * Completed callback. Loads data if successful, otherwise sets
         * state to FAILED
         * @param {goog.events.Event} e Event object, Xhr is target.
         * @private
         */
        private completed_(e: goog.events.Event): void;
    }
}
