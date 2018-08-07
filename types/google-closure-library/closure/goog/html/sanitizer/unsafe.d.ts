/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../string/const.d.ts"/>
/// <reference path="./htmlsanitizer.d.ts"/>

declare module 'goog:goog.html.sanitizer.unsafe' {
    export = goog.html.sanitizer.unsafe;
}

declare namespace goog.html.sanitizer.unsafe {
    /**
     * Extends the tag whitelist with the list of tags provided.
     *
     * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
     * that the new tags do not introduce untrusted code execution or unsanctioned
     * network activity.
     *
     * @param {!goog.string.Const} justification A constant string explaining why
     *     the addition of these tags to the whitelist is safe. May include a
     *     security review ticket number.
     * @param {!goog.html.sanitizer.HtmlSanitizer.Builder} builder The builder
     *     whose tag whitelist should be extended.
     * @param {!Array<string>} tags A list of additional tags to allow through the
     *     sanitizer. Note that if the tag is also present in the blacklist,
     *     its addition to the whitelist has no effect. The tag names are
     *     case-insensitive.
     * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
     */
    function alsoAllowTags(
        justification: goog.string.Const, builder: goog.html.sanitizer.HtmlSanitizer.Builder, tags: string[]
    ): goog.html.sanitizer.HtmlSanitizer.Builder;

    /**
     * Installs custom attribute policies for the attributes provided in the list.
     * This can be used either on non-whitelisted attributes, effectively extending
     * the attribute whitelist, or on attributes that are whitelisted and already
     * have a policy, to override their policies.
     *
     * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
     * that the new tags do not introduce untrusted code execution or unsanctioned
     * network activity.
     *
     * @param {!goog.string.Const} justification A constant string explaining why
     *     the addition of these attributes to the whitelist is safe. May include a
     *     security review ticket number.
     * @param {!goog.html.sanitizer.HtmlSanitizer.Builder} builder The builder
     *     whose attribute whitelist should be extended.
     * @param {!Array<(string|!goog.html.sanitizer.HtmlSanitizerAttributePolicy)>}
     *     attrs A list of attributes whose policy should be overridden. Attributes
     *     can come in of two forms:
     *     - string: allow all values and just trim whitespaces for this attribute
     *         on all tags.
     *     - HtmlSanitizerAttributePolicy: allows specifying a policy for a
     *         particular tag. The tagName can be '*', which means all tags. If no
     *         policy is passed, the default is allow all values and just trim
     *         whitespaces.
     *     The tag and attribute names are case-insensitive.
     * @return {!goog.html.sanitizer.HtmlSanitizer.Builder}
     */
    function alsoAllowAttributes(
        justification: goog.string.Const,
        builder: goog.html.sanitizer.HtmlSanitizer.Builder,
        attrs: string|goog.html.sanitizer.HtmlSanitizerAttributePolicy[]
    ): goog.html.sanitizer.HtmlSanitizer.Builder;
}
