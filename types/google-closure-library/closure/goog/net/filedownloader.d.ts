/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="../fs/entry.d.ts"/>
/// <reference path="./xhriopool.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>
/// <reference path="./xhrio.d.ts"/>
/// <reference path="../fs/filewriter.d.ts"/>
/// <reference path="../fs/error.d.ts"/>
/// <reference path="../debug/error.d.ts"/>
/// <reference path="./errorcode.d.ts"/>

declare module 'goog:goog.net.FileDownloader' {
    import alias = goog.net.FileDownloader;
    export default alias;
}

declare module 'goog:goog.net.FileDownloader.Error' {
    import alias = goog.net.FileDownloader.Error;
    export default alias;
}

declare namespace goog.net {
    /**
     * A class for downloading remote files and storing them locally using the
     * HTML5 filesystem API.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class FileDownloader extends __FileDownloader {}
    abstract class __FileDownloader extends goog.__Disposable {
        /**
         * @param {!goog.fs.DirectoryEntry} dir The directory in which the downloaded
         *     files are stored. This directory should be solely managed by
         *     FileDownloader.
         * @param {goog.net.XhrIoPool=} opt_pool The pool of XhrIo objects to use for
         *     downloading files.
         */
        constructor(dir: goog.fs.DirectoryEntry, opt_pool?: goog.net.XhrIoPool);

        /**
         * The directory in which the downloaded files are stored.
         * @type {!goog.fs.DirectoryEntry}
         * @private
         */
        private dir_: goog.fs.DirectoryEntry;

        /**
         * The pool of XHRs to use for capturing.
         * @type {!goog.net.XhrIoPool}
         * @private
         */
        private pool_: goog.net.XhrIoPool;

        /**
         * A map from URLs to active downloads running for those URLs.
         * @type {!Object<!goog.net.FileDownloader.Download_>}
         * @private
         */
        private downloads_: {[key: string]: any};

        /**
         * The handler for URL capturing events.
         * @type {!goog.events.EventHandler<!goog.net.FileDownloader>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.net.FileDownloader>;

        /**
         * Download a remote file and save its contents to the filesystem. A given file
         * is uniquely identified by its URL string; this means that the relative and
         * absolute URLs for a single file are considered different for the purposes of
         * the FileDownloader.
         *
         * Returns a Deferred that will contain the downloaded blob. If there's an error
         * while downloading the URL, this Deferred will be passed the
         * {@link goog.net.FileDownloader.Error} object as an errback.
         *
         * If a download is already in progress for the given URL, this will return the
         * deferred blob for that download. If the URL has already been downloaded, this
         * will fail once it tries to save the downloaded blob.
         *
         * When a download is in progress, all Deferreds returned for that download will
         * be branches of a single parent. If all such branches are cancelled, or if one
         * is cancelled with opt_deepCancel set, then the download will be cancelled as
         * well.
         *
         * @param {string} url The URL of the file to download.
         * @return {!goog.async.Deferred} The deferred result blob.
         */
        download(url: string): goog.async.Deferred<any>;

        /**
         * Return a Deferred that will fire once no download is active for a given URL.
         * If there's no download active for that URL when this is called, the deferred
         * will fire immediately; otherwise, it will fire once the download is complete,
         * whether or not it succeeds.
         *
         * @param {string} url The URL of the download to wait for.
         * @return {!goog.async.Deferred} The Deferred that will fire when the download
         *     is complete.
         */
        waitForDownload(url: string): goog.async.Deferred<any>;

        /**
         * Returns whether or not there is an active download for a given URL.
         *
         * @param {string} url The URL of the download to check.
         * @return {boolean} Whether or not there is an active download for the URL.
         */
        isDownloading(url: string): boolean;

        /**
         * Load a downloaded blob from the filesystem. Will fire a deferred error if the
         * given URL has not yet been downloaded.
         *
         * @param {string} url The URL of the blob to load.
         * @return {!goog.async.Deferred} The deferred Blob object. The callback will be
         *     passed the blob. If a file API error occurs while loading the blob, that
         *     error will be passed to the errback.
         */
        getDownloadedBlob(url: string): goog.async.Deferred<any>;

        /**
         * Get the local filesystem: URL for a downloaded file. This is different from
         * the blob: URL that's available from getDownloadedBlob(). If the end user
         * accesses the filesystem: URL, the resulting file's name will be determined by
         * the download filename as opposed to an arbitrary GUID. In addition, the
         * filesystem: URL is connected to a filesystem location, so if the download is
         * removed then that URL will become invalid.
         *
         * Warning: in Chrome 12, some filesystem: URLs are opened inline. This means
         * that e.g. HTML pages given to the user via filesystem: URLs will be opened
         * and processed by the browser.
         *
         * @param {string} url The URL of the file to get the URL of.
         * @return {!goog.async.Deferred} The deferred filesystem: URL. The callback
         *     will be passed the URL. If a file API error occurs while loading the
         *     blob, that error will be passed to the errback.
         */
        getLocalUrl(url: string): goog.async.Deferred<any>;

