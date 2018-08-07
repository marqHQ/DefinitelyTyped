/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./plugin.d.ts"/>
/// <reference path="../html/safestylesheet.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../log/log.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../dom/abstractrange.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>
/// <reference path="../dom/savedrange.d.ts"/>
/// <reference path="../html/trustedresourceurl.d.ts"/>
/// <reference path="./icontent.d.ts"/>

declare module 'goog:goog.editor.Field' {
    import alias = goog.editor.Field;
    export default alias;
}

declare module 'goog:goog.editor.Field.EventType' {
    import alias = goog.editor.Field.EventType;
    export default alias;
}

declare namespace goog.editor {
    /**
     * This class encapsulates an editable field.
     *
     * event: load Fires when the field is loaded
     * event: unload Fires when the field is unloaded (made not editable)
     *
     * event: beforechange Fires before the content of the field might change
     *
     * event: delayedchange Fires a short time after field has changed. If multiple
     *                      change events happen really close to each other only
     *                      the last one will trigger the delayedchange event.
     *
     * event: beforefocus Fires before the field becomes active
     * event: focus Fires when the field becomes active. Fires after the blur event
     * event: blur Fires when the field becomes inactive
     *
     * TODO: figure out if blur or beforefocus fires first in IE and make FF match
     *
     * @extends {goog.events.EventTarget}
     */
    class Field extends __Field {}
    abstract class __Field extends goog.events.__EventTarget {
        /**
         * @param {string} id An identifer for the field. This is used to find the
         *    field and the element associated with this field.
         * @param {Document=} opt_doc The document that the element with the given
         *     id can be found in.  If not provided, the default document is used.
         */
        constructor(id: string, opt_doc?: Document);

        /**
         * The id for this editable field, which must match the id of the element
         * associated with this field.
         * @type {string}
         */
        id: string;

        /**
         * The hash code for this field. Should be equal to the id.
         * @type {string}
         * @private
         */
        private hashCode_: string;

        /**
         * Dom helper for the editable node.
         * @type {goog.dom.DomHelper}
         * @protected
         */
        protected editableDomHelper: goog.dom.DomHelper;

        /**
         * Map of class id to registered plugin.
         * @type {Object}
         * @private
         */
        private plugins_: Object;

        /**
         * Plugins registered on this field, indexed by the goog.editor.Plugin.Op
         * that they support.
         * @type {Object<Array<goog.editor.Plugin>>}
         * @private
         */
        private indexedPlugins_: {[key: string]: goog.editor.Plugin[]};

        /**
         * Additional styles to install for the editable field.
         * @type {!goog.html.SafeStyleSheet}
         * @protected
         */
        protected cssStyles: goog.html.SafeStyleSheet;

        /** @private */
        private stoppedEvents_: any /*missing*/;

        /** @private */
        private isModified_: any /*missing*/;

        /** @private */
        private isEverModified_: any /*missing*/;

        /** @private */
        private delayedChangeTimer_: any /*missing*/;

        /** @private */
        private debouncedEvents_: any /*missing*/;

        /** @private */
        private changeTimerGecko_: any /*missing*/;

        /**
         * @type {goog.events.EventHandler<!goog.editor.Field>}
         * @protected
         */
        protected eventRegister: goog.events.EventHandler<goog.editor.Field>;

        /** @private */
        private wrappers_: any /*missing*/;

        /** @private */
        private loadState_: any /*missing*/;

        /**
         * The dom helper for the node to be made editable.
         * @type {goog.dom.DomHelper}
         * @protected
         */
        protected originalDomHelper: goog.dom.DomHelper;

        /**
         * The original node that is being made editable, or null if it has
         * not yet been found.
         * @type {Element}
         * @protected
         */
        protected originalElement: Element;

        /**
         * @private {boolean}
         */
        private followLinkInNewWindow_: any /*missing*/;

        /**
         * The window where dialogs and bubbles should be rendered.
         * @type {!Window}
         * @private
         */
        private appWindow_: Window;

