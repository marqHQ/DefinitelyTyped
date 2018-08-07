/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.KeyboardShortcutHandler' {
    import alias = goog.ui.KeyboardShortcutHandler;
    export default alias;
}

declare module 'goog:goog.ui.KeyboardShortcutHandler.Modifiers' {
    import alias = goog.ui.KeyboardShortcutHandler.Modifiers;
    export default alias;
}

declare module 'goog:goog.ui.KeyboardShortcutHandler.EventType' {
    import alias = goog.ui.KeyboardShortcutHandler.EventType;
    export default alias;
}

declare module 'goog:goog.ui.KeyboardShortcutEvent' {
    import alias = goog.ui.KeyboardShortcutEvent;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Component for handling keyboard shortcuts. A shortcut is registered and bound
     * to a specific identifier. Once the shortcut is triggered an event is fired
     * with the identifier for the shortcut. This allows keyboard shortcuts to be
     * customized without modifying the code that listens for them.
     *
     * Supports keyboard shortcuts triggered by a single key, a stroke stroke (key
     * plus at least one modifier) and a sequence of keys or strokes.
     *
     * @extends {goog.events.EventTarget}
     */
    class KeyboardShortcutHandler extends __KeyboardShortcutHandler {}
    abstract class __KeyboardShortcutHandler extends goog.events.__EventTarget {
        /**
         * @param {goog.events.EventTarget|EventTarget} keyTarget Event target that the
         *     key event listener is attached to, typically the applications root
         *     container.
         */
        constructor(keyTarget: goog.events.EventTarget|EventTarget);

        /**
         * Registered keyboard shortcuts tree. Stored as a map with the keyCode and
         * modifier(s) as the key and either a list of further strokes or the shortcut
         * task identifier as the value.
         * @type {!goog.ui.KeyboardShortcutHandler.SequenceTree_}
         * @see #makeStroke_
         * @private
         */
        private shortcuts_: any;

        /**
         * The currently active shortcut sequence tree, which represents the position
         * in the complete shortcuts_ tree reached by recent key strokes.
         * @type {!goog.ui.KeyboardShortcutHandler.SequenceTree_}
         * @private
         */
        private currentTree_: any;

        /**
         * The time (in ms, epoch time) of the last keystroke which made progress in
         * the shortcut sequence tree (i.e. the time that currentTree_ was last set).
         * Used for timing out stroke sequences.
         * @type {number}
         * @private
         */
        private lastStrokeTime_: number;

        /**
         * List of numeric key codes for keys that are safe to always regarded as
         * shortcuts, even if entered in a textarea or input field.
         * @type {Object}
         * @private
         */
        private globalKeys_: Object;

        /**
         * List of input types that should only accept ENTER as a shortcut.
         * @type {Object}
         * @private
         */
        private textInputs_: Object;

        /**
         * Whether to always prevent the default action if a shortcut event is fired.
         * @type {boolean}
         * @private
         */
        private alwaysPreventDefault_: boolean;

        /**
         * Whether to always stop propagation if a shortcut event is fired.
         * @type {boolean}
         * @private
         */
        private alwaysStopPropagation_: boolean;

        /**
         * Whether to treat all shortcuts as if they had been passed
         * to setGlobalKeys().
         * @type {boolean}
         * @private
         */
        private allShortcutsAreGlobal_: boolean;

        /**
         * Whether to treat shortcuts with modifiers as if they had been passed
         * to setGlobalKeys().  Ignored if allShortcutsAreGlobal_ is true.  Applies
         * only to form elements (not content-editable).
         * @type {boolean}
         * @private
         */
        private modifierShortcutsAreGlobal_: boolean;

        /**
         * Whether to treat space key as a shortcut when the focused element is a
         * checkbox, radiobutton or button.
         * @type {boolean}
         * @private
         */
        private allowSpaceKeyOnButtons_: boolean;

        /**
         * Tracks the currently pressed shortcut key, for Firefox.
         * @type {?number}
         * @private
         */
        private activeShortcutKeyForGecko_: number|null;

