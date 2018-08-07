/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./media.d.ts"/>
/// <reference path="./mediamodel.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../html/trustedresourceurl.d.ts"/>

declare module 'goog:goog.ui.media.VimeoModel' {
    import alias = goog.ui.media.VimeoModel;
    export default alias;
}

declare module 'goog:goog.ui.media.Vimeo' {
    import alias = goog.ui.media.Vimeo;
    export default alias;
}

declare namespace goog.ui.media {
    /**
     * Subclasses a goog.ui.media.MediaRenderer to provide a Vimeo specific media
     * renderer.
     *
     * This class knows how to parse Vimeo URLs, and render the DOM structure
     * of vimeo video players. This class is meant to be used as a singleton static
     * stateless class, that takes `goog.ui.media.Media` instances and renders
     * it. It expects `goog.ui.media.Media.getModel` to return a well formed,
     * previously constructed, vimeoId {@see goog.ui.media.Vimeo.parseUrl}, which is
     * the data model this renderer will use to construct the DOM structure.
     * {@see goog.ui.media.Vimeo.newControl} for a example of constructing a control
     * with this renderer.
     *
     * This design is patterned after http://go/closure_control_subclassing
     *
     * It uses {@link goog.ui.media.FlashObject} to embed the flash object.
     *
     * @extends {goog.ui.media.MediaRenderer}
     * @final
     */
    class Vimeo extends __Vimeo {}
    abstract class __Vimeo extends goog.ui.media.__MediaRenderer {
        /**
         */
        constructor();
    }

    /**
     * The `goog.ui.media.Vimeo` media data model. It stores a required
     * `videoId` field, sets the vimeo URL, and allows a few optional
     * parameters.
     *
     * @extends {goog.ui.media.MediaModel}
     * @final
     */
    class VimeoModel extends __VimeoModel {}
    abstract class __VimeoModel extends goog.ui.media.__MediaModel {
        /**
         * @param {string} videoId The vimeo video id.
         * @param {string=} opt_caption An optional caption of the vimeo video.
         * @param {string=} opt_description An optional description of the vimeo video.
         * @param {boolean=} opt_autoplay Whether to autoplay video.
         */
        constructor(videoId: string, opt_caption?: string, opt_description?: string, opt_autoplay?: boolean);

        /**
         * The Vimeo video id.
         * @type {string}
         * @private
         */
        private videoId_: string;

        /**
         * Gets the Vimeo video id.
         * @return {string} The Vimeo video id.
         */
        getVideoId(): string;
    }
}

declare namespace goog.ui.media.Vimeo {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     *
     * @type {string}
     */
    let CSS_CLASS: string;

    /**
     * A static convenient method to construct a goog.ui.media.Media control out of
     * a Vimeo URL. It extracts the videoId information on the URL, sets it
     * as the data model goog.ui.media.Vimeo renderer uses, sets the states
     * supported by the renderer, and returns a Control that binds everything
     * together. This is what you should be using for constructing Vimeo videos,
     * except if you need more fine control over the configuration.
     *
     * @param {goog.ui.media.VimeoModel} dataModel A vimeo video URL.
     * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
     *     document interaction.
     * @return {!goog.ui.media.Media} A Control binded to the Vimeo renderer.
     */
    function newControl(dataModel: goog.ui.media.VimeoModel, opt_domHelper?: goog.dom.DomHelper): goog.ui.media.Media;
}

declare namespace goog.ui.media.VimeoModel {
    /**
     * Takes a `vimeoUrl` and extracts the video id.
     *
     * @param {string} vimeoUrl A vimeo video URL.
     * @param {string=} opt_caption An optional caption of the vimeo video.
     * @param {string=} opt_description An optional description of the vimeo video.
     * @param {boolean=} opt_autoplay Whether to autoplay video.
     * @return {!goog.ui.media.VimeoModel} The vimeo data model that represents this
     *     URL.
     * @throws exception in case the parsing fails
     */
    function newInstance(vimeoUrl: string, opt_caption?: string, opt_description?: string, opt_autoplay?: boolean):
        goog.ui.media.VimeoModel;

    /**
     * The opposite of `goog.ui.media.Vimeo.parseUrl`: it takes a videoId
     * and returns a vimeo URL.
     *
     * @param {string} videoId The vimeo video ID.
     * @return {string} The vimeo URL.
     */
    function buildUrl(videoId: string): string;

    /**
     * Builds a flash url from the vimeo `videoId`.
     *
     * @param {string} videoId The vimeo video ID.
     * @param {boolean=} opt_autoplay Whether the flash movie should start playing
     *     as soon as it is shown, or if it should show a 'play' button.
     * @return {!goog.html.TrustedResourceUrl} The vimeo flash URL.
     */
    function buildFlashUrl(videoId: string, opt_autoplay?: boolean): goog.html.TrustedResourceUrl;
}
