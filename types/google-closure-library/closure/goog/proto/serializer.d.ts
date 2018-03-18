/// <reference path="../../../globals.d.ts"/>
/// <reference path="../json/json.d.ts"/>

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
