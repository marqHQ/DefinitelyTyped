/// <reference path="../../../globals.d.ts"/>

declare namespace goog.net {
    /**
     * Event names for network events
     * @enum {string}
     */
    enum EventType {
        COMPLETE,
        SUCCESS,
        ERROR,
        ABORT,
        READY,
        READY_STATE_CHANGE,
        TIMEOUT,
        INCREMENTAL_DATA,
        PROGRESS,
        DOWNLOAD_PROGRESS,
        UPLOAD_PROGRESS
    }
}
