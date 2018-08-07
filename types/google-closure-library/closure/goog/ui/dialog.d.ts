/// <reference path="../../../globals.d.ts"/>
/// <reference path="./modalpopup.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>
/// <reference path="../fx/dragger.d.ts"/>
/// <reference path="../a11y/aria/roles.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../structs/map.d.ts"/>

declare module 'goog:goog.ui.Dialog' {
    import alias = goog.ui.Dialog;
    export default alias;
}

declare module 'goog:goog.ui.Dialog.EventType' {
    import alias = goog.ui.Dialog.EventType;
    export default alias;
}

declare module 'goog:goog.ui.Dialog.Event' {
    import alias = goog.ui.Dialog.Event;
    export default alias;
}

declare module 'goog:goog.ui.Dialog.DefaultButtonKeys' {
    import alias = goog.ui.Dialog.DefaultButtonKeys;
    export default alias;
}

declare module 'goog:goog.ui.Dialog.DefaultButtonCaptions' {
    import alias = goog.ui.Dialog.DefaultButtonCaptions;
    export default alias;
}

declare module 'goog:goog.ui.Dialog.ButtonSet' {
    import alias = goog.ui.Dialog.ButtonSet;
    export default alias;
}

declare module 'goog:goog.ui.Dialog.ButtonSet.DefaultButtons' {
    import alias = goog.ui.Dialog.ButtonSet.DefaultButtons;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class for showing simple dialog boxes.
     * The Html structure of the dialog box is:
     * <pre>
     *  Element         Function                Class-name, modal-dialog = default
     * ----------------------------------------------------------------------------
     * - iframe         Iframe mask              modal-dialog-bg
     * - div            Background mask          modal-dialog-bg
     * - div            Dialog area              modal-dialog
     *     - div        Title bar                modal-dialog-title
     *        - span                             modal-dialog-title-text
     *          - text  Title text               N/A
     *        - span                             modal-dialog-title-close
     *          - ??    Close box                N/A
     *     - div        Content area             modal-dialog-content
     *        - ??      User specified content   N/A
     *     - div        Button area              modal-dialog-buttons
     *        - button                           N/A
     *        - button
     *        - ...
     * </pre>
     * @extends {goog.ui.ModalPopup}
     */
    class Dialog extends __Dialog {}
    abstract class __Dialog extends goog.ui.__ModalPopup {
        /**
         * @param {string=} opt_class CSS class name for the dialog element, also used
         *     as a class name prefix for related elements; defaults to modal-dialog.
         *     This should be a single, valid CSS class name.
         * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
         *     issue by using an iframe instead of a div for bg element.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
         *     goog.ui.Component} for semantics.
         */
        constructor(opt_class?: string, opt_useIframeMask?: boolean, opt_domHelper?: goog.dom.DomHelper);

        /**
         * CSS class name for the dialog element, also used as a class name prefix for
         * related elements.  Defaults to goog.getCssName('modal-dialog').
         * @type {string}
         * @private
         */
        private class_: string;

        /**
         * Button set.  Default to Ok/Cancel.
         * @type {goog.ui.Dialog.ButtonSet}
         * @private
         */
        private buttons_: goog.ui.Dialog.ButtonSet;

        /**
         * Whether the escape key closes this dialog.
         * @type {boolean}
         * @private
         */
        private escapeToCancel_: boolean;

        /**
         * Whether this dialog should include a title close button.
         * @type {boolean}
         * @private
         */
        private hasTitleCloseButton_: boolean;

        /**
         * Whether the dialog is modal. Defaults to true.
         * @type {boolean}
         * @private
         */
        private modal_: boolean;

        /**
         * Whether the dialog is draggable. Defaults to true.
         * @type {boolean}
         * @private
         */
        private draggable_: boolean;

        /**
         * Opacity for background mask.  Defaults to 50%.
         * @type {number}
         * @private
         */
        private backgroundElementOpacity_: number;

        /**
         * Dialog's title.
         * @type {string}
         * @private
         */
        private title_: string;

        /**
         * Dialog's content (HTML).
         * @type {goog.html.SafeHtml}
         * @private
         */
        private content_: goog.html.SafeHtml;

