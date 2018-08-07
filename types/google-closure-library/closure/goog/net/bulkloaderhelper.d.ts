/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>

declare module 'goog:goog.net.BulkLoaderHelper' {
    import alias = goog.net.BulkLoaderHelper;
    export default alias;
}

declare namespace goog.net {
    /**
     * Helper class used to load multiple URIs.
     * @extends {goog.Disposable}
     * @final
     */
    class BulkLoaderHelper extends __BulkLoaderHelper {}
    abstract class __BulkLoaderHelper extends goog.__Disposable {
        /**
         * @param {Array<string|goog.Uri>} uris The URIs to load.
         */
        constructor(uris: string|goog.Uri[]);

        /**
         * The URIs to load.
         * @type {Array<string|goog.Uri>}
         * @private
         */
        private uris_: string|goog.Uri[];

        /**
         * The response from the XHR's.
         * @type {Array<string>}
         * @private
         */
        private responseTexts_: string[];

        /**
         * Gets the URI by id.
         * @param {number} id The id.
         * @return {string|goog.Uri} The URI specified by the id.
         */
        getUri(id: number): string|goog.Uri;

        /**
         * Gets the URIs.
         * @return {Array<string|goog.Uri>} The URIs.
         */
        getUris(): string|goog.Uri[];

        /**
         * Gets the response texts.
         * @return {Array<string>} The response texts.
         */
        getResponseTexts(): string[];

        /**
         * Sets the response text by id.
         * @param {number} id The id.
         * @param {string} responseText The response texts.
         */
        setResponseText(id: number, responseText: string): void;

        /**
         * Determines if the load of the URIs is complete.
         * @return {boolean} TRUE iff the load is complete.
         */
        isLoadComplete(): boolean;
    }
}