        /**
         * The editable dom node.
         * @type {Element}
         * TODO(user): Make this private!
         */
        field: Element;

        /**
         * Logging object.
         * @type {goog.log.Logger}
         * @protected
         */
        protected logger: goog.log.Logger;

        /**
         * Whether this field is in "modal interaction" mode. This usually
         * means that it's being edited by a dialog.
         * @type {boolean}
         * @private
         */
        private inModalMode_: boolean;

        /**
         * Target node to be used when dispatching SELECTIONCHANGE asynchronously on
         * mouseup (to avoid IE quirk). Should be set just before starting the timer and
         * nulled right after consuming.
         * @type {Node}
         * @private
         */
        private selectionChangeTarget_: Node;

        /**
         * Flag controlling wether to capture mouse up events on the window or not.
         * @type {boolean}
         * @private
         */
        private useWindowMouseUp_: boolean;

        /**
         * FLag indicating the handling of a mouse event sequence.
         * @type {boolean}
         * @private
         */
        private waitingForMouseUp_: boolean;

        /**
         * Sets flag to control whether to use window mouse up after seeing
         * a mouse down operation on the field.
         * @param {boolean} flag True to track window mouse up.
         */
        setUseWindowMouseUp(flag: boolean): void;

        /**
         * @return {boolean} Whether we're in modal interaction mode. When this
         *     returns true, another plugin is interacting with the field contents
         *     in a synchronous way, and expects you not to make changes to
         *     the field's DOM structure or selection.
         */
        inModalMode(): boolean;

        /**
         * @param {boolean} inModalMode Sets whether we're in modal interaction mode.
         */
        setModalMode(inModalMode: boolean): void;

        /**
         * Returns a string usable as a hash code for this field. For field's
         * that were created with an id, the hash code is guaranteed to be the id.
         * TODO(user): I think we can get rid of this.  Seems only used from editor.
         * @return {string} The hash code for this editable field.
         */
        getHashCode(): string;

        /**
         * Returns the editable DOM element or null if this field
         * is not editable.
         * <p>On IE or Safari this is the element with contentEditable=true
         * (in whitebox mode, the iFrame body).
         * <p>On Gecko this is the iFrame body
         * TODO(user): How do we word this for subclass version?
         * @return {Element} The editable DOM element, defined as above.
         */
        getElement(): Element;

        /**
         * Returns original DOM element that is being made editable by Trogedit or
         * null if that element has not yet been found in the appropriate document.
         * @return {Element} The original element.
         */
        getOriginalElement(): Element;

        /**
         * Registers a keyboard event listener on the field.  This is necessary for
         * Gecko since the fields are contained in an iFrame and there is no way to
         * auto-propagate key events up to the main window.
         * @param {string|Array<string>} type Event type to listen for or array of
         *    event types, for example goog.events.EventType.KEYDOWN.
         * @param {Function} listener Function to be used as the listener.
         * @param {boolean=} opt_capture Whether to use capture phase (optional,
         *    defaults to false).
         * @param {Object=} opt_handler Object in whose scope to call the listener.
         */
        addListener(type: string|string[], listener: Function, opt_capture?: boolean, opt_handler?: Object): void;

        /**
         * Returns the registered plugin with the given classId.
         * @param {string} classId classId of the plugin.
         * @return {goog.editor.Plugin} Registered plugin with the given classId.
         */
        getPluginByClassId(classId: string): goog.editor.Plugin;

        /**
         * Registers the plugin with the editable field.
         * @param {goog.editor.Plugin} plugin The plugin to register.
         */
        registerPlugin(plugin: goog.editor.Plugin): void;

        /**
         * Unregisters the plugin with this field.
         * @param {goog.editor.Plugin} plugin The plugin to unregister.
         */
        unregisterPlugin(plugin: goog.editor.Plugin): void;

        /**
         * Sets the value that will replace the style attribute of this field's
         * element when the field is made non-editable. This method is called with the
         * current value of the style attribute when the field is made editable.
         * @param {string} cssText The value of the style attribute.
         */
        setInitialStyle(cssText: string): void;