        /**
         * Dragger.
         * @type {goog.fx.Dragger}
         * @private
         */
        private dragger_: goog.fx.Dragger;

        /**
         * Whether the dialog should be disposed when it is hidden.
         * @type {boolean}
         * @private
         */
        private disposeOnHide_: boolean;

        /**
         * Element for the title bar.
         * @type {Element}
         * @private
         */
        private titleEl_: Element;

        /**
         * Element for the text area of the title bar.
         * @type {Element}
         * @private
         */
        private titleTextEl_: Element;

        /**
         * Id of element for the text area of the title bar.
         * @type {?string}
         * @private
         */
        private titleTextId_: string|null;

        /**
         * Element for the close box area of the title bar.
         * @type {Element}
         * @private
         */
        private titleCloseEl_: Element;

        /**
         * Element for the content area.
         * @type {Element}
         * @private
         */
        private contentEl_: Element;

        /**
         * Element for the button bar.
         * @type {Element}
         * @private
         */
        private buttonEl_: Element;

        /**
         * The dialog's preferred ARIA role.
         * @type {goog.a11y.aria.Role}
         * @private
         */
        private preferredAriaRole_: goog.a11y.aria.Role;

        /**
         * Sets the title.
         * @param {string} title The title text.
         */
        setTitle(title: string): void;

        /**
         * Gets the title.
         * @return {string} The title.
         */
        getTitle(): string;

        /**
         * Allows plain text to be set in the content element.
         * @param {string} text Content plain text. Newlines are preserved.
         */
        setTextContent(text: string): void;

        /**
         * Allows arbitrary HTML to be set in the content element.
         * @param {!goog.html.SafeHtml} html Content HTML.
         */
        setSafeHtmlContent(html: goog.html.SafeHtml): void;

        /**
         * Gets the content HTML of the content element as a plain string.
         *
         * Note that this method returns the HTML markup that was previously set via
         * setContent(). In particular, the HTML returned by this method does not
         * reflect any changes to the content element's DOM that were made my means
         * other than setContent().
         *
         * @return {string} Content HTML.
         */
        getContent(): string;

        /**
         * Gets the content HTML of the content element.
         * @return {goog.html.SafeHtml} Content HTML.
         */
        getSafeHtmlContent(): goog.html.SafeHtml;

        /**
         * Returns the dialog's preferred ARIA role. This can be used to override the
         * default dialog role, e.g. with an ARIA role of ALERTDIALOG for a simple
         * warning or confirmation dialog.
         * @return {goog.a11y.aria.Role} This dialog's preferred ARIA role.
         */
        getPreferredAriaRole(): goog.a11y.aria.Role;

        /**
         * Sets the dialog's preferred ARIA role. This can be used to override the
         * default dialog role, e.g. with an ARIA role of ALERTDIALOG for a simple
         * warning or confirmation dialog.
         * @param {goog.a11y.aria.Role} role This dialog's preferred ARIA role.
         */
        setPreferredAriaRole(role: goog.a11y.aria.Role): void;

        /**
         * Renders if the DOM is not created.
         * @private
         */
        private renderIfNoDom_(): void;

        /**
         * Returns the title element so that more complicated things can be done with
         * the title.  Renders if the DOM is not yet created.
         * @return {Element} The title element.
         */
        getTitleElement(): Element;

        /**
         * Returns the title text element so that more complicated things can be done
         * with the text of the title.  Renders if the DOM is not yet created.
         * @return {Element} The title text element.
         */
        getTitleTextElement(): Element;

        /**
         * Returns the title close element so that more complicated things can be done
         * with the close area of the title.  Renders if the DOM is not yet created.
         * @return {Element} The close box.
         */
        getTitleCloseElement(): Element;

        /**
         * Returns the button element so that more complicated things can be done with
         * the button area.  Renders if the DOM is not yet created.
         * @return {Element} The button container element.
         */
        getButtonElement(): Element;

        /**
         * Returns the dialog element so that more complicated things can be done with
         * the dialog box.  Renders if the DOM is not yet created.
         * @return {Element} The dialog element.
         */
        getDialogElement(): Element;

