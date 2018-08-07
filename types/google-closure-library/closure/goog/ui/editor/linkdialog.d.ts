/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./abstractdialog.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../editor/link.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../../html/safehtml.d.ts"/>
/// <reference path="../../events/inputhandler.d.ts"/>
/// <reference path="./tabpane.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.ui.editor.LinkDialog' {
    import alias = goog.ui.editor.LinkDialog;
    export default alias;
}

declare module 'goog:goog.ui.editor.LinkDialog.OkEvent' {
    import alias = goog.ui.editor.LinkDialog.OkEvent;
    export default alias;
}

declare module 'goog:goog.ui.editor.LinkDialog.EventType' {
    import alias = goog.ui.editor.LinkDialog.EventType;
    export default alias;
}

declare module 'goog:goog.ui.editor.LinkDialog.BeforeTestLinkEvent' {
    import alias = goog.ui.editor.LinkDialog.BeforeTestLinkEvent;
    export default alias;
}

declare namespace goog.ui.editor {
    /**
     * A type of goog.ui.editor.AbstractDialog for editing/creating a link.
     * @extends {goog.ui.editor.AbstractDialog}
     * @final
     */
    class LinkDialog extends __LinkDialog {}
    abstract class __LinkDialog extends goog.ui.editor.__AbstractDialog {
        /**
         * @param {goog.dom.DomHelper} domHelper DomHelper to be used to create the
         *     dialog's dom structure.
         * @param {goog.editor.Link} link The target link.
         */
        constructor(domHelper: goog.dom.DomHelper, link: goog.editor.Link);

        /**
         * The link being modified by this dialog.
         * @type {goog.editor.Link}
         * @private
         */
        private targetLink_: goog.editor.Link;

        /**
         * The event handler for this dialog.
         * @type {goog.events.EventHandler<!goog.ui.editor.LinkDialog>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.ui.editor.LinkDialog>;

        /**
         * Optional warning to show about email addresses.
         * @type {goog.html.SafeHtml}
         * @private
         */
        private emailWarning_: goog.html.SafeHtml;

        /**
         * Whether to show a checkbox where the user can choose to have the link open
         * in a new window.
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
         * Whether to show a checkbox where the user can choose to have 'rel=nofollow'
         * attribute added to the link.
         * @type {boolean}
         * @private
         */
        private showRelNoFollow_: boolean;

        /**
         * InputHandler object to listen for changes in the url input field.
         * @type {goog.events.InputHandler}
         * @private
         */
        private urlInputHandler_: goog.events.InputHandler;

        /**
         * InputHandler object to listen for changes in the email input field.
         * @type {goog.events.InputHandler}
         * @private
         */
        private emailInputHandler_: goog.events.InputHandler;

        /**
         * InputHandler object to listen for changes in the text to display input
         * field.
         * @type {goog.events.InputHandler}
         * @private
         */
        private textInputHandler_: goog.events.InputHandler;

        /**
         * The tab bar where the url and email tabs are.
         * @type {goog.ui.editor.TabPane}
         * @private
         */
        private tabPane_: goog.ui.editor.TabPane;

        /**
         * The div element holding the link's display text input.
         * @type {HTMLDivElement}
         * @private
         */
        private textToDisplayDiv_: HTMLDivElement;

        /**
         * The input element holding the link's display text.
         * @type {HTMLInputElement}
         * @private
         */
        private textToDisplayInput_: HTMLInputElement;

        /**
         * Whether or not the feature of automatically generating the display text is
         * enabled.
         * @type {boolean}
         * @private
         */
        private autogenFeatureEnabled_: boolean;

        /**
         * Whether or not we should automatically generate the display text.
         * @type {boolean}
         * @private
         */
        private autogenerateTextToDisplay_: boolean;

        /**
         * Whether or not automatic generation of the display text is disabled.
         * @type {boolean}
         * @private
         */
        private disableAutogen_: boolean;

        /**
         * The input element (checkbox) to indicate that the link should open in a new
         * window.
         * @type {HTMLInputElement}
         * @private
         */
        private openInNewWindowCheckbox_: HTMLInputElement;

        /**
         * The input element (checkbox) to indicate that the link should have
         * 'rel=nofollow' attribute.
         * @type {HTMLInputElement}
         * @private
         */
        private relNoFollowCheckbox_: HTMLInputElement;

        /**
         * Whether to stop leaking the page's url via the referrer header when the
         * "test this link" link is clicked.
         * @type {boolean}
         * @private
         */
        private stopReferrerLeaks_: boolean;

