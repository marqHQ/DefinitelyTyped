/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="./controlrenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/keyhandler.d.ts"/>
/// <reference path="../a11y/aria/roles.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.ui.Control' {
    import alias = goog.ui.Control;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Base class for UI controls.  Extends {@link goog.ui.Component} by adding
     * the following:
     *  <ul>
     *    <li>a {@link goog.events.KeyHandler}, to simplify keyboard handling,
     *    <li>a pluggable <em>renderer</em> framework, to simplify the creation of
     *        simple controls without the need to subclass this class,
     *    <li>the notion of component <em>content</em>, like a text caption or DOM
     *        structure displayed in the component (e.g. a button label),
     *    <li>getter and setter for component content, as well as a getter and
     *        setter specifically for caption text (for convenience),
     *    <li>support for hiding/showing the component,
          <li>fine-grained control over supported states and state transition
              events, and
     *    <li>default mouse and keyboard event handling.
     *  </ul>
     * This class has sufficient built-in functionality for most simple UI controls.
     * All controls dispatch SHOW, HIDE, ENTER, LEAVE, and ACTION events on show,
     * hide, mouseover, mouseout, and user action, respectively.  Additional states
     * are also supported.  See closure/demos/control.html
     * for example usage.
     * @extends {goog.ui.Component}
     */
    class Control extends __Control {}
    abstract class __Control extends goog.ui.__Component {
        /**
         * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure
         *     to display as the content of the control (if any).
         * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or
         *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(
            opt_content?: goog.ui.ControlContent,
            opt_renderer?: goog.ui.ControlRenderer,
            opt_domHelper?: goog.dom.DomHelper
        );

        /** @private {?string} The control's aria-label. */
        private ariaLabel_: any /*missing*/;

        /** @private {goog.ui.Control.IeMouseEventSequenceSimulator_} */
        private ieMouseEventSequenceSimulator_: any /*missing*/;

        /**
         * Renderer associated with the component.
         * @type {goog.ui.ControlRenderer|undefined}
         * @private
         */
        private renderer_: goog.ui.ControlRenderer|undefined;

        /**
         * Text caption or DOM structure displayed in the component.
         * @type {goog.ui.ControlContent}
         * @private
         */
        private content_: goog.ui.ControlContent;

        /**
         * Current component state; a bit mask of {@link goog.ui.Component.State}s.
         * @type {number}
         * @private
         */
        private state_: number;

        /**
         * A bit mask of {@link goog.ui.Component.State}s this component supports.
         * @type {number}
         * @private
         */
        private supportedStates_: number;

        /**
         * A bit mask of {@link goog.ui.Component.State}s for which this component
         * provides default event handling.  For example, a component that handles
         * the HOVER state automatically will highlight itself on mouseover, whereas
         * a component that doesn't handle HOVER automatically will only dispatch
         * ENTER and LEAVE events but not call {@link setHighlighted} on itself.
         * By default, components provide default event handling for all states.
         * Controls hosted in containers (e.g. menu items in a menu, or buttons in a
         * toolbar) will typically want to have their container manage their highlight
         * state.  Selectable controls managed by a selection model will also typically
         * want their selection state to be managed by the model.
         * @type {number}
         * @private
         */
        private autoStates_: number;

        /**
         * A bit mask of {@link goog.ui.Component.State}s for which this component
         * dispatches state transition events.  Because events are expensive, the
         * default behavior is to not dispatch any state transition events at all.
         * Use the {@link #setDispatchTransitionEvents} API to request transition
         * events  as needed.  Subclasses may enable transition events by default.
         * Controls hosted in containers or managed by a selection model will typically
         * want to dispatch transition events.
         * @type {number}
         * @private
         */
        private statesWithTransitionEvents_: number;

        /**
         * Component visibility.
         * @type {boolean}
         * @private
         */
        private visible_: boolean;

        /**
         * Keyboard event handler.
         * @type {goog.events.KeyHandler}
         * @private
         */
        private keyHandler_: goog.events.KeyHandler;

        /**
         * Additional class name(s) to apply to the control's root element, if any.
         * @type {Array<string>?}
         * @private
         */
        private extraClassNames_: string[]|null;

        /**
         * Whether the control should listen for and handle mouse events; defaults to
         * true.
         * @type {boolean}
         * @private
         */
        private handleMouseEvents_: boolean;

        /**
         * Whether the control allows text selection within its DOM.  Defaults to false.
         * @type {boolean}
         * @private
         */
        private allowTextSelection_: boolean;

        /**
         * The control's preferred ARIA role.
         * @type {?goog.a11y.aria.Role}
         * @private
         */
        private preferredAriaRole_: goog.a11y.aria.Role|null;

        /**
         * Returns true if the control is configured to handle its own mouse events,
         * false otherwise.  Controls not hosted in {@link goog.ui.Container}s have
         * to handle their own mouse events, but controls hosted in containers may
         * allow their parent to handle mouse events on their behalf.  Considered
         * protected; should only be used within this package and by subclasses.
         * @return {boolean} Whether the control handles its own mouse events.
         */
        isHandleMouseEvents(): boolean;

        /**
         * Enables or disables mouse event handling for the control.  Containers may
         * use this method to disable mouse event handling in their child controls.
         * Considered protected; should only be used within this package and by
         * subclasses.
         * @param {boolean} enable Whether to enable or disable mouse event handling.
         */
        setHandleMouseEvents(enable: boolean): void;

        /**
         * Returns the DOM element on which the control is listening for keyboard
         * events (null if none).
         * @return {Element} Element on which the control is listening for key
         *     events.
         */
        getKeyEventTarget(): Element;

        /**
         * Returns the keyboard event handler for this component, lazily created the
         * first time this method is called.  Considered protected; should only be
         * used within this package and by subclasses.
         * @return {!goog.events.KeyHandler} Keyboard event handler for this component.
         * @protected
         */
        protected getKeyHandler(): goog.events.KeyHandler;

        /**
         * Returns the renderer used by this component to render itself or to decorate
         * an existing element.
         * @return {goog.ui.ControlRenderer|undefined} Renderer used by the component
         *     (undefined if none).
         */
        getRenderer(): goog.ui.ControlRenderer|undefined;

        /**
         * Registers the given renderer with the component.  Changing renderers after
         * the component has entered the document is an error.
         * @param {goog.ui.ControlRenderer} renderer Renderer used by the component.
         * @throws {Error} If the control is already in the document.
         */
        setRenderer(renderer: goog.ui.ControlRenderer): void;

        /**
         * Returns any additional class name(s) to be applied to the component's
         * root element, or null if no extra class names are needed.
         * @return {Array<string>?} Additional class names to be applied to
         *     the component's root element (null if none).
         */
        getExtraClassNames(): string[]|null;

        /**
         * Adds the given class name to the list of classes to be applied to the
         * component's root element.
         * @param {string} className Additional class name to be applied to the
         *     component's root element.
         */
        addClassName(className: string): void;

        /**
         * Removes the given class name from the list of classes to be applied to
         * the component's root element.
         * @param {string} className Class name to be removed from the component's root
         *     element.
         */
        removeClassName(className: string): void;

        /**
         * Adds or removes the given class name to/from the list of classes to be
         * applied to the component's root element.
         * @param {string} className CSS class name to add or remove.
         * @param {boolean} enable Whether to add or remove the class name.
         */
        enableClassName(className: string, enable: boolean): void;

        /**
         * Returns the control's preferred ARIA role. This can be used by a control to
         * override the role that would be assigned by the renderer.  This is useful in
         * cases where a different ARIA role is appropriate for a control because of the
         * context in which it's used.  E.g., a {@link goog.ui.MenuButton} added to a
         * {@link goog.ui.Select} should have an ARIA role of LISTBOX and not MENUITEM.
         * @return {?goog.a11y.aria.Role} This control's preferred ARIA role or null if
         *     no preferred ARIA role is set.
         */
        getPreferredAriaRole(): goog.a11y.aria.Role|null;

        /**
         * Sets the control's preferred ARIA role. This can be used to override the role
         * that would be assigned by the renderer.  This is useful in cases where a
         * different ARIA role is appropriate for a control because of the
         * context in which it's used.  E.g., a {@link goog.ui.MenuButton} added to a
         * {@link goog.ui.Select} should have an ARIA role of LISTBOX and not MENUITEM.
         * @param {goog.a11y.aria.Role} role This control's preferred ARIA role.
         */
        setPreferredAriaRole(role: goog.a11y.aria.Role): void;

        /**
         * Gets the control's aria label.
         * @return {?string} This control's aria label.
         */
        getAriaLabel(): string|null;

        /**
         * Sets the control's aria label. This can be used to assign aria label to the
         * element after it is rendered.
         * @param {string} label The string to set as the aria label for this control.
         *     No escaping is done on this value.
         */
        setAriaLabel(label: string): void;

        /**
         * Enables or disables mouse event handling on the control.
         * @param {boolean} enable Whether to enable mouse event handling.
         * @private
         */
        private enableMouseEventHandling_(enable: boolean): void;

        /**
         * Returns the text caption or DOM structure displayed in the component.
         * @return {goog.ui.ControlContent} Text caption or DOM structure
         *     comprising the component's contents.
         */
        getContent(): goog.ui.ControlContent;

        /**
         * Sets the component's content to the given text caption, element, or array of
         * nodes.  (If the argument is an array of nodes, it must be an actual array,
         * not an array-like object.)
         * @param {goog.ui.ControlContent} content Text caption or DOM
         *     structure to set as the component's contents.
         */
        setContent(content: goog.ui.ControlContent): void;

        /**
         * Sets the component's content to the given text caption, element, or array
         * of nodes.  Unlike {@link #setContent}, doesn't modify the component's DOM.
         * Called by renderers during element decoration.
         *
         * This should only be used by subclasses and its associated renderers.
         *
         * @param {goog.ui.ControlContent} content Text caption or DOM structure
         *     to set as the component's contents.
         */
        setContentInternal(content: goog.ui.ControlContent): void;

        /**
         * @return {string} Text caption of the control or empty string if none.
         */
        getCaption(): string;

        /**
         * Sets the text caption of the component.
         * @param {string} caption Text caption of the component.
         */
        setCaption(caption: string): void;

        /**
         * Returns true if the control allows text selection within its DOM, false
         * otherwise.  Controls that disallow text selection have the appropriate
         * unselectable styling applied to their elements.  Note that controls hosted
         * in containers will report that they allow text selection even if their
         * container disallows text selection.
         * @return {boolean} Whether the control allows text selection.
         */
        isAllowTextSelection(): boolean;

        /**
         * Allows or disallows text selection within the control's DOM.
         * @param {boolean} allow Whether the control should allow text selection.
         */
        setAllowTextSelection(allow: boolean): void;

        /**
         * Returns true if the component's visibility is set to visible, false if
         * it is set to hidden.  A component that is set to hidden is guaranteed
         * to be hidden from the user, but the reverse isn't necessarily true.
         * A component may be set to visible but can otherwise be obscured by another
         * element, rendered off-screen, or hidden using direct CSS manipulation.
         * @return {boolean} Whether the component is visible.
         */
        isVisible(): boolean;

        /**
         * Shows or hides the component.  Does nothing if the component already has
         * the requested visibility.  Otherwise, dispatches a SHOW or HIDE event as
         * appropriate, giving listeners a chance to prevent the visibility change.
         * When showing a component that is both enabled and focusable, ensures that
         * its key target has a tab index.  When hiding a component that is enabled
         * and focusable, blurs its key target and removes its tab index.
         * @param {boolean} visible Whether to show or hide the component.
         * @param {boolean=} opt_force If true, doesn't check whether the component
         *     already has the requested visibility, and doesn't dispatch any events.
         * @return {boolean} Whether the visibility was changed.
         */
        setVisible(visible: boolean, opt_force?: boolean): boolean;

        /**
         * Returns true if the component is enabled, false otherwise.
         * @return {boolean} Whether the component is enabled.
         */
        isEnabled(): boolean;

        /**
         * Returns true if the control has a parent that is itself disabled, false
         * otherwise.
         * @return {boolean} Whether the component is hosted in a disabled container.
         * @private
         */
        private isParentDisabled_(): boolean;

        /**
         * Enables or disables the component.  Does nothing if this state transition
         * is disallowed.  If the component is both visible and focusable, updates its
         * focused state and tab index as needed.  If the component is being disabled,
         * ensures that it is also deactivated and un-highlighted first.  Note that the
         * component's enabled/disabled state is "locked" as long as it is hosted in a
         * {@link goog.ui.Container} that is itself disabled; this is to prevent clients
         * from accidentally re-enabling a control that is in a disabled container.
         * @param {boolean} enable Whether to enable or disable the component.
         * @see #isTransitionAllowed
         */
        setEnabled(enable: boolean): void;

        /**
         * Returns true if the component is currently highlighted, false otherwise.
         * @return {boolean} Whether the component is highlighted.
         */
        isHighlighted(): boolean;

        /**
         * Highlights or unhighlights the component.  Does nothing if this state
         * transition is disallowed.
         * @param {boolean} highlight Whether to highlight or unhighlight the component.
         * @see #isTransitionAllowed
         */
        setHighlighted(highlight: boolean): void;

        /**
         * Returns true if the component is active (pressed), false otherwise.
         * @return {boolean} Whether the component is active.
         */
        isActive(): boolean;

        /**
         * Activates or deactivates the component.  Does nothing if this state
         * transition is disallowed.
         * @param {boolean} active Whether to activate or deactivate the component.
         * @see #isTransitionAllowed
         */
        setActive(active: boolean): void;

        /**
         * Returns true if the component is selected, false otherwise.
         * @return {boolean} Whether the component is selected.
         */
        isSelected(): boolean;

        /**
         * Selects or unselects the component.  Does nothing if this state transition
         * is disallowed.
         * @param {boolean} select Whether to select or unselect the component.
         * @see #isTransitionAllowed
         */
        setSelected(select: boolean): void;

        /**
         * Returns true if the component is checked, false otherwise.
         * @return {boolean} Whether the component is checked.
         */
        isChecked(): boolean;

        /**
         * Checks or unchecks the component.  Does nothing if this state transition
         * is disallowed.
         * @param {boolean} check Whether to check or uncheck the component.
         * @see #isTransitionAllowed
         */
        setChecked(check: boolean): void;

        /**
         * Returns true if the component is styled to indicate that it has keyboard
         * focus, false otherwise.  Note that `isFocused()` returning true
         * doesn't guarantee that the component's key event target has keyboard focus,
         * only that it is styled as such.
         * @return {boolean} Whether the component is styled to indicate as having
         *     keyboard focus.
         */
        isFocused(): boolean;

        /**
         * Applies or removes styling indicating that the component has keyboard focus.
         * Note that unlike the other "set" methods, this method is called as a result
         * of the component's element having received or lost keyboard focus, not the
         * other way around, so calling `setFocused(true)` doesn't guarantee that
         * the component's key event target has keyboard focus, only that it is styled
         * as such.
         * @param {boolean} focused Whether to apply or remove styling to indicate that
         *     the component's element has keyboard focus.
         */
        setFocused(focused: boolean): void;

        /**
         * Returns true if the component is open (expanded), false otherwise.
         * @return {boolean} Whether the component is open.
         */
        isOpen(): boolean;

        /**
         * Opens (expands) or closes (collapses) the component.  Does nothing if this
         * state transition is disallowed.
         * @param {boolean} open Whether to open or close the component.
         * @see #isTransitionAllowed
         */
        setOpen(open: boolean): void;

        /**
         * Returns the component's state as a bit mask of {@link
         * goog.ui.Component.State}s.
         * @return {number} Bit mask representing component state.
         */
        getState(): number;

        /**
         * Returns true if the component is in the specified state, false otherwise.
         * @param {goog.ui.Component.State} state State to check.
         * @return {boolean} Whether the component is in the given state.
         */
        hasState(state: goog.ui.Component.State): boolean;

        /**
         * Sets or clears the given state on the component, and updates its styling
         * accordingly.  Does nothing if the component is already in the correct state
         * or if it doesn't support the specified state.  Doesn't dispatch any state
         * transition events; use advisedly.
         * @param {goog.ui.Component.State} state State to set or clear.
         * @param {boolean} enable Whether to set or clear the state (if supported).
         * @param {boolean=} opt_calledFrom Prevents looping with setEnabled.
         */
        setState(state: goog.ui.Component.State, enable: boolean, opt_calledFrom?: boolean): void;

        /**
         * Sets the component's state to the state represented by a bit mask of
         * {@link goog.ui.Component.State}s.  Unlike {@link #setState}, doesn't
         * update the component's styling, and doesn't reject unsupported states.
         * Called by renderers during element decoration.  Considered protected;
         * should only be used within this package and by subclasses.
         *
         * This should only be used by subclasses and its associated renderers.
         *
         * @param {number} state Bit mask representing component state.
         */
        setStateInternal(state: number): void;

        /**
         * Returns true if the component supports the specified state, false otherwise.
         * @param {goog.ui.Component.State} state State to check.
         * @return {boolean} Whether the component supports the given state.
         */
        isSupportedState(state: goog.ui.Component.State): boolean;

        /**
         * Enables or disables support for the given state. Disabling support
         * for a state while the component is in that state is an error.
         * @param {goog.ui.Component.State} state State to support or de-support.
         * @param {boolean} support Whether the component should support the state.
         * @throws {Error} If disabling support for a state the control is currently in.
         */
        setSupportedState(state: goog.ui.Component.State, support: boolean): void;

        /**
         * Returns true if the component provides default event handling for the state,
         * false otherwise.
         * @param {goog.ui.Component.State} state State to check.
         * @return {boolean} Whether the component provides default event handling for
         *     the state.
         */
        isAutoState(state: goog.ui.Component.State): boolean;

        /**
         * Enables or disables automatic event handling for the given state(s).
         * @param {number} states Bit mask of {@link goog.ui.Component.State}s for which
         *     default event handling is to be enabled or disabled.
         * @param {boolean} enable Whether the component should provide default event
         *     handling for the state(s).
         */
        setAutoStates(states: number, enable: boolean): void;

        /**
         * Returns true if the component is set to dispatch transition events for the
         * given state, false otherwise.
         * @param {goog.ui.Component.State} state State to check.
         * @return {boolean} Whether the component dispatches transition events for
         *     the state.
         */
        isDispatchTransitionEvents(state: goog.ui.Component.State): boolean;

        /**
         * Enables or disables transition events for the given state(s).  Controls
         * handle state transitions internally by default, and only dispatch state
         * transition events if explicitly requested to do so by calling this method.
         * @param {number} states Bit mask of {@link goog.ui.Component.State}s for
         *     which transition events should be enabled or disabled.
         * @param {boolean} enable Whether transition events should be enabled.
         */
        setDispatchTransitionEvents(states: number, enable: boolean): void;

        /**
         * Returns true if the transition into or out of the given state is allowed to
         * proceed, false otherwise.  A state transition is allowed under the following
         * conditions:
         * <ul>
         *   <li>the component supports the state,
         *   <li>the component isn't already in the target state,
         *   <li>either the component is configured not to dispatch events for this
         *       state transition, or a transition event was dispatched and wasn't
         *       canceled by any event listener, and
         *   <li>the component hasn't been disposed of
         * </ul>
         * Considered protected; should only be used within this package and by
         * subclasses.
         * @param {goog.ui.Component.State} state State to/from which the control is
         *     transitioning.
         * @param {boolean} enable Whether the control is entering or leaving the state.
         * @return {boolean} Whether the state transition is allowed to proceed.
         * @protected
         */
        protected isTransitionAllowed(state: goog.ui.Component.State, enable: boolean): boolean;

        /**
         * Handles mouseover events.  Dispatches an ENTER event; if the event isn't
         * canceled, the component is enabled, and it supports auto-highlighting,
         * highlights the component.  Considered protected; should only be used
         * within this package and by subclasses.
         * @param {goog.events.BrowserEvent} e Mouse event to handle.
         */
        handleMouseOver(e: goog.events.BrowserEvent): void;

        /**
         * Handles mouseout events.  Dispatches a LEAVE event; if the event isn't
         * canceled, and the component supports auto-highlighting, deactivates and
         * un-highlights the component.  Considered protected; should only be used
         * within this package and by subclasses.
         * @param {goog.events.BrowserEvent} e Mouse event to handle.
         */
        handleMouseOut(e: goog.events.BrowserEvent): void;

        /**
         * Handles contextmenu events.
         * @param {goog.events.BrowserEvent} e Event to handle.
         */
        handleContextMenu(e: goog.events.BrowserEvent): void;

        /**
         * Handles mousedown events.  If the component is enabled, highlights and
         * activates it.  If the component isn't configured for keyboard access,
         * prevents it from receiving keyboard focus.  Considered protected; should
         * only be used within this package and by subclasses.
         * @param {goog.events.Event} e Mouse event to handle.
         */
        handleMouseDown(e: goog.events.Event): void;

        /**
         * Handles mouseup events.  If the component is enabled, highlights it.  If
         * the component has previously been activated, performs its associated action
         * by calling {@link performActionInternal}, then deactivates it.  Considered
         * protected; should only be used within this package and by subclasses.
         * @param {goog.events.Event} e Mouse event to handle.
         */
        handleMouseUp(e: goog.events.Event): void;

        /**
         * Handles dblclick events.  Should only be registered if the user agent is
         * IE.  If the component is enabled, performs its associated action by calling
         * {@link performActionInternal}.  This is used to allow more performant
         * buttons in IE.  In IE, no mousedown event is fired when that mousedown will
         * trigger a dblclick event.  Because of this, a user clicking quickly will
         * only cause ACTION events to fire on every other click.  This is a workaround
         * to generate ACTION events for every click.  Unfortunately, this workaround
         * won't ever trigger the ACTIVE state.  This is roughly the same behaviour as
         * if this were a 'button' element with a listener on mouseup.  Considered
         * protected; should only be used within this package and by subclasses.
         * @param {goog.events.Event} e Mouse event to handle.
         */
        handleDblClick(e: goog.events.Event): void;

        /**
         * Performs the appropriate action when the control is activated by the user.
         * The default implementation first updates the checked and selected state of
         * controls that support them, then dispatches an ACTION event.  Considered
         * protected; should only be used within this package and by subclasses.
         * @param {goog.events.Event} e Event that triggered the action.
         * @return {boolean} Whether the action is allowed to proceed.
         * @protected
         */
        protected performActionInternal(e: goog.events.Event): boolean;

        /**
         * Handles focus events on the component's key event target element.  If the
         * component is focusable, updates its state and styling to indicate that it
         * now has keyboard focus.  Considered protected; should only be used within
         * this package and by subclasses.  <b>Warning:</b> IE dispatches focus and
         * blur events asynchronously!
         * @param {goog.events.Event} e Focus event to handle.
         */
        handleFocus(e: goog.events.Event): void;

        /**
         * Handles blur events on the component's key event target element.  Always
         * deactivates the component.  In addition, if the component is focusable,
         * updates its state and styling to indicate that it no longer has keyboard
         * focus.  Considered protected; should only be used within this package and
         * by subclasses.  <b>Warning:</b> IE dispatches focus and blur events
         * asynchronously!
         * @param {goog.events.Event} e Blur event to handle.
         */
        handleBlur(e: goog.events.Event): void;

        /**
         * Attempts to handle a keyboard event, if the component is enabled and visible,
         * by calling {@link handleKeyEventInternal}.  Considered protected; should only
         * be used within this package and by subclasses.
         * @param {goog.events.KeyEvent} e Key event to handle.
         * @return {boolean} Whether the key event was handled.
         */
        handleKeyEvent(e: goog.events.KeyEvent): boolean;

        /**
         * Attempts to handle a keyboard event; returns true if the event was handled,
         * false otherwise.  Considered protected; should only be used within this
         * package and by subclasses.
         * @param {goog.events.KeyEvent} e Key event to handle.
         * @return {boolean} Whether the key event was handled.
         * @protected
         */
        protected handleKeyEventInternal(e: goog.events.KeyEvent): boolean;
    }
}

