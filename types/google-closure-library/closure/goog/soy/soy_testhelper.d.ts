/// <reference path="../../../globals.d.ts"/>
/// <reference path="./data.d.ts"/>

/**
 * Instantiable subclass of SanitizedContent.
 *
 * This is a spoof for sanitized content that isn't robust enough to get
 * through Soy's escaping functions but is good enough for the checks here.
 *
 * @constructor
 * @param {string} content The text.
 * @param {goog.soy.data.SanitizedContentKind} kind The kind of safe content.
 * @extends {goog.soy.data.SanitizedContent}
 * @suppress {missingProvide}
 */
declare class SanitizedContentSubclass extends __SanitizedContentSubclass {}
declare abstract class __SanitizedContentSubclass extends goog.soy.data.SanitizedContent {
    constructor(content: string, kind: goog.soy.data.SanitizedContentKind)
}

declare namespace example {
    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {?Object<string, *>=} opt_injectedData
     * @return {string}
     */
    function textNodeTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}|null):
        string;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {?Object<string, *>=} opt_injectedData
     * @return {string}
     */
    function singleRootTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}|null):
        string;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {?Object<string, *>=} opt_injectedData
     * @return {string}
     */
    function multiRootTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}|null):
        string;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {?Object<string, *>=} opt_injectedData
     * @return {string}
     */
    function injectedDataTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}|null):
        string;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {Object<string, *>=} opt_injectedData
     * @return {string}
     */
    function noDataTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}): string;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {Object<string, *>=} opt_injectedData
     * @return {!SanitizedContentSubclass}
     */
    function sanitizedHtmlTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}):
        SanitizedContentSubclass;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {Object<string, *>=} opt_injectedData
     * @return {!SanitizedContentSubclass}
     */
    function sanitizedHtmlAttributesTemplate(
        data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}
    ): SanitizedContentSubclass;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {?Object<string, *>=} opt_injectedData
     * @return {!SanitizedContentSubclass}
     */
    function sanitizedSmsUrlTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}|null):
        SanitizedContentSubclass;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {?Object<string, *>=} opt_injectedData
     * @return {!SanitizedContentSubclass}
     */
    function sanitizedHttpUrlTemplate(
        data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}|null
    ): SanitizedContentSubclass;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {?Object<string, *>=} opt_injectedData
     * @return {!goog.soy.data.SanitizedTrustedResourceUri}
     */
    function sanitizedTrustedResourceUriTemplate(
        data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}|null
    ): goog.soy.data.SanitizedTrustedResourceUri;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {Object<string, *>=} opt_injectedData
     * @return {!goog.soy.data.SanitizedCss}
     */
    function sanitizedCssTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}):
        goog.soy.data.SanitizedCss;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {Object<string, *>=} opt_injectedData
     * @return {!SanitizedContentSubclass}
     */
    function unsanitizedTextTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}):
        SanitizedContentSubclass;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {?Object<string, *>=} opt_injectedData
     * @return {!SanitizedContentSubclass}
     */
    function sanitizedUriTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}|null):
        SanitizedContentSubclass;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {Object<string, *>=} opt_injectedData
     * @return {!SanitizedContentSubclass}
     */
    function templateSpoofingSanitizedContentString(
        data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}
    ): SanitizedContentSubclass;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {Object<string, *>=} opt_injectedData
     * @return {string}
     */
    function tableRowTemplate(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}): string;

    /**
     * @param {{name: string}} data
     * @param {null=} opt_sb
     * @param {Object<string, *>=} opt_injectedData
     * @return {string}
     */
    function colGroupTemplateCaps(data: {name: string}, opt_sb?: null, opt_injectedData?: {[key: string]: any}): string;
}
