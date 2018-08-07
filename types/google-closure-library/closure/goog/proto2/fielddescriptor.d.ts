/// <reference path="../../../globals.d.ts"/>
/// <reference path="./message.d.ts"/>
/// <reference path="./descriptor.d.ts"/>

declare module 'goog:goog.proto2.FieldDescriptor' {
    import alias = goog.proto2.FieldDescriptor;
    export default alias;
}

declare namespace goog.proto2 {
    /**
     * A class which describes a field in a Protocol Buffer 2 Message.
     *
     * @final
     */
    class FieldDescriptor extends __FieldDescriptor {}
    abstract class __FieldDescriptor {
        /**
         * @param {function(new:goog.proto2.Message)} messageType Constructor for the
         *     message class to which the field described by this class belongs.
         * @param {number|string} tag The field's tag index.
         * @param {{
         *       name: string,
         *       fieldType: !goog.proto2.FieldDescriptor.FieldType,
         *       type: !Function,
         *       repeated: (*|undefined),
         *       required: (*|undefined),
         *       packed: (*|undefined),
         *       defaultValue: (*|undefined)
         *     }} metadata The metadata about this field
         *     that will be used to construct this descriptor.
         *
         */
        constructor(messageType: (this: goog.proto2.Message) => void, tag: number|string, metadata: {
            name: string; fieldType: goog.proto2.FieldDescriptor.FieldType; type: Function; repeated: any | undefined;
            required: any | undefined;
            packed: any | undefined;
            defaultValue: any | undefined
        });

        /**
         * The message type that contains the field that this
         * descriptor describes.
         * @private {function(new:goog.proto2.Message)}
         */
        private parent_: any /*missing*/;

        /**
         * The field's tag number.
         * @private {number}
         */
        private tag_: any /*missing*/;

        /**
         * The field's name.
         * @private {string}
         */
        private name_: any /*missing*/;

        /**
         * If true, this field is a packed field.
         * @private {boolean}
         */
        private isPacked_: any /*missing*/;

        /**
         * If true, this field is a repeating field.
         * @private {boolean}
         */
        private isRepeated_: any /*missing*/;

        /**
         * If true, this field is required.
         * @private {boolean}
         */
        private isRequired_: any /*missing*/;

        /**
         * The field type of this field.
         * @private {goog.proto2.FieldDescriptor.FieldType}
         */
        private fieldType_: any /*missing*/;

        /**
         * If this field is a primitive: The native (ECMAScript) type of this field.
         * If an enumeration: The enumeration object.
         * If a message or group field: The Message function.
         * @private {Function}
         */
        private nativeType_: any /*missing*/;

        /**
         * Is it permissible on deserialization to convert between numbers and
         * well-formed strings?  Is true for 64-bit integral field types and float and
         * double types, false for all other field types.
         * @private {boolean}
         */
        private deserializationConversionPermitted_: any /*missing*/;

        /**
         * The default value of this field, if different from the default, default
         * value.
         * @private {*}
         */
        private defaultValue_: any /*missing*/;

        /**
         * Returns the tag of the field that this descriptor represents.
         *
         * @return {number} The tag number.
         */
        getTag(): number;

        /**
         * Returns the descriptor describing the message that defined this field.
         * @return {!goog.proto2.Descriptor} The descriptor.
         */
        getContainingType(): goog.proto2.Descriptor;

        /**
         * Returns the name of the field that this descriptor represents.
         * @return {string} The name.
         */
        getName(): string;

        /**
         * Returns the default value of this field.
         * @return {*} The default value.
         */
        getDefaultValue(): any;

        /**
         * Returns the field type of the field described by this descriptor.
         * @return {goog.proto2.FieldDescriptor.FieldType} The field type.
         */
        getFieldType(): goog.proto2.FieldDescriptor.FieldType;

        /**
         * Returns the native (i.e. ECMAScript) type of the field described by this
         * descriptor.
         *
         * @return {Object} The native type.
         */
        getNativeType(): Object;

        /**
         * Returns true if simple conversions between numbers and strings are permitted
         * during deserialization for this field.
         *
         * @return {boolean} Whether conversion is permitted.
         */
        deserializationConversionPermitted(): boolean;

        /**
         * Returns the descriptor of the message type of this field. Only valid
         * for fields of type GROUP and MESSAGE.
         *
         * @return {!goog.proto2.Descriptor} The message descriptor.
         */
        getFieldMessageType(): goog.proto2.Descriptor;

        /**
         * @return {boolean} True if the field stores composite data or repeated
         *     composite data (message or group).
         */
        isCompositeType(): boolean;

        /**
         * Returns whether the field described by this descriptor is packed.
         * @return {boolean} Whether the field is packed.
         */
        isPacked(): boolean;

        /**
         * Returns whether the field described by this descriptor is repeating.
         * @return {boolean} Whether the field is repeated.
         */
        isRepeated(): boolean;

        /**
         * Returns whether the field described by this descriptor is required.
         * @return {boolean} Whether the field is required.
         */
        isRequired(): boolean;

        /**
         * Returns whether the field described by this descriptor is optional.
         * @return {boolean} Whether the field is optional.
         */
        isOptional(): boolean;
    }
}

declare namespace goog.proto2.FieldDescriptor {
    /**
     * An enumeration defining the possible field types.
     * Should be a mirror of that defined in descriptor.h.
     *
     * @enum {number}
     */
    enum FieldType {
        DOUBLE,
        FLOAT,
        INT64,
        UINT64,
        INT32,
        FIXED64,
        FIXED32,
        BOOL,
        STRING,
        GROUP,
        MESSAGE,
        BYTES,
        UINT32,
        ENUM,
        SFIXED32,
        SFIXED64,
        SINT32,
        SINT64
    }
}
