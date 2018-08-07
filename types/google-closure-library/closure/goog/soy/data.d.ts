/// <reference path="../../../globals.d.ts"/>
/// <reference path="../i18n/bidi.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>
/// <reference path="../html/safeurl.d.ts"/>
/// <reference path="../html/trustedresourceurl.d.ts"/>
/// <reference path="../html/safestylesheet.d.ts"/>

declare module 'goog:goog.soy.data.UnsanitizedText' {
    import alias = goog.soy.data.UnsanitizedText;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedUri' {
    import alias = goog.soy.data.SanitizedUri;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedTrustedResourceUri' {
    import alias = goog.soy.data.SanitizedTrustedResourceUri;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedStyle' {
    import alias = goog.soy.data.SanitizedStyle;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedJs' {
    import alias = goog.soy.data.SanitizedJs;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedHtmlAttribute' {
    import alias = goog.soy.data.SanitizedHtmlAttribute;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedHtml' {
    import alias = goog.soy.data.SanitizedHtml;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedCss' {
    import alias = goog.soy.data.SanitizedCss;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedContentKind' {
    import alias = goog.soy.data.SanitizedContentKind;
    export default alias;
}

declare module 'goog:goog.soy.data.SanitizedContent' {
    import alias = goog.soy.data.SanitizedContent;
    export default alias;
}

declare namespace goog.soy.data {
    /**
     * A string-like object that carries a content-type and a content direction.
     *
     * IMPORTANT! Do not create these directly, nor instantiate the subclasses.
     * Instead, use a trusted, centrally reviewed library as endorsed by your team
     * to generate these objects. Otherwise, you risk accidentally creating
     * SanitizedContent that is attacker-controlled and gets evaluated unescaped in
     * templates.
     *
     */
    class SanitizedContent extends __SanitizedContent {}
    abstract class __SanitizedContent {
        /**
         */
        constructor();

        /**
         * The context in which this content is safe from XSS attacks.
         * @type {goog.soy.data.SanitizedContentKind}
         */
        contentKind: goog.soy.data.SanitizedContentKind;

        /**
         * The content's direction; null if unknown and thus to be estimated when
         * necessary.
         * @type {?goog.i18n.bidi.Dir}
         */
        contentDir: goog.i18n.bidi.Dir|null;

        /**
         * The already-safe content.
         * @protected {string}
         */
        protected content: any /*missing*/;

        /**
         * Gets the already-safe content.
         * @return {string}
         */
        getContent(): string;

        /**
         * Converts sanitized content of kind TEXT or HTML into SafeHtml. HTML content
         * is converted without modification, while text content is HTML-escaped.
         * @return {!goog.html.SafeHtml}
         * @throws {Error} when the content kind is not TEXT or HTML.
         */
        toSafeHtml(): goog.html.SafeHtml;

        /**
         * Converts sanitized content of kind URI into SafeUrl without modification.
         * @return {!goog.html.SafeUrl}
         * @throws {Error} when the content kind is not URI.
         */
        toSafeUrl(): goog.html.SafeUrl;
    }

    /**
     * Unsanitized plain text string.
     *
     * While all strings are effectively safe to use as a plain text, there are no
     * guarantees about safety in any other context such as HTML. This is
     * sometimes used to mark that should never be used unescaped.
     *
     * @extends {goog.soy.data.SanitizedContent}
     */
    class UnsanitizedText extends __UnsanitizedText {}
    abstract class __UnsanitizedText extends goog.soy.data.__SanitizedContent {
        /**
         * @param {*} content Plain text with no guarantees.
         * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction; null if
         *     unknown and thus to be estimated when necessary. Default: null.
         */
        constructor(content: any, opt_contentDir?: goog.i18n.bidi.Dir|null);
    }

    /**
     * Content of type {@link goog.soy.data.SanitizedContentKind.HTML}.
     *
     * The content is a string of HTML that can safely be embedded in a PCDATA
     * context in your app.  If you would be surprised to find that an HTML
     * sanitizer produced `s` (e.g.  it runs code or fetches bad URLs) and
     * you wouldn't write a template that produces `s` on security or privacy
     * grounds, then don't pass `s` here. The default content direction is
     * unknown, i.e. to be estimated when necessary.
     *
     * @extends {goog.soy.data.SanitizedContent}
     */
    class SanitizedHtml extends __SanitizedHtml {}
    abstract class __SanitizedHtml extends goog.soy.data.__SanitizedContent {
        /**
         */
        constructor();
    }

    /**
     * Content of type {@link goog.soy.data.SanitizedContentKind.JS}.
     *
     * The content is JavaScript source that when evaluated does not execute any
     * attacker-controlled scripts. The content direction is LTR.
     *
     * @extends {goog.soy.data.SanitizedContent}
     */
    class SanitizedJs extends __SanitizedJs {}
    abstract class __SanitizedJs extends goog.soy.data.__SanitizedContent {
        /**
         */
        constructor();
    }

