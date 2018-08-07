/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../math/size.d.ts"/>
/// <reference path="../../html/trustedresourceurl.d.ts"/>

declare module 'goog:goog.ui.media.MediaModel' {
    import alias = goog.ui.media.MediaModel;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.Thumbnail' {
    import alias = goog.ui.media.MediaModel.Thumbnail;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.SubTitle' {
    import alias = goog.ui.media.MediaModel.SubTitle;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.Player' {
    import alias = goog.ui.media.MediaModel.Player;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.MimeType' {
    import alias = goog.ui.media.MediaModel.MimeType;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.Medium' {
    import alias = goog.ui.media.MediaModel.Medium;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.Credit' {
    import alias = goog.ui.media.MediaModel.Credit;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.Credit.Scheme' {
    import alias = goog.ui.media.MediaModel.Credit.Scheme;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.Credit.Role' {
    import alias = goog.ui.media.MediaModel.Credit.Role;
    export default alias;
}

declare module 'goog:goog.ui.media.MediaModel.Category' {
    import alias = goog.ui.media.MediaModel.Category;
    export default alias;
}

declare namespace goog.ui.media {
    /**
     * An base data value class for all media data models.
     *
     * MediaModels are exact matches to the fields defined in the Yahoo RSS media
     * specification {@link http://search.yahoo.com/mrss/}.
     *
     * The current common data shared by medias is to have URLs, mime types,
     * captions, descriptions, thumbnails and players. Some of these may not be
     * available, or applications may not want to render them, so `null`
     * values are allowed. `goog.ui.media.MediaRenderer` checks whether the
     * values are available before creating DOMs for them.
     *
     */
    class MediaModel extends __MediaModel {}
    abstract class __MediaModel {
        /**
         * @param {string=} opt_url An optional URL of the media.
         * @param {string=} opt_caption An optional caption of the media.
         * @param {string=} opt_description An optional description of the media.
         * @param {goog.ui.media.MediaModel.MimeType=} opt_type The type of the media.
         * @param {goog.ui.media.MediaModel.Medium=} opt_medium The medium of the media.
         * @param {number=} opt_duration The duration of the media in seconds.
         * @param {number=} opt_width The width of the media in pixels.
         * @param {number=} opt_height The height of the media in pixels.
         */
        constructor(
            opt_url?: string,
            opt_caption?: string,
            opt_description?: string,
            opt_type?: goog.ui.media.MediaModel.MimeType,
            opt_medium?: goog.ui.media.MediaModel.Medium,
            opt_duration?: number,
            opt_width?: number,
            opt_height?: number
        );

        /**
         * The URL of the media.
         * @type {string|undefined}
         * @private
         */
        private url_: string|undefined;

        /**
         * The caption of the media.
         * @type {string|undefined}
         * @private
         */
        private caption_: string|undefined;

        /**
         * A description of the media, typically user generated comments about it.
         * @type {string|undefined}
         * @private
         */
        private description_: string|undefined;

        /**
         * The mime type of the media.
         * @type {goog.ui.media.MediaModel.MimeType|undefined}
         * @private
         */
        private type_: goog.ui.media.MediaModel.MimeType|undefined;

        /**
         * The medium of the media.
         * @type {goog.ui.media.MediaModel.Medium|undefined}
         * @private
         */
        private medium_: goog.ui.media.MediaModel.Medium|undefined;

        /**
         * The duration of the media in seconds.
         * @type {number|undefined}
         * @private
         */
        private duration_: number|undefined;

        /**
         * The width of the media in pixels.
         * @type {number|undefined}
         * @private
         */
        private width_: number|undefined;

        /**
         * The height of the media in pixels.
         * @type {number|undefined}
         * @private
         */
        private height_: number|undefined;

        /**
         * A list of thumbnails representations of the media (eg different sizes of
         * the same photo, etc).
         * @type {Array<goog.ui.media.MediaModel.Thumbnail>}
         * @private
         */
        private thumbnails_: goog.ui.media.MediaModel.Thumbnail[];

        /**
         * The list of categories that are applied to this media.
         * @type {Array<goog.ui.media.MediaModel.Category>}
         * @private
         */
        private categories_: goog.ui.media.MediaModel.Category[];

        /**
         * The list of credits that pertain to this media object.
         * @type {!Array<goog.ui.media.MediaModel.Credit>}
         * @private
         */
        private credits_: goog.ui.media.MediaModel.Credit[];