        /**
         * Reset the properties on the original field element to how it was before
         * it was made editable.
         */
        resetOriginalElemProperties(): void;

        /**
         * Checks the modified state of the field.
         * Note: Changes that take place while the goog.editor.Field.EventType.CHANGE
         * event is stopped do not effect the modified state.
         * @param {boolean=} opt_useIsEverModified Set to true to check if the field
         *   has ever been modified since it was created, otherwise checks if the field
         *   has been modified since the last goog.editor.Field.EventType.DELAYEDCHANGE
         *   event was dispatched.
         * @return {boolean} Whether the field has been modified.
         */
        isModified(opt_useIsEverModified?: boolean): boolean;

        /**
         * @return {boolean} Whether the field is implemented as an iframe.
         */
        usesIframe(): boolean;

        /**
         * @return {boolean} Whether the field should be rendered with a fixed
         *     height, or should expand to fit its contents.
         */
        isFixedHeight(): boolean;

        /**
         * @return {boolean} Whether the field should be refocused on input.
         *    This is a workaround for the iOS bug that text input doesn't work
         *    when the main window listens touch events.
         */
        shouldRefocusOnInputMobileSafari(): boolean;

        /**
         * Sets the application window.
         * @param {!Window} appWindow The window where dialogs and bubbles should be
         *     rendered.
         */
        setAppWindow(appWindow: Window): void;

        /**
         * Returns the "application" window, where dialogs and bubbles
         * should be rendered.
         * @return {!Window} The window.
         */
        getAppWindow(): Window;

        /**
         * Sets the zIndex that the field should be based off of.
         * TODO(user): Get rid of this completely.  Here for Sites.
         *     Should this be set directly on UI plugins?
         *
         * @param {number} zindex The base zIndex of the editor.
         */
        setBaseZindex(zindex: number): void;

        /**
         * Returns the zindex of the base level of the field.
         *
         * @return {number} The base zindex of the editor.
         */
        getBaseZindex(): number;

        /**
         * Sets up the field object and window util of this field, and enables this
         * editable field with all registered plugins.
         * This is essential to the initialization of the field.
         * It must be called when the field becomes fully loaded and editable.
         * @param {Element} field The field property.
         * @protected
         */
        protected setupFieldObject(field: Element): void;

        /**
         * Help make the field not editable by setting internal data structures to null,
         * and disabling this field with all registered plugins.
         * @private
         */
        private tearDownFieldObject_(): void;

        /**
         * Initialize listeners on the field.
         * @private
         */
        private setupChangeListeners_(): void;

        /**
         * Stops all listeners and timers.
         * @protected
         */
        protected clearListeners(): void;

        /**
         * Attach an wrapper to this field, to be thrown out when the field
         * is disposed.
         * @param {goog.Disposable} wrapper The wrapper to attach.
         */
        attachWrapper(wrapper: goog.Disposable): void;

        /**
         * Removes all wrappers and destroys them.
         */
        removeAllWrappers(): void;

        /**
         * Sets whether activating a hyperlink in this editable field will open a new
         *     window or not.
         * @param {boolean} followLinkInNewWindow
         */
        setFollowLinkInNewWindow(followLinkInNewWindow: boolean): void;

        /**
         * Mutation events tell us when something has changed for mozilla.
         * @protected
         */
        protected setupMutationEventHandlersGecko(): void;

        /**
         * Handle before change key events and fire the beforetab event if appropriate.
         * This needs to happen on keydown in IE and keypress in FF.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @return {boolean} Whether to still perform the default key action.  Only set
         *     to true if the actual event has already been canceled.
         * @private
         */
        private handleBeforeChangeKeyEvent_(e: goog.events.BrowserEvent): boolean;

