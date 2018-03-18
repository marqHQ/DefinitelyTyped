/// <reference path="../../../globals.d.ts"/>
/// <reference path="./sha2_64bit.d.ts"/>

declare namespace goog.crypt {
    /**
     * Constructs a SHA-512/256 cryptographic hash.
     *
     * @extends {goog.crypt.Sha2_64bit}
     * @final
     * @struct
     */
    class Sha512_256 extends __Sha512_256 {}
    abstract class __Sha512_256 extends goog.crypt.__Sha2_64bit {
        /**
         */
        constructor();
    }
}

declare namespace goog.crypt.Sha512_256 {
}
