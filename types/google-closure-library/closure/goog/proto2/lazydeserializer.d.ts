/// <reference path="../../../globals.d.ts"/>
/// <reference path="./serializer.d.ts"/>
/// <reference path="./message.d.ts"/>
/// <reference path="./fielddescriptor.d.ts"/>

declare module 'goog:goog.proto2.LazyDeserializer' {
    import alias = goog.proto2.LazyDeserializer;
    export default alias;
}

declare namespace goog.proto2 {
    /**
     * Base class for all lazy deserializers.
     *
     * @extends {goog.proto2.Serializer}
     */
    class LazyDeserializer extends __LazyDeserializer {}
    abstract class __LazyDeserializer extends goog.proto2.__Serializer {
        /**
         */
        constructor();

        /**
         * Deserializes a message field from the expected format and places the
         * data in the given message
         *
         * @param {goog.proto2.Message} message The message in which to
         *     place the information.
         * @param {goog.proto2.FieldDescriptor} field The field for which to set the
         *     message value.
         * @param {*} data The serialized data for the field.
         *
         * @return {*} The deserialized data or null for no value found.
         */
        deserializeField(message: goog.proto2.Message, field: goog.proto2.FieldDescriptor, data: any): any;
    }
}