        /**
         * Calls all the plugins of the given operation, in sequence, with the
         * given arguments. This is short-circuiting: once one plugin cancels
         * the event, no more plugins will be invoked.
         * @param {goog.editor.Plugin.Op} op A plugin op.
         * @param {...*} var_args The arguments to the plugin.
         * @return {boolean} True if one of the plugins cancel the event, false
         *    otherwise.
         * @private
         */
        private invokeShortCircuitingOp_(op: goog.editor.Plugin.Op, ...var_args: any[]): boolean;

        /**
         * Invoke this operation on all plugins with the given arguments.
         * @param {goog.editor.Plugin.Op} op A plugin op.
         * @param {...*} var_args The arguments to the plugin.
         * @private
         */
        private invokeOp_(op: goog.editor.Plugin.Op, ...var_args: any[]): void;

        /**
         * Reduce this argument over all plugins. The result of each plugin invocation
         * will be passed to the next plugin invocation. See goog.array.reduce.
         * @param {goog.editor.Plugin.Op} op A plugin op.
         * @param {string} arg The argument to reduce. For now, we assume it's a
         *     string, but we should widen this later if there are reducing
         *     plugins that don't operate on strings.
         * @param {...*} var_args Any extra arguments to pass to the plugin. These args
         *     will not be reduced.
         * @return {string} The reduced argument.
         * @private
         */
        private reduceOp_(op: goog.editor.Plugin.Op, arg: string, ...var_args: any[]): string;

        /**
         * Prepare the given contents, then inject them into the editable field.
         * @param {?string} contents The contents to prepare.
         * @param {Element} field The field element.
         * @protected
         */
        protected injectContents(contents: string|null, field: Element): void;

        /**
         * Returns prepared contents that can be injected into the editable field.
         * @param {?string} contents The contents to prepare.
         * @param {Object} styles A map that will be populated with styles that should
         *     be applied to the field element together with the contents.
         * @return {string} The prepared contents.
         */
        getInjectableContents(contents: string|null, styles: Object): string;

        /**
         * Handles keydown on the field.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private handleKeyDown_(e: goog.events.BrowserEvent): void;

        /**
         * Handles keypress on the field.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private handleKeyPress_(e: goog.events.BrowserEvent): void;

        /**
         * Handles keyup on the field.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private handleKeyUp_(e: goog.events.BrowserEvent): void;

        /**
         * Fires `BEFORESELECTIONCHANGE` and starts the selection change timer
         * (which will fire `SELECTIONCHANGE`) if the given event is a key event
         * that causes a selection change.
         * @param {!goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private maybeStartSelectionChangeTimer_(e: goog.events.BrowserEvent): void;

        /**
         * Handles keyboard shortcuts on the field.  Note that we bake this into our
         * handleKeyPress/handleKeyDown rather than using goog.events.KeyHandler or
         * goog.ui.KeyboardShortcutHandler for performance reasons.  Since these
         * are handled on every key stroke, we do not want to be going out to the
         * event system every time.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private handleKeyboardShortcut_(e: goog.events.BrowserEvent): void;

        /**
         * Executes an editing command as per the registered plugins.
         * @param {string} command The command to execute.
         * @param {...*} var_args Any additional parameters needed to execute the
         *     command.
         * @return {*} False if the command wasn't handled, otherwise, the result of
         *     the command.
         */
        execCommand(command: string, ...var_args: any[]): any;

        /**
         * Gets the value of command(s).
         * @param {string|Array<string>} commands String name(s) of the command.
         * @return {*} Value of each command. Returns false (or array of falses)
         *     if designMode is off or the field is otherwise uneditable, and
         *     there are no activeOnUneditable plugins for the command.
         */
        queryCommandValue(commands: string|string[]): any;

        /**
         * Gets the value of this command.
         * @param {string} command The command to check.
         * @param {boolean} isEditable Whether the field is currently editable.
         * @return {*} The state of this command. Null if not handled.
         *     False if the field is uneditable and there are no handlers for
         *     uneditable commands.
         * @private
         */
        private queryCommandValueInternal_(command: string, isEditable: boolean): any;