        /**
         * Sets the warning message to show to users about including email addresses on
         * public web pages.
         * @param {!goog.html.SafeHtml} emailWarning Warning message to show users about
         *     including email addresses on the web.
         */
        setEmailWarning(emailWarning: goog.html.SafeHtml): void;

        /**
         * Tells the dialog to show a checkbox where the user can choose to have the
         * link open in a new window.
         * @param {boolean} startChecked Whether to check the checkbox the first
         *     time the dialog is shown. Subesquent times the checkbox will remember its
         *     previous state.
         */
        showOpenLinkInNewWindow(startChecked: boolean): void;

        /**
         * Tells the dialog to show a checkbox where the user can choose to add
         * 'rel=nofollow' attribute to the link.
         */
        showRelNoFollow(): void;

        /**
         * Tells the dialog whether to show the 'text to display' div.
         * When the target element of the dialog is an image, there is no link text
         * to modify. This function can be used for this kind of situations.
         * @param {boolean} visible Whether to make 'text to display' div visible.
         */
        setTextToDisplayVisible(visible: boolean): void;

        /**
         * Tells the plugin whether to stop leaking the page's url via the referrer
         * header when the "test this link" link is clicked.
         * @param {boolean} stop Whether to stop leaking the referrer.
         */
        setStopReferrerLeaks(stop: boolean): void;

        /**
         * Tells the dialog whether the autogeneration of text to display is to be
         * enabled.
         * @param {boolean} enable Whether to enable the feature.
         */
        setAutogenFeatureEnabled(enable: boolean): void;

        /**
         * Creates contents of this dialog.
         * @return {!Element} Contents of the dialog as a DOM element.
         * @private
         */
        private createDialogContent_(): Element;

        /**
         * Builds and returns the text to display section of the edit link dialog.
         * @return {!Element} A div element to be appended into the dialog div.
         * @private
         */
        private buildTextToDisplayDiv_(): Element;

        /**
         * Builds and returns the "checkbox to open the link in a new window" section of
         * the edit link dialog.
         * @return {!Element} A div element to be appended into the dialog div.
         * @private
         */
        private buildOpenInNewWindowDiv_(): Element;

        /**
         * Creates a DIV with a checkbox for {@code rel=nofollow} option.
         * @return {!Element} Newly created DIV element.
         * @private
         */
        private buildRelNoFollowDiv_(): Element;

        /**
         * Builds and returns the div containing the tab "On the web".
         * @return {!Element} The div element containing the tab.
         * @private
         */
        private buildTabOnTheWeb_(): Element;

        /**
         * Builds and returns the div containing the tab "Email address".
         * @return {!Element} the div element containing the tab.
         * @private
         */
        private buildTabEmailAddress_(): Element;

        /**
         * Returns the url that the target points to.
         * @return {string} The url that the target points to.
         * @private
         */
        private getTargetUrl_(): string;

        /**
         * Selects the correct tab based on the URL, and fills in its inputs.
         * For new links, it suggests a url based on the link text.
         * @param {string} text The inner text of the link.
         * @param {string} url The href for the link.
         * @private
         */
        private selectAppropriateTab_(text: string, url: string): void;

        /**
         * Select a url/tab based on the link's text. This function is simply
         * the isNewLink_() == true case of selectAppropriateTab_().
         * @param {string} text The inner text of the link.
         * @private
         */
        private guessUrlAndSelectTab_(text: string): void;

        /**
         * Called on a change to the url or email input. If either one of those tabs
         * is active, sets the OK button to enabled/disabled accordingly.
         * @private
         */
        private syncOkButton_(): void;

        /**
         * Show/hide the Invalid Email Address warning.
         * @param {boolean} on Whether to show the warning.
         * @private
         */
        private toggleInvalidEmailWarning_(on: boolean): void;

        /**
         * Changes the autogenerateTextToDisplay flag so that text to
         * display stops autogenerating.
         * @private
         */
        private onTextToDisplayEdit_(): void;

        /**
         * The function called when hitting OK with the "On the web" tab current.
         * @return {!goog.ui.editor.LinkDialog.OkEvent} The event object to be used when
         *     dispatching the OK event to listeners.
         * @private
         */
        private createOkEventFromWebTab_(): goog.ui.editor.LinkDialog.OkEvent;

        /**
         * The function called when hitting OK with the "email address" tab current.
         * @param {string=} opt_inputId Id of an alternate input to check.
         * @return {!goog.ui.editor.LinkDialog.OkEvent} The event object to be used when
         *     dispatching the OK event to listeners.
         * @private
         */
        private createOkEventFromEmailTab_(opt_inputId?: string): goog.ui.editor.LinkDialog.OkEvent;

