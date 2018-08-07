/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.DragDropDetector' {
    import alias = goog.ui.DragDropDetector;
    export default alias;
}

declare module 'goog:goog.ui.DragDropDetector.LinkDropEvent' {
    import alias = goog.ui.DragDropDetector.LinkDropEvent;
    export default alias;
}

declare module 'goog:goog.ui.DragDropDetector.ImageDropEvent' {
    import alias = goog.ui.DragDropDetector.ImageDropEvent;
    export default alias;
}

declare module 'goog:goog.ui.DragDropDetector.EventType' {
    import alias = goog.ui.DragDropDetector.EventType;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Creates a new drag and drop detector.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class DragDropDetector extends __DragDropDetector {}
    abstract class __DragDropDetector extends goog.events.__EventTarget {
        /**
         * @param {string=} opt_filePath The URL of the page to use for the detector.
         *     It should contain the same contents as dragdropdetector_target.html in
         *     the demos directory.
         */
        constructor(opt_filePath?: string);

        /**
         * Our event handler object.
         * @type {goog.events.EventHandler<!goog.ui.DragDropDetector>}
         * @private
         */
        private handler_: goog.events.EventHandler<goog.ui.DragDropDetector>;

        /**
         * The root element (the IFRAME on most browsers, the DIV on IE).
         * @type {Element}
         * @private
         */
        private root_: Element;

        /**
         * The text INPUT element used to detect link drops on IE.  null on Firefox.
         * @type {Element}
         * @private
         */
        private textInput_: Element;

        /**
         * The iframe element.
         * @type {HTMLIFrameElement}
         * @private
         */
        private element_: HTMLIFrameElement;

        /**
         * The iframe's window, null if the iframe hasn't loaded yet.
         * @type {Window}
         * @private
         */
        private window_: Window;

        /**
         * The iframe's document, null if the iframe hasn't loaded yet.
         * @type {Document}
         * @private
         */
        private document_: Document;

        /**
         * The iframe's body, null if the iframe hasn't loaded yet.
         * @type {HTMLBodyElement}
         * @private
         */
        private body_: HTMLBodyElement;

        /**
         * Whether we are in "screen cover" mode in which the iframe or div is
         * covering the entire screen.
         * @type {boolean}
         * @private
         */
        private isCoveringScreen_: boolean;

        /**
         * The last position of the mouse while dragging.
         * @type {goog.math.Coordinate}
         * @private
         */
        private mousePosition_: goog.math.Coordinate;

        /**
         * Initialize the iframe after it has loaded.
         * @private
         */
        private initIframe_(): void;

        /**
         * Cover the screen with the iframe.
         * @param {goog.events.BrowserEvent} e The event that caused this function call.
         * @private
         */
        private coverScreen_(e: goog.events.BrowserEvent): void;

        /**
         * Uncover the screen.
         * @private
         */
        private uncoverScreen_(): void;

        /**
         * Re-insert the INPUT into the DIV.  Does nothing when the DIV is off screen.
         * @param {goog.events.BrowserEvent} e The event that caused this function call.
         * @private
         */
        private switchToInput_(e: goog.events.BrowserEvent): void;

        /**
         * Remove the text INPUT so the IFRAME is showing.  Does nothing when the DIV is
         * off screen.
         * @param {goog.events.BrowserEvent} e The event that caused this function call.
         * @private
         */
        private switchToIframe_(e: goog.events.BrowserEvent): void;

        /**
         * Handle a new drag event.
         * @param {goog.events.BrowserEvent} e The event object.
         * @return {boolean|undefined} Returns false in IE to cancel the event.
         * @private
         */
        private handleNewDrag_(e: goog.events.BrowserEvent): boolean|undefined;

        /**
         * Handle mouse tracking.
         * @param {goog.events.BrowserEvent} e The event object.
         * @private
         */
        private trackMouse_(e: goog.events.BrowserEvent): void;

        /**
         * Handle a drop on the IE text INPUT.
         * @param {goog.events.BrowserEvent} e The event object.
         * @private
         */
        private handleInputDrop_(e: goog.events.BrowserEvent): void;

        /**
         * Clear the contents of the iframe.
         * @private
         */
        private clearContents_(): void;

        /**
         * Event handler called when the content of the iframe changes.
         * @param {goog.events.BrowserEvent} e The event that caused this function call.
         * @private
         */
        private handleNodeInserted_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.ui.DragDropDetector {
    /**
     * Creates a new image drop event object.
     * @extends {goog.events.Event}
     * @final
     */
    class ImageDropEvent extends __ImageDropEvent {}
    abstract class __ImageDropEvent extends goog.events.__Event {
        /**
         * @param {string} url The url of the dropped image.
         * @param {goog.math.Coordinate} position The screen position where the drop
         *     occurred.
         */
        constructor(url: string, position: goog.math.Coordinate);

        /**
         * The url of the image that was dropped.
         * @type {string}
         * @private
         */
        private url_: string;

        /**
         * The screen position where the drop occurred.
         * @type {goog.math.Coordinate}
         * @private
         */
        private position_: goog.math.Coordinate;

        /**
         * @return {string} The url of the image that was dropped.
         */
        getUrl(): string;

        /**
         * @return {goog.math.Coordinate} The screen position where the drop occurred.
         *     This may be have x and y of goog.ui.DragDropDetector.INIT_POSITION,
         *     indicating the drop position is unknown.
         */
        getPosition(): goog.math.Coordinate;
    }

    /**
     * Creates a new link drop event object.
     * @extends {goog.events.Event}
     * @final
     */
    class LinkDropEvent extends __LinkDropEvent {}
    abstract class __LinkDropEvent extends goog.events.__Event {
        /**
         * @param {string} url The url of the dropped link.
         */
        constructor(url: string);

        /**
         * The url of the link that was dropped.
         * @type {string}
         * @private
         */
        private url_: string;

        /**
         * @return {string} The url of the link that was dropped.
         */
        getUrl(): string;
    }

    /**
     * Drag and drop event types.
     * @enum {string}
     */
    enum EventType { IMAGE_DROPPED, LINK_DROPPED }

    /**
     * Initial value for clientX and clientY indicating that the location has
     * never been updated.
     */
    let INIT_POSITION: any /*missing*/;

    /**
     * @desc Message shown to users to inform them that they can't drag and drop
     *     local files.
     */
    let MSG_DRAG_DROP_LOCAL_FILE_ERROR: any /*missing*/;

    /**
     * @desc Message shown to users trying to drag and drop protected images from
     *     Flickr, etc.
     */
    let MSG_DRAG_DROP_PROTECTED_FILE_ERROR: any /*missing*/;
}
