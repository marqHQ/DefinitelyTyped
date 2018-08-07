/// <reference path="../../../globals.d.ts"/>
/// <reference path="./sha2_64bit.d.ts"/>

declare module 'goog:goog.crypt.Sha384' {
    import alias = goog.crypt.Sha384;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * Constructs a SHA-384 cryptographic hash.
     *
     * @extends {goog.crypt.Sha2_64bit}
     * @final
     * @struct
     */
    class Sha384 extends __Sha384 {}
    abstract class __Sha384 extends goog.crypt.__Sha2_64bit {
        /**
         */
        constructor();
    }
}

declare namespace goog.crypt.Sha384 {
}