    /**
     * Content of type {@link goog.soy.data.SanitizedContentKind.URI}.
     *
     * The content is a URI chunk that the caller knows is safe to emit in a
     * template. The content direction is LTR.
     *
     * @extends {goog.soy.data.SanitizedContent}
     */
    class SanitizedUri extends __SanitizedUri {}
    abstract class __SanitizedUri extends goog.soy.data.__SanitizedContent {
        /**
         */
        constructor();
    }

    /**
     * Content of type
     * {@link goog.soy.data.SanitizedContentKind.TRUSTED_RESOURCE_URI}.
     *
     * The content is a TrustedResourceUri chunk that is not under attacker control.
     * The content direction is LTR.
     *
     * @extends {goog.soy.data.SanitizedContent}
     */
    class SanitizedTrustedResourceUri extends __SanitizedTrustedResourceUri {}
    abstract class __SanitizedTrustedResourceUri extends goog.soy.data.__SanitizedContent {
        /**
         */
        constructor();

        /**
         * Converts sanitized content into TrustedResourceUrl without modification.
         * @return {!goog.html.TrustedResourceUrl}
         */
        toTrustedResourceUrl(): goog.html.TrustedResourceUrl;
    }

    /**
     * Content of type {@link goog.soy.data.SanitizedContentKind.ATTRIBUTES}.
     *
     * The content should be safely embeddable within an open tag, such as a
     * key="value" pair. The content direction is LTR.
     *
     * @extends {goog.soy.data.SanitizedContent}
     */
    class SanitizedHtmlAttribute extends __SanitizedHtmlAttribute {}
    abstract class __SanitizedHtmlAttribute extends goog.soy.data.__SanitizedContent {
        /**
         */
        constructor();
    }

    /**
     * Content of type {@link goog.soy.data.SanitizedContentKind.STYLE}.
     *
     * The content is non-attacker-exploitable CSS, such as `color:#c3d9ff`.
     * The content direction is LTR.
     *
     * @extends {goog.soy.data.SanitizedContent}
     */
    class SanitizedStyle extends __SanitizedStyle {}
    abstract class __SanitizedStyle extends goog.soy.data.__SanitizedContent {
        /**
         */
        constructor();
    }

    /**
     * Content of type {@link goog.soy.data.SanitizedContentKind.CSS}.
     *
     * The content is non-attacker-exploitable CSS, such as {@code @import url(x)}.
     * The content direction is LTR.
     *
     * @extends {goog.soy.data.SanitizedContent}
     */
    class SanitizedCss extends __SanitizedCss {}
    abstract class __SanitizedCss extends goog.soy.data.__SanitizedContent {
        /**
         */
        constructor();

        /**
         * Converts SanitizedCss into SafeStyleSheet.
         * Note: SanitizedCss in Soy represents both SafeStyle and SafeStyleSheet in
         * Closure. It's about to be split so that SanitizedCss represents only
         * SafeStyleSheet.
         * @return {!goog.html.SafeStyleSheet}
         */
        toSafeStyleSheet(): goog.html.SafeStyleSheet;
    }

    /**
     * A type of textual content.
     *
     * This is an enum of type Object so that these values are unforgeable.
     *
     * @enum {!Object}
     */
    enum SanitizedContentKind { HTML, JS, URI, TRUSTED_RESOURCE_URI, ATTRIBUTES, STYLE, CSS, TEXT }
}

declare namespace goog.soy.data.SanitizedHtml {
    /**
     * Checks if the value could be used as the Soy type {html}.
     * @param {*} value
     * @return {boolean}
     */
    function isCompatibleWith(value: any): boolean;
}

declare namespace goog.soy.data.SanitizedJs {
    /**
     * Checks if the value could be used as the Soy type {js}.
     * @param {*} value
     * @return {boolean}
     */
    function isCompatibleWith(value: any): boolean;
}

declare namespace goog.soy.data.SanitizedUri {
    /**
     * Checks if the value could be used as the Soy type {uri}.
     * @param {*} value
     * @return {boolean}
     */
    function isCompatibleWith(value: any): boolean;
}

declare namespace goog.soy.data.SanitizedTrustedResourceUri {
    /**
     * Checks if the value could be used as the Soy type {trusted_resource_uri}.
     * @param {*} value
     * @return {boolean}
     */
    function isCompatibleWith(value: any): boolean;
}

declare namespace goog.soy.data.SanitizedHtmlAttribute {
    /**
     * Checks if the value could be used as the Soy type {attribute}.
     * @param {*} value
     * @return {boolean}
     */
    function isCompatibleWith(value: any): boolean;
}

declare namespace goog.soy.data.SanitizedStyle {
    /**
     * Checks if the value could be used as the Soy type {css}.
     * @param {*} value
     * @return {boolean}
     */
    function isCompatibleWith(value: any): boolean;
}

declare namespace goog.soy.data.SanitizedCss {
    /**
     * Checks if the value could be used as the Soy type {css}.
     * @param {*} value
     * @return {boolean}
     */
    function isCompatibleWith(value: any): boolean;
}
