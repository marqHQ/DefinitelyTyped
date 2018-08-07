/// <reference path="../../../globals.d.ts"/>
/// <reference path="./lazydeserializer.d.ts"/>

declare module 'goog:goog.proto2.PbLiteSerializer' {
    import alias = goog.proto2.PbLiteSerializer;
    export default alias;
}

declare namespace goog.proto2 {
    /**
     * PB-Lite serializer.
     *
     * @extends {goog.proto2.LazyDeserializer}
     */
    class PbLiteSerializer extends __PbLiteSerializer {}
    abstract class __PbLiteSerializer extends goog.proto2.__LazyDeserializer {
        /**
         */
        constructor();

        /**
         * If true, fields will be serialized with 0-indexed tags (i.e., the proto
         * field with tag id 1 will have index 0 in the array).
         * @type {boolean}
         * @private
         */
        private zeroIndexing_: boolean;

        /**
         * By default, the proto tag with id 1 will have index 1 in the serialized
         * array.
         *
         * If the serializer is set to use zero-indexing, the tag with id 1 will have
         * index 0.
         *
         * @param {boolean} zeroIndexing Whether this serializer should deal with
         *     0-indexed protos.
         */
        setZeroIndexed(zeroIndexing: boolean): void;
    }
}
