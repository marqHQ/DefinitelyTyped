/// <reference path="../../../globals.d.ts"/>
/// <reference path="./storage.d.ts"/>
/// <reference path="./mechanism/mechanism.d.ts"/>

declare module 'goog:goog.storage.RichStorage' {
    import alias = goog.storage.RichStorage;
    export default alias;
}

declare module 'goog:goog.storage.RichStorage.Wrapper' {
    import alias = goog.storage.RichStorage.Wrapper;
    export default alias;
}

declare namespace goog.storage {
    /**
     * Provides a storage for data with attached metadata.
     *
     * @struct
     * @extends {goog.storage.Storage}
     */
    class RichStorage extends __RichStorage {}
    abstract class __RichStorage extends goog.storage.__Storage {
        /**
         * @param {!goog.storage.mechanism.Mechanism} mechanism The underlying
         *     storage mechanism.
         */
        constructor(mechanism: goog.storage.mechanism.Mechanism);

        /**
         * Get an item wrapper (the item and its metadata) from the storage.
         *
         * WARNING: This returns an Object, which once used to be
         * goog.storage.RichStorage.Wrapper. This is due to the fact
         * that deserialized objects lose type information and it
         * is hard to do proper typecasting in JavaScript. Be sure
         * you know what you are doing when using the returned value.
         *
         * @param {string} key The key to get.
         * @return {(!Object|undefined)} The wrapper, or undefined if not found.
         */
        getWrapper(key: string): Object|undefined;
    }
}

declare namespace goog.storage.RichStorage {
    /**
     * Wraps a value so metadata can be associated with it. You probably want
     * to use goog.storage.RichStorage.Wrapper.wrapIfNecessary to avoid multiple
     * embeddings.
     *
     * @final
     */
    class Wrapper extends __Wrapper {}
    abstract class __Wrapper {
        /**
         * @param {*} value The value to wrap.
         */
        constructor(value: any);
    }
}

declare namespace goog.storage.RichStorage.Wrapper {
    /**
     * Convenience method for wrapping a value so metadata can be associated with
     * it. No-op if the value is already wrapped or is undefined.
     *
     * @param {*} value The value to wrap.
     * @return {(!goog.storage.RichStorage.Wrapper|undefined)} The wrapper.
     */
    function wrapIfNecessary(value: any): goog.storage.RichStorage.Wrapper|undefined;

    /**
     * Unwraps a value, any metadata is discarded (not returned). You might want to
     * use goog.storage.RichStorage.Wrapper.unwrapIfPossible to handle cases where
     * the wrapper is missing.
     *
     * @param {!Object} wrapper The wrapper.
     * @return {*} The wrapped value.
     */
    function unwrap(wrapper: Object): any;

    /**
     * Convenience method for unwrapping a value. Returns undefined if the
     * wrapper is missing.
     *
     * @param {(!Object|undefined)} wrapper The wrapper.
     * @return {*} The wrapped value or undefined.
     */
    function unwrapIfPossible(wrapper: Object|undefined): any;
}
