/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.net.HttpStatusName' {
    import alias = goog.net.HttpStatusName;
    export default alias;
}

declare namespace goog.net {
    /**
     * HTTP Status Code Names defined in RFC 2616 and RFC 6585.
     * @see http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
     * @see http://tools.ietf.org/html/rfc6585
     * @type {!Object<number, string>}
     */
    let HttpStatusName: {[key: number]: string};
}
