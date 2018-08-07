/// <reference path="../../../globals.d.ts"/>
/// <reference path="../json/json.d.ts"/>

declare module 'goog:goog.proto.Serializer' {
    import alias = goog.proto.Serializer;
    export default alias;
}

declare namespace goog.proto {
    /**
     * Object that can serialize objects or values to a protocol buffer string.
     * @extends {goog.json.Serializer}
     * @final
     */
    class Serializer extends __Serializer {}
    abstract class __Serializer extends goog.json.__Serializer {
        /**
         */
        constructor();
    }
}
