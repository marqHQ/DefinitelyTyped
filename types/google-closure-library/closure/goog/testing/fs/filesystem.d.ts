/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../fs/filesystem.d.ts"/>
/// <reference path="./entry.d.ts"/>
/// <reference path="../../fs/entry.d.ts"/>

declare module 'goog:goog.testing.fs.FileSystem' {
    import alias = goog.testing.fs.FileSystem;
    export default alias;
}

declare namespace goog.testing.fs {
    /**
     * A mock filesystem object.
     *
     * @implements {goog.fs.FileSystem}
     * @final
     */
    class FileSystem extends __FileSystem {}
    abstract class __FileSystem implements goog.fs.FileSystem {
        /**
         * @param {string=} opt_name The name of the filesystem.
         */
        constructor(opt_name?: string);

        /**
         * The name of the filesystem.
         * @type {string}
         * @private
         */
        private name_: string;

        /**
         * The root entry of the filesystem.
         * @type {!goog.testing.fs.DirectoryEntry}
         * @private
         */
        private root_: goog.testing.fs.DirectoryEntry;

        /**
         * @return {string} The name of the filesystem.
         */
        getName(): string;

        /**
         * @return {!goog.fs.DirectoryEntry} The root directory of the filesystem.
         */
        getRoot(): goog.fs.DirectoryEntry;
    }
}
