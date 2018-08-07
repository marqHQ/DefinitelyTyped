/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>
/// <reference path="./undoredomanager.d.ts"/>
/// <reference path="../../events/events.d.ts"/>
/// <reference path="../field.d.ts"/>
/// <reference path="../../events/event.d.ts"/>
/// <reference path="./undoredostate.d.ts"/>
/// <reference path="../../dom/abstractrange.d.ts"/>

declare module 'goog:goog.editor.plugins.UndoRedo' {
    import alias = goog.editor.plugins.UndoRedo;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Encapsulates undo/redo logic using a custom undo stack (i.e. not browser
     * built-in). Browser built-in undo stacks are too flaky (e.g. IE's gets
     * clobbered on DOM modifications). Also, this allows interleaving non-editing
     * commands into the undo stack via the UndoRedoManager.
     *
     * @extends {goog.editor.Plugin}
     */
    class UndoRedo extends __UndoRedo {}
    abstract class __UndoRedo extends goog.editor.__Plugin {
        /**
         * @param {goog.editor.plugins.UndoRedoManager=} opt_manager An undo redo
         *    manager to be used by this plugin. If none is provided one is created.
         */
        constructor(opt_manager?: goog.editor.plugins.UndoRedoManager);

        /**
         * @type {?string}
         * @private
         */
        private initialFieldChange_: string|null;

        /**
         * A copy of `goog.editor.plugins.UndoRedo.restoreState` bound to this,
         * used by undo-redo state objects to restore the state of an editable field.
         * @type {Function}
         * @see goog.editor.plugins.UndoRedo#restoreState
         * @private
         */
        private boundRestoreState_: Function;

        /**
         * The `UndoState_` whose change is in progress, null if an undo or redo
         * is not in progress.
         *
         * @type {goog.editor.plugins.UndoRedo.UndoState_?}
         * @private
         */
        private inProgressUndo_: any|null;

        /**
         * The undo-redo stack manager used by this plugin.
         * @type {goog.editor.plugins.UndoRedoManager}
         * @private
         */
        private undoManager_: goog.editor.plugins.UndoRedoManager;

        /**
         * The key for the event listener handling state change events from the
         * undo-redo manager.
         * @type {goog.events.Key}
         * @private
         */
        private managerStateChangeKey_: goog.events.Key;

        /**
         * Set the max undo stack depth (not the real memory usage).
         * @param {number} depth Depth of the stack.
         */
        setMaxUndoDepth(depth: number): void;

        /**
         * Set the undo-redo manager used by this plugin. Any state on a previous
         * undo-redo manager is lost.
         * @param {goog.editor.plugins.UndoRedoManager} manager The undo-redo manager.
         */
        setUndoRedoManager(manager: goog.editor.plugins.UndoRedoManager): void;

        /**
         * This is so subclasses can deal with multifield undo-redo.
         * @return {goog.editor.Field} The active field object for this field. This is
         *     the one registered field object for the single-plugin case and the
         *     focused field for the multi-field plugin case.
         */
        getCurrentFieldObject(): goog.editor.Field;

        /**
         * This is so subclasses can deal with multifield undo-redo.
         * @param {string} fieldHashCode The Field's hashcode.
         * @return {goog.editor.Field} The field object with the hashcode.
         */
        getFieldObjectForHash(fieldHashCode: string): goog.editor.Field;

        /**
         * This is so subclasses can deal with multifield undo-redo.
         * @return {goog.editor.Field} Target for COMMAND_VALUE_CHANGE events.
         */
        getCurrentEventTarget(): goog.editor.Field;

        /**
         * Dispatches the COMMAND_VALUE_CHANGE event on the editable field or the field
         * manager, as appropriate.
         * Note: Really, people using multi field mode should be listening directly
         * to the undo-redo manager for events.
         * @private
         */
        private dispatchCommandValueChange_(): void;

        /**
         * Restores the state of the editable field.
         * @param {goog.editor.plugins.UndoRedo.UndoState_} state The state initiating
         *    the restore.
         * @param {string} content The content to restore.
         * @param {goog.editor.plugins.UndoRedo.CursorPosition_?} cursorPosition
         *     The cursor position within the content.
         */
        restoreState(state: any, content: string, cursorPosition: any|null): void;

        /**
         * Clear the undo/redo stack.
         */
        clearHistory(): void;

        /**
         * Refreshes the current state of the editable field as maintained by undo-redo,
         * without adding any undo-redo states to the stack.
         * @param {goog.editor.Field} fieldObject The editable field.
         */
        refreshCurrentState(fieldObject: goog.editor.Field): void;

        /**
         * Before the field changes, we want to save the state.
         * @param {goog.events.Event} e The event.
         * @private
         */
        private handleBeforeChange_(e: goog.events.Event): void;

        /**
         * After some idle time, we want to save the state.
         * @param {goog.events.Event} e The event.
         * @private
         */
        private handleDelayedChange_(e: goog.events.Event): void;

