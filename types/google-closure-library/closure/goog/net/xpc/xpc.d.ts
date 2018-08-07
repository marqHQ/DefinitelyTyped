/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../log/log.d.ts"/>

declare module 'goog:goog.net.xpc' {
    export = goog.net.xpc;
}

declare module 'goog:goog.net.xpc.UriCfgFields' {
    import alias = goog.net.xpc.UriCfgFields;
    export default alias;
}

declare module 'goog:goog.net.xpc.TransportTypes' {
    import alias = goog.net.xpc.TransportTypes;
    export default alias;
}

declare module 'goog:goog.net.xpc.TransportNames' {
    import alias = goog.net.xpc.TransportNames;
    export default alias;
}

declare module 'goog:goog.net.xpc.ChannelStates' {
    import alias = goog.net.xpc.ChannelStates;
    export default alias;
}

declare module 'goog:goog.net.xpc.CfgFields' {
    import alias = goog.net.xpc.CfgFields;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * Enum used to identify transport types.
     * @enum {number}
     */
    enum TransportTypes { NATIVE_MESSAGING, FRAME_ELEMENT_METHOD, IFRAME_RELAY, IFRAME_POLLING, FLASH, NIX, DIRECT }

    /**
     * Enum containing transport names. These need to correspond to the
     * transport class names for createTransport_() to work.
     * @const {!Object<string,string>}
     */
    const TransportNames: any /*missing*/;

    /**
     * Field names used on configuration object.
     * @const
     */
    const CfgFields: any /*missing*/;

    /**
     * Config properties that need to be URL sanitized.
     * @type {Array<string>}
     */
    let UriCfgFields: string[];

    /**
     * @enum {number}
     */
    enum ChannelStates { NOT_CONNECTED, CONNECTED, CLOSED }

    /**
     * The name of the transport service (used for internal signalling).
     * @type {string}
     * @suppress {underscore|visibility}
     */
    let TRANSPORT_SERVICE_: string;

    /**
     * Transport signaling message: setup.
     * @type {string}
     */
    let SETUP: string;

    /**
     * Transport signaling message: setup for native transport protocol v2.
     * @type {string}
     */
    let SETUP_NTPV2: string;

    /**
     * Transport signaling message: setup acknowledgement.
     * @type {string}
     * @suppress {underscore|visibility}
     */
    let SETUP_ACK_: string;

    /**
     * Transport signaling message: setup acknowledgement.
     * @type {string}
     */
    let SETUP_ACK_NTPV2: string;

    /**
     * Object holding active channels.
     *
     * @package {Object<string, goog.net.xpc.CrossPageChannel>}
     */
    let channels: any /*missing*/;

    /**
     * Returns a random string.
     * @param {number} length How many characters the string shall contain.
     * @param {string=} opt_characters The characters used.
     * @return {string} The random string.
     */
    function getRandomString(length: number, opt_characters?: string): string;

    /**
     * The logger.
     * @type {goog.log.Logger}
     */
    let logger: goog.log.Logger;
}
