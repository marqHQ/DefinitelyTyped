/// <reference path="../../../../globals.d.ts"/>

declare namespace goog.crypt {
    class JpegEncoder extends __JpegEncoder {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __JpegEncoder {
        /**
         * Initializes the JpegEncoder.
         *
         * @constructor
         * @param {number=} opt_quality The compression quality. Default 50.
         */
        constructor(opt_quality?: number);

        /**
         * Encodes ImageData to JPEG.
         *
         * @param {ImageData} image
         * @param {number=} opt_quality The compression quality.
         * @return {string} base64-encoded JPEG data.
         */
        encode(image: ImageData, opt_quality?: number): string;
    }
}