declare namespace goog.ui.Control {
    /**
     * A singleton that helps goog.ui.Control instances play well with screen
     * readers.  It necessitated by shortcomings in IE, and need not be
     * instantiated in any other browser.
     *
     * In most cases, a click on a goog.ui.Control results in a sequence of events:
     * MOUSEDOWN, MOUSEUP and CLICK.  UI controls rely on this sequence since most
     * behavior is trigged by MOUSEDOWN and MOUSEUP.  But when IE is used with some
     * traditional screen readers (JAWS, NVDA and perhaps others), IE only sends
     * the CLICK event, resulting in the control being unresponsive.  This class
     * monitors the sequence of these events, and if it detects a CLICK event not
     * not preceded by a MOUSEUP event, directly calls the control's event handlers
     * for MOUSEDOWN, then MOUSEUP.  While the resulting sequence is different from
     * the norm (the CLICK comes first instead of last), testing thus far shows
     * the resulting behavior to be correct.
     *
     * See http://goo.gl/qvQR4C for more details.
     *
     * @extends {goog.Disposable}
     * @private
     */
    class IeMouseEventSequenceSimulator_ extends __IeMouseEventSequenceSimulator_ {}
    abstract class __IeMouseEventSequenceSimulator_ extends goog.__Disposable {
        /**
         * @param {!goog.ui.Control} control
         */
        constructor(control: goog.ui.Control);

