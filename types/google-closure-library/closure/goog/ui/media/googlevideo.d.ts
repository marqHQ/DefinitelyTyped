/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./media.d.ts"/>
/// <reference path="./mediamodel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../html/trustedresourceurl.d.ts"/>

declare module 'goog:goog.ui.media.GoogleVideoModel' {
    import alias = goog.ui.media.GoogleVideoModel;
    export default alias;
}

declare module 'goog:goog.ui.media.GoogleVideo' {
    import alias = goog.ui.media.GoogleVideo;
    export default alias;
}

declare namespace goog.ui.media {
    /**
     * Subclasses a goog.ui.media.MediaRenderer to provide a GoogleVideo specific
     * media renderer.
     *
     * This class knows how to parse GoogleVideo URLs, and render the DOM structure
     * of GoogleVideo video players. This class is meant to be used as a singleton
     * static stateless class, that takes `goog.ui.media.Media` instances and
     * renders it. It expects `goog.ui.media.Media.getModel` to return a well
     * formed, previously constructed, GoogleVideo video id, which is the data model
     * this renderer will use to construct the DOM structure.
     * {@see goog.ui.media.GoogleVideo.newControl} for a example of constructing a
     * control with this renderer.
     *
     * This design is patterned after http://go/closure_control_subclassing
     *
     * It uses {@link goog.ui.media.FlashObject} to embed the flash object.
     *
     * @extends {goog.ui.media.MediaRenderer}
     * @final
     */
    class GoogleVideo extends __GoogleVideo {}
    abstract class __GoogleVideo extends goog.ui.media.__MediaRenderer {
        /**
         */
        constructor();
    }

    /**
     * The `goog.ui.media.GoogleVideo` media data model. It stores a required
     * `videoId` field, sets the GoogleVideo URL, and allows a few optional
     * parameters.
     *
     * @extends {goog.ui.media.MediaModel}
     * @final
     */
    class GoogleVideoModel extends __GoogleVideoModel {}
    abstract class __GoogleVideoModel extends goog.ui.media.__MediaModel {
        /**
         * @param {string} videoId The GoogleVideo video id.
         * @param {string=} opt_caption An optional caption of the GoogleVideo video.
         * @param {string=} opt_description An optional description of the GoogleVideo
         *     video.
         * @param {boolean=} opt_autoplay Whether to autoplay video.
         */
        constructor(videoId: string, opt_caption?: string, opt_description?: string, opt_autoplay?: boolean);

        /**
         * The GoogleVideo video id.
         * @type {string}
         * @private
         */
        private videoId_: string;

        /**
         * Gets the GoogleVideo video id.
         * @return {string} The GoogleVideo video id.
         */
        getVideoId(): string;
    }
}

declare namespace goog.ui.media.GoogleVideo {
    /**
     * A static convenient method to construct a goog.ui.media.Media control out of
     * a GoogleVideo model. It sets it as the data model goog.ui.media.GoogleVideo
     * renderer uses, sets the states supported by the renderer, and returns a
     * Control that binds everything together. This is what you should be using for
     * constructing GoogleVideo videos, except if you need finer control over the
     * configuration.
     *
     * @param {goog.ui.media.GoogleVideoModel} dataModel The GoogleVideo data model.
     * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
     *     document interaction.
     * @return {!goog.ui.media.Media} A Control binded to the GoogleVideo renderer.
     */
    function newControl(dataModel: goog.ui.media.GoogleVideoModel, opt_domHelper?: goog.dom.DomHelper):
        goog.ui.media.Media;

    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     *
     * @type {string}
     */
    let CSS_CLASS: string;
}

declare namespace goog.ui.media.GoogleVideoModel {
    /**
     * A auxiliary static method that parses a GoogleVideo URL, extracting the ID of
     * the video, and builds a GoogleVideoModel.
     *
     * @param {string} googleVideoUrl A GoogleVideo video URL.
     * @param {string=} opt_caption An optional caption of the GoogleVideo video.
     * @param {string=} opt_description An optional description of the GoogleVideo
     *     video.
     * @param {boolean=} opt_autoplay Whether to autoplay video.
     * @return {!goog.ui.media.GoogleVideoModel} The data model that represents the
     *     GoogleVideo URL.
     * @see goog.ui.media.GoogleVideoModel.getVideoId()
     * @throws Error in case the parsing fails.
     */
    function newInstance(
        googleVideoUrl: string, opt_caption?: string, opt_description?: string, opt_autoplay?: boolean
    ): goog.ui.media.GoogleVideoModel;

    /**
     * The opposite of `goog.ui.media.GoogleVideo.newInstance`: it takes a
     * videoId and returns a GoogleVideo URL.
     *
     * @param {string} videoId The GoogleVideo video ID.
     * @return {string} The GoogleVideo URL.
     */
    function buildUrl(videoId: string): string;

    /**
     * An auxiliary method that builds URL of the flash movie to be embedded,
     * out of the GoogleVideo video id.
     *
     * @param {string} videoId The GoogleVideo video ID.
     * @param {boolean=} opt_autoplay Whether the flash movie should start playing
     *     as soon as it is shown, or if it should show a 'play' button.
     * @return {!goog.html.TrustedResourceUrl} The flash URL to be embedded on the
     *     page.
     */
    function buildFlashUrl(videoId: string, opt_autoplay?: boolean): goog.html.TrustedResourceUrl;
}