        /**
         * Fires a change event only if the attribute change effects the editiable
         * field. We ignore events that are internal browser events (ie scrollbar
         * state change)
         * @param {Function} handler The function to call if this is not an internal
         *     browser event.
         * @param {goog.events.BrowserEvent} browserEvent The browser event.
         * @protected
         */
        protected handleDomAttrChange(handler: Function, browserEvent: goog.events.BrowserEvent): void;

        /**
         * Handle a mutation event.
         * @param {goog.events.BrowserEvent|Event} e The browser event.
         * @private
         */
        private handleMutationEventGecko_(e: goog.events.BrowserEvent|Event): void;

        /**
         * Handle drop events. Deal with focus/selection issues and set the document
         * as changed.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private handleDrop_(e: goog.events.BrowserEvent): void;

        /**
         * @return {HTMLIFrameElement} The iframe that's body is editable.
         * @protected
         */
        protected getEditableIframe(): HTMLIFrameElement;

        /**
         * @return {goog.dom.DomHelper?} The dom helper for the editable node.
         */
        getEditableDomHelper(): goog.dom.DomHelper|null;

        /**
         * @return {goog.dom.AbstractRange?} Closure range object wrapping the selection
         *     in this field or null if this field is not currently editable.
         */
        getRange(): goog.dom.AbstractRange|null;

        /**
         * Dispatch a selection change event, optionally caused by the given browser
         * event or selecting the given target.
         * @param {goog.events.BrowserEvent=} opt_e Optional browser event causing this
         *     event.
         * @param {Node=} opt_target The node the selection changed to.
         */
        dispatchSelectionChangeEvent(opt_e?: goog.events.BrowserEvent, opt_target?: Node): void;

        /**
         * Dispatch a selection change event using a browser event that was
         * asynchronously saved earlier.
         * @private
         */
        private handleSelectionChangeTimer_(): void;

        /**
         * This dispatches the beforechange event on the editable field
         */
        dispatchBeforeChange(): void;

        /**
         * This dispatches the beforetab event on the editable field. If this event is
         * cancelled, then the default tab behavior is prevented.
         * @param {goog.events.BrowserEvent} e The tab event.
         * @private
         * @return {boolean} The result of dispatchEvent.
         */
        private dispatchBeforeTab_(e: goog.events.BrowserEvent): boolean;

        /**
         * Temporarily ignore change events. If the time has already been set, it will
         * fire immediately now.  Further setting of the timer is stopped and
         * dispatching of events is stopped until startChangeEvents is called.
         * @param {boolean=} opt_stopChange Whether to ignore base change events.
         * @param {boolean=} opt_stopDelayedChange Whether to ignore delayed change
         *     events.
         */
        stopChangeEvents(opt_stopChange?: boolean, opt_stopDelayedChange?: boolean): void;

        /**
         * Start change events again and fire once if desired.
         * @param {boolean=} opt_fireChange Whether to fire the change event
         *      immediately.
         * @param {boolean=} opt_fireDelayedChange Whether to fire the delayed change
         *      event immediately.
         */
        startChangeEvents(opt_fireChange?: boolean, opt_fireDelayedChange?: boolean): void;

        /**
         * Stops the event of the given type from being dispatched.
         * @param {goog.editor.Field.EventType} eventType type of event to stop.
         */
        stopEvent(eventType: goog.editor.Field.EventType): void;

        /**
         * Re-starts the event of the given type being dispatched, if it had
         * previously been stopped with stopEvent().
         * @param {goog.editor.Field.EventType} eventType type of event to start.
         */
        startEvent(eventType: goog.editor.Field.EventType): void;

        /**
         * Block an event for a short amount of time. Intended
         * for the situation where an event pair fires in quick succession
         * (e.g., mousedown/mouseup, keydown/keyup, focus/blur),
         * and we want the second event in the pair to get "debounced."
         *
         * WARNING: This should never be used to solve race conditions or for
         * mission-critical actions. It should only be used for UI improvements,
         * where it's okay if the behavior is non-deterministic.
         *
         * @param {goog.editor.Field.EventType} eventType type of event to debounce.
         */
        debounceEvent(eventType: goog.editor.Field.EventType): void;

