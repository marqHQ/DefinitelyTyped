/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./webchannel.d.ts"/>

declare module 'goog:goog.net.WebChannelTransport' {
    import alias = goog.net.WebChannelTransport;
    export default alias;
}

declare namespace goog.net {
    interface WebChannelTransport {
        /**
         * Create a new WebChannel instance.
         *
         * The new WebChannel is to be opened against the server-side resource
         * as specified by the given URL. See {@link goog.net.WebChannel} for detailed
         * semantics.
         *
         * @param {string} url The URL path for the new WebChannel instance.
         * @param {!goog.net.WebChannel.Options=} opt_options Configuration for the
         *     new WebChannel instance. The configuration object is reusable after
         *     the new channel instance is created.
         * @return {!goog.net.WebChannel} the newly created WebChannel instance.
         */
        createWebChannel(url: string, opt_options?: goog.net.WebChannel.Options): goog.net.WebChannel;
    }
}

declare namespace goog.net.WebChannelTransport {
    /**
     * The client version. This integer value will be passed to the server
     * when a channel is opened to inform the server the client "capabilities".
     *
     * Wire protocol version is a different concept and is internal to the
     * transport implementation.
     *
     * @const
     * @type {number}
     */
    const CLIENT_VERSION: number;
}
