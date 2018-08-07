/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../disposable/disposable.d.ts"/>
/// <reference path="./namefetcher.d.ts"/>
/// <reference path="../../net/xhrio.d.ts"/>
/// <reference path="../../structs/map.d.ts"/>
/// <reference path="../../events/events.d.ts"/>

declare module 'goog:goog.i18n.uChar.RemoteNameFetcher' {
    import alias = goog.i18n.uChar.RemoteNameFetcher;
    export default alias;
}

declare namespace goog.i18n.uChar {
    /**
     * Builds the RemoteNameFetcher object. This object retrieves codepoint names
     * from a remote data source.
     *
     * @implements {goog.i18n.uChar.NameFetcher}
     * @extends {goog.Disposable}
     * @final
     */
    class RemoteNameFetcher extends __RemoteNameFetcher {}
    abstract class __RemoteNameFetcher extends goog.__Disposable implements goog.i18n.uChar.NameFetcher {
        /**
         * @param {string} dataSourceUri URI to the data source.
         */
        constructor(dataSourceUri: string);

        /**
         * XHRIo object for prefetch() asynchronous calls.
         *
         * @type {!goog.net.XhrIo}
         * @private
         */
        private prefetchXhrIo_: goog.net.XhrIo;

        /**
         * XHRIo object for getName() asynchronous calls.
         *
         * @type {!goog.net.XhrIo}
         * @private
         */
        private getNameXhrIo_: goog.net.XhrIo;

        /**
         * URI to the data.
         *
         * @type {string}
         * @private
         */
        private dataSourceUri_: string;

        /**
         * A cache of all the collected names from the server.
         *
         * @type {!goog.structs.Map}
         * @private
         */
        private charNames_: goog.structs.Map<any, any>;

        /**
         * Key to the listener on XHR for prefetch(). Used to clear previous listeners.
         *
         * @type {goog.events.Key}
         * @private
         */
        private prefetchLastListenerKey_: goog.events.Key;

        /**
         * Key to the listener on XHR for getName(). Used to clear previous listeners.
         *
         * @type {goog.events.Key}
         * @private
         */
        private getNameLastListenerKey_: goog.events.Key;

        /**
         * Callback on completion of the prefetch operation.
         *
         * @private
         */
        private prefetchCallback_(): void;

        /**
         * Callback on completion of the getName operation.
         *
         * @param {string} codepoint The codepoint in hexadecimal format.
         * @param {function(?string)} callback The callback function called when the
         *     name retrieval is complete, contains a single string parameter with the
         *     codepoint name, this parameter will be null if the character name is not
         *     defined.
         * @private
         */
        private getNameCallback_(codepoint: string, callback: (_0: string|null) => void): void;

        /**
         * Process the response received from the server and store results in the cache.
         *
         * @param {!goog.net.XhrIo} xhrIo The XhrIo object used to make the request.
         * @private
         */
        private processResponse_(xhrIo: goog.net.XhrIo): void;

        /**
         * Fetches a set of codepoint names from the data source.
         *
         * @param {!goog.i18n.uChar.RemoteNameFetcher.RequestType_} requestType The
         *     request type of the operation. This parameter specifies how the server is
         *     called to fetch a particular set of codepoints.
         * @param {string} requestInput The input to the request, this is the value that
         *     is passed onto the server to complete the request.
         * @param {!goog.net.XhrIo} xhrIo The XHRIo object to execute the server call.
         * @private
         */
        private fetch_(requestType: any, requestInput: string, xhrIo: goog.net.XhrIo): void;

        /**
         * Retrieves the names of a given set of characters and stores them in a cache
         * for fast retrieval. Offline implementations can simply provide an empty
         * implementation.
         *
         * @param {string} characters The list of characters in base 88 to fetch. These
         *     lists are stored by category and subcategory in the
         *     goog.i18n.charpickerdata class.
         */
        prefetch(characters: string): void;

        /**
         * Retrieves the name of a particular character.
         *
         * @param {string} character The character to retrieve.
         * @param {function(?string)} callback The callback function called when the
         *     name retrieval is complete, contains a single string parameter with the
         *     codepoint name, this parameter will be null if the character name is not
         *     defined.
         */
        getName(character: string, callback: (_0: string|null) => void): void;

        /**
         * Tests whether the name of a given character is available to be retrieved by
         * the getName() function.
         *
         * @param {string} character The character to test.
         * @return {boolean} True if the fetcher can retrieve or has a name available
         *     for the given character.
         */
        isNameAvailable(character: string): boolean;
    }
}

declare namespace goog.i18n.uChar.RemoteNameFetcher {
}
