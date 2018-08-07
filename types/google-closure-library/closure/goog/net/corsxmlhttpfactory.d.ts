/// <reference path="../../../globals.d.ts"/>
/// <reference path="./xmlhttpfactory.d.ts"/>
/// <reference path="./xhrlike.d.ts"/>

declare module 'goog:goog.net.IeCorsXhrAdapter' {
    import alias = goog.net.IeCorsXhrAdapter;
    export default alias;
}

declare module 'goog:goog.net.CorsXmlHttpFactory' {
    import alias = goog.net.CorsXmlHttpFactory;
    export default alias;
}

declare namespace goog.net {
    /**
     * A factory of XML http request objects that supports cross domain requests.
     * This class should be instantiated and passed as the parameter of a
     * goog.net.XhrIo constructor to allow cross-domain requests in every browser.
     *
     * @extends {goog.net.XmlHttpFactory}
     * @final
     */
    class CorsXmlHttpFactory extends __CorsXmlHttpFactory {}
    abstract class __CorsXmlHttpFactory extends goog.net.__XmlHttpFactory {
        /**
         */
        constructor();
    }

    /**
     * An adapter around Internet Explorer's XDomainRequest object that makes it
     * look like a standard XMLHttpRequest. This can be used instead of
     * XMLHttpRequest to support CORS.
     *
     * @implements {goog.net.XhrLike}
     * @struct
     * @final
     */
    class IeCorsXhrAdapter extends __IeCorsXhrAdapter {}
    abstract class __IeCorsXhrAdapter implements goog.net.XhrLike {
        /**
         */
        constructor();

        /**
         * The underlying XDomainRequest used to make the HTTP request.
         * @type {!XDomainRequest}
         * @private
         */
        private xdr_: any;

        /**
         * Handles a request that has fully loaded successfully.
         * @private
         */
        private handleLoad_(): void;

        /**
         * Handles a request that has failed to load.
         * @private
         */
        private handleError_(): void;

        /**
         * Handles a request that timed out.
         * @private
         */
        private handleTimeout_(): void;

        /**
         * Handles a request that is in the process of loading.
         * @private
         */
        private handleProgress_(): void;

        /**
         * Sets this XHR's ready state and fires the onreadystatechange listener (if one
         * is set).
         * @param {number} readyState The new ready state.
         * @private
         */
        private setReadyState_(readyState: number): void;

        /**
         * @type {function()|null|undefined}
         * @see http://www.w3.org/TR/XMLHttpRequest/#handler-xhr-onreadystatechange
         */
        onreadystatechange: (() => void)|null|undefined;

        /**
         * @type {string}
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsetext-attribute
         */
        responseText: string;

        /**
         * @type {Document}
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsexml-attribute
         */
        responseXML: Document;

        /**
         * @type {number}
         * @see http://www.w3.org/TR/XMLHttpRequest/#readystate
         */
        readyState: number;

        /**
         * @type {number}
         * @see http://www.w3.org/TR/XMLHttpRequest/#status
         */
        status: number;

        /**
         * @type {string}
         * @see http://www.w3.org/TR/XMLHttpRequest/#statustext
         */
        statusText: string;

        /**
         * @param {string} method
         * @param {string} url
         * @param {?boolean=} opt_async
         * @param {?string=} opt_user
         * @param {?string=} opt_password
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-open()-method
         */
        open(method: string, url: string, opt_async?: boolean|null, opt_user?: string|null, opt_password?: string|null):
            void;

        /**
         * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=} opt_data
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-send()-method
         */
        send(opt_data?: ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string): void;

        /**
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-abort()-method
         */
        abort(): void;

        /**
         * @param {string} header
         * @param {string} value
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
         */
        setRequestHeader(header: string, value: string): void;

        /**
         * @param {string} header
         * @return {string}
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
         */
        getResponseHeader(header: string): string;

        /**
         * @return {string}
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
         */
        getAllResponseHeaders(): string;
    }
}
