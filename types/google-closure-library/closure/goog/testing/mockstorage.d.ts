/// <reference path="../../../globals.d.ts"/>
/// <reference path="../structs/map.d.ts"/>

declare module 'goog:goog.testing.MockStorage' {
    import alias = goog.testing.MockStorage;
    export default alias;
}

declare namespace goog.testing {
    /**
     * A JS storage instance, implementing the HTML5 Storage interface.
     * See http://www.w3.org/TR/webstorage/ for details.
     *
     * @implements {Storage}
     * @final
     */
    class MockStorage extends __MockStorage {}
    abstract class __MockStorage {
        /**
         */
        constructor();

        /**
         * The underlying storage object.
         * @type {goog.structs.Map}
         * @private
         */
        private store_: goog.structs.Map<any, any>;

        /**
         * The number of elements in the storage.
         * @type {number}
         */
        length: number;
    }
}
