/// <reference path="../../../globals.d.ts"/>
/// <reference path="./blockcipher.d.ts"/>

declare module 'goog:goog.crypt.Aes' {
    import alias = goog.crypt.Aes;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * Implementation of AES in JavaScript.
     * See http://en.wikipedia.org/wiki/Advanced_Encryption_Standard
     *
     * WARNING: This is ECB mode only. If you are encrypting something
     * longer than 16 bytes, or encrypting more than one value with the same key
     * (so basically, always) you need to use this with a block cipher mode of
     * operation.  See goog.crypt.Cbc.
     *
     * See http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation for more
     * information.
     *
     * @implements {goog.crypt.BlockCipher}
     * @final
     * @struct
     */
    class Aes extends __Aes {}
    abstract class __Aes implements goog.crypt.BlockCipher {
        /**
         * @param {!Array<number>} key The key as an array of integers in {0, 255}.
         *     The key must have lengths of 16, 24, or 32 integers for 128-,
         *     192-, or 256-bit encryption, respectively.
         */
        constructor(key: number[]);

        /**
         * The AES key.
         * @type {!Array<number>}
         * @private
         */
        private key_: number[];

        /**
         * Key length, in words.
         * @type {number}
         * @private
         */
        private keyLengthInWords_: number;

        /**
         * Number of rounds.  Based on key length per AES spec.
         * @type {number}
         * @private
         */
        private numberOfRounds_: number;

        /**
         * 4x4 byte array containing the current state.
         * @type {!Array<!Array<number>>}
         * @private
         */
        private state_: number[][];

        /**
         * Scratch temporary array for calculation.
         * @type {!Array<!Array<number>>}
         * @private
         */
        private temp_: number[][];

        /**
         * The key schedule.
         * @type {!Array<!Array<number>>}
         * @private
         */
        private keySchedule_: number[][];

        /**
         * Tests can populate this with a callback, and that callback will get called
         * at the start of each round *in both functions encrypt() and decrypt()*.
         * @param {number} roundNum Round number.
         * @param {!Array<Array<number>>} Current state.
         * @private
         */
        private testStartRound_(roundNum: number, Current: number[][]): void;

        /**
         * Tests can populate this with a callback, and that callback will get called
         * each round right after the SubBytes step gets executed *in both functions
         * encrypt() and decrypt()*.
         * @param {number} roundNum Round number.
         * @param {!Array<Array<number>>} Current state.
         * @private
         */
        private testAfterSubBytes_(roundNum: number, Current: number[][]): void;

        /**
         * Tests can populate this with a callback, and that callback will get called
         * each round right after the ShiftRows step gets executed *in both functions
         * encrypt() and decrypt()*.
         * @param {number} roundNum Round number.
         * @param {!Array<Array<number>>} Current state.
         * @private
         */
        private testAfterShiftRows_(roundNum: number, Current: number[][]): void;

        /**
         * Tests can populate this with a callback, and that callback will get called
         * each round right after the MixColumns step gets executed *but only in the
         * decrypt() function*.
         * @param {number} roundNum Round number.
         * @param {!Array<Array<number>>} Current state.
         * @private
         */
        private testAfterMixColumns_(roundNum: number, Current: number[][]): void;

        /**
         * Tests can populate this with a callback, and that callback will get called
         * each round right after the AddRoundKey step gets executed  encrypt().
         * @param {number} roundNum Round number.
         * @param {!Array<Array<number>>} Current state.
         * @private
         */
        private testAfterAddRoundKey_(roundNum: number, Current: number[][]): void;

        /**
         * Tests can populate this with a callback, and that callback will get called
         * before each round on the round key.  *Gets called in both the encrypt() and
         * decrypt() functions.*
         * @param {number} roundNum Round number.
         * @param {Array<!Array<number>>} Computed key schedule.
         * @param {number} index The index into the key schedule to test. This is not
         *     necessarily roundNum because the key schedule is used in reverse
         *     in the case of decryption.
         * @private
         */
        private testKeySchedule_(roundNum: number, Computed: number[][], index: number): void;

        /**
         * Helper to copy input into the AES state matrix.
         * @param {!Array<number>|!Uint8Array} input Byte array to copy into the state
         *     matrix.
         * @private
         */
        private copyInput_(input: number[]|Uint8Array): void;

        /**
         * Helper to copy the state matrix into an output array.
         * @return {!Array<number>} Output byte array.
         * @private
         */
        private generateOutput_(): number[];

        /**
         * AES's AddRoundKey procedure. Add the current round key to the state.
         * @param {number} round The current round.
         * @private
         */
        private addRoundKey_(round: number): void;

        /**
         * AES's SubBytes procedure. Substitute bytes from the precomputed SBox lookup
         * into the state.
         * @param {!Array<number>} box The SBox or invSBox.
         * @private
         */
        private subBytes_(box: number[]): void;

        /**
         * AES's ShiftRows procedure. Shift the values in each row to the right. Each
         * row is shifted one more slot than the one above it.
         * @private
         */
        private shiftRows_(): void;

        /**
         * AES's InvShiftRows procedure. Shift the values in each row to the right.
         * @private
         */
        private invShiftRows_(): void;

        /**
         * AES's MixColumns procedure. Mix the columns of the state using magic.
         * @private
         */
        private mixColumns_(): void;

        /**
         * AES's InvMixColumns procedure.
         * @private
         */
        private invMixColumns_(): void;

        /**
         * AES's KeyExpansion procedure. Create the key schedule from the initial key.
         * @private
         */
        private keyExpansion_(): void;

        /**
         * AES's SubWord procedure.
         * @param {!Array<number>} w Bytes to find the SBox substitution for.
         * @return {!Array<number>} The substituted bytes.
         * @private
         */
        private subWord_(w: number[]): number[];

        /**
         * AES's RotWord procedure.
         * @param {!Array<number>} w Array of bytes to rotate.
         * @return {!Array<number>} The rotated bytes.
         * @private
         */
        private rotWord_(w: number[]): number[];

        /**
         * Block size, in bytes.
         * @type {number}
         * @const
         * @public
         */
        readonly BLOCK_SIZE: number;

        /**
         * Encrypt a plaintext block.  The implementation may expect (and assert)
         * a particular block length.
         * @param {!Array<number>|!Uint8Array} input Plaintext array of input bytes.
         * @return {!Array<number>} Encrypted ciphertext array of bytes.  Should be the
         *     same length as input.
         */
        encrypt(input: number[]|Uint8Array): number[];

        /**
         * Decrypt a plaintext block.  The implementation may expect (and assert)
         * a particular block length.
         * @param {!Array<number>|!Uint8Array} input Ciphertext. Array of input bytes.
         * @return {!Array<number>} Decrypted plaintext array of bytes.  Should be the
         *     same length as input.
         */
        decrypt(input: number[]|Uint8Array): number[];
    }
}

declare namespace goog.crypt.Aes {
}