        /**
         * Return (deferred) whether or not a URL has been downloaded. Will fire a
         * deferred error if something goes wrong when determining this.
         *
         * @param {string} url The URL to check.
         * @return {!goog.async.Deferred} The deferred boolean. The callback will be
         *     passed the boolean. If a file API error occurs while checking the
         *     existence of the downloaded URL, that error will be passed to the
         *     errback.
         */
        isDownloaded(url: string): goog.async.Deferred<any>;

        /**
         * Remove a URL from the FileDownloader.
         *
         * This returns a Deferred. If the removal is completed successfully, its
         * callback will be called without any value. If the removal fails, its errback
         * will be called with the {@link goog.fs.Error}.
         *
         * @param {string} url The URL to remove.
         * @return {!goog.async.Deferred} The deferred used for registering callbacks on
         *     success or on error.
         */
        remove(url: string): goog.async.Deferred<any>;

        /**
         * Save a blob for a given URL. This works just as through the blob were
         * downloaded form that URL, except you specify the blob and no HTTP request is
         * made.
         *
         * If the URL is currently being downloaded, it's indeterminate whether the blob
         * being set or the blob being downloaded will end up in the filesystem.
         * Whichever one doesn't get saved will have an error. To ensure that one or the
         * other takes precedence, use {@link #waitForDownload} to allow the download to
         * complete before setting the blob.
         *
         * @param {string} url The URL at which to set the blob.
         * @param {!Blob} blob The blob to set.
         * @param {string=} opt_name The name of the file. If this isn't given, it's
         *     determined from the URL.
         * @return {!goog.async.Deferred} The deferred used for registering callbacks on
         *     success or on error. This can be cancelled just like a {@link #download}
         *     Deferred. The objects passed to the errback will be
         *     {@link goog.net.FileDownloader.Error}s.
         */
        setBlob(url: string, blob: Blob, opt_name?: string): goog.async.Deferred<any>;

        /**
         * The callback called when an XHR becomes available from the XHR pool.
         *
         * @param {!goog.net.FileDownloader.Download_} download The download object for
         *     this download.
         * @param {!goog.net.XhrIo} xhr The XhrIo object for downloading the page.
         * @private
         */
        private gotXhr_(download: any, xhr: goog.net.XhrIo): void;

        /**
         * The callback called when an XHR succeeds in downloading a remote file.
         *
         * @param {!goog.net.FileDownloader.Download_} download The download object for
         *     this download.
         * @private
         */
        private xhrSuccess_(download: any): void;

        /**
         * The callback called when a file that will be used for saving a file is
         * successfully opened.
         *
         * @param {!goog.net.FileDownloader.Download_} download The download object for
         *     this download.
         * @param {!goog.fs.FileEntry} file The newly-opened file object.
         * @private
         */
        private fileSuccess_(download: any, file: goog.fs.FileEntry): void;

        /**
         * The callback called when a file writer is successfully created for writing a
         * file to the filesystem.
         *
         * @param {!goog.net.FileDownloader.Download_} download The download object for
         *     this download.
         * @param {!goog.fs.FileWriter} writer The newly-created file writer object.
         * @private
         */
        private fileWriterSuccess_(download: any, writer: goog.fs.FileWriter): void;

        /**
         * The callback called when file writing ends, whether or not it's successful.
         *
         * @param {!goog.net.FileDownloader.Download_} download The download object for
         *     this download.
         * @private
         */
        private writeEnd_(download: any): void;

        /**
         * The error callback for all asynchronous operations. Ensures that all stages
         * of a given download are cleaned up, and emits the error event.
         *
         * @param {!goog.net.FileDownloader.Download_} download The download object for
         *     this download.
         * @param {goog.fs.Error=} opt_err The file error object. Only defined if the
         *     error was raised by the file API.
         * @private
         */
        private error_(download: any, opt_err?: goog.fs.Error): void;

        /**
         * Abort the download of the given URL.
         *
         * @param {!goog.net.FileDownloader.Download_} download The download to abort.
         * @private
         */
        private cancel_(download: any): void;

        /**
         * Get the directory for a given URL. If the directory already exists when this
         * is called, it will contain exactly one file: the downloaded file.
         *
         * This not only calls the FileSystem API's getFile method, but attempts to
         * distribute the files so that they don't overload the filesystem. The spec
         * says directories can't contain more than 5000 files
         * (http://www.w3.org/TR/file-system-api/#directories), so this ensures that
         * each file is put into a subdirectory based on its SHA1 hash.
         *
         * All parameters are the same as in the FileSystem API's Entry#getFile method.
         *
         * @param {string} url The URL corresponding to the directory to get.
         * @param {goog.fs.DirectoryEntry.Behavior} behavior The behavior to pass to the
         *     underlying method.
         * @return {!goog.async.Deferred} The deferred DirectoryEntry object.
         * @private
         */
        private getDir_(url: string, behavior: goog.fs.DirectoryEntry.Behavior): goog.async.Deferred<any>;