        /**
         * Gets the opacity of the background mask.
         * @return {number} Background mask opacity.
         */
        getBackgroundElementOpacity(): number;

        /**
         * Sets the opacity of the background mask.
         * @param {number} opacity Background mask opacity.
         */
        setBackgroundElementOpacity(opacity: number): void;

        /**
         * Sets the modal property of the dialog. In case the dialog is already
         * inDocument, renders the modal background elements according to the specified
         * modal parameter.
         *
         * Note that non-modal dialogs cannot use an iframe mask.
         *
         * @param {boolean} modal Whether the dialog is modal.
         */
        setModal(modal: boolean): void;

        /**
         * Sets the modal property of the dialog.
         * @param {boolean} modal Whether the dialog is modal.
         * @private
         */
        private setModalInternal_(modal: boolean): void;

        /**
         * @return {boolean} modal Whether the dialog is modal.
         */
        getModal(): boolean;

        /**
         * @return {string} The CSS class name for the dialog element.
         */
        getClass(): string;

        /**
         * Sets whether the dialog can be dragged.
         * @param {boolean} draggable Whether the dialog can be dragged.
         */
        setDraggable(draggable: boolean): void;

        /**
         * Returns a dragger for moving the dialog and adds a class for the move cursor.
         * Defaults to allow dragging of the title only, but can be overridden if
         * different drag targets or dragging behavior is desired.
         * @return {!goog.fx.Dragger} The created dragger instance.
         * @protected
         */
        protected createDragger(): goog.fx.Dragger;

        /**
         * @return {boolean} Whether the dialog is draggable.
         */
        getDraggable(): boolean;

        /**
         * Enables or disables dragging.
         * @param {boolean} enabled Whether to enable it.
         * @private
         */
        private setDraggingEnabled_(enabled: boolean): void;

        /**
         * Sets dragger limits when dragging is started.
         * @param {!goog.events.Event} e goog.fx.Dragger.EventType.START event.
         * @private
         */
        private setDraggerLimits_(e: goog.events.Event): void;

        /**
         * Handles a click on the title close area.
         * @param {goog.events.BrowserEvent} e Browser's event object.
         * @private
         */
        private onTitleCloseClick_(e: goog.events.BrowserEvent): void;

        /**
         * Performs the action of closing the dialog in response to the title close
         * button being interacted with. General purpose method to be called by click
         * and button event handlers.
         * @private
         */
        private handleTitleClose_(): void;

        /**
         * @return {boolean} Whether this dialog has a title close button.
         */
        getHasTitleCloseButton(): boolean;

        /**
         * Sets whether the dialog should have a close button in the title bar. There
         * will always be an element for the title close button, but setting this
         * parameter to false will cause it to be hidden and have no active listener.
         * @param {boolean} b Whether this dialog should have a title close button.
         */
        setHasTitleCloseButton(b: boolean): void;

        /**
         * @return {boolean} Whether the escape key should close this dialog.
         */
        isEscapeToCancel(): boolean;

        /**
         * @param {boolean} b Whether the escape key should close this dialog.
         */
        setEscapeToCancel(b: boolean): void;

        /**
         * Sets whether the dialog should be disposed when it is hidden.  By default
         * dialogs are not disposed when they are hidden.
         * @param {boolean} b Whether the dialog should get disposed when it gets
         *     hidden.
         */
        setDisposeOnHide(b: boolean): void;

        /**
         * @return {boolean} Whether the dialog should be disposed when it is hidden.
         */
        getDisposeOnHide(): boolean;

        /**
         * Sets the button set to use.
         * Note: Passing in null will cause no button set to be rendered.
         * @param {goog.ui.Dialog.ButtonSet?} buttons The button set to use.
         */
        setButtonSet(buttons: goog.ui.Dialog.ButtonSet|null): void;

        /**
         * Returns the button set being used.
         * @return {goog.ui.Dialog.ButtonSet?} The button set being used.
         */
        getButtonSet(): goog.ui.Dialog.ButtonSet|null;

        /**
         * Handles a click on the button container.
         * @param {goog.events.BrowserEvent} e Browser's event object.
         * @private
         */
        private onButtonClick_(e: goog.events.BrowserEvent): void;