        /**
         * Target on which to listen for key events.
         * @type {goog.events.EventTarget|EventTarget}
         * @private
         */
        private keyTarget_: goog.events.EventTarget|EventTarget;

        /**
         * Due to a bug in the way that Gecko on Mac handles cut/copy/paste key events
         * using the meta key, it is necessary to fake the keyDown for the action key
         * (C,V,X) by capturing it on keyUp.
         * Because users will often release the meta key a slight moment before they
         * release the action key, we need this variable that will store whether the
         * meta key has been released recently.
         * It will be cleared after a short delay in the key handling logic.
         * @type {boolean}
         * @private
         */
        private metaKeyRecentlyReleased_: boolean;

        /**
         * Whether a key event is a printable-key event. Windows uses ctrl+alt
         * (alt-graph) keys to type characters on European keyboards. For such keys, we
         * cannot identify whether these keys are used for typing characters when
         * receiving keydown events. Therefore, we set this flag when we receive their
         * respective keypress events and fire shortcut events only when we do not
         * receive them.
         * @type {boolean}
         * @private
         */
        private isPrintableKey_: boolean;

        /**
         * Sets whether to always prevent the default action when a shortcut event is
         * fired. If false, the default action is prevented only if preventDefault is
         * called on either of the corresponding SHORTCUT_TRIGGERED or SHORTCUT_PREFIX
         * events. If true, the default action is prevented whenever a shortcut event
         * is fired. The default value is true.
         * @param {boolean} alwaysPreventDefault Whether to always call preventDefault.
         */
        setAlwaysPreventDefault(alwaysPreventDefault: boolean): void;

        /**
         * Returns whether the default action will always be prevented when a shortcut
         * event is fired. The default value is true.
         * @see #setAlwaysPreventDefault
         * @return {boolean} Whether preventDefault will always be called.
         */
        getAlwaysPreventDefault(): boolean;

        /**
         * Sets whether to always stop propagation for the event when fired. If false,
         * the propagation is stopped only if stopPropagation is called on either of the
         * corresponding SHORT_CUT_TRIGGERED or SHORTCUT_PREFIX events. If true, the
         * event is prevented from propagating beyond its target whenever it is fired.
         * The default value is false.
         * @param {boolean} alwaysStopPropagation Whether to always call
         *     stopPropagation.
         */
        setAlwaysStopPropagation(alwaysStopPropagation: boolean): void;

        /**
         * Returns whether the event will always be stopped from propagating beyond its
         * target when a shortcut event is fired. The default value is false.
         * @see #setAlwaysStopPropagation
         * @return {boolean} Whether stopPropagation will always be called.
         */
        getAlwaysStopPropagation(): boolean;

        /**
         * Sets whether to treat all shortcuts (including modifier shortcuts) as if the
         * keys had been passed to the setGlobalKeys function.
         * @param {boolean} allShortcutsGlobal Whether to treat all shortcuts as global.
         */
        setAllShortcutsAreGlobal(allShortcutsGlobal: boolean): void;

        /**
         * Returns whether all shortcuts (including modifier shortcuts) are treated as
         * if the keys had been passed to the setGlobalKeys function.
         * @see #setAllShortcutsAreGlobal
         * @return {boolean} Whether all shortcuts are treated as globals.
         */
        getAllShortcutsAreGlobal(): boolean;

        /**
         * Sets whether to treat shortcuts with modifiers as if the keys had been
         * passed to the setGlobalKeys function.  Ignored if you have called
         * setAllShortcutsAreGlobal(true).  Applies only to form elements (not
         * content-editable).
         * @param {boolean} modifierShortcutsGlobal Whether to treat shortcuts with
         *     modifiers as global.
         */
        setModifierShortcutsAreGlobal(modifierShortcutsGlobal: boolean): void;

        /**
         * Returns whether shortcuts with modifiers are treated as if the keys had been
         * passed to the setGlobalKeys function.  Ignored if you have called
         * setAllShortcutsAreGlobal(true).  Applies only to form elements (not
         * content-editable).
         * @see #setModifierShortcutsAreGlobal
         * @return {boolean} Whether shortcuts with modifiers are treated as globals.
         */
        getModifierShortcutsAreGlobal(): boolean;