        /**
         * Checks if the event of the given type has stopped being dispatched
         * @param {goog.editor.Field.EventType} eventType type of event to check.
         * @return {boolean} true if the event has been stopped with stopEvent().
         * @protected
         */
        protected isEventStopped(eventType: goog.editor.Field.EventType): boolean;

        /**
         * Calls a function to manipulate the dom of this field. This method should be
         * used whenever Trogedit clients need to modify the dom of the field, so that
         * delayed change events are handled appropriately. Extra delayed change events
         * will cause undesired states to be added to the undo-redo stack. This method
         * will always fire at most one delayed change event, depending on the value of
         * `opt_preventDelayedChange`.
         *
         * @param {function()} func The function to call that will manipulate the dom.
         * @param {boolean=} opt_preventDelayedChange Whether delayed change should be
         *      prevented after calling `func`. Defaults to always firing
         *      delayed change.
         * @param {Object=} opt_handler Object in whose scope to call the listener.
         */
        manipulateDom(func: () => void, opt_preventDelayedChange?: boolean, opt_handler?: Object): void;

        /**
         * Dispatches a command value change event.
         * @param {Array<string>=} opt_commands Commands whose state has
         *     changed.
         */
        dispatchCommandValueChange(opt_commands?: string[]): void;

        /**
         * Dispatches the appropriate set of change events. This only fires
         * synchronous change events in blended-mode, iframe-using mozilla. It just
         * starts the appropriate timer for goog.editor.Field.EventType.DELAYEDCHANGE.
         * This also starts up change events again if they were stopped.
         *
         * @param {boolean=} opt_noDelay True if
         *      goog.editor.Field.EventType.DELAYEDCHANGE should be fired syncronously.
         */
        dispatchChange(opt_noDelay?: boolean): void;

        /**
         * Handle a change in the Editable Field.  Marks the field has modified,
         * dispatches the change event on the editable field (moz only), starts the
         * timer for the delayed change event.  Note that these actions only occur if
         * the proper events are not stopped.
         */
        handleChange(): void;

        /**
         * Dispatch a delayed change event.
         * @private
         */
        private dispatchDelayedChange_(): void;

        /**
         * Don't wait for the timer and just fire the delayed change event if it's
         * pending.
         */
        clearDelayedChange(): void;

        /**
         * Dispatch beforefocus and focus for FF. Note that both of these actually
         * happen in the document's "focus" event. Unfortunately, we don't actually
         * have a way of getting in before the focus event in FF (boo! hiss!).
         * In IE, we use onfocusin for before focus and onfocus for focus.
         * @private
         */
        private dispatchFocusAndBeforeFocus_(): void;

        /**
         * Dispatches a before focus event.
         * @private
         */
        private dispatchBeforeFocus_(): void;

        /**
         * Dispatches a focus event.
         * @private
         */
        private dispatchFocus_(): void;

        /**
         * Dispatches a blur event.
         * @protected
         */
        protected dispatchBlur(): void;

        /**
         * @return {boolean} Whether the selection is editable.
         */
        isSelectionEditable(): boolean;

        /**
         * Handle mouse down inside the editable field.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleMouseDown_(e: goog.events.BrowserEvent): void;

        /**
         * Handle drag start. Needs to cancel listening for the mouse up event on the
         * window.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleDragStart_(e: goog.events.BrowserEvent): void;

        /**
         * Handle mouse up inside the editable field.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleMouseUp_(e: goog.events.BrowserEvent): void;

        /**
         * Retrieve the HTML contents of a field.
         *
         * Do NOT just get the innerHTML of a field directly--there's a lot of
         * processing that needs to happen.
         * @return {string} The scrubbed contents of the field.
         */
        getCleanContents(): string;

        /**
         * Get the copy of the editable field element, which has the innerHTML set
         * correctly.
         * @return {!Element} The copy of the editable field.
         * @protected
         */
        protected getFieldCopy(): Element;

