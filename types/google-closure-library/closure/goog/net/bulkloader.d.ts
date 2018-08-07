/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>
/// <reference path="./bulkloaderhelper.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../log/log.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="./xhrio.d.ts"/>

declare module 'goog:goog.net.BulkLoader' {
    import alias = goog.net.BulkLoader;
    export default alias;
}

declare namespace goog.net {
    /**
     * Class used to load multiple URIs.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class BulkLoader extends __BulkLoader {}
    abstract class __BulkLoader extends goog.events.__EventTarget {
        /**
         * @param {Array<string|goog.Uri>} uris The URIs to load.
         */
        constructor(uris: string|goog.Uri[]);

        /**
         * The bulk loader helper.
         * @type {goog.net.BulkLoaderHelper}
         * @private
         */
        private helper_: goog.net.BulkLoaderHelper;

        /**
         * The handler for managing events.
         * @type {goog.events.EventHandler<!goog.net.BulkLoader>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.net.BulkLoader>;

        /**
         * A logger.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Gets the response texts, in order.
         * @return {Array<string>} The response texts.
         */
        getResponseTexts(): string[];

        /**
         * Gets the request Uris.
         * @return {Array<string>} The request URIs, in order.
         */
        getRequestUris(): string[];

        /**
         * Starts the process of loading the URIs.
         */
        load(): void;

        /**
         * Handles all events fired by the XhrManager.
         * @param {number} id The id of the request.
         * @param {goog.events.Event} e The event.
         * @private
         */
        private handleEvent_(id: number, e: goog.events.Event): void;

        /**
         * Handles when a request is successful (i.e., completed and response received).
         * Stores thhe responseText and checks if loading is complete.
         * @param {number} id The id of the request.
         * @param {goog.net.XhrIo} xhrIo The XhrIo objects that was used.
         * @private
         */
        private handleSuccess_(id: number, xhrIo: goog.net.XhrIo): void;

        /**
         * Handles when a request has ended in error (i.e., all retries completed and
         * none were successful). Cancels loading of the URI's.
         * @param {number|string} id The id of the request.
         * @param {goog.net.XhrIo} xhrIo The XhrIo objects that was used.
         * @private
         */
        private handleError_(id: number|string, xhrIo: goog.net.XhrIo): void;

        /**
         * Finishes the load of the URI's. Dispatches the SUCCESS event.
         * @private
         */
        private finishLoad_(): void;
    }
}