        /**
         * The list of subtitles for the media object.
         * @type {Array<goog.ui.media.MediaModel.SubTitle>}
         * @private
         */
        private subTitles_: goog.ui.media.MediaModel.SubTitle[];

        /**
         * The media player.
         * @type {goog.ui.media.MediaModel.Player}
         * @private
         */
        private player_: goog.ui.media.MediaModel.Player;

        /**
         * Gets the URL of this media.
         * @return {string|undefined} The URL of the media.
         */
        getUrl(): string|undefined;

        /**
         * Sets the URL of this media.
         * @param {string} url The URL of the media.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setUrl(url: string): goog.ui.media.MediaModel;

        /**
         * Gets the caption of this media.
         * @return {string|undefined} The caption of the media.
         */
        getCaption(): string|undefined;

        /**
         * Sets the caption of this media.
         * @param {string} caption The caption of the media.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setCaption(caption: string): goog.ui.media.MediaModel;

        /**
         * Gets the media mime type.
         * @return {goog.ui.media.MediaModel.MimeType|undefined} The media mime type.
         */
        getType(): goog.ui.media.MediaModel.MimeType|undefined;

        /**
         * Sets the media mime type.
         * @param {goog.ui.media.MediaModel.MimeType} type The media mime type.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setType(type: goog.ui.media.MediaModel.MimeType): goog.ui.media.MediaModel;

        /**
         * Gets the media medium.
         * @return {goog.ui.media.MediaModel.Medium|undefined} The media medium.
         */
        getMedium(): goog.ui.media.MediaModel.Medium|undefined;

        /**
         * Sets the media medium.
         * @param {goog.ui.media.MediaModel.Medium} medium The media medium.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setMedium(medium: goog.ui.media.MediaModel.Medium): goog.ui.media.MediaModel;

        /**
         * Gets the description of this media.
         * @return {string|undefined} The description of the media.
         */
        getDescription(): string|undefined;

        /**
         * Sets the description of this media.
         * @param {string} description The description of the media.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setDescription(description: string): goog.ui.media.MediaModel;

        /**
         * Gets the thumbnail urls.
         * @return {Array<goog.ui.media.MediaModel.Thumbnail>} The list of thumbnails.
         */
        getThumbnails(): goog.ui.media.MediaModel.Thumbnail[];

        /**
         * Sets the thumbnail list.
         * @param {Array<goog.ui.media.MediaModel.Thumbnail>} thumbnails The list of
         *     thumbnail.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setThumbnails(thumbnails: goog.ui.media.MediaModel.Thumbnail[]): goog.ui.media.MediaModel;

        /**
         * Gets the duration of the media.
         * @return {number|undefined} The duration in seconds.
         */
        getDuration(): number|undefined;

        /**
         * Sets duration of the media.
         * @param {number} duration The duration of the media, in seconds.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setDuration(duration: number): goog.ui.media.MediaModel;

        /**
         * Gets the width of the media in pixels.
         * @return {number|undefined} The width in pixels.
         */
        getWidth(): number|undefined;

        /**
         * Sets the width of the media.
         * @param {number} width The width of the media, in pixels.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setWidth(width: number): goog.ui.media.MediaModel;

        /**
         * Gets the height of the media in pixels.
         * @return {number|undefined} The height in pixels.
         */
        getHeight(): number|undefined;

        /**
         * Sets the height of the media.
         * @param {number} height The height of the media, in pixels.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setHeight(height: number): goog.ui.media.MediaModel;

        /**
         * Gets the player data.
         * @return {goog.ui.media.MediaModel.Player|undefined} The media player data.
         */
        getPlayer(): goog.ui.media.MediaModel.Player|undefined;

        /**
         * Sets the player data.
         * @param {goog.ui.media.MediaModel.Player} player The media player data.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setPlayer(player: goog.ui.media.MediaModel.Player): goog.ui.media.MediaModel;

        /**
         * Gets the categories of the media.
         * @return {Array<goog.ui.media.MediaModel.Category>} The categories of the
         *     media.
         */
        getCategories(): goog.ui.media.MediaModel.Category[];

        /**
         * Sets the categories of the media
         * @param {Array<goog.ui.media.MediaModel.Category>} categories The categories
         *     of the media.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setCategories(categories: goog.ui.media.MediaModel.Category[]): goog.ui.media.MediaModel;

        /**
         * Finds the first category with the given scheme.
         * @param {string} scheme The scheme to search for.
         * @return {goog.ui.media.MediaModel.Category} The category that has the
         *     given scheme. May be null.
         */
        findCategoryWithScheme(scheme: string): goog.ui.media.MediaModel.Category;

