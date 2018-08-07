/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./iterablemechanism.d.ts"/>

declare module 'goog:goog.storage.mechanism.IEUserData' {
    import alias = goog.storage.mechanism.IEUserData;
    export default alias;
}

declare namespace goog.storage.mechanism {
    /**
     * Provides a storage mechanism using IE userData.
     *
     * @extends {goog.storage.mechanism.IterableMechanism}
     * @final
     */
    class IEUserData extends __IEUserData {}
    abstract class __IEUserData extends goog.storage.mechanism.__IterableMechanism {
        /**
         * @param {string} storageKey The key (store name) to store the data under.
         * @param {string=} opt_storageNodeId The ID of the associated HTML element,
         *     one will be created if not provided.
         */
        constructor(storageKey: string, opt_storageNodeId?: string);

        /**
         * The key to store the data under.
         *
         * @private {string}
         */
        private storageKey_: any /*missing*/;

        /**
         * The document element used for storing data.
         *
         * @private {Element}
         */
        private storageNode_: any /*missing*/;

        /**
         * Determines whether or not the mechanism is available.
         *
         * @return {boolean} True if the mechanism is available.
         */
        isAvailable(): boolean;

        /**
         * Loads the underlying storage node to the state we saved it to before.
         *
         * @private
         */
        private loadNode_(): void;

        /**
         * Saves the underlying storage node.
         *
         * @private
         */
        private saveNode_(): void;

        /**
         * Returns the storage node.
         *
         * @return {!Element} Storage DOM Element.
         * @private
         */
        private getNode_(): Element;
    }
}

declare namespace goog.storage.mechanism.IEUserData {
    /**
     * Encoding map for characters which are not encoded by encodeURIComponent().
     * See encodeKey_ documentation for encoding details.
     *
     * @type {!Object}
     * @const
     */
    const ENCODE_MAP: Object;
}