        /**
         * Sets whether to treat space key as a shortcut when the focused element is a
         * checkbox, radiobutton or button.
         * @param {boolean} allowSpaceKeyOnButtons Whether to treat space key as a
         *     shortcut when the focused element is a checkbox, radiobutton or button.
         */
        setAllowSpaceKeyOnButtons(allowSpaceKeyOnButtons: boolean): void;

        /**
         * Registers a keyboard shortcut.
         * @param {string} identifier Identifier for the task performed by the keyboard
         *                 combination. Multiple shortcuts can be provided for the same
         *                 task by specifying the same identifier.
         * @param {...(number|string|Array<number>)} var_args See below.
         *
         * param {number} keyCode Numeric code for key
         * param {number=} opt_modifiers Bitmap indicating required modifier keys.
         *                goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT, CTRL, ALT,
         *                or META.
         *
         * The last two parameters can be repeated any number of times to create a
         * shortcut using a sequence of strokes. Instead of varargs the second parameter
         * could also be an array where each element would be regarded as a parameter.
         *
         * A string representation of the shortcut can be supplied instead of the last
         * two parameters. In that case the method only takes two arguments, the
         * identifier and the string.
         *
         * Examples:
         *   g               registerShortcut(str, G_KEYCODE)
         *   Ctrl+g          registerShortcut(str, G_KEYCODE, CTRL)
         *   Ctrl+Shift+g    registerShortcut(str, G_KEYCODE, CTRL | SHIFT)
         *   Ctrl+g a        registerShortcut(str, G_KEYCODE, CTRL, A_KEYCODE)
         *   Ctrl+g Shift+a  registerShortcut(str, G_KEYCODE, CTRL, A_KEYCODE, SHIFT)
         *   g a             registerShortcut(str, G_KEYCODE, NONE, A_KEYCODE)
         *
         * Examples using string representation for shortcuts:
         *   g               registerShortcut(str, 'g')
         *   Ctrl+g          registerShortcut(str, 'ctrl+g')
         *   Ctrl+Shift+g    registerShortcut(str, 'ctrl+shift+g')
         *   Ctrl+g a        registerShortcut(str, 'ctrl+g a')
         *   Ctrl+g Shift+a  registerShortcut(str, 'ctrl+g shift+a')
         *   g a             registerShortcut(str, 'g a').
         */
        registerShortcut(identifier: string, ...var_args: (number|string|number[])[]): void;

        /**
         * Unregisters a keyboard shortcut by keyCode and modifiers or string
         * representation of sequence.
         *
         * param {number} keyCode Numeric code for key
         * param {number=} opt_modifiers Bitmap indicating required modifier keys.
         *                 goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT, CTRL, ALT,
         *                 or META.
         *
         * The two parameters can be repeated any number of times to create a shortcut
         * using a sequence of strokes.
         *
         * A string representation of the shortcut can be supplied instead see
         * {@link #registerShortcut} for syntax. In that case the method only takes one
         * argument.
         *
         * @param {...(number|string|Array<number>)} var_args String representation, or
         *     array or list of alternating key codes and modifiers.
         */
        unregisterShortcut(...var_args: (number|string|number[])[]): void;

        /**
         * Verifies if a particular keyboard shortcut is registered already. It has
         * the same interface as the unregistering of shortcuts.
         *
         * param {number} keyCode Numeric code for key
         * param {number=} opt_modifiers Bitmap indicating required modifier keys.
         *                 goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT, CTRL, ALT,
         *                 or META.
         *
         * The two parameters can be repeated any number of times to create a shortcut
         * using a sequence of strokes.
         *
         * A string representation of the shortcut can be supplied instead see
         * {@link #registerShortcut} for syntax. In that case the method only takes one
         * argument.
         *
         * @param {...(number|string|Array<number>)} var_args String representation, or
         *     array or list of alternating key codes and modifiers.
         * @return {boolean} Whether the specified keyboard shortcut is registered.
         */
        isShortcutRegistered(...var_args: (number|string|number[])[]): boolean;