        /**
         * Finds the parent button of an element (or null if there was no button
         * parent).
         * @param {Element} element The element that was clicked on.
         * @return {Element} Returns the parent button or null if not found.
         * @private
         */
        private findParentButton_(element: Element): Element;

        /**
         * Handles keydown and keypress events, and dismisses the popup if cancel is
         * pressed.  If there is a cancel action in the ButtonSet, than that will be
         * fired.  Also prevents tabbing out of the dialog.
         * @param {goog.events.BrowserEvent} e Browser's event object.
         * @private
         */
        private onKey_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.ui.Dialog {
    /**
     * Dialog event class.
     * @extends {goog.events.Event}
     */
    class Event extends __Event {}
    abstract class __Event extends goog.events.__Event {
        /**
         * @param {string} key Key identifier for the button.
         * @param {string|Element} caption Caption on the button (might be i18nlized).
         */
        constructor(key: string, caption: string|Element);
    }

    /**
     * A button set defines the behaviour of a set of buttons that the dialog can
     * show.  Uses the {@link goog.structs.Map} interface.
     * @extends {goog.structs.Map}
     */
    class ButtonSet extends __ButtonSet {}
    abstract class __ButtonSet extends goog.structs.__Map<any, any> {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
         *    goog.ui.Component} for semantics.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * A CSS className for this component.
         * @type {string}
         * @private
         */
        private class_: string;

        /**
         * The button that has default focus (references key in buttons_ map).
         * @type {?string}
         * @private
         */
        private defaultButton_: string|null;

        /**
         * Optional container the button set should be rendered into.
         * @type {Element}
         * @private
         */
        private element_: Element;

        /**
         * The button whose action is associated with the escape key and the X button
         * on the dialog.
         * @type {?string}
         * @private
         */
        private cancelButton_: string|null;

        /**
         * Adds a button (an object with a key and caption) to this button set. Buttons
         * will be displayed in the order they are added.
         * @see goog.ui.Dialog.DefaultButtons
         * @param {{key: string, caption: string}} button The button key and caption.
         * @param {boolean=} opt_isDefault Whether this button is the default button.
         *     Dialog will dispatch for this button if enter is pressed.
         * @param {boolean=} opt_isCancel Whether this button has the same behavior as
         *     cancel. If escape is pressed this button will fire.
         * @return {!goog.ui.Dialog.ButtonSet} The button set, to make it easy to chain
         *     "addButton" calls and build new ButtonSets.
         */
        addButton(button: {key: string; caption: string}, opt_isDefault?: boolean, opt_isCancel?: boolean):
            goog.ui.Dialog.ButtonSet;

        /**
         * Attaches the button set to an element, rendering it inside.
         * @param {Element} el Container.
         */
        attachToElement(el: Element): void;

        /**
         * Renders the button set inside its container element.
         */
        render(): void;

        /**
         * Decorates the given element by adding any `button` elements found
         * among its descendants to the button set.  The first button found is assumed
         * to be the default and will receive focus when the button set is rendered.
         * If a button with a name of {@link goog.ui.Dialog.DefaultButtonKeys.CANCEL}
         * is found, it is assumed to have "Cancel" semantics.
         * TODO(attila):  ButtonSet should be a goog.ui.Component.  Really.
         * @param {Element} element The element to decorate; should contain buttons.
         */
        decorate(element: Element): void;

        /**
         * Gets the component's element.
         * @return {Element} The element for the component.
         * TODO(user): Remove after refactoring to goog.ui.Component.
         */
        getElement(): Element;

        /**
         * Returns the dom helper that is being used on this component.
         * @return {!goog.dom.DomHelper} The dom helper used on this component.
         * TODO(user): Remove after refactoring to goog.ui.Component.
         */
        getDomHelper(): goog.dom.DomHelper;

        /**
         * Sets the default button.
         * @param {?string} key The default button.
         */
        setDefault(key: string|null): void;

        /**
         * Returns the default button.
         * @return {?string} The default button.
         */
        getDefault(): string|null;

        /**
         * Sets the cancel button.
         * @param {?string} key The cancel button.
         */
        setCancel(key: string|null): void;

        /**
         * Returns the cancel button.
         * @return {?string} The cancel button.
         */
        getCancel(): string|null;

        /**
         * Returns the HTML Button element.
         * @param {string} key The button to return.
         * @return {Element} The button, if found else null.
         */
        getButton(key: string): Element;

        /**
         * Returns all the HTML Button elements in the button set container.
         * @return {!IArrayLike<!Element>} A live NodeList of the buttons.
         */
        getAllButtons(): IArrayLike<Element>;

        /**
         * Enables or disables a button in this set by key. If the button is not found,
         * does nothing.
         * @param {string} key The button to enable or disable.
         * @param {boolean} enabled True to enable; false to disable.
         */
        setButtonEnabled(key: string, enabled: boolean): void;

        /**
         * Enables or disables all of the buttons in this set.
         * @param {boolean} enabled True to enable; false to disable.
         */
        setAllButtonsEnabled(enabled: boolean): void;
    }

