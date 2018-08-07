/// <reference path="../../../globals.d.ts"/>
/// <reference path="./entry.d.ts"/>
/// <reference path="./filesystem.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>
/// <reference path="./filewriter.d.ts"/>

declare module 'goog:goog.fs.FileEntryImpl' {
    import alias = goog.fs.FileEntryImpl;
    export default alias;
}

declare module 'goog:goog.fs.EntryImpl' {
    import alias = goog.fs.EntryImpl;
    export default alias;
}

declare module 'goog:goog.fs.DirectoryEntryImpl' {
    import alias = goog.fs.DirectoryEntryImpl;
    export default alias;
}

declare namespace goog.fs {
    /**
     * Base class for concrete implementations of goog.fs.Entry.
     * @implements {goog.fs.Entry}
     */
    class EntryImpl extends __EntryImpl {}
    abstract class __EntryImpl implements goog.fs.Entry {
        /**
         * @param {!goog.fs.FileSystem} fs The wrapped filesystem.
         * @param {!Entry} entry The underlying Entry object.
         */
        constructor(fs: goog.fs.FileSystem, entry: Entry);

        /**
         * The wrapped filesystem.
         *
         * @type {!goog.fs.FileSystem}
         * @private
         */
        private fs_: goog.fs.FileSystem;

        /**
         * The underlying Entry object.
         *
         * @type {!Entry}
         * @private
         */
        private entry_: Entry;

        /**
         * @return {boolean} Whether or not this entry is a file.
         */
        isFile(): boolean;

        /**
         * @return {boolean} Whether or not this entry is a directory.
         */
        isDirectory(): boolean;

        /**
         * @return {string} The name of this entry.
         */
        getName(): string;

        /**
         * @return {string} The full path to this entry.
         */
        getFullPath(): string;

        /**
         * @return {!goog.fs.FileSystem} The filesystem backing this entry.
         */
        getFileSystem(): goog.fs.FileSystem;

        /**
         * Retrieves the last modified date for this entry.
         *
         * @return {!goog.async.Deferred} The deferred Date for this entry. If an error
         *     occurs, the errback is called with a {@link goog.fs.Error}.
         */
        getLastModified(): goog.async.Deferred<any>;

        /**
         * Retrieves the metadata for this entry.
         *
         * @return {!goog.async.Deferred} The deferred Metadata for this entry. If an
         *     error occurs, the errback is called with a {@link goog.fs.Error}.
         */
        getMetadata(): goog.async.Deferred<any>;

        /**
         * Move this entry to a new location.
         *
         * @param {!goog.fs.DirectoryEntry} parent The new parent directory.
         * @param {string=} opt_newName The new name of the entry. If omitted, the entry
         *     retains its original name.
         * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry} or
         *     {@link goog.fs.DirectoryEntry} for the new entry. If an error occurs, the
         *     errback is called with a {@link goog.fs.Error}.
         */
        moveTo(parent: goog.fs.DirectoryEntry, opt_newName?: string): goog.async.Deferred<any>;

        /**
         * Copy this entry to a new location.
         *
         * @param {!goog.fs.DirectoryEntry} parent The new parent directory.
         * @param {string=} opt_newName The name of the new entry. If omitted, the new
         *     entry has the same name as the original.
         * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry} or
         *     {@link goog.fs.DirectoryEntry} for the new entry. If an error occurs, the
         *     errback is called with a {@link goog.fs.Error}.
         */
        copyTo(parent: goog.fs.DirectoryEntry, opt_newName?: string): goog.async.Deferred<any>;

        /**
         * Wrap an HTML5 entry object in an appropriate subclass instance.
         *
         * @param {!Entry} entry The underlying Entry object.
         * @return {!goog.fs.Entry} The appropriate subclass wrapper.
         * @protected
         */
        wrapEntry(entry: Entry): goog.fs.Entry;

        /**
         * Get the URL for this file.
         *
         * @param {string=} opt_mimeType The MIME type that will be served for the URL.
         * @return {string} The URL.
         */
        toUrl(opt_mimeType?: string): string;

        /**
         * Get the URI for this file.
         *
         * @deprecated Use {@link #toUrl} instead.
         * @param {string=} opt_mimeType The MIME type that will be served for the URI.
         * @return {string} The URI.
         */
        toUri(opt_mimeType?: string): string;

        /**
         * Remove this entry.
         *
         * @return {!goog.async.Deferred} A deferred object. If the removal succeeds,
         *     the callback is called with true. If an error occurs, the errback is
         *     called a {@link goog.fs.Error}.
         */
        remove(): goog.async.Deferred<any>;

        /**
         * Gets the parent directory.
         *
         * @return {!goog.async.Deferred} The deferred {@link goog.fs.DirectoryEntry}.
         *     If an error occurs, the errback is called with a {@link goog.fs.Error}.
         */
        getParent(): goog.async.Deferred<any>;
    }

