/// <reference path="../../../globals.d.ts"/>
/// <reference path="./sha2.d.ts"/>

declare module 'goog:goog.crypt.Sha224' {
    import alias = goog.crypt.Sha224;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * SHA-224 cryptographic hash constructor.
     *
     * @extends {goog.crypt.Sha2}
     * @final
     * @struct
     */
    class Sha224 extends __Sha224 {}
    abstract class __Sha224 extends goog.crypt.__Sha2 {
        /**
         */
        constructor();
    }
}

declare namespace goog.crypt.Sha224 {
}
