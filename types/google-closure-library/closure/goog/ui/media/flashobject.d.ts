/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../component.d.ts"/>
/// <reference path="../../html/trustedresourceurl.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../../structs/map.d.ts"/>
/// <reference path="../../log/log.d.ts"/>
/// <reference path="../../html/safehtml.d.ts"/>

declare module 'goog:goog.ui.media.FlashObject' {
    import alias = goog.ui.media.FlashObject;
    export default alias;
}

declare module 'goog:goog.ui.media.FlashObject.Wmodes' {
    import alias = goog.ui.media.FlashObject.Wmodes;
    export default alias;
}

declare module 'goog:goog.ui.media.FlashObject.ScriptAccessLevel' {
    import alias = goog.ui.media.FlashObject.ScriptAccessLevel;
    export default alias;
}

declare namespace goog.ui.media {
    /**
     * A very simple flash wrapper, that allows you to create flash object
     * programmatically, instead of embedding your own HTML. It extends
     * {@link goog.ui.Component}, which makes it very easy to be embedded on the
     * page.
     *
     * @extends {goog.ui.Component}
     */
    class FlashObject extends __FlashObject {}
    abstract class __FlashObject extends goog.ui.__Component {
        /**
         * @param {!goog.html.TrustedResourceUrl} flashUrl The Flash SWF URL.
         * @param {goog.dom.DomHelper=} opt_domHelper An optional DomHelper.
         */
        constructor(flashUrl: goog.html.TrustedResourceUrl, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The URL of the flash movie to be embedded.
         *
         * @type {!goog.html.TrustedResourceUrl}
         * @private
         */
        private flashUrl_: goog.html.TrustedResourceUrl;

        /**
         * An event handler used to handle events consistently between browsers.
         * @type {goog.events.EventHandler<!goog.ui.media.FlashObject>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.ui.media.FlashObject>;

        /**
         * A map of variables to be passed to the flash movie.
         *
         * @type {goog.structs.Map}
         * @private
         */
        private flashVars_: goog.structs.Map<any, any>;

        /**
         * A logger used for debugging.
         *
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * The wmode for the SWF.
         *
         * @type {goog.ui.media.FlashObject.Wmodes}
         * @private
         */
        private wmode_: goog.ui.media.FlashObject.Wmodes;

        /**
         * The minimum required flash version.
         *
         * @type {?string}
         * @private
         */
        private requiredVersion_: string|null;

        /**
         * The flash movie width.
         *
         * @type {string}
         * @private
         */
        private width_: string;

        /**
         * The flash movie height.
         *
         * @type {string}
         * @private
         */
        private height_: string;

        /**
         * The flash movie background color.
         *
         * @type {string}
         * @private
         */
        private backgroundColor_: string;

        /**
         * The flash movie allowScriptAccess setting.
         *
         * @type {string}
         * @private
         */
        private allowScriptAccess_: string;

        /**
         * Sets the flash movie Wmode.
         *
         * @param {goog.ui.media.FlashObject.Wmodes} wmode the flash movie Wmode.
         * @return {!goog.ui.media.FlashObject} The flash object instance for chaining.
         */
        setWmode(wmode: goog.ui.media.FlashObject.Wmodes): goog.ui.media.FlashObject;

        /**
         * @return {string} Returns the flash movie wmode.
         */
        getWmode(): string;

        /**
         * Adds flash variables.
         *
         * @param {goog.structs.Map|Object} map A key-value map of variables.
         * @return {!goog.ui.media.FlashObject} The flash object instance for chaining.
         */
        addFlashVars(map: goog.structs.Map<any, any>|Object): goog.ui.media.FlashObject;

        /**
         * Sets a flash variable.
         *
         * @param {string} key The name of the flash variable.
         * @param {string} value The value of the flash variable.
         * @return {!goog.ui.media.FlashObject} The flash object instance for chaining.
         */
        setFlashVar(key: string, value: string): goog.ui.media.FlashObject;

        /**
         * Sets flash variables. You can either pass a Map of key->value pairs or you
         * can pass a key, value pair to set a specific variable.
         *
         * TODO(user, martino): Get rid of this method.
         *
         * @deprecated Use {@link #addFlashVars} or {@link #setFlashVar} instead.
         * @param {goog.structs.Map|Object|string} flashVar A map of variables (given
         *    as a goog.structs.Map or an Object literal) or a key to the optional
         *    `opt_value`.
         * @param {string=} opt_value The optional value for the flashVar key.
         * @return {!goog.ui.media.FlashObject} The flash object instance for chaining.
         */
        setFlashVars(flashVar: goog.structs.Map<any, any>|Object|string, opt_value?: string): goog.ui.media.FlashObject;

        /**
         * @return {goog.structs.Map} The current flash variables.
         */
        getFlashVars(): goog.structs.Map<any, any>;

        /**
         * Sets the background color of the movie.
         *
         * @param {string} color The new color to be set.
         * @return {!goog.ui.media.FlashObject} The flash object instance for chaining.
         */
        setBackgroundColor(color: string): goog.ui.media.FlashObject;

        /**
         * @return {string} The background color of the movie.
         */
        getBackgroundColor(): string;

        /**
         * Sets the allowScriptAccess setting of the movie.
         *
         * @param {string} value The new value to be set.
         * @return {!goog.ui.media.FlashObject} The flash object instance for chaining.
         */
        setAllowScriptAccess(value: string): goog.ui.media.FlashObject;

        /**
         * @return {string} The allowScriptAccess setting color of the movie.
         */
        getAllowScriptAccess(): string;

        /**
         * Sets the width and height of the movie.
         *
         * @param {number|string} width The width of the movie.
         * @param {number|string} height The height of the movie.
         * @return {!goog.ui.media.FlashObject} The flash object instance for chaining.
         */
        setSize(width: number|string, height: number|string): goog.ui.media.FlashObject;

        /**
         * @return {?string} The flash required version.
         */
        getRequiredVersion(): string|null;

        /**
         * Sets the minimum flash required version.
         *
         * @param {?string} version The minimum required version for this movie to work,
         *     or null if you want to unset it.
         * @return {!goog.ui.media.FlashObject} The flash object instance for chaining.
         */
        setRequiredVersion(version: string|null): goog.ui.media.FlashObject;

        /**
         * Returns whether this SWF has a minimum required flash version.
         *
         * @return {boolean} Whether a required version was set or not.
         */
        hasRequiredVersion(): boolean;

        /**
         * Creates the HTML to embed the flash object.
         *
         * @return {!goog.html.SafeHtml} Browser appropriate HTML to add the SWF to the
         *     DOM.
         * @private
         */
        private createSwfTag_(): goog.html.SafeHtml;

        /**
         * Creates the HTML to embed the flash object for IE>=11 and other browsers.
         *
         * @param {string} flashVars The value of the FlashVars attribute.
         * @return {!goog.html.SafeHtml} Browser appropriate HTML to add the SWF to the
         *     DOM.
         * @private
         */
        private createSwfTagModern_(flashVars: string): goog.html.SafeHtml;

        /**
         * Creates the HTML to embed the flash object for IE<11.
         *
         * @param {string} flashVars The value of the FlashVars attribute.
         * @return {!goog.html.SafeHtml} Browser appropriate HTML to add the SWF to the
         *     DOM.
         * @private
         */
        private createSwfTagOldIe_(flashVars: string): goog.html.SafeHtml;

        /**
         * @return {HTMLObjectElement} The flash element or null if the element can't
         *     be found.
         */
        getFlashElement(): HTMLObjectElement;

        /**
         * @return {boolean} whether the SWF has finished loading or not.
         */
        isLoaded(): boolean;
    }
}

declare namespace goog.ui.media.FlashObject {
    /**
     * The different modes for displaying a SWF. Note that different wmodes
     * can result in different bugs in different browsers and also that
     * both OPAQUE and TRANSPARENT will result in a performance hit.
     *
     * @enum {string}
     */
    enum Wmodes { OPAQUE, TRANSPARENT, WINDOW }

    /**
     * The different levels of allowScriptAccess.
     *
     * Talked about at:
     * http://kb2.adobe.com/cps/164/tn_16494.html
     *
     * @enum {string}
     */
    enum ScriptAccessLevel { ALWAYS, SAME_DOMAIN, NEVER }

    /**
     * The component CSS namespace.
     *
     * @type {string}
     */
    let CSS_CLASS: string;

    /**
     * The flash object CSS class.
     *
     * @type {string}
     */
    let FLASH_CSS_CLASS: string;
}
