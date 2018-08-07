/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractbubbleplugin.d.ts"/>
/// <reference path="../../events/browserevent.d.ts"/>

declare module 'goog:goog.editor.plugins.LinkBubble' {
    import alias = goog.editor.plugins.LinkBubble;
    export default alias;
}

declare module 'goog:goog.editor.plugins.LinkBubble.Action' {
    import alias = goog.editor.plugins.LinkBubble.Action;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Property bubble plugin for links.
     * @extends {goog.editor.plugins.AbstractBubblePlugin}
     */
    class LinkBubble extends __LinkBubble {}
    abstract class __LinkBubble extends goog.editor.plugins.__AbstractBubblePlugin {
        /**
         * @param {...!goog.editor.plugins.LinkBubble.Action} var_args List of
         *     extra actions supported by the bubble.
         */
        constructor(...var_args: goog.editor.plugins.LinkBubble.Action[]);

        /**
         * List of extra actions supported by the bubble.
         * @type {Array<!goog.editor.plugins.LinkBubble.Action>}
         * @private
         */
        private extraActions_: goog.editor.plugins.LinkBubble.Action[];

        /**
         * List of spans corresponding to the extra actions.
         * @type {Array<!Element>}
         * @private
         */
        private actionSpans_: Element[];

        /**
         * A list of whitelisted URL schemes which are safe to open.
         * @type {Array<string>}
         * @private
         */
        private safeToOpenSchemes_: string[];

        /**
         * Whether to stop leaking the page's url via the referrer header when the
         * link text link is clicked.
         * @type {boolean}
         * @private
         */
        private stopReferrerLeaks_: boolean;

        /**
         * Whether to block opening links with a non-whitelisted URL scheme.
         * @type {boolean}
         * @private
         */
        private blockOpeningUnsafeSchemes_: boolean;

        /**
         * Tells the plugin to stop leaking the page's url via the referrer header when
         * the link text link is clicked. When the user clicks on a link, the
         * browser makes a request for the link url, passing the url of the current page
         * in the request headers. If the user wants the current url to be kept secret
         * (e.g. an unpublished document), the owner of the url that was clicked will
         * see the secret url in the request headers, and it will no longer be a secret.
         * Calling this method will not send a referrer header in the request, just as
         * if the user had opened a blank window and typed the url in themselves.
         */
        stopReferrerLeaks(): void;

        /**
         * Tells the plugin whether to block URLs with schemes not in the whitelist.
         * If blocking is enabled, this plugin will not linkify the link in the bubble
         * popup.
         * @param {boolean} blockOpeningUnsafeSchemes Whether to block non-whitelisted
         *     schemes.
         */
        setBlockOpeningUnsafeSchemes(blockOpeningUnsafeSchemes: boolean): void;

        /**
         * Sets a whitelist of allowed URL schemes that are safe to open.
         * Schemes should all be in lowercase. If the plugin is set to block opening
         * unsafe schemes, user-entered URLs will be converted to lowercase and checked
         * against this list. The whitelist has no effect if blocking is not enabled.
         * @param {Array<string>} schemes String array of URL schemes to allow (http,
         *     https, etc.).
         */
        setSafeToOpenSchemes(schemes: string[]): void;

        /**
         * Updates the href in the link bubble with a new link.
         * @private
         */
        private updateLink_(): void;

        /**
         * Set the optional function for getting the "test" link of a url.
         * @param {function(string) : string} func The function to use.
         */
        setTestLinkUrlFn(func: (_0: string) => string): void;

        /**
         * Returns the target element url for the bubble.
         * @return {string} The url href.
         * @protected
         */
        protected getTargetUrl(): string;

        /**
         * Returns the message to display for testing a link.
         * @return {string} The message for testing a link.
         * @protected
         */
        protected getTestLinkMessage(): string;

        /**
         * Tests the link by opening it in a new tab/window. Should be used as the
         * click event handler for the test pseudo-link.
         * @param {!Event=} opt_event If passed in, the event will be stopped.
         * @protected
         */
        protected testLink(opt_event?: Event): void;

        /**
         * Returns whether the URL should be considered invalid.  This always returns
         * false in the base class, and should be overridden by subclasses that wish
         * to impose validity rules on URLs.
         * @param {string} url The url to check.
         * @return {boolean} Whether the URL should be considered invalid.
         */
        isInvalidUrl(url: string): boolean;

        /**
         * Gets the text to display for a link, based on the type of link
         * @return {!Object} Returns an object of the form:
         *     {linkText: displayTextForLinkTarget, valid: ifTheLinkIsValid}.
         * @private
         */
        private getLinkToTextObj_(): Object;

        /**
         * Shows the link dialog.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private showLinkDialog_(e: goog.events.BrowserEvent): void;

        /**
         * Deletes the link associated with the bubble
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private deleteLink_(e: goog.events.BrowserEvent): void;

        /**
         * Gets the url for the bubble test link.  The test link is the link in the
         * bubble the user can click on to make sure the link they entered is correct.
         * @return {string} The url for the bubble link href.
         * @private
         */
        private getTestLinkAction_(): string;

        /**
         * Checks whether the plugin should open the given url in a new window.
         * @param {string} url The url to check.
         * @return {boolean} If the plugin should open the given url in a new window.
         * @protected
         */
        protected shouldOpenUrl(url: string): boolean;

        /**
         * Determines whether or not a url has a scheme which is safe to open.
         * Schemes like javascript are unsafe due to the possibility of XSS.
         * @param {string} url A url.
         * @return {boolean} Whether the url has a safe scheme.
         * @private
         */
        private isSafeSchemeToOpen_(url: string): boolean;
    }
}

declare namespace goog.editor.plugins.LinkBubble {
    /**
     * Constructor for extra actions that can be added to the link bubble.
     * @final
     */
    class Action extends __Action {}
    abstract class __Action {
        /**
         * @param {string} spanId The ID for the span showing the action.
         * @param {string} linkId The ID for the link showing the action.
         * @param {string} message The text for the link showing the action.
         * @param {function(string):boolean} toShowFn Test function to determine whether
         *     to show the action for the given URL.
         * @param {function(string):void} actionFn Action function to run when the
         *     action is clicked.  Takes the current target URL as a parameter.
         */
        constructor(
            spanId: string,
            linkId: string,
            message: string,
            toShowFn: (_0: string) => boolean,
            actionFn: (_0: string) => void
        );
    }

    /**
     * @desc Text label for link that lets the user click it to see where the link
     *     this bubble is for point to.
     */
    let MSG_LINK_BUBBLE_TEST_LINK: any /*missing*/;

    /**
     * @desc Label that pops up a dialog to change the link.
     */
    let MSG_LINK_BUBBLE_CHANGE: any /*missing*/;

    /**
     * @desc Label that allow the user to remove this link.
     */
    let MSG_LINK_BUBBLE_REMOVE: any /*missing*/;

    /**
     * @desc Message shown in a link bubble when the link is not a valid url.
     */
    let MSG_INVALID_URL_LINK_BUBBLE: any /*missing*/;
}
