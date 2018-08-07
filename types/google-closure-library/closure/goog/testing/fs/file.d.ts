/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./blob.d.ts"/>

declare module 'goog:goog.testing.fs.File' {
    import alias = goog.testing.fs.File;
    export default alias;
}

declare namespace goog.testing.fs {
    /**
     * A mock file object.
     *
     * @extends {goog.testing.fs.Blob}
     * @final
     */
    class File extends __File {}
    abstract class __File extends goog.testing.fs.__Blob {
        /**
         * @param {string} name The name of the file.
         * @param {Date=} opt_lastModified The last modified date for this file. May be
         *     null if file modification dates are not supported.
         * @param {string=} opt_data The string data encapsulated by the blob.
         * @param {string=} opt_type The mime type of the blob.
         */
        constructor(name: string, opt_lastModified?: Date, opt_data?: string, opt_type?: string);

        /**
         * @see http://www.w3.org/TR/FileAPI/#dfn-name
         * @type {string}
         */
        name: string;

        /**
         * @see http://www.w3.org/TR/FileAPI/#dfn-lastModifiedDate
         * @type {Date}
         */
        lastModifiedDate: Date;
    }
}