        /**
         * Gets the credits of the media.
         * @return {!Array<goog.ui.media.MediaModel.Credit>} The credits of the media.
         */
        getCredits(): goog.ui.media.MediaModel.Credit[];

        /**
         * Sets the credits of the media
         * @param {!Array<goog.ui.media.MediaModel.Credit>} credits The credits of the
         *     media.
         * @return {!goog.ui.media.MediaModel} The object itself, used for chaining.
         */
        setCredits(credits: goog.ui.media.MediaModel.Credit[]): goog.ui.media.MediaModel;

        /**
         * Finds all credits with the given role.
         * @param {string} role The role to search for.
         * @return {!Array<!goog.ui.media.MediaModel.Credit>} An array of credits
         *     with the given role. May be empty.
         */
        findCreditsWithRole(role: string): goog.ui.media.MediaModel.Credit[];

        /**
         * Gets the subtitles for the media.
         * @return {Array<goog.ui.media.MediaModel.SubTitle>} The subtitles.
         */
        getSubTitles(): goog.ui.media.MediaModel.SubTitle[];

        /**
         * Sets the subtitles for the media
         * @param {Array<goog.ui.media.MediaModel.SubTitle>} subtitles The subtitles.
         * @return {!goog.ui.media.MediaModel} The object itself.
         */
        setSubTitles(subtitles: goog.ui.media.MediaModel.SubTitle[]): goog.ui.media.MediaModel;
    }
}

declare namespace goog.ui.media.MediaModel {
    /**
     * Constructs a thumbnail containing details of the thumbnail's image URL and
     * optionally its size.
     * @final
     */
    class Thumbnail extends __Thumbnail {}
    abstract class __Thumbnail {
        /**
         * @param {string} url The URL of the thumbnail's image.
         * @param {goog.math.Size=} opt_size The size of the thumbnail's image if known.
         */
        constructor(url: string, opt_size?: goog.math.Size);

        /**
         * The thumbnail's image URL.
         * @type {string}
         * @private
         */
        private url_: string;

        /**
         * The size of the thumbnail's image if known.
         * @type {goog.math.Size}
         * @private
         */
        private size_: goog.math.Size;

        /**
         * Gets the thumbnail URL.
         * @return {string} The thumbnail's image URL.
         */
        getUrl(): string;

        /**
         * Sets the thumbnail URL.
         * @param {string} url The thumbnail's image URL.
         * @return {!goog.ui.media.MediaModel.Thumbnail} The object itself, used for
         *     chaining.
         */
        setUrl(url: string): goog.ui.media.MediaModel.Thumbnail;

        /**
         * Gets the thumbnail size.
         * @return {goog.math.Size} The size of the thumbnail's image if known.
         */
        getSize(): goog.math.Size;

        /**
         * Sets the thumbnail size.
         * @param {goog.math.Size} size The size of the thumbnail's image.
         * @return {!goog.ui.media.MediaModel.Thumbnail} The object itself, used for
         *     chaining.
         */
        setSize(size: goog.math.Size): goog.ui.media.MediaModel.Thumbnail;
    }

    /**
     * Constructs a player containing details of the player's URL and
     * optionally its size.
     * @final
     */
    class Player extends __Player {}
    abstract class __Player {
        /**
         * @param {!goog.html.TrustedResourceUrl} url The URL of the player.
         * @param {Object=} opt_vars Optional map of arguments to the player.
         * @param {goog.math.Size=} opt_size The size of the player if known.
         */
        constructor(url: goog.html.TrustedResourceUrl, opt_vars?: Object, opt_size?: goog.math.Size);

        /**
         * The player's URL.
         * @type {!goog.html.TrustedResourceUrl}
         * @private
         */
        private trustedResourceUrl_: goog.html.TrustedResourceUrl;

        /**
         * Player arguments, typically flash arguments.
         * @type {Object}
         * @private
         */
        private vars_: Object;

        /**
         * The size of the player if known.
         * @type {goog.math.Size}
         * @private
         */
        private size_: goog.math.Size;

        /**
         * Gets the player URL.
         * @return {!goog.html.TrustedResourceUrl} The player's URL.
         */
        getTrustedResourceUrl(): goog.html.TrustedResourceUrl;