        /**
         * When the user blurs away, we need to save the state on that field.
         * @param {goog.events.Event} e The event.
         * @private
         */
        private handleBlur_(e: goog.events.Event): void;

        /**
         * Returns the goog.editor.plugins.UndoRedo.CursorPosition_ for the current
         * selection in the given Field.
         * @param {goog.editor.Field} fieldObj The field object.
         * @return {goog.editor.plugins.UndoRedo.CursorPosition_} The CursorPosition_ or
         *    null if there is no valid selection.
         * @private
         */
        private getCursorPosition_(fieldObj: goog.editor.Field): any;

        /**
         * Helper method for saving state.
         * @param {goog.editor.Field} fieldObj The field object.
         * @private
         */
        private updateCurrentState_(fieldObj: goog.editor.Field): void;
    }
}

declare namespace goog.editor.plugins.UndoRedo {
    /**
     * This object encapsulates the state of an editable field.
     *
     * @private
     * @extends {goog.editor.plugins.UndoRedoState}
     */
    class UndoState_ extends __UndoState_ {}
    abstract class __UndoState_ extends goog.editor.plugins.__UndoRedoState {
        /**
         * @param {string} fieldHashCode String the id of the field we're saving the
         *     content of.
         * @param {string} content String the actual text we're saving.
         * @param {goog.editor.plugins.UndoRedo.CursorPosition_?} cursorPosition
         *     CursorPosLite object for the cursor position in the field.
         * @param {Function} restore The function used to restore editable field state.
         */
        constructor(fieldHashCode: string, content: string, cursorPosition: any|null, restore: Function);

        /**
         * The hash code for the field whose content is being saved.
         * @type {string}
         */
        fieldHashCode: string;

        /**
         * The bound copy of `goog.editor.plugins.UndoRedo.restoreState` used by
         * this state.
         * @type {Function}
         * @private
         */
        private restore_: Function;

        /**
         * The content to restore on undo.
         * @type {string}
         * @private
         */
        private undoContent_: string;

        /**
         * The cursor position to restore on undo.
         * @type {goog.editor.plugins.UndoRedo.CursorPosition_?}
         * @private
         */
        private undoCursorPosition_: any|null;

        /**
         * The content to restore on redo, undefined until the state is pushed onto the
         * undo stack.
         * @type {string|undefined}
         * @private
         */
        private redoContent_: string|undefined;

        /**
         * The cursor position to restore on redo, undefined until the state is pushed
         * onto the undo stack.
         * @type {goog.editor.plugins.UndoRedo.CursorPosition_|null|undefined}
         * @private
         */
        private redoCursorPosition_: any|null|undefined;

        /**
         * Updates the undo portion of this state. Should only be used to update the
         * current state of an editable field, which is not yet on the undo stack after
         * an undo or redo operation. You should never be modifying states on the stack!
         * @param {string} content The current content.
         * @param {goog.editor.plugins.UndoRedo.CursorPosition_?} cursorPosition
         *     The current cursor position.
         */
        setUndoState(content: string, cursorPosition: any|null): void;

        /**
         * Adds redo information to this state. This method should be called before the
         * state is added onto the undo stack.
         *
         * @param {string} content The content to restore on a redo.
         * @param {goog.editor.plugins.UndoRedo.CursorPosition_?} cursorPosition
         *     The cursor position to restore on a redo.
         */
        setRedoState(content: string, cursorPosition: any|null): void;
    }

    /**
     * Stores the state of the selection in a way the survives DOM modifications
     * that don't modify the user-interactable content (e.g. making something bold
     * vs. typing a character).
     *
     * TODO(user): Completely get rid of this and use goog.dom.SavedCaretRange.
     *
     * @private
     */
    class CursorPosition_ extends __CursorPosition_ {}
    abstract class __CursorPosition_ {
        /**
         * @param {goog.editor.Field} field The field the selection is in.
         */
        constructor(field: goog.editor.Field);

        /**
         * The standards compliant version keeps a list of childNode offsets.
         * @param {goog.dom.AbstractRange?} range The range to save.
         * @private
         */
        private initW3C_(range: goog.dom.AbstractRange|null): void;

        /**
         * In IE, we just keep track of the text offset (number of characters).
         * @param {goog.dom.AbstractRange?} range The range to save.
         * @private
         */
        private initIE_(range: goog.dom.AbstractRange|null): void;

        /**
         * @return {boolean} Whether this object is valid.
         */
        isValid(): boolean;

        /**
         * Makes the browser's selection match the cursor position.
         */
        select(): void;

        /**
         * Get the range that encompases the the cursor position relative to a given
         * base node.
         * @param {Element} baseNode The node to get the cursor position relative to.
         * @return {Range|TextRange|null} The browser range for this position.
         * @private
         */
        private getRange_(baseNode: Element): Range|null;
    }

    /**
     * Commands implemented by this plugin.
     * @enum {string}
     */
    enum COMMAND { UNDO, REDO }
}

declare namespace goog.editor.plugins.UndoRedo.CursorPosition_ {
}