        /**
         * Parses the variable arguments for registerShortcut and unregisterShortcut.
         * @param {number} initialIndex The first index of "args" to treat as
         *     variable arguments.
         * @param {Object} args The "arguments" array passed
         *     to registerShortcut or unregisterShortcut.  Please see the comments in
         *     registerShortcut for list of allowed forms.
         * @return {!Array<Array<string>>} The sequence of strokes,
         *     represented as arrays of strings.
         * @private
         */
        private interpretStrokes_(initialIndex: number, args: Object): string[][];

        /**
         * Unregisters all keyboard shortcuts.
         */
        unregisterAll(): void;

        /**
         * Sets the global keys; keys that are safe to always regarded as shortcuts,
         * even if entered in a textarea or input field.
         * @param {Array<number>} keys List of keys.
         */
        setGlobalKeys(keys: number[]): void;

        /**
         * @return {!Array<string>} The global keys, i.e. keys that are safe to always
         *     regard as shortcuts, even if entered in a textarea or input field.
         */
        getGlobalKeys(): string[];

        /**
         * Returns event type for a specific shortcut.
         * @param {string} identifier Identifier for the shortcut task.
         * @return {string} The event type.
         */
        getEventType(identifier: string): string;

        /**
         * Adds a key event listener that triggers {@link #handleKeyDown_} when keys
         * are pressed.
         * @param {goog.events.EventTarget|EventTarget} keyTarget Event target that the
         *     event listener should be attached to.
         * @protected
         */
        protected initializeKeyListener(keyTarget: goog.events.EventTarget|EventTarget): void;

        /**
         * Handler for when a keyup event is fired. Currently only handled on Windows
         * (all browsers) or Gecko (all platforms).
         * @param {!goog.events.BrowserEvent} e The key event.
         * @private
         */
        private handleKeyUp_(e: goog.events.BrowserEvent): void;

        /**
         * Handler for when a keyup event is fired in Firefox (Gecko).
         * @param {!goog.events.BrowserEvent} e The key event.
         * @private
         */
        private handleGeckoKeyUp_(e: goog.events.BrowserEvent): void;

        /**
         * Returns whether this event is possibly used for typing a printable character.
         * Windows uses ctrl+alt (a.k.a. alt-graph) keys for typing characters on
         * European keyboards. Since only Firefox provides a method that can identify
         * whether ctrl+alt keys are used for typing characters, we need to check
         * whether Windows sends a keypress event to prevent firing shortcut event if
         * this event is used for typing characters.
         * @param {!goog.events.BrowserEvent} e The key event.
         * @return {boolean} Whether this event is a possible printable-key event.
         * @private
         */
        private isPossiblePrintableKey_(e: goog.events.BrowserEvent): boolean;

        /**
         * Handler for when a keypress event is fired on Windows.
         * @param {!goog.events.BrowserEvent} e The key event.
         * @private
         */
        private handleWindowsKeyPress_(e: goog.events.BrowserEvent): void;

        /**
         * Handler for when a keyup event is fired on Windows.
         * @param {!goog.events.BrowserEvent} e The key event.
         * @private
         */
        private handleWindowsKeyUp_(e: goog.events.BrowserEvent): void;

        /**
         * Removes the listener that was added by link {@link #initializeKeyListener}.
         * @protected
         */
        protected clearKeyListener(): void;

        /**
         * Checks tree for a node matching one of stroke.
         * @param {!goog.ui.KeyboardShortcutHandler.SequenceTree_} tree The
         *     stroke sequence tree to find the node in.
         * @param {Array<string>} stroke Stroke to find.
         * @return {goog.ui.KeyboardShortcutHandler.SequenceNode_|undefined} Node matching stroke.
         * @private
         */
        private getNode_(tree: any, stroke: string[]): any|undefined;

