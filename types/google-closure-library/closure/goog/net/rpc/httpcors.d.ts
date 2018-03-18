import '../../../../globals';
import '../../uri/uri';

declare namespace exports {
    /**
     * The default URL parameter name to overwrite http headers with a URL param
     * to avoid CORS preflight.
     *
     * See https://github.com/whatwg/fetch/issues/210#issue-129531743 for the spec.
     *
     * @type {string}
     */
    let HTTP_HEADERS_PARAM_NAME: string;

    /**
     * The default URL parameter name to overwrite http method with a URL param
     * to avoid CORS preflight.
     *
     * See https://github.com/whatwg/fetch/issues/210#issue-129531743 for the spec.
     *
     * @type {string}
     */
    let HTTP_METHOD_PARAM_NAME: string;

    /**
     * Generates the URL parameter value with custom headers encoded as
     * HTTP/1.1 headers block.
     *
     * @param {!Object<string, string>} headers The custom headers.
     * @return {string} The URL param to overwrite custom HTTP headers.
     */
    function generateHttpHeadersOverwriteParam(headers: {[key: string]: string}): string;

    /**
     * Generates the URL-encoded URL parameter value with custom headers encoded as
     * HTTP/1.1 headers block.
     *
     * @param {!Object<string, string>} headers The custom headers.
     * @return {string} The URL param to overwrite custom HTTP headers.
     */
    function generateEncodedHttpHeadersOverwriteParam(headers: {[key: string]: string}): string;

    /**
     * Sets custom HTTP headers via an overwrite URL param.
     *
     * @param {!GoogUri|string} url The URI object or a string path.
     * @param {string} urlParam The URL param name.
     * @param {!Object<string, string>} extraHeaders The HTTP headers.
     * @return {!GoogUri|string} The URI object or a string path with headers
     * encoded as a url param.
     */
    function setHttpHeadersWithOverwriteParam(
        url: goog.Uri|string, urlParam: string, extraHeaders: {[key: string]: string}
    ): goog.Uri|string;
}
