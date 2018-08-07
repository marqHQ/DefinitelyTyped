/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./eventhandler.d.ts"/>
/// <reference path="../log/log.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.FileDropHandler' {
    import alias = goog.events.FileDropHandler;
    export default alias;
}

declare module 'goog:goog.events.FileDropHandler.EventType' {
    import alias = goog.events.FileDropHandler.EventType;
    export default alias;
}

declare namespace goog.events {
    /**
     * A files drag and drop event detector. Gets an `element` as parameter
     * and fires `goog.events.FileDropHandler.EventType.DROP` event when files
     * are dropped in the `element`.
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class FileDropHandler extends __FileDropHandler {}
    abstract class __FileDropHandler extends goog.events.__EventTarget {
        /**
         * @param {Element|Document} element The element or document to listen on.
         * @param {boolean=} opt_preventDropOutside Whether to prevent a drop on the
         *     area outside the `element`. Default false.
         */
        constructor(element: Element|Document, opt_preventDropOutside?: boolean);

        /**
         * Handler for drag/drop events.
         * @type {!goog.events.EventHandler<!goog.events.FileDropHandler>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.events.FileDropHandler>;

        /**
         * Whether the drag event contains files. It is initialized only in the
         * dragenter event. It is used in all the drag events to prevent default actions
         * only if the drag contains files. Preventing default actions is necessary to
         * go from dragenter to dragover and from dragover to drop. However we do not
         * always want to prevent default actions, e.g. when the user drags text or
         * links on a text area we should not prevent the browser default action that
         * inserts the text in the text area. It is also necessary to stop propagation
         * when handling drag events on the element to prevent them from propagating
         * to the document.
         * @private
         * @type {boolean}
         */
        private dndContainsFiles_: boolean;

        /**
         * A logger, used to help us debug the algorithm.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Dispatches the DROP event.
         * @param {goog.events.BrowserEvent} e The underlying browser event.
         * @private
         */
        private dispatch_(e: goog.events.BrowserEvent): void;

        /**
         * Handles dragenter on the document.
         * @param {goog.events.BrowserEvent} e The dragenter event.
         * @private
         */
        private onDocDragEnter_(e: goog.events.BrowserEvent): void;

        /**
         * Handles dragging something over the document.
         * @param {goog.events.BrowserEvent} e The dragover event.
         * @private
         */
        private onDocDragOver_(e: goog.events.BrowserEvent): void;

        /**
         * Handles dragging something over the element (drop zone).
         * @param {goog.events.BrowserEvent} e The dragover event.
         * @private
         */
        private onElemDragOver_(e: goog.events.BrowserEvent): void;

        /**
         * Handles dropping something onto the element (drop zone).
         * @param {goog.events.BrowserEvent} e The drop event.
         * @private
         */
        private onElemDrop_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.events.FileDropHandler {
    /**
     * The types of events fired by this class.
     * @enum {string}
     */
    enum EventType { DROP }
}