        /**
         * Sets the contents of the field.
         * @param {boolean} addParas Boolean to specify whether to add paragraphs
         *    to long fields.
         * @param {?goog.html.SafeHtml} html html to insert.  If html=null, then this
         *    defaults to a nsbp for mozilla and an empty string for IE.
         * @param {boolean=} opt_dontFireDelayedChange True to make this content change
         *    not fire a delayed change event.
         * @param {boolean=} opt_applyLorem Whether to apply lorem ipsum styles.
         */
        setSafeHtml(
            addParas: boolean,
            html: goog.html.SafeHtml|null,
            opt_dontFireDelayedChange?: boolean,
            opt_applyLorem?: boolean
        ): void;

        /**
         * Sets the inner HTML of the field. Works on both editable and
         * uneditable fields.
         * @param {?goog.html.SafeHtml} html The new inner HTML of the field.
         * @private
         */
        private setInnerHtml_(html: goog.html.SafeHtml|null): void;

        /**
         * Attemps to turn on designMode for a document.  This function can fail under
         * certain circumstances related to the load event, and will throw an exception.
         * @protected
         */
        protected turnOnDesignModeGecko(): void;

        /**
         * Installs styles if needed. Only writes styles when they can't be written
         * inline directly into the field.
         * @protected
         */
        protected installStyles(): void;

        /**
         * Signal that the field is loaded and ready to use.  Change events now are
         * in effect.
         * @private
         */
        private dispatchLoadEvent_(): void;

        /**
         * @return {boolean} Whether the field is uneditable.
         */
        isUneditable(): boolean;

        /**
         * @return {boolean} Whether the field has finished loading.
         */
        isLoaded(): boolean;

        /**
         * @return {boolean} Whether the field is in the process of loading.
         */
        isLoading(): boolean;

        /**
         * Gives the field focus.
         */
        focus(): void;

        /**
         * Gives the field focus and places the cursor at the start of the field.
         */
        focusAndPlaceCursorAtStart(): void;

        /**
         * Place the cursor at the start of this field. It's recommended that you only
         * use this method (and manipulate the selection in general) when there is not
         * an existing selection in the field.
         */
        placeCursorAtStart(): void;

        /**
         * Place the cursor at the start of this field. It's recommended that you only
         * use this method (and manipulate the selection in general) when there is not
         * an existing selection in the field.
         */
        placeCursorAtEnd(): void;

        /**
         * Helper method to place the cursor at the start or end of this field.
         * @param {boolean} isStart True for start, false for end.
         * @private
         */
        private placeCursorAtStartOrEnd_(isStart: boolean): void;

        /**
         * Restore a saved range, and set the focus on the field.
         * If no range is specified, we simply set the focus.
         * @param {goog.dom.SavedRange=} opt_range A previously saved selected range.
         */
        restoreSavedRange(opt_range?: goog.dom.SavedRange): void;

        /**
         * Makes a field editable.
         *
         * @param {!goog.html.TrustedResourceUrl=} opt_iframeSrc URL to set the iframe
         *     src to if necessary.
         */
        makeEditable(opt_iframeSrc?: goog.html.TrustedResourceUrl): void;

        /**
         * Handles actually making something editable - creating necessary nodes,
         * injecting content, etc.
         * @param {!goog.html.TrustedResourceUrl=} opt_iframeSrc URL to set the iframe
         *     src to if necessary.
         * @protected
         */
        protected makeEditableInternal(opt_iframeSrc?: goog.html.TrustedResourceUrl): void;

        /**
         * Handle the loading of the field (e.g. once the field is ready to setup).
         * TODO(user): this should probably just be moved into dispatchLoadEvent_.
         * @protected
         */
        protected handleFieldLoad(): void;

        /**
         * Closes the field and cancels all pending change timers.  Note that this
         * means that if a change event has not fired yet, it will not fire.  Clients
         * should check fieldOj.isModified() if they depend on the final change event.
         * Throws an error if the field is already uneditable.
         *
         * @param {boolean=} opt_skipRestore True to prevent copying of editable field
         *     contents back into the original node.
         */
        makeUneditable(opt_skipRestore?: boolean): void;

