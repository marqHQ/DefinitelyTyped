/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../storage/mechanism/iterablemechanism.d.ts"/>
/// <reference path="../../structs/map.d.ts"/>

declare module 'goog:goog.testing.storage.FakeMechanism' {
    import alias = goog.testing.storage.FakeMechanism;
    export default alias;
}

declare namespace goog.testing.storage {
    /**
     * Creates a fake iterable mechanism.
     *
     * @extends {goog.storage.mechanism.IterableMechanism}
     * @final
     */
    class FakeMechanism extends __FakeMechanism {}
    abstract class __FakeMechanism extends goog.storage.mechanism.__IterableMechanism {
        /**
         */
        constructor();

        /**
         * @type {goog.structs.Map}
         * @private
         */
        private storage_: goog.structs.Map<any, any>;
    }
}
