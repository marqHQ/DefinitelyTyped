
declare module 'goog:goog.net.ImageLoader' {
    import alias = goog.net.ImageLoader;
    export default alias;
}

/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare namespace goog.net {
    /**
     * Image loader utility class.  Raises a {@link goog.events.EventType.LOAD}
     * event for each image loaded, with an {@link Image} object as the target of
     * the event, normalized to have `naturalHeight` and `naturalWidth`
     * attributes.
     *
     * To use this class, run:
     *
     * <pre>
     *   var imageLoader = new goog.net.ImageLoader();
     *   goog.events.listen(imageLoader, goog.net.EventType.COMPLETE,
     *       function(e) { ... });
     *   imageLoader.addImage("image_id", "http://path/to/image.gif");
     *   imageLoader.start();
     * </pre>
     *
     * The start() method must be called to start image loading.  Images can be
     * added and removed after loading has started, but only those images added
     * before start() was called will be loaded until start() is called again.
     * A goog.net.EventType.COMPLETE event will be dispatched only once all
     * outstanding images have completed uploading.
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class ImageLoader extends __ImageLoader {}
    abstract class __ImageLoader extends goog.events.__EventTarget {
        /**
         * @param {Element=} opt_parent An optional parent element whose document object
         *     should be used to load images.
         */
        constructor(opt_parent?: Element);

        /**
         * Map of image IDs to their request including their image src, used to keep
         * track of the images to load.  Once images have started loading, they're
         * removed from this map.
         * @type {!Object<!goog.net.ImageLoader.ImageRequest_>}
         * @private
         */
        private imageIdToRequestMap_: {[key: string]: any};

        /**
         * Map of image IDs to their image element, used only for images that are in
         * the process of loading.  Used to clean-up event listeners and to know
         * when we've completed loading images.
         * @type {!Object<string, !Element>}
         * @private
         */
        private imageIdToImageMap_: {[key: string]: Element};

        /**
         * Event handler object, used to keep track of onload and onreadystatechange
         * listeners.
         * @type {!goog.events.EventHandler<!goog.net.ImageLoader>}
         * @private
         */
        private handler_: goog.events.EventHandler<goog.net.ImageLoader>;

        /**
         * The parent element whose document object will be used to load images.
         * Useful if you want to load the images from a window other than the current
         * window in order to control the Referer header sent when the image is
         * loaded.
         * @type {Element|undefined}
         * @private
         */
        private parent_: Element|undefined;

        /**
         * Adds an image to the image loader, and associates it with the given ID
         * string.  If an image with that ID already exists, it is silently replaced.
         * When the image in question is loaded, the target of the LOAD event will be
         * an `Image` object with `id` and `src` attributes based on
         * these arguments.
         * @param {string} id The ID of the image to load.
         * @param {string|Image} image Either the source URL of the image or the HTML
         *     image element itself (or any object with a `src` property, really).
         * @param {!goog.net.ImageLoader.CorsRequestType=} opt_corsRequestType The type
         *     of CORS request to use, if any.
         */
        addImage(
            id: string, image: string|HTMLImageElement, opt_corsRequestType?: goog.net.ImageLoader.CorsRequestType
        ): void;

        /**
         * Removes the image associated with the given ID string from the image loader.
         * If the image was previously loading, removes any listeners for its events
         * and dispatches a COMPLETE event if all remaining images have now completed.
         * @param {string} id The ID of the image to remove.
         */
        removeImage(id: string): void;

        /**
         * Starts loading all images in the image loader in parallel.  Raises a LOAD
         * event each time an image finishes loading, and a COMPLETE event after all
         * images have finished loading.
         */
        start(): void;

        /**
         * Creates an `Image` object with the specified ID and source URL, and
         * listens for network events raised as the image is loaded.
         * @param {!goog.net.ImageLoader.ImageRequest_} imageRequest The request data.
         * @param {string} id The unique ID of the image to load.
         * @private
         */
        private loadImage_(imageRequest: any, id: string): void;

        /**
         * Handles net events (READY_STATE_CHANGE, LOAD, ABORT, and ERROR).
         * @param {goog.events.Event} evt The network event to handle.
         * @private
         */
        private onNetworkEvent_(evt: goog.events.Event): void;
    }
}

declare namespace goog.net.ImageLoader {
    /**
     * The type of image request to dispatch, if this is a CORS-enabled image
     * request. CORS-enabled images can be reused in canvas elements without them
     * being tainted. The server hosting the image should include the appropriate
     * CORS header.
     * @see https://developer.mozilla.org/en-US/docs/HTML/CORS_Enabled_Image
     * @enum {string}
     */
    enum CorsRequestType { ANONYMOUS, USE_CREDENTIALS }
}
