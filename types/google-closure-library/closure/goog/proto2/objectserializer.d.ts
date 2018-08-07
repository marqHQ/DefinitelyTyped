/// <reference path="../../../globals.d.ts"/>
/// <reference path="./serializer.d.ts"/>

declare module 'goog:goog.proto2.ObjectSerializer' {
    import alias = goog.proto2.ObjectSerializer;
    export default alias;
}

declare namespace goog.proto2 {
    /**
     * ObjectSerializer, a serializer which turns Messages into simplified
     * ECMAScript objects.
     *
     * @extends {goog.proto2.Serializer}
     */
    class ObjectSerializer extends __ObjectSerializer {}
    abstract class __ObjectSerializer extends goog.proto2.__Serializer {
        /**
         * @param {goog.proto2.ObjectSerializer.KeyOption=} opt_keyOption If specified,
         *     which key option to use when serializing/deserializing.
         * @param {boolean=} opt_serializeBooleanAsNumber If specified and true, the
         *     serializer will convert boolean values to 0/1 representation.
         */
        constructor(opt_keyOption?: goog.proto2.ObjectSerializer.KeyOption, opt_serializeBooleanAsNumber?: boolean);
    }
}

declare namespace goog.proto2.ObjectSerializer {
    /**
     * An enumeration of the options for how to emit the keys in
     * the generated simplified object.
     *
     * For serialization, the option specifies the keys to use in the serialized
     * object.
     *
     * For deserialization, the option specifies which keys are allowed; an object
     * serialized by TAG may be deserialized by TAG or by NAME or by
     * CAMEL_CASE_NAME, but an object serialized by NAME cannot be deserialized by
     * TAG.  An object serialized with any option can be deserialized by
     * CAMEL_CASE_NAME.
     *
     * @enum {number}
     */
    enum KeyOption { TAG, NAME, CAMEL_CASE_NAME }
}
