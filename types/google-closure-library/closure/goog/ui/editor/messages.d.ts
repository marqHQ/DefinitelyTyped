/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../html/safehtml.d.ts"/>

declare module 'goog:goog.ui.editor.messages' {
    export = goog.ui.editor.messages;
}

declare namespace goog.ui.editor.messages {
    /** @desc Link button / bubble caption. */
    let MSG_LINK_CAPTION: any /*missing*/;

    /** @desc Title for the dialog that edits a link. */
    let MSG_EDIT_LINK: any /*missing*/;

    /** @desc Prompt the user for the text of the link they've written. */
    let MSG_TEXT_TO_DISPLAY: any /*missing*/;

    /** @desc Prompt the user for the URL of the link they've created. */
    let MSG_LINK_TO: any /*missing*/;

    /** @desc Prompt the user to type a web address for their link. */
    let MSG_ON_THE_WEB: any /*missing*/;

    /** @desc More details on what linking to a web address involves.. */
    let MSG_ON_THE_WEB_TIP: any /*missing*/;

    /**
     * @desc Text for a button that allows the user to test the link that
     *     they created.
     */
    let MSG_TEST_THIS_LINK: any /*missing*/;

    /**
     * @return {!goog.html.SafeHtml} SafeHtml version of MSG_TR_LINK_EXPLANATION.
     */
    function getTrLinkExplanationSafeHtml(): goog.html.SafeHtml;

    /** @desc Prompt for the URL of a link that the user is creating. */
    let MSG_WHAT_URL: any /*missing*/;

    /**
     * @desc Prompt for an email address, so that the user can create a link
     *    that sends an email.
     */
    let MSG_EMAIL_ADDRESS: any /*missing*/;

    /**
     * @desc Explanation of the prompt for an email address in a link.
     */
    let MSG_EMAIL_ADDRESS_TIP: any /*missing*/;

    /** @desc Error message when the user enters an invalid email address. */
    let MSG_INVALID_EMAIL: any /*missing*/;

    /**
     * @desc When the user creates a mailto link, asks them what email
     *     address clicking on this link will send mail to.
     */
    let MSG_WHAT_EMAIL: any /*missing*/;

    /**
     * @return {!goog.html.SafeHtml} SafeHtml version of MSG_EMAIL_EXPLANATION.
     */
    function getEmailExplanationSafeHtml(): goog.html.SafeHtml;

    /**
     * @desc Label for the checkbox that allows the user to specify what when this
     *     link is clicked, it should be opened in a new window.
     */
    let MSG_OPEN_IN_NEW_WINDOW: any /*missing*/;

    /** @desc Image bubble caption. */
    let MSG_IMAGE_CAPTION: any /*missing*/;
}