        /**
         * Restores the dom to how it was before being made editable.
         * @protected
         */
        protected restoreDom(): void;

        /**
         * Returns true if the field needs to be loaded asynchrnously.
         * @return {boolean} True if loads are async.
         * @protected
         */
        protected shouldLoadAsynchronously(): boolean;

        /**
         * Start the editable iframe creation process for Mozilla or IE whitebox.
         * The iframes load asynchronously.
         *
         * @param {!goog.html.TrustedResourceUrl=} opt_iframeSrc URL to set the iframe
         *     src to if necessary.
         * @private
         */
        private makeIframeField_(opt_iframeSrc?: goog.html.TrustedResourceUrl): void;

        /**
         * Given the original field element, and the iframe that is destined to
         * become the editable field, styles them appropriately and add the iframe
         * to the dom.
         *
         * @param {HTMLIFrameElement} iframe The iframe element.
         * @protected
         */
        protected attachIframe(iframe: HTMLIFrameElement): void;

        /**
         * @param {Object} extraStyles A map of extra styles.
         * @return {!goog.editor.icontent.FieldFormatInfo} The FieldFormatInfo
         *     object for this field's configuration.
         * @protected
         */
        protected getFieldFormatInfo(extraStyles: Object): goog.editor.icontent.FieldFormatInfo;

        /**
         * Writes the html content into the iframe.  Handles writing any aditional
         * styling as well.
         * @param {HTMLIFrameElement} iframe Iframe to write contents into.
         * @param {string} innerHtml The html content to write into the iframe.
         * @param {Object} extraStyles A map of extra style attributes.
         * @protected
         */
        protected writeIframeContent(iframe: HTMLIFrameElement, innerHtml: string, extraStyles: Object): void;

        /**
         * The function to call when the editable iframe loads.
         *
         * @param {HTMLIFrameElement} iframe Iframe that just loaded.
         * @param {string} innerHtml Html to put inside the body of the iframe.
         * @param {Object} styles Property-value map of CSS styles to install on
         *     editable field.
         * @protected
         */
        protected iframeFieldLoadHandler(iframe: HTMLIFrameElement, innerHtml: string, styles: Object): void;

        /**
         * Clears fieldLoadListener for a field. Must be called even (especially?) if
         * the field is not yet loaded and therefore not in this.fieldMap_
         * @private
         */
        private clearFieldLoadListener_(): void;

        /**
         * @return {!Object} Get the HTML attributes for this field's iframe.
         * @protected
         */
        protected getIframeAttributes(): Object;
    }
}

declare namespace goog.editor.Field {
    /**
     * Event types that can be stopped/started.
     * @enum {string}
     */
    enum EventType {
        COMMAND_VALUE_CHANGE,
        LOAD,
        UNLOAD,
        BEFORECHANGE,
        CHANGE,
        DELAYEDCHANGE,
        BEFOREFOCUS,
        FOCUS,
        BLUR,
        BEFORETAB,
        IFRAME_RESIZED,
        BEFORESELECTIONCHANGE,
        SELECTIONCHANGE
    }

    /**
     * Sets the active field id.
     * @param {?string} fieldId The active field id.
     */
    function setActiveFieldId(fieldId: string|null): void;

    /**
     * @return {?string} The id of the active field.
     */
    function getActiveFieldId(): string|null;

    /**
     * Number of milliseconds after a change when the change event should be fired.
     * @type {number}
     */
    let CHANGE_FREQUENCY: number;

    /**
     * Number of milliseconds between delayed change events.
     * @type {number}
     */
    let DELAYED_CHANGE_FREQUENCY: number;

    /**
     * Keycodes that result in a selectionchange event (e.g. the cursor moving).
     * @type {!Object<number, number>}
     */
    let SELECTION_CHANGE_KEYCODES: {[key: number]: number};
}
