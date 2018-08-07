/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.net.xpc.CrossPageChannelRole' {
    import alias = goog.net.xpc.CrossPageChannelRole;
    export default alias;
}

declare namespace goog.net.xpc {
    /**
     * The role of the peer.
     * @enum {number}
     */
    enum CrossPageChannelRole { OUTER, INNER }
}
