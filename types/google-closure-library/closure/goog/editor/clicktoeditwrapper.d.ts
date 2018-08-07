/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./field.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../dom/savedcaretrange.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.editor.ClickToEditWrapper' {
    import alias = goog.editor.ClickToEditWrapper;
    export default alias;
}

declare namespace goog.editor {
    /**
     * Initialize the wrapper, and begin listening to mouse events immediately.
     * @extends {goog.Disposable}
     */
    class ClickToEditWrapper extends __ClickToEditWrapper {}
    abstract class __ClickToEditWrapper extends goog.__Disposable {
        /**
         * @param {goog.editor.Field} fieldObj The editable field being wrapped.
         */
        constructor(fieldObj: goog.editor.Field);

        /**
         * The field this wrapper interacts with.
         * @type {goog.editor.Field}
         * @private
         */
        private fieldObj_: goog.editor.Field;

        /**
         * DOM helper for the field's original element.
         * @type {goog.dom.DomHelper}
         * @private
         */
        private originalDomHelper_: goog.dom.DomHelper;

        /**
         * @type {goog.dom.SavedCaretRange}
         * @private
         */
        private savedCaretRange_: goog.dom.SavedCaretRange;

        /**
         * Event handler for field related events.
         * @type {!goog.events.EventHandler<!goog.editor.ClickToEditWrapper>}
         * @private
         */
        private fieldEventHandler_: goog.events.EventHandler<goog.editor.ClickToEditWrapper>;

        /**
         * Bound version of the finishMouseUp method.
         * @type {Function}
         * @private
         */
        private finishMouseUpBound_: Function;

        /**
         * Event handler for mouse events.
         * @type {!goog.events.EventHandler<!goog.editor.ClickToEditWrapper>}
         * @private
         */
        private mouseEventHandler_: goog.events.EventHandler<goog.editor.ClickToEditWrapper>;

        /** @return {goog.editor.Field} The field. */
        getFieldObject(): goog.editor.Field;

        /** @return {goog.dom.DomHelper} The dom helper of the uneditable element. */
        getOriginalDomHelper(): goog.dom.DomHelper;

        /**
         * Initialize listeners when the uneditable field is added to the document.
         * Also sets up lorem ipsum text.
         */
        enterDocument(): void;

        /**
         * Destroy listeners when the field is removed from the document.
         */
        exitDocument(): void;

        /**
         * Returns the uneditable field element if the field is not yet editable
         * (equivalent to EditableField.getOriginalElement()), and the editable DOM
         * element if the field is currently editable (equivalent to
         * EditableField.getElement()).
         * @return {Element} The element containing the editable field contents.
         */
        getElement(): Element;

        /**
         * True if a mouse event should be handled, false if it should be ignored.
         * @param {goog.events.BrowserEvent} e The mouse event.
         * @return {boolean} Wether or not this mouse event should be handled.
         * @private
         */
        private shouldHandleMouseEvent_(e: goog.events.BrowserEvent): boolean;

        /**
         * Handle mouse click events on the field.
         * @param {goog.events.BrowserEvent} e The click event.
         * @private
         */
        private handleClick_(e: goog.events.BrowserEvent): void;

        /**
         * Handle a mouse up event on the field.
         * @param {goog.events.BrowserEvent} e The mouseup event.
         * @private
         */
        private handleMouseUp_(e: goog.events.BrowserEvent): void;

        /**
         * A helper function for handleMouseUp_ -- does the actual work
         * when the event is finished propagating.
         * @private
         */
        private finishMouseUp_(): void;

        /**
         * Ensure that the field is editable. If the field is not editable,
         * make it so, and record the fact that it was done by a user mouse event.
         * @private
         */
        private ensureFieldEditable_(): void;

        /**
         * Once the field has loaded in an iframe, re-create the selection
         * as marked by the carets.
         * @private
         */
        private renderSelection_(): void;

        /**
         * Focus on the field object.
         * @param {goog.editor.Field} field The field to focus.
         * @protected
         */
        protected focusOnFieldObj(field: goog.editor.Field): void;

        /**
         * Make the field object editable.
         * @param {goog.editor.Field} field The field to make editable.
         * @protected
         */
        protected makeFieldEditable(field: goog.editor.Field): void;

        /**
         * Inserts the carets, given the current selection.
         *
         * Note that for all practical purposes, a cursor position is just
         * a selection with the start and end at the same point.
         * @private
         */
        private insertCarets_(): void;
    }
}

declare namespace goog.editor.ClickToEditWrapper {
}