        /**
         * Checks if a particular keyboard shortcut is registered.
         * @param {goog.ui.KeyboardShortcutHandler.SequenceTree_|null} tree The
         *     stroke sequence tree to find the keyboard shortcut in.
         * @param {Array<Array<string>>} strokes Strokes array.
         * @return {boolean} True iff the keyboard shortcut is registred.
         * @private
         */
        private checkShortcut_(tree: any|null, strokes: string[][]): boolean;

        /**
         * Keypress handler.
         * @param {!goog.events.BrowserEvent} event Keypress event.
         * @private
         */
        private handleKeyDown_(event: goog.events.BrowserEvent): void;

        /**
         * Checks if a given keypress event may be treated as a shortcut.
         * @param {!goog.events.BrowserEvent} event Keypress event.
         * @return {boolean} Whether to attempt to process the event as a shortcut.
         * @private
         */
        private isValidShortcut_(event: goog.events.BrowserEvent): boolean;

        /**
         * @return {boolean} True iff the current stroke sequence has timed out.
         * @private
         */
        private hasSequenceTimedOut_(): boolean;

        /**
         * Sets the current keyboard shortcut sequence tree and updates the last stroke
         * time.
         * @param {!goog.ui.KeyboardShortcutHandler.SequenceTree_} tree
         * @private
         */
        private setCurrentTree_(tree: any): void;
    }

    /**
     * Object representing a keyboard shortcut event.
     * @extends {goog.events.Event}
     * @final
     */
    class KeyboardShortcutEvent extends __KeyboardShortcutEvent {}
    abstract class __KeyboardShortcutEvent extends goog.events.__Event {
        /**
         * @param {string} type Event type.
         * @param {string} identifier Task identifier for the triggered shortcut.
         * @param {Node|goog.events.EventTarget} target Target the original key press
         *     event originated from.
         */
        constructor(type: string, identifier: string, target: Node|goog.events.EventTarget);

        /**
         * Task identifier for the triggered shortcut
         * @type {string}
         */
        identifier: string;
    }
}

declare namespace goog.ui.KeyboardShortcutHandler {
    /**
     * A node in a keyboard shortcut sequence tree. A node is either:
     * 1. A terminal node with a non-nullable shortcut string which is the
     *    identifier for the shortcut triggered by traversing the tree to that node.
     * 2. An internal node with a null shortcut string and a
     *    `goog.ui.KeyboardShortcutHandler.SequenceTree_` representing the
     *    continued stroke sequences from this node.
     * For clarity, the static factory methods for creating internal and terminal
     * nodes below should be used rather than using this constructor directly.
     * @struct
     * @private
     */
    class SequenceNode_ extends __SequenceNode_ {}
    abstract class __SequenceNode_ {
        /**
         * @param {string=} opt_shortcut The shortcut identifier, for terminal nodes.
         */
        constructor(opt_shortcut?: string);

        /** @const {?string} The shorcut action identifier, for terminal nodes. */
        readonly shortcut: any /*missing*/;

        /** @const {goog.ui.KeyboardShortcutHandler.SequenceTree_} */
        readonly next: any /*missing*/;
    }

    /**
     * Maximum allowed delay, in milliseconds, allowed between the first and second
     * key in a key sequence.
     * @type {number}
     */
    let MAX_KEY_SEQUENCE_DELAY: number;

    /**
     * Bit values for modifier keys.
     * @enum {number}
     */
    enum Modifiers { NONE, SHIFT, CTRL, ALT, META }

    /**
     * Events.
     * @enum {string}
     */
    enum EventType { SHORTCUT_TRIGGERED, SHORTCUT_PREFIX }

    /**
     * Static method for getting the key code for a given key.
     * @param {string} name Name of key.
     * @return {number} The key code.
     */
    function getKeyCode(name: string): number;

    /**
     * Builds stroke array from string representation of shortcut.
     * @param {string} s String representation of shortcut.
     * @return {!Array<!{key: ?string, keyCode: ?number, modifiers: number}>} The
     *     stroke array.  A null keyCode means no non-modifier key was part of the
     *     stroke.
     */
    function parseStringShortcut(s: string): {key: string|null; keyCode: number | null; modifiers: number}[];
}
