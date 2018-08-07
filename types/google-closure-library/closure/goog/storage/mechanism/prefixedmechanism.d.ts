/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./iterablemechanism.d.ts"/>

declare module 'goog:goog.storage.mechanism.PrefixedMechanism' {
    import alias = goog.storage.mechanism.PrefixedMechanism;
    export default alias;
}

declare namespace goog.storage.mechanism {
    /**
     * Wraps an iterable storage mechanism and creates artificial namespaces.
     *
     * @struct
     * @extends {goog.storage.mechanism.IterableMechanism}
     * @final
     */
    class PrefixedMechanism extends __PrefixedMechanism {}
    abstract class __PrefixedMechanism extends goog.storage.mechanism.__IterableMechanism {
        /**
         * @param {!goog.storage.mechanism.IterableMechanism} mechanism Underlying
         *     iterable storage mechanism.
         * @param {string} prefix Prefix for creating an artificial namespace.
         */
        constructor(mechanism: goog.storage.mechanism.IterableMechanism, prefix: string);

        /**
         * The mechanism to be prefixed.
         *
         * @private {goog.storage.mechanism.IterableMechanism}
         */
        private mechanism_: any /*missing*/;

        /**
         * The prefix for creating artificial namespaces.
         *
         * @private {string}
         */
        private prefix_: any /*missing*/;
    }
}