        /** @private {goog.ui.Control}*/
        private control_: any /*missing*/;

        /** @private {boolean} */
        private clickExpected_: any /*missing*/;

        /**
         * @private @const {!goog.events.EventHandler<
         *                       !goog.ui.Control.IeMouseEventSequenceSimulator_>}
         */
        private handler_: any /*missing*/;

        /** @private */
        private handleMouseDown_(): void;

        /** @private */
        private handleMouseUp_(): void;

        /**
         * @param {!goog.events.Event} e
         * @private
         */
        private handleClick_(e: goog.events.Event): void;
    }

    /**
     * Maps a CSS class name to a function that returns a new instance of
     * {@link goog.ui.Control} or a subclass thereof, suitable to decorate
     * an element that has the specified CSS class.  UI components that extend
     * {@link goog.ui.Control} and want {@link goog.ui.Container}s to be able
     * to discover and decorate elements using them should register a factory
     * function via this API.
     * @param {string} className CSS class name.
     * @param {Function} decoratorFunction Function that takes no arguments and
     *     returns a new instance of a control to decorate an element with the
     *     given class.
     * @deprecated Use {@link goog.ui.registry.setDecoratorByClassName} instead.
     */
    function registerDecorator(className: string, decoratorFunction: Function): void;

    /**
     * Takes an element and returns a new instance of {@link goog.ui.Control}
     * or a subclass, suitable to decorate it (based on the element's CSS class).
     * @param {Element} element Element to decorate.
     * @return {goog.ui.Control?} New control instance to decorate the element
     *     (null if none).
     * @deprecated Use {@link goog.ui.registry.getDecorator} instead.
     */
    function getDecorator(element: Element): goog.ui.Control|null;
}

declare namespace goog.ui.Control.IeMouseEventSequenceSimulator_ {
}