        /**
         * Gets the player URL.
         * @return {string} The player's URL.
         */
        getUrl(): string;

        /**
         * Sets the player URL.
         * @param {!goog.html.TrustedResourceUrl} url The player's URL.
         * @return {!goog.ui.media.MediaModel.Player} The object itself, used for
         *     chaining.
         */
        setUrl(url: goog.html.TrustedResourceUrl): goog.ui.media.MediaModel.Player;

        /**
         * Gets the player arguments.
         * @return {Object} The media player arguments.
         */
        getVars(): Object;

        /**
         * Sets the player arguments.
         * @param {Object} vars The media player arguments.
         * @return {!goog.ui.media.MediaModel.Player} The object itself, used for
         *     chaining.
         */
        setVars(vars: Object): goog.ui.media.MediaModel.Player;

        /**
         * Gets the size of the player.
         * @return {goog.math.Size} The size of the player if known.
         */
        getSize(): goog.math.Size;

        /**
         * Sets the size of the player.
         * @param {goog.math.Size} size The size of the player.
         * @return {!goog.ui.media.MediaModel.Player} The object itself, used for
         *     chaining.
         */
        setSize(size: goog.math.Size): goog.ui.media.MediaModel.Player;
    }

    /**
     * A taxonomy to be set that gives an indication of the type of media content,
     * and its particular contents.
     * @final
     */
    class Category extends __Category {}
    abstract class __Category {
        /**
         * @param {string} scheme The URI that identifies the categorization scheme.
         * @param {string} value The value of the category.
         * @param {string=} opt_label The human readable label that can be displayed in
         *     end user applications.
         */
        constructor(scheme: string, value: string, opt_label?: string);

        /**
         * The URI that identifies the categorization scheme.
         * @type {string}
         * @private
         */
        private scheme_: string;

        /**
         * The value of the category.
         * @type {string}
         * @private
         */
        private value_: string;

        /**
         * The human readable label that can be displayed in end user applications.
         * @type {string}
         * @private
         */
        private label_: string;

        /**
         * Gets the category scheme.
         * @return {string} The category scheme URI.
         */
        getScheme(): string;

        /**
         * Sets the category scheme.
         * @param {string} scheme The category's scheme.
         * @return {!goog.ui.media.MediaModel.Category} The object itself, used for
         *     chaining.
         */
        setScheme(scheme: string): goog.ui.media.MediaModel.Category;

        /**
         * Gets the categor's value.
         * @return {string} The category's value.
         */
        getValue(): string;

        /**
         * Sets the category value.
         * @param {string} value The category value to be set.
         * @return {!goog.ui.media.MediaModel.Category} The object itself, used for
         *     chaining.
         */
        setValue(value: string): goog.ui.media.MediaModel.Category;

        /**
         * Gets the label of the category.
         * @return {string} The label of the category.
         */
        getLabel(): string;

        /**
         * Sets the label of the category.
         * @param {string} label The label of the category.
         * @return {!goog.ui.media.MediaModel.Category} The object itself, used for
         *     chaining.
         */
        setLabel(label: string): goog.ui.media.MediaModel.Category;
    }

    /**
     * Indicates an entity that has contributed to a media object. Based on
     * 'media.credit' in the rss spec.
     * @final
     */
    class Credit extends __Credit {}
    abstract class __Credit {
        /**
         * @param {string} value The name of the entity being credited.
         * @param {goog.ui.media.MediaModel.Credit.Role=} opt_role The role the entity
         *     played.
         * @param {goog.ui.media.MediaModel.Credit.Scheme=} opt_scheme The URI that
         *     identifies the role scheme.
         */
        constructor(
            value: string,
            opt_role?: goog.ui.media.MediaModel.Credit.Role,
            opt_scheme?: goog.ui.media.MediaModel.Credit.Scheme
        );

        /**
         * The name of entity being credited.
         * @type {string}
         * @private
         */
        private value_: string;

        /**
         * The role the entity played.
         * @type {goog.ui.media.MediaModel.Credit.Role|undefined}
         * @private
         */
        private role_: goog.ui.media.MediaModel.Credit.Role|undefined;

        /**
         * The URI that identifies the role scheme
         * @type {goog.ui.media.MediaModel.Credit.Scheme|undefined}
         * @private
         */
        private scheme_: goog.ui.media.MediaModel.Credit.Scheme|undefined;