    /**
     * A directory in a local FileSystem.
     *
     * This should not be instantiated directly. Instead, it should be accessed via
     * {@link goog.fs.FileSystem#getRoot} or
     * {@link goog.fs.DirectoryEntry#getDirectoryEntry}.
     *
     * @extends {goog.fs.EntryImpl}
     * @implements {goog.fs.DirectoryEntry}
     * @final
     */
    class DirectoryEntryImpl extends __DirectoryEntryImpl {}
    abstract class __DirectoryEntryImpl extends goog.fs.__EntryImpl implements goog.fs.DirectoryEntry {
        /**
         * @param {!goog.fs.FileSystem} fs The wrapped filesystem.
         * @param {!DirectoryEntry} dir The underlying DirectoryEntry object.
         */
        constructor(fs: goog.fs.FileSystem, dir: DirectoryEntry);

        /**
         * The underlying DirectoryEntry object.
         *
         * @type {!DirectoryEntry}
         * @private
         */
        private dir_: DirectoryEntry;

        /**
         * Converts a value in the Behavior enum into an options object expected by the
         * File API.
         *
         * @param {goog.fs.DirectoryEntry.Behavior=} opt_behavior The behavior for
         *     existing files.
         * @return {!Object<boolean>} The options object expected by the File API.
         * @private
         */
        private getOptions_(opt_behavior?: goog.fs.DirectoryEntry.Behavior): {[key: string]: boolean};

        /**
         * Get a file in the directory.
         *
         * @param {string} path The path to the file, relative to this directory.
         * @param {goog.fs.DirectoryEntry.Behavior=} opt_behavior The behavior for
         *     handling an existing file, or the lack thereof.
         * @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry}. If an
         *     error occurs, the errback is called with a {@link goog.fs.Error}.
         */
        getFile(path: string, opt_behavior?: goog.fs.DirectoryEntry.Behavior): goog.async.Deferred<any>;

        /**
         * Get a directory within this directory.
         *
         * @param {string} path The path to the directory, relative to this directory.
         * @param {goog.fs.DirectoryEntry.Behavior=} opt_behavior The behavior for
         *     handling an existing directory, or the lack thereof.
         * @return {!goog.async.Deferred} The deferred {@link goog.fs.DirectoryEntry}.
         *     If an error occurs, the errback is called a {@link goog.fs.Error}.
         */
        getDirectory(path: string, opt_behavior?: goog.fs.DirectoryEntry.Behavior): goog.async.Deferred<any>;

        /**
         * Opens the directory for the specified path, creating the directory and any
         * intermediate directories as necessary.
         *
         * @param {string} path The directory path to create. May be absolute or
         *     relative to the current directory. The parent directory ".." and current
         *     directory "." are supported.
         * @return {!goog.async.Deferred} A deferred {@link goog.fs.DirectoryEntry} for
         *     the requested path. If an error occurs, the errback is called with a
         *     {@link goog.fs.Error}.
         */
        createPath(path: string): goog.async.Deferred<any>;

        /**
         * Gets a list of all entries in this directory.
         *
         * @return {!goog.async.Deferred} The deferred list of {@link goog.fs.Entry}
         *     results. If an error occurs, the errback is called with a
         *     {@link goog.fs.Error}.
         */
        listDirectory(): goog.async.Deferred<any>;

        /**
         * Removes this directory and all its contents.
         *
         * @return {!goog.async.Deferred} A deferred object. If the removal succeeds,
         *     the callback is called with true. If an error occurs, the errback is
         *     called a {@link goog.fs.Error}.
         */
        removeRecursively(): goog.async.Deferred<any>;
    }

    /**
     * A file in a local filesystem.
     *
     * This should not be instantiated directly. Instead, it should be accessed via
     * {@link goog.fs.DirectoryEntry#getFile}.
     *
     * @extends {goog.fs.EntryImpl}
     * @implements {goog.fs.FileEntry}
     * @final
     */
    class FileEntryImpl extends __FileEntryImpl {}
    abstract class __FileEntryImpl extends goog.fs.__EntryImpl implements goog.fs.FileEntry {
        /**
         * @param {!goog.fs.FileSystem} fs The wrapped filesystem.
         * @param {!FileEntry} file The underlying FileEntry object.
         */
        constructor(fs: goog.fs.FileSystem, file: FileEntry);

        /**
         * The underlying FileEntry object.
         *
         * @type {!FileEntry}
         * @private
         */
        private file_: FileEntry;

        /**
         * Create a writer for writing to the file.
         *
         * @return {!goog.async.Deferred<!goog.fs.FileWriter>} If an error occurs, the
         *     errback is called with a {@link goog.fs.Error}.
         */
        createWriter(): goog.async.Deferred<goog.fs.FileWriter>;

        /**
         * Get the file contents as a File blob.
         *
         * @return {!goog.async.Deferred<!File>} If an error occurs, the errback is
         *     called with a {@link goog.fs.Error}.
         */
        file(): goog.async.Deferred<File>;
    }
}
