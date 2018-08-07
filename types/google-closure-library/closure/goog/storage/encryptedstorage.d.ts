/// <reference path="../../../globals.d.ts"/>
/// <reference path="./collectablestorage.d.ts"/>
/// <reference path="./mechanism/iterablemechanism.d.ts"/>

declare module 'goog:goog.storage.EncryptedStorage' {
    import alias = goog.storage.EncryptedStorage;
    export default alias;
}

declare namespace goog.storage {
    /**
     * Provides an encrypted storage. The keys are hashed with a secret, so
     * their existence cannot be verified without the knowledge of the secret.
     * The values are encrypted using the key, a salt, and the secret, so
     * stream cipher initialization varies for each stored value.
     *
     * @struct
     * @extends {goog.storage.CollectableStorage}
     * @final
     */
    class EncryptedStorage extends __EncryptedStorage {}
    abstract class __EncryptedStorage extends goog.storage.__CollectableStorage {
        /**
         * @param {!goog.storage.mechanism.IterableMechanism} mechanism The underlying
         *     storage mechanism.
         * @param {string} secret The secret key used to encrypt the storage.
         */
        constructor(mechanism: goog.storage.mechanism.IterableMechanism, secret: string);

        /**
         * The secret used to encrypt the storage.
         *
         * @private {!Array<number>}
         */
        private secret_: any /*missing*/;

        /**
         * The JSON serializer used to serialize values before encryption. This can
         * be potentially different from serializing for the storage mechanism (see
         * goog.storage.Storage), so a separate serializer is kept here.
         *
         * @private {!goog.json.Serializer}
         */
        private cleartextSerializer_: any /*missing*/;

        /**
         * Hashes a key using the secret.
         *
         * @param {string} key The key.
         * @return {string} The hash.
         * @private
         */
        private hashKeyWithSecret_(key: string): string;

        /**
         * Encrypts a value using a key, a salt, and the secret.
         *
         * @param {!Array<number>} salt The salt.
         * @param {string} key The key.
         * @param {string} value The cleartext value.
         * @return {string} The encrypted value.
         * @private
         */
        private encryptValue_(salt: number[], key: string, value: string): string;

        /**
         * Decrypts a value using a key, a salt, and the secret.
         *
         * @param {!Array<number>} salt The salt.
         * @param {string} key The key.
         * @param {string} value The encrypted value.
         * @return {string} The decrypted value.
         * @private
         */
        private decryptValue_(salt: number[], key: string, value: string): string;
    }
}

declare namespace goog.storage.EncryptedStorage {
}
