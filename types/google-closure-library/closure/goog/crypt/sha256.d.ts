/// <reference path="../../../globals.d.ts"/>
/// <reference path="./sha2.d.ts"/>

declare module 'goog:goog.crypt.Sha256' {
    import alias = goog.crypt.Sha256;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * SHA-256 cryptographic hash constructor.
     *
     * @extends {goog.crypt.Sha2}
     * @final
     * @struct
     */
    class Sha256 extends __Sha256 {}
    abstract class __Sha256 extends goog.crypt.__Sha2 {
        /**
         */
        constructor();
    }
}

declare namespace goog.crypt.Sha256 {
}
