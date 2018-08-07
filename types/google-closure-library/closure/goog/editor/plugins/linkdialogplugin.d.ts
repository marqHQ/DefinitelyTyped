/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractdialogplugin.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../link.d.ts"/>
/// <reference path="../../html/safehtml.d.ts"/>
/// <reference path="../../ui/editor/linkdialog.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.editor.plugins.LinkDialogPlugin' {
    import alias = goog.editor.plugins.LinkDialogPlugin;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * A plugin that opens the link dialog.
     * @extends {goog.editor.plugins.AbstractDialogPlugin}
     */
    class LinkDialogPlugin extends __LinkDialogPlugin {}
    abstract class __LinkDialogPlugin extends goog.editor.plugins.__AbstractDialogPlugin {
        /**
         */
        constructor();

        /**
         * Event handler for this object.
         * @type {goog.events.EventHandler<!goog.editor.plugins.LinkDialogPlugin>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.editor.plugins.LinkDialogPlugin>;

        /**
         * A list of whitelisted URL schemes which are safe to open.
         * @type {Array<string>}
         * @private
         */
        private safeToOpenSchemes_: string[];

        /**
         * Link object that the dialog is editing.
         * @type {goog.editor.Link}
         * @protected
         */
        protected currentLink_: goog.editor.Link;

        /**
         * Optional warning to show about email addresses.
         * @type {goog.html.SafeHtml}
         * @private
         */
        private emailWarning_: goog.html.SafeHtml;

        /**
         * Whether to show a checkbox where the user can choose to have the link open in
         * a new window.
         * @type {boolean}
         * @private
         */
        private showOpenLinkInNewWindow_: boolean;

        /**
         * Whether the "open link in new window" checkbox should be checked when the
         * dialog is shown, and also whether it was checked last time the dialog was
         * closed.
         * @type {boolean}
         * @private
         */
        private isOpenLinkInNewWindowChecked_: boolean;

        /**
         * Weather to show a checkbox where the user can choose to add 'rel=nofollow'
         * attribute added to the link.
         * @type {boolean}
         * @private
         */
        private showRelNoFollow_: boolean;

        /**
         * Whether to stop referrer leaks.  Defaults to false.
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
         * Tells the plugin whether to block URLs with schemes not in the whitelist.
         * If blocking is enabled, this plugin will stop the 'Test Link' popup
         * window from being created. Blocking doesn't affect link creation--if the
         * user clicks the 'OK' button with an unsafe URL, the link will still be
         * created as normal.
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
         * Tells the dialog to show a checkbox where the user can choose to have the
         * link open in a new window.
         * @param {boolean} startChecked Whether to check the checkbox the first
         *     time the dialog is shown. Subesquent times the checkbox will remember its
         *     previous state.
         */
        showOpenLinkInNewWindow(startChecked: boolean): void;

        /**
         * Tells the dialog to show a checkbox where the user can choose to have
         * 'rel=nofollow' attribute added to the link.
         */
        showRelNoFollow(): void;

        /**
         * Returns whether the"open link in new window" checkbox was checked last time
         * the dialog was closed.
         * @return {boolean} Whether the"open link in new window" checkbox was checked
         *     last time the dialog was closed.
         */
        getOpenLinkInNewWindowCheckedState(): boolean;

        /**
         * Tells the plugin to stop leaking the page's url via the referrer header when
         * the "test this link" link is clicked. When the user clicks on a link, the
         * browser makes a request for the link url, passing the url of the current page
         * in the request headers. If the user wants the current url to be kept secret
         * (e.g. an unpublished document), the owner of the url that was clicked will
         * see the secret url in the request headers, and it will no longer be a secret.
         * Calling this method will not send a referrer header in the request, just as
         * if the user had opened a blank window and typed the url in themselves.
         */
        stopReferrerLeaks(): void;

        /**
         * Sets the warning message to show to users about including email addresses on
         * public web pages.
         * @param {!goog.html.SafeHtml} emailWarning Warning message to show users about
         *     including email addresses on the web.
         */
        setEmailWarning(emailWarning: goog.html.SafeHtml): void;

        /**
         * @return {goog.events.EventHandler<T>} The event handler.
         * @protected
         * @this {T}
         * @template T
         */
        protected getEventHandler(): goog.events.EventHandler<this>;

        /**
         * @return {goog.editor.Link} The link being edited.
         * @protected
         */
        protected getCurrentLink(): goog.editor.Link;

        /**
         * Handles the OK event from the dialog by updating the link in the field.
         * @param {goog.ui.editor.LinkDialog.OkEvent} e OK event object.
         * @protected
         */
        protected handleOk(e: goog.ui.editor.LinkDialog.OkEvent): void;

        /**
         * Apply the necessary properties to a link upon Ok being clicked in the dialog.
         * @param {HTMLAnchorElement} anchor The anchor to set properties on.
         * @param {goog.events.Event} e Event object.
         * @private
         */
        private touchUpAnchorOnOk_(anchor: HTMLAnchorElement, e: goog.events.Event): void;

        /**
         * Handles the CANCEL event from the dialog by clearing the anchor if needed.
         * @param {goog.events.Event} e Event object.
         * @private
         */
        private handleCancel_(e: goog.events.Event): void;

        /**
         * Handles the BeforeTestLink event fired when the 'test' link is clicked.
         * @param {goog.ui.editor.LinkDialog.BeforeTestLinkEvent} e BeforeTestLink event
         *     object.
         * @protected
         */
        protected handleBeforeTestLink(e: goog.ui.editor.LinkDialog.BeforeTestLinkEvent): void;

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