    /**
     * Event type constant for dialog events.
     * TODO(attila): Change this to goog.ui.Dialog.EventType.SELECT.
     * @type {string}
     * @deprecated Use goog.ui.Dialog.EventType.SELECT.
     */
    let SELECT_EVENT: string;

    /**
     * Events dispatched by dialogs.
     * @enum {string}
     */
    enum EventType { SELECT, AFTER_HIDE, AFTER_SHOW }

    /**
     * The keys used to identify standard buttons in events.
     * @enum {string}
     */
    enum DefaultButtonKeys { OK, CANCEL, YES, NO, SAVE, CONTINUE }

    /**
     * The default captions for the default buttons.
     * @enum {string}
     */
    enum DefaultButtonCaptions { OK, CANCEL, YES, NO, SAVE, CONTINUE }
}

declare namespace goog.ui.Dialog.ButtonSet {
    /**
     * The standard buttons (keys associated with captions).
     * @enum {{key: string, caption: string}}
     */
    enum DefaultButtons { OK, CANCEL, YES, NO, SAVE, CONTINUE }

    /**
     * Creates a new ButtonSet with a single 'OK' button, which is also set with
     * cancel button semantics so that pressing escape will close the dialog.
     * @return {!goog.ui.Dialog.ButtonSet} The created ButtonSet.
     */
    function createOk(): goog.ui.Dialog.ButtonSet;

    /**
     * Creates a new ButtonSet with 'OK' (default) and 'Cancel' buttons.
     * @return {!goog.ui.Dialog.ButtonSet} The created ButtonSet.
     */
    function createOkCancel(): goog.ui.Dialog.ButtonSet;

    /**
     * Creates a new ButtonSet with 'Yes' (default) and 'No' buttons.
     * @return {!goog.ui.Dialog.ButtonSet} The created ButtonSet.
     */
    function createYesNo(): goog.ui.Dialog.ButtonSet;

    /**
     * Creates a new ButtonSet with 'Yes', 'No' (default), and 'Cancel' buttons.
     * @return {!goog.ui.Dialog.ButtonSet} The created ButtonSet.
     */
    function createYesNoCancel(): goog.ui.Dialog.ButtonSet;

    /**
     * Creates a new ButtonSet with 'Continue', 'Save', and 'Cancel' (default)
     * buttons.
     * @return {!goog.ui.Dialog.ButtonSet} The created ButtonSet.
     */
    function createContinueSaveCancel(): goog.ui.Dialog.ButtonSet;

    /** @deprecated Use goog.ui.Dialog.ButtonSet#createOk. */
    var OK: any /*missing*/;

    /** @deprecated Use goog.ui.Dialog.ButtonSet#createOkCancel. */
    let OK_CANCEL: any /*missing*/;

    /** @deprecated Use goog.ui.Dialog.ButtonSet#createYesNo. */
    let YES_NO: any /*missing*/;

    /** @deprecated Use goog.ui.Dialog.ButtonSet#createYesNoCancel. */
    let YES_NO_CANCEL: any /*missing*/;

    /** @deprecated Use goog.ui.Dialog.ButtonSet#createContinueSaveCancel. */
    let CONTINUE_SAVE_CANCEL: any /*missing*/;
}
