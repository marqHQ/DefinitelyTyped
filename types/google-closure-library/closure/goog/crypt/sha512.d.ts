/// <reference path="../../../globals.d.ts"/>
/// <reference path="./sha2_64bit.d.ts"/>

declare module 'goog:goog.crypt.Sha512' {
    import alias = goog.crypt.Sha512;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * Constructs a SHA-512 cryptographic hash.
     *
     * @extends {goog.crypt.Sha2_64bit}
     * @final
     * @struct
     */
    class Sha512 extends __Sha512 {}
    abstract class __Sha512 extends goog.crypt.__Sha2_64bit {
        /**
         */
        constructor();
    }
}

declare namespace goog.crypt.Sha512 {
}
