/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.proto' {
    export = goog.proto;
}

declare namespace goog.proto {
    /**
     * Serializes an object or a value to a protocol buffer string.
     * @param {Object} object The object to serialize.
     * @return {string} The serialized protocol buffer string.
     */
    function serialize(object: Object): string;
}
