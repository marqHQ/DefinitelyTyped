/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../safeurl.d.ts"/>
/// <reference path="../safehtml.d.ts"/>

declare module 'goog:goog.html.sanitizer.HtmlSanitizerUrlPolicy' {
    import alias = goog.html.sanitizer.HtmlSanitizerUrlPolicy;
    export default alias;
}

declare module 'goog:goog.html.sanitizer.HtmlSanitizerPolicyHints' {
    import alias = goog.html.sanitizer.HtmlSanitizerPolicyHints;
    export default alias;
}

declare module 'goog:goog.html.sanitizer.HtmlSanitizerPolicyContext' {
    import alias = goog.html.sanitizer.HtmlSanitizerPolicyContext;
    export default alias;
}

declare module 'goog:goog.html.sanitizer.HtmlSanitizerPolicy' {
    import alias = goog.html.sanitizer.HtmlSanitizerPolicy;
    export default alias;
}

declare module 'goog:goog.html.sanitizer.HtmlSanitizerAttributePolicy' {
    import alias = goog.html.sanitizer.HtmlSanitizerAttributePolicy;
    export default alias;
}

declare module 'goog:goog.html.sanitizer.HtmlSanitizer' {
    import alias = goog.html.sanitizer.HtmlSanitizer;
    export default alias;
}

declare module 'goog:goog.html.sanitizer.HtmlSanitizer.Builder' {
    import alias = goog.html.sanitizer.HtmlSanitizer.Builder;
    export default alias;
}

declare namespace goog.html.sanitizer {
    /**
     * Type for optional hints to policy handler functions.
     * @typedef {{
     *     tagName: (string|undefined),
     *     attributeName: (string|undefined),
     *     cssProperty: (string|undefined)
     *     }}
     */
    interface HtmlSanitizerPolicyHints {
        tagName: string|undefined;
        attributeName: string|undefined;
        cssProperty: string|undefined;
    }

    /**
     * Type for optional context objects to the policy handler functions.
     * @typedef {{
     *     cssStyle: (?CSSStyleDeclaration|undefined)
     *     }}
     */
    interface HtmlSanitizerPolicyContext {
        cssStyle: CSSStyleDeclaration|null|undefined;
    }

    /**
     * Type for a policy function.
     * @typedef {function(string, goog.html.sanitizer.HtmlSanitizerPolicyHints=,
     *     goog.html.sanitizer.HtmlSanitizerPolicyContext=,
     *     (function(string, ?=, ?=, ?=):?string)=):?string}
     */
    interface HtmlSanitizerPolicy {
        (_0: string,
         _1: goog.html.sanitizer.HtmlSanitizerPolicyHints,
         _2: goog.html.sanitizer.HtmlSanitizerPolicyContext,
         _3: ((_0: string, _1: any, _2: any, _3: any) => string | null)): string|null;
    }

    /**
     * Type for a URL policy function.
     *
     * @typedef {function(string, !goog.html.sanitizer.HtmlSanitizerPolicyHints=):
     *     ?goog.html.SafeUrl}
     */
    interface HtmlSanitizerUrlPolicy {
        (_0: string, _1: goog.html.sanitizer.HtmlSanitizerPolicyHints): goog.html.SafeUrl|null;
    }

    /**
     * Type for attribute policy configuration.
     * @typedef {{
     *     tagName: string,
     *     attributeName: string,
     *     policy: ?goog.html.sanitizer.HtmlSanitizerPolicy
     * }}
     */
    interface HtmlSanitizerAttributePolicy {
        tagName: string;
        attributeName: string;
        policy: goog.html.sanitizer.HtmlSanitizerPolicy|null;
    }

    /**
     * Whether the template tag is supported.
     * @package @const {boolean}
     */
    let HTML_SANITIZER_TEMPLATE_SUPPORTED: any /*missing*/;

    /**
     * Creates an HTML sanitizer.
     * @final @constructor @struct
     * @extends {goog.html.sanitizer.SafeDomTreeProcessor}
     */
    class HtmlSanitizer {
        /**
         * @param {!goog.html.sanitizer.HtmlSanitizer.Builder=} opt_builder
         */
        constructor(opt_builder?: goog.html.sanitizer.HtmlSanitizer.Builder)
    }
}

declare namespace goog.html.sanitizer.HtmlSanitizer {
    /**
     * The builder for the HTML Sanitizer. All methods except build return
     * `this`.
     * @final @constructor @struct
     */
    class Builder {}

    /**
     * Sanitizes a HTML string using a sanitizer with default options.
     * @param {string} unsanitizedHtml
     * @return {!goog.html.SafeHtml} sanitizedHtml
     */
    function sanitize(unsanitizedHtml: string): goog.html.SafeHtml;
}