        /**
         * Get the file for a given URL. This will only retrieve files that have already
         * been saved; it shouldn't be used for creating the file in the first place.
         * This is because the filename isn't necessarily determined by the URL, but by
         * the headers of the XHR response.
         *
         * @param {string} url The URL corresponding to the file to get.
         * @return {!goog.async.Deferred} The deferred FileEntry object.
         * @private
         */
        private getFile_(url: string): goog.async.Deferred<any>;

        /**
         * Sanitize a string so it can be safely used as a file or directory name for
         * the FileSystem API.
         *
         * @param {string} str The string to sanitize.
         * @return {string} The sanitized string.
         * @private
         */
        private sanitize_(str: string): string;

        /**
         * Gets the filename specified by the XHR. This first attempts to parse the
         * Content-Disposition header for a filename and, failing that, falls back on
         * deriving the filename from the URL.
         *
         * @param {!goog.net.XhrIo} xhr The XHR containing the response headers.
         * @return {string} The filename.
         * @private
         */
        private getName_(xhr: goog.net.XhrIo): string;

        /**
         * Extracts the basename from a URL.
         *
         * @param {string} url The URL.
         * @return {string} The basename.
         * @private
         */
        private urlToName_(url: string): string;

        /**
         * Remove all event listeners for an XHR and release it back into the pool.
         *
         * @param {!goog.net.XhrIo} xhr The XHR to free.
         * @private
         */
        private freeXhr_(xhr: goog.net.XhrIo): void;
    }
}

declare namespace goog.net.FileDownloader {
    /**
     * The error object for FileDownloader download errors.
     *
     * @extends {goog.debug.Error}
     * @final
     */
    class Error extends __Error {}
    abstract class __Error extends goog.debug.__Error {
        /**
         * @param {!goog.net.FileDownloader.Download_} download The download object for
         *     the download in question.
         * @param {goog.fs.Error=} opt_fsErr The file error object, if this was a file
         *     error.
         *
         */
        constructor(download: any, opt_fsErr?: goog.fs.Error);

        /**
         * The URL the event relates to.
         * @type {string}
         */
        url: string;

        /**
         * The status of the XHR. Only set if the error was caused by an XHR failure.
         * @type {number|undefined}
         */
        xhrStatus: number|undefined;

        /**
         * The error code of the XHR. Only set if the error was caused by an XHR
         * failure.
         * @type {goog.net.ErrorCode|undefined}
         */
        xhrErrorCode: goog.net.ErrorCode|undefined;

        /**
         * The file API error. Only set if the error was caused by the file API.
         * @type {goog.fs.Error|undefined}
         */
        fileError: goog.fs.Error|undefined;
    }

    /**
     * A struct containing the data for a single download.
     *
     * @extends {goog.Disposable}
     * @private
     */
    class Download_ extends __Download_ {}
    abstract class __Download_ extends goog.__Disposable {
        /**
         * @param {string} url The URL for the file being downloaded.
         * @param {!goog.net.FileDownloader} downloader The parent FileDownloader.
         */
        constructor(url: string, downloader: goog.net.FileDownloader);

        /**
         * The URL for the file being downloaded.
         * @type {string}
         */
        url: string;

        /**
         * The Deferred that will be fired when the download is complete.
         * @type {!goog.async.Deferred}
         */
        deferred: goog.async.Deferred<any>;

        /**
         * Whether this download has been cancelled by the user.
         * @type {boolean}
         */
        cancelled: boolean;

        /**
         * The XhrIo object for downloading the file. Only set once it's been
         * retrieved from the pool.
         * @type {goog.net.XhrIo}
         */
        xhr: goog.net.XhrIo;

        /**
         * The name of the blob being downloaded. Only sey once the XHR has completed,
         * if it completed successfully.
         * @type {?string}
         */
        name: string|null;

        /**
         * The downloaded blob. Only set once the XHR has completed, if it completed
         * successfully.
         * @type {Blob}
         */
        blob: Blob;

        /**
         * The file entry where the blob is to be stored. Only set once it's been
         * loaded from the filesystem.
         * @type {goog.fs.FileEntry}
         */
        file: goog.fs.FileEntry;

        /**
         * The file writer for writing the blob to the filesystem. Only set once it's
         * been loaded from the filesystem.
         * @type {goog.fs.FileWriter}
         */
        writer: goog.fs.FileWriter;
    }
}
