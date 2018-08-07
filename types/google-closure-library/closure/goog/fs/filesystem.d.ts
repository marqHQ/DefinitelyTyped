/// <reference path="../../../globals.d.ts"/>
/// <reference path="./entry.d.ts"/>

declare module 'goog:goog.fs.FileSystem' {
    import alias = goog.fs.FileSystem;
    export default alias;
}

declare namespace goog.fs {
    interface FileSystem {
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
