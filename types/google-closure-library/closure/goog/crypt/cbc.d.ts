/// <reference path="../../../globals.d.ts"/>
/// <reference path="./blockcipher.d.ts"/>

declare module 'goog:goog.crypt.Cbc' {
    import alias = goog.crypt.Cbc;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * Implements the CBC mode for block ciphers. See
     * http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation
     * #Cipher-block_chaining_.28CBC.29
     *
     * @final
     * @struct
     */
    class Cbc extends __Cbc {}
    abstract class __Cbc {
        /**
         * @param {!goog.crypt.BlockCipher} cipher The block cipher to use.
         */
        constructor(cipher: goog.crypt.BlockCipher);

        /**
         * Block cipher.
         * @type {!goog.crypt.BlockCipher}
         * @private
         */
        private cipher_: goog.crypt.BlockCipher;

        /**
         * Encrypt a message.
         *
         * @param {!Array<number>|!Uint8Array} plainText Message to encrypt. An array of
         *     bytes. The length should be a multiple of the block size.
         * @param {!Array<number>|!Uint8Array} initialVector Initial vector for the CBC
         *     mode. An array of bytes with the same length as the block size.
         * @return {!Array<number>} Encrypted message.
         */
        encrypt(plainText: number[]|Uint8Array, initialVector: number[]|Uint8Array): number[];

        /**
         * Decrypt a message.
         *
         * @param {!Array<number>|!Uint8Array} cipherText Message to decrypt. An array
         *     of bytes. The length should be a multiple of the block size.
         * @param {!Array<number>|!Uint8Array} initialVector Initial vector for the CBC
         *     mode. An array of bytes with the same length as the block size.
         * @return {!Array<number>} Decrypted message.
         */
        decrypt(cipherText: number[]|Uint8Array, initialVector: number[]|Uint8Array): number[];
    }
}