        /**
         * Gets the name of the entity being credited.
         * @return {string} The name of the entity.
         */
        getValue(): string;

        /**
         * Sets the value of the credit object.
         * @param {string} value The value.
         * @return {!goog.ui.media.MediaModel.Credit} The object itself.
         */
        setValue(value: string): goog.ui.media.MediaModel.Credit;

        /**
         * Gets the role of the entity being credited.
         * @return {goog.ui.media.MediaModel.Credit.Role|undefined} The role of the
         *     entity.
         */
        getRole(): goog.ui.media.MediaModel.Credit.Role|undefined;

        /**
         * Sets the role of the credit object.
         * @param {goog.ui.media.MediaModel.Credit.Role} role The role.
         * @return {!goog.ui.media.MediaModel.Credit} The object itself.
         */
        setRole(role: goog.ui.media.MediaModel.Credit.Role): goog.ui.media.MediaModel.Credit;

        /**
         * Gets the scheme of the credit object.
         * @return {goog.ui.media.MediaModel.Credit.Scheme|undefined} The URI that
         *     identifies the role scheme.
         */
        getScheme(): goog.ui.media.MediaModel.Credit.Scheme|undefined;

        /**
         * Sets the scheme of the credit object.
         * @param {goog.ui.media.MediaModel.Credit.Scheme} scheme The scheme.
         * @return {!goog.ui.media.MediaModel.Credit} The object itself.
         */
        setScheme(scheme: goog.ui.media.MediaModel.Credit.Scheme): goog.ui.media.MediaModel.Credit;
    }

    /**
     * A reference to the subtitle URI for a media object.
     * Implements the 'media.subTitle' in the rss spec.
     *
     * @final
     */
    class SubTitle extends __SubTitle {}
    abstract class __SubTitle {
        /**
         * @param {string} href The subtitle's URI.
         *     to fetch the subtitle file.
         * @param {string} lang An RFC 3066 language.
         * @param {string} type The MIME type of the URI.
         */
        constructor(href: string, lang: string, type: string);

        /**
         * The subtitle href.
         * @type {string}
         * @private
         */
        private href_: string;

        /**
         * The RFC 3066 language.
         * @type {string}
         * @private
         */
        private lang_: string;

        /**
         * The MIME type of the resource.
         * @type {string}
         * @private
         */
        private type_: string;

        /**
         * Sets the href for the subtitle object.
         * @param {string} href The subtitle's URI.
         * @return {!goog.ui.media.MediaModel.SubTitle} The object itself.
         */
        setHref(href: string): goog.ui.media.MediaModel.SubTitle;

        /**
         * Get the href for the subtitle object.
         * @return {string} href The subtitle's URI.
         */
        getHref(): string;

        /**
         * Sets the language for the subtitle object.
         * @param {string} lang The RFC 3066 language.
         * @return {!goog.ui.media.MediaModel.SubTitle} The object itself.
         */
        setLang(lang: string): goog.ui.media.MediaModel.SubTitle;

        /**
         * Get the lang for the subtitle object.
         * @return {string} lang The RFC 3066 language.
         */
        getLang(): string;

        /**
         * Sets the type for the subtitle object.
         * @param {string} type The MIME type.
         * @return {!goog.ui.media.MediaModel.SubTitle} The object itself.
         */
        setType(type: string): goog.ui.media.MediaModel.SubTitle;

        /**
         * Get the type for the subtitle object.
         * @return {string} type The MIME type.
         */
        getType(): string;
    }

    /**
     * The supported media mime types, a subset of the media types found here:
     * {@link http://www.iana.org/assignments/media-types/} and here
     * {@link http://en.wikipedia.org/wiki/Internet_media_type}
     * @enum {string}
     */
    enum MimeType { HTML, PLAIN, FLASH, JPEG, GIF, PNG }

    /**
     * Supported mediums, found here:
     * {@link http://video.search.yahoo.com/mrss}
     * @enum {string}
     */
    enum Medium { IMAGE, AUDIO, VIDEO, DOCUMENT, EXECUTABLE }
}

declare namespace goog.ui.media.MediaModel.Credit {
    /**
     * The types of known roles.
     * @enum {string}
     */
    enum Role { UPLOADER, OWNER }

    /**
     * The types of known schemes.
     * @enum {string}
     */
    enum Scheme { EUROPEAN_BROADCASTING, YAHOO, YOUTUBE }
}