        /**
         * Function to test a link from the on the web tab.
         * @private
         */
        private onWebTestLink_(): void;

        /**
         * Called whenever the url or email input is edited. If the text to display
         * matches the text to display, turn on auto. Otherwise if auto is on, update
         * the text to display based on the url.
         * @private
         */
        private onUrlOrEmailInputChange_(): void;

        /**
         * Called when the currently selected tab changes.
         * @param {goog.events.Event} e The tab change event.
         * @private
         */
        private onChangeTab_(e: goog.events.Event): void;

        /**
         * If autogen is turned on, set the value of text to display based on the
         * current selection or url.
         * @private
         */
        private setTextToDisplayFromAuto_(): void;

        /**
         * Turn on the autogenerate text to display flag, and set some sort of indicator
         * that autogen is on.
         * @param {boolean} val Boolean value to set autogenerate to.
         * @private
         */
        private setAutogenFlag_(val: boolean): void;

        /**
         * Disables autogen so that onUrlOrEmailInputChange_ doesn't act in cases
         * that are undesirable.
         * @param {boolean} autogen Boolean value to set disableAutogen to.
         * @private
         */
        private disableAutogenFlag_(autogen: boolean): void;

        /**
         * Creates an OK event from the text to display input and the specified link.
         * If text to display input is empty, then generate the auto value for it.
         * @return {!goog.ui.editor.LinkDialog.OkEvent} The event object to be used when
         *     dispatching the OK event to listeners.
         * @param {string} url Url the target element should point to.
         * @private
         */
        private createOkEventFromUrl_(url: string): goog.ui.editor.LinkDialog.OkEvent;

        /**
         * If an email or url is being edited, set autogenerate to on if the text to
         * display matches the url.
         * @private
         */
        private setAutogenFlagFromCurInput_(): void;

        /**
         * @return {boolean} Whether the link is new.
         * @private
         */
        private isNewLink_(): boolean;
    }
}

declare namespace goog.ui.editor.LinkDialog {
    /**
     * OK event object for the link dialog.
     * @extends {goog.events.Event}
     * @final
     */
    class OkEvent extends __OkEvent {}
    abstract class __OkEvent extends goog.events.__Event {
        /**
         * @param {string} linkText Text the user chose to display for the link.
         * @param {string} linkUrl Url the user chose for the link to point to.
         * @param {boolean} openInNewWindow Whether the link should open in a new window
         *     when clicked.
         * @param {boolean} noFollow Whether the link should have 'rel=nofollow'
         *     attribute.
         */
        constructor(linkText: string, linkUrl: string, openInNewWindow: boolean, noFollow: boolean);

        /**
         * The text of the link edited in the dialog.
         * @type {string}
         */
        linkText: string;

        /**
         * The url of the link edited in the dialog.
         * @type {string}
         */
        linkUrl: string;

        /**
         * Whether the link should open in a new window when clicked.
         * @type {boolean}
         */
        openInNewWindow: boolean;

        /**
         * Whether the link should have 'rel=nofollow' attribute.
         * @type {boolean}
         */
        noFollow: boolean;
    }

    /**
     * Event fired before testing a link by opening it in another window.
     * Calling preventDefault will stop the link from being opened.
     * @extends {goog.events.Event}
     * @final
     */
    class BeforeTestLinkEvent extends __BeforeTestLinkEvent {}
    abstract class __BeforeTestLinkEvent extends goog.events.__Event {
        /**
         * @param {string} url Url of the link being tested.
         */
        constructor(url: string);

        /**
         * The url of the link being tested.
         * @type {string}
         */
        url: string;
    }

    /**
     * Events specific to the link dialog.
     * @enum {string}
     */
    enum EventType { BEFORE_TEST_LINK }

    /**
     * Checks if `str` contains {@code "nofollow"} as a separate word.
     * @param {string} str String to be tested.  This is usually `rel`
     *     attribute of an `HTMLAnchorElement` object.
     * @return {boolean} `true` if `str` contains `nofollow`.
     */
    function hasNoFollow(str: string): boolean;

    /**
     * Removes {@code "nofollow"} from `rel` if it's present as a separate
     * word.
     * @param {string} rel Input string.  This is usually `rel` attribute of
     *     an `HTMLAnchorElement` object.
     * @return {string} `rel` with any {@code "nofollow"} removed.
     */
    function removeNoFollow(rel: string): string;
}
