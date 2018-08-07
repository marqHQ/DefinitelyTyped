/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.net.streams.Base64StreamDecoder' {
    import alias = goog.net.streams.Base64StreamDecoder;
    export default alias;
}

declare namespace goog.net.streams {
    /**
     * Base64 stream decoder.
     *
     * @struct
     * @final
     * @package
     */
    class Base64StreamDecoder extends __Base64StreamDecoder {}
    abstract class __Base64StreamDecoder {
        /**
         */
        constructor();

        /**
         * If the input stream is still valid.
         * @private {boolean}
         */
        private isInputValid_: any /*missing*/;

        /**
         * The current position in the streamed data that has been processed, i.e.
         * the position right before `leftoverInput_`.
         * @private {number}
         */
        private streamPos_: any /*missing*/;

        /**
         * The leftover characters when grouping input characters into four.
         * @private {string}
         */
        private leftoverInput_: any /*missing*/;
    }
}
