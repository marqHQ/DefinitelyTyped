/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="./undoredostate.d.ts"/>
/// <reference path="../../events/events.d.ts"/>

declare module 'goog:goog.editor.plugins.UndoRedoManager' {
    import alias = goog.editor.plugins.UndoRedoManager;
    export default alias;
}

declare module 'goog:goog.editor.plugins.UndoRedoManager.EventType' {
    import alias = goog.editor.plugins.UndoRedoManager.EventType;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Manages undo and redo operations through a series of `UndoRedoState`s
     * maintained on undo and redo stacks.
     *
     * @extends {goog.events.EventTarget}
     */
    class UndoRedoManager extends __UndoRedoManager {}
    abstract class __UndoRedoManager extends goog.events.__EventTarget {
        /**
         */
        constructor();

        /**
         * The maximum number of states on the undo stack at any time. Used to limit
         * the memory footprint of the undo-redo stack.
         * TODO(user) have a separate memory size based limit.
         * @type {number}
         * @private
         */
        private maxUndoDepth_: number;

        /**
         * The undo stack.
         * @type {Array<goog.editor.plugins.UndoRedoState>}
         * @private
         */
        private undoStack_: goog.editor.plugins.UndoRedoState[];

        /**
         * The redo stack.
         * @type {Array<goog.editor.plugins.UndoRedoState>}
         * @private
         */
        private redoStack_: goog.editor.plugins.UndoRedoState[];

        /**
         * A queue of pending undo or redo actions. Stored as objects with two
         * properties: func and state. The func property stores the undo or redo
         * function to be called, the state property stores the state that method
         * came from.
         * @type {Array<Object>}
         * @private
         */
        private pendingActions_: Object[];

        /**
         * The key for the listener for the completion of the asynchronous state whose
         * undo or redo action is in progress. Null if no action is in progress.
         * @type {goog.events.Key}
         * @private
         */
        private inProgressActionKey_: goog.events.Key;

        /**
         * Set the max undo stack depth (not the real memory usage).
         * @param {number} depth Depth of the stack.
         */
        setMaxUndoDepth(depth: number): void;

        /**
         * Add state to the undo stack. This clears the redo stack.
         *
         * @param {goog.editor.plugins.UndoRedoState} state The state to add to the undo
         *     stack.
         */
        addState(state: goog.editor.plugins.UndoRedoState): void;

        /**
         * Dispatches a STATE_CHANGE event with this manager as the target.
         * @private
         */
        private dispatchStateChange_(): void;

        /**
         * Performs the undo operation of the state at the top of the undo stack, moving
         * that state to the top of the redo stack. If the undo stack is empty, does
         * nothing.
         */
        undo(): void;

        /**
         * Performs the redo operation of the state at the top of the redo stack, moving
         * that state to the top of the undo stack. If redo undo stack is empty, does
         * nothing.
         */
        redo(): void;

        /**
         * @return {boolean} Wether the undo stack has items on it, i.e., if it is
         *     possible to perform an undo operation.
         */
        hasUndoState(): boolean;

        /**
         * @return {boolean} Wether the redo stack has items on it, i.e., if it is
         *     possible to perform a redo operation.
         */
        hasRedoState(): boolean;

        /**
         * Move a state from one stack to the other, performing the appropriate undo
         * or redo action.
         *
         * @param {Array<goog.editor.plugins.UndoRedoState>} fromStack Stack to move
         *     the state from.
         * @param {Array<goog.editor.plugins.UndoRedoState>} toStack Stack to move
         *     the state to.
         * @private
         */
        private shiftState_(
            fromStack: goog.editor.plugins.UndoRedoState[], toStack: goog.editor.plugins.UndoRedoState[]
        ): void;

        /**
         * Adds an action to the queue of pending undo or redo actions. If no actions
         * are pending, immediately performs the action.
         *
         * @param {Object} action An undo or redo action. Stored as an object with two
         *     properties: func and state. The func property stores the undo or redo
         *     function to be called, the state property stores the state that method
         *     came from.
         * @private
         */
        private addAction_(action: Object): void;

        /**
         * Executes the action at the front of the pending actions queue. If an action
         * is already in progress or the queue is empty, does nothing.
         * @private
         */
        private doAction_(): void;

        /**
         * Finishes processing the current in progress action, starting the next queued
         * action if one exists.
         * @private
         */
        private finishAction_(): void;

        /**
         * Clears the undo and redo stacks.
         */
        clearHistory(): void;

        /**
         * @return {goog.editor.plugins.UndoRedoState|undefined} The state at the top of
         *     the undo stack without removing it from the stack.
         */
        undoPeek(): goog.editor.plugins.UndoRedoState|undefined;

        /**
         * @return {goog.editor.plugins.UndoRedoState|undefined} The state at the top of
         *     the redo stack without removing it from the stack.
         */
        redoPeek(): goog.editor.plugins.UndoRedoState|undefined;
    }
}

declare namespace goog.editor.plugins.UndoRedoManager {
    /**
     * Event types for the events dispatched by undo-redo manager.
     * @enum {string}
     */
    enum EventType { STATE_CHANGE, STATE_ADDED, BEFORE_UNDO, BEFORE_REDO }
}
