/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="./dragger.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>
/// <reference path="../math/rect.d.ts"/>

declare module 'goog:goog.fx.DragListGroupEvent' {
    import alias = goog.fx.DragListGroupEvent;
    export default alias;
}

declare module 'goog:goog.fx.DragListGroup' {
    import alias = goog.fx.DragListGroup;
    export default alias;
}

declare module 'goog:goog.fx.DragListGroup.EventType' {
    import alias = goog.fx.DragListGroup.EventType;
    export default alias;
}

declare module 'goog:goog.fx.DragListDirection' {
    import alias = goog.fx.DragListDirection;
    export default alias;
}

declare namespace goog.fx {
    /**
     * A class representing a group of one or more "drag lists" with items that can
     * be dragged within them and between them.
     *
     * Example usage:
     *   var dragListGroup = new goog.fx.DragListGroup();
     *   dragListGroup.setDragItemHandleHoverClass(className1, className2);
     *   dragListGroup.setDraggerElClass(className3);
     *   dragListGroup.addDragList(vertList, goog.fx.DragListDirection.DOWN);
     *   dragListGroup.addDragList(horizList, goog.fx.DragListDirection.RIGHT);
     *   dragListGroup.init();
     *
     * @extends {goog.events.EventTarget}
     * @struct
     */
    class DragListGroup extends __DragListGroup {}
    abstract class __DragListGroup extends goog.events.__EventTarget {
        /**
         */
        constructor();

        /**
         * The user-supplied CSS classes to add to a drag item on hover (not during a
         * drag action).
         * @private {Array|undefined}
         */
        private dragItemHoverClasses_: any /*missing*/;

        /**
         * The user-supplied CSS classes to add to a drag item handle on hover (not
         * during a drag action).
         * @private {Array|undefined}
         */
        private dragItemHandleHoverClasses_: any /*missing*/;

        /**
         * The user-supplied CSS classes to add to the current drag item (during a
         * drag action).
         * @private {Array|undefined}
         */
        private currDragItemClasses_: any /*missing*/;

        /**
         * The user-supplied CSS classes to add to the clone of the current drag item
         * that's actually being dragged around (during a drag action).
         * @private {Array<string>|undefined}
         */
        private draggerElClasses_: any /*missing*/;

        /**
         * The current drag item being moved.
         * Note: This is only defined while a drag action is happening.
         * @private {Element}
         */
        private currDragItem_: any /*missing*/;

        /**
         * The drag list that `this.currDragItem_` is currently hovering over,
         * or null if it is not hovering over a list.
         * @private {Element}
         */
        private currHoverList_: any /*missing*/;

        /**
         * The original drag list that the current drag item came from. We need to
         * remember this in case the user drops the item outside of any lists, in
         * which case we return the item to its original location.
         * Note: This is only defined while a drag action is happening.
         * @private {Element}
         */
        private origList_: any /*missing*/;

        /**
         * The original next item in the original list that the current drag item came
         * from. We need to remember this in case the user drops the item outside of
         * any lists, in which case we return the item to its original location.
         * Note: This is only defined while a drag action is happening.
         * @private {Element}
         */
        private origNextItem_: any /*missing*/;

        /**
         * The current item in the list we are hovering over. We need to remember
         * this in case we do not update the position of the current drag item while
         * dragging (see `updateWhileDragging_`). In this case the current drag
         * item will be inserted into the list before this element when the drag ends.
         * @private {Element}
         */
        private currHoverItem_: any /*missing*/;

        /**
         * The clone of the current drag item that's actually being dragged around.
         * Note: This is only defined while a drag action is happening.
         * @private {HTMLElement}
         */
        private draggerEl_: any /*missing*/;

        /**
         * The dragger object.
         * Note: This is only defined while a drag action is happening.
         * @private {goog.fx.Dragger}
         */
        private dragger_: any /*missing*/;

        /**
         * The amount of distance, in pixels, after which a mousedown or touchstart is
         * considered a drag.
         * @private {number}
         */
        private hysteresisDistance_: any /*missing*/;

        /**
         * The drag lists.
         * @private {Array<Element>}
         */
        private dragLists_: any /*missing*/;

        /**
         * All the drag items. Set by init().
         * @private {Array<Element>}
         */
        private dragItems_: any /*missing*/;

        /**
         * Which drag item corresponds to a given handle.  Set by init().
         * Specifically, this maps from the unique ID (as given by goog.getUid)
         * of the handle to the drag item.
         * @private {Object}
         */
        private dragItemForHandle_: any /*missing*/;

        /**
         * The event handler for this instance.
         * @private {goog.events.EventHandler<!goog.fx.DragListGroup>}
         */
        private eventHandler_: any /*missing*/;

        /**
         * Whether the setup has been done to make all items in all lists draggable.
         * @private {boolean}
         */
        private isInitialized_: any /*missing*/;

        /**
         * Whether the currDragItem is always displayed. By default the list
         * collapses, the currDragItem's display is set to none, when we do not
         * hover over a draglist.
         * @private {boolean}
         */
        private isCurrDragItemAlwaysDisplayed_: any /*missing*/;

        /**
         * Whether to update the position of the currDragItem as we drag, i.e.,
         * insert the currDragItem each time to the position where it would land if
         * we were to end the drag at that point. Defaults to true.
         * @private {boolean}
         */
        private updateWhileDragging_: any /*missing*/;

        /**
         * Sets the property of the currDragItem that it is always displayed in the
         * list.
         */
        setIsCurrDragItemAlwaysDisplayed(): void;

        /**
         * Sets the private property updateWhileDragging_ to false. This disables the
         * update of the position of the currDragItem while dragging. It will only be
         * placed to its new location once the drag ends.
         */
        setNoUpdateWhileDragging(): void;

        /**
         * Sets the distance the user has to drag the element before a drag operation
         * is started.
         * @param {number} distance The number of pixels after which a mousedown and
         *     move is considered a drag.
         */
        setHysteresis(distance: number): void;

        /**
         * @return {number} distance The number of pixels after which a mousedown and
         *     move is considered a drag.
         */
        getHysteresis(): number;

        /** @return {boolean} true if the user is currently dragging an element. */
        isDragging(): boolean;

        /**
         * Adds a drag list to this DragListGroup.
         * All calls to this method must happen before the call to init().
         * Remember that all child nodes (except text nodes) will be made draggable to
         * any other drag list in this group.
         *
         * @param {Element} dragListElement Must be a container for a list of items
         *     that should all be made draggable.
         * @param {goog.fx.DragListDirection} growthDirection The direction that this
         *     drag list grows in (i.e. if an item is appended to the DOM, the list's
         *     bounding box expands in this direction).
         * @param {boolean=} opt_unused Unused argument.
         * @param {string=} opt_dragHoverClass CSS class to apply to this drag list when
         *     the draggerEl hovers over it during a drag action.  If present, must be a
         *     single, valid classname (not a string of space-separated classnames).
         */
        addDragList(
            dragListElement: Element,
            growthDirection: goog.fx.DragListDirection,
            opt_unused?: boolean,
            opt_dragHoverClass?: string
        ): void;

        /**
         * Sets a user-supplied function used to get the "handle" element for a drag
         * item. The function must accept exactly one argument. The argument may be
         * any drag item element.
         *
         * If not set, the default implementation uses the whole drag item as the
         * handle.
         *
         * @param {function(!Element): Element} getHandleForDragItemFn A function that,
         *     given any drag item, returns a reference to its "handle" element
         *     (which may be the drag item element itself).
         */
        setFunctionToGetHandleForDragItem(getHandleForDragItemFn: (_0: Element) => Element): void;

        /**
         * Sets a user-supplied CSS class to add to a drag item on hover (not during a
         * drag action).
         * @param {...string} var_args The CSS class or classes.
         */
        setDragItemHoverClass(...var_args: string[]): void;

        /**
         * Sets a user-supplied CSS class to add to a drag item handle on hover (not
         * during a drag action).
         * @param {...string} var_args The CSS class or classes.
         */
        setDragItemHandleHoverClass(...var_args: string[]): void;

        /**
         * Sets a user-supplied CSS class to add to the current drag item (during a
         * drag action).
         *
         * If not set, the default behavior adds visibility:hidden to the current drag
         * item so that it is a block of empty space in the hover drag list (if any).
         * If this class is set by the user, then the default behavior does not happen
         * (unless, of course, the class also contains visibility:hidden).
         *
         * @param {...string} var_args The CSS class or classes.
         */
        setCurrDragItemClass(...var_args: string[]): void;

        /**
         * Sets a user-supplied CSS class to add to the clone of the current drag item
         * that's actually being dragged around (during a drag action).
         * @param {string} draggerElClass The CSS class.
         */
        setDraggerElClass(draggerElClass: string): void;

        /**
         * Performs the initial setup to make all items in all lists draggable.
         */
        init(): void;

        /**
         * Adds a single item to the given drag list and sets up the drag listeners for
         * it.
         * If opt_index is specified the item is inserted at this index, otherwise the
         * item is added as the last child of the list.
         *
         * @param {!Element} list The drag list where to add item to.
         * @param {!Element} item The new element to add.
         * @param {number=} opt_index Index where to insert the item in the list. If not
         * specified item is inserted as the last child of list.
         */
        addItemToDragList(list: Element, item: Element, opt_index?: number): void;

        /**
         * Caches the heights of each drag list and drag item, except for the current
         * drag item.
         *
         */
        recacheListAndItemBounds(): void;

        /**
         * Caches the heights of each drag list and drag item, except for the current
         * drag item.
         *
         * @param {Element} currDragItem The item currently being dragged.
         * @private
         */
        private recacheListAndItemBounds_(currDragItem: Element): void;

        /**
         * Listens for drag events on the given drag item. This method is currently used
         * to initialize drag items.
         *
         * @param {!Element} dragItem the element to initialize. This element has to be
         * in one of the drag lists.
         * @protected
         */
        protected listenForDragEvents(dragItem: Element): void;

        /**
         * Handles mouse and touch events which may start a drag action.
         * @param {!goog.events.BrowserEvent} e MOUSEDOWN or TOUCHSTART event.
         * @private
         */
        private handlePotentialDragStart_(e: goog.events.BrowserEvent): void;

        /**
         * Creates copy of node being dragged.
         *
         * @param {Element} sourceEl Element to copy.
         * @return {!Element} The clone of `sourceEl`.
         * @deprecated Use goog.fx.Dragger.cloneNode().
         * @private
         */
        private cloneNode_(sourceEl: Element): Element;

        /**
         * Generates an element to follow the cursor during dragging, given a drag
         * source element.  The default behavior is simply to clone the source element,
         * but this may be overridden in subclasses.  This method is called by
         * `createDragElement()` before the drag class is added.
         *
         * @param {Element} sourceEl Drag source element.
         * @return {!Element} The new drag element.
         * @protected
         * @suppress {deprecated}
         */
        protected createDragElementInternal(sourceEl: Element): Element;

        /**
         * Handles the start of a drag action.
         * @param {!goog.fx.DragEvent} e goog.fx.Dragger.EventType.START event.
         * @private
         */
        private handleDragStart_(e: goog.fx.DragEvent): void;

        /**
         * Handles a drag movement (i.e. DRAG event fired by the dragger).
         *
         * @param {goog.fx.DragEvent} dragEvent Event object fired by the dragger.
         * @return {boolean} The return value for the event.
         * @private
         */
        private handleDragMove_(dragEvent: goog.fx.DragEvent): boolean;

        /**
         * Clear all our temporary fields that are only defined while dragging, and
         * all the bounds info stored on the drag lists and drag elements.
         * @param {!goog.events.Event=} opt_e EARLY_CANCEL event from the dragger if
         *     cleanup_ was called as an event handler.
         * @private
         */
        private cleanup_(opt_e?: goog.events.Event): void;

        /**
         * Handles the end or the cancellation of a drag action, i.e. END or CLEANUP
         * event fired by the dragger.
         *
         * @param {!goog.fx.DragEvent} dragEvent Event object fired by the dragger.
         * @return {boolean} Whether the event was handled.
         * @private
         */
        private handleDragEnd_(dragEvent: goog.fx.DragEvent): boolean;

        /**
         * Cleans up DOM changes that are made by the {@code handleDrag*} methods.
         * @private
         */
        private cleanupDragDom_(): void;

        /**
         * Default implementation of the function to get the "handle" element for a
         * drag item. By default, we use the whole drag item as the handle. Users can
         * change this by calling setFunctionToGetHandleForDragItem().
         *
         * @param {!Element} dragItem The drag item to get the handle for.
         * @return {Element} The dragItem element itself.
         * @private
         */
        private getHandleForDragItem_(dragItem: Element): Element;

        /**
         * Handles a MOUSEOVER event fired on a drag item.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleDragItemMouseover_(e: goog.events.BrowserEvent): void;

        /**
         * Handles a MOUSEOUT event fired on a drag item.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleDragItemMouseout_(e: goog.events.BrowserEvent): void;

        /**
         * Handles a MOUSEOVER event fired on the handle element of a drag item.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleDragItemHandleMouseover_(e: goog.events.BrowserEvent): void;

        /**
         * Handles a MOUSEOUT event fired on the handle element of a drag item.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private handleDragItemHandleMouseout_(e: goog.events.BrowserEvent): void;

        /**
         * Helper for handleDragMove_().
         * Given the position of the center of the dragger element, figures out whether
         * it's currently hovering over any of the drag lists.
         *
         * @param {goog.math.Coordinate} draggerElCenter The center position of the
         *     dragger element.
         * @return {Element} If currently hovering over a drag list, returns the drag
         *     list element. Else returns null.
         * @private
         */
        private getHoverDragList_(draggerElCenter: goog.math.Coordinate): Element;

        /**
         * Checks whether a coordinate position resides inside a rectangle.
         * @param {goog.math.Coordinate} pos The coordinate position.
         * @param {goog.math.Rect} rect The rectangle.
         * @return {boolean} True if 'pos' is within the bounds of 'rect'.
         * @private
         */
        private isInRect_(pos: goog.math.Coordinate, rect: goog.math.Rect): boolean;

        /**
         * Updates the value of currHoverItem_.
         *
         * This method is used for insertion only when updateWhileDragging_ is false.
         * The below implementation is the basic one. This method can be extended by
         * a subclass to support changes to hovered item (eg: highlighting). Parametr
         * opt_draggerElCenter can be used for more sophisticated effects.
         *
         * @param {Element} hoverNextItem element of the list that is hovered over.
         * @param {goog.math.Coordinate=} opt_draggerElCenter current position of
         *     the dragged element.
         * @protected
         */
        protected updateCurrHoverItem(hoverNextItem: Element, opt_draggerElCenter?: goog.math.Coordinate): void;

        /**
         * Inserts the currently dragged item in its new place.
         *
         * This method is used for insertion only when updateWhileDragging_ is false
         * (otherwise there is no need for that). In the basic implementation
         * the element is inserted before the currently hovered over item (this can
         * be changed by overriding the method in subclasses).
         *
         * @protected
         */
        protected insertCurrHoverItem(): void;

        /**
         * Helper for handleDragMove_().
         * Given the position of the center of the dragger element, plus the drag list
         * that it's currently hovering over, figures out the next drag item in the
         * list that follows the current position of the dragger element. (I.e. if
         * the drag action ends right now, it would become the item after the current
         * drag item.)
         *
         * @param {Element} hoverList The drag list that we're hovering over.
         * @param {goog.math.Coordinate} draggerElCenter The center position of the
         *     dragger element.
         * @return {Element} Returns the earliest item in the hover list that belongs
         *     after the current position of the dragger element. If all items in the
         *     list should come before the current drag item, then returns null.
         * @private
         */
        private getHoverNextItem_(hoverList: Element, draggerElCenter: goog.math.Coordinate): Element;

        /**
         * Inserts the current drag item to the appropriate location in the drag list
         * that we're hovering over (if the current drag item is not already there).
         *
         * @param {Element} hoverList The drag list we're hovering over.
         * @param {Element} hoverNextItem The next item in the hover drag list.
         * @private
         */
        private insertCurrDragItem_(hoverList: Element, hoverNextItem: Element): void;
    }

    /**
     * The event object dispatched by DragListGroup.
     * The fields draggerElCenter, hoverList, and hoverNextItem are only available
     * for the BEFOREDRAGMOVE and DRAGMOVE events.
     *
     * @struct
     * @extends {goog.events.Event}
     */
    class DragListGroupEvent extends __DragListGroupEvent {}
    abstract class __DragListGroupEvent extends goog.events.__Event {
        /**
         * @param {!goog.fx.DragListGroup.EventType} type
         * @param {goog.fx.DragListGroup} dragListGroup A reference to the associated
         *     DragListGroup object.
         * @param {goog.events.BrowserEvent|goog.fx.DragEvent} event The event fired
         *     by the browser or fired by the dragger.
         * @param {Element} currDragItem The current drag item being moved.
         * @param {Element} draggerEl The clone of the current drag item that's actually
         *     being dragged around.
         * @param {goog.fx.Dragger} dragger The dragger object.
         * @param {goog.math.Coordinate=} opt_draggerElCenter The current center
         *     position of the draggerEl.
         * @param {Element=} opt_hoverList The current drag list that's being hovered
         *     over, or null if the center of draggerEl is outside of any drag lists.
         *     If not null and the drag action ends right now, then currDragItem will
         *     end up in this list.
         * @param {Element=} opt_hoverNextItem The current next item in the hoverList
         *     that the draggerEl is hovering over. (I.e. If the drag action ends
         *     right now, then this item would become the next item after the new
         *     location of currDragItem.) May be null if not applicable or if
         *     currDragItem would be added to the end of hoverList.
         */
        constructor(
            type: goog.fx.DragListGroup.EventType,
            dragListGroup: goog.fx.DragListGroup,
            event: goog.events.BrowserEvent|goog.fx.DragEvent,
            currDragItem: Element,
            draggerEl: Element,
            dragger: goog.fx.Dragger,
            opt_draggerElCenter?: goog.math.Coordinate,
            opt_hoverList?: Element,
            opt_hoverNextItem?: Element
        );

        /**
         * A reference to the associated DragListGroup object.
         * @type {goog.fx.DragListGroup}
         */
        dragListGroup: goog.fx.DragListGroup;

        /**
         * The event fired by the browser or fired by the dragger.
         * @type {goog.events.BrowserEvent|goog.fx.DragEvent}
         */
        event: goog.events.BrowserEvent|goog.fx.DragEvent;

        /**
         * The current drag item being move.
         * @type {Element}
         */
        currDragItem: Element;

        /**
         * The clone of the current drag item that's actually being dragged around.
         * @type {Element}
         */
        draggerEl: Element;

        /**
         * The dragger object.
         * @type {goog.fx.Dragger}
         */
        dragger: goog.fx.Dragger;

        /**
         * The current center position of the draggerEl.
         * @type {goog.math.Coordinate|undefined}
         */
        draggerElCenter: goog.math.Coordinate|undefined;

        /**
         * The current drag list that's being hovered over, or null if the center of
         * draggerEl is outside of any drag lists. (I.e. If not null and the drag
         * action ends right now, then currDragItem will end up in this list.)
         * @type {Element|undefined}
         */
        hoverList: Element|undefined;

        /**
         * The current next item in the hoverList that the draggerEl is hovering over.
         * (I.e. If the drag action ends right now, then this item would become the
         * next item after the new location of currDragItem.) May be null if not
         * applicable or if currDragItem would be added to the end of hoverList.
         * @type {Element|undefined}
         */
        hoverNextItem: Element|undefined;
    }

    /**
     * Enum to indicate the direction that a drag list grows.
     * @enum {number}
     */
    enum DragListDirection { DOWN, RIGHT, LEFT, RIGHT_2D, LEFT_2D }
}

declare namespace goog.fx.DragListGroup {
    /**
     * Events dispatched by this class.
     * @enum {!goog.events.EventId<!goog.fx.DragListGroupEvent>}
     */
    enum EventType {
        DRAGGERCREATED,
        BEFOREDRAGSTART,
        DRAGSTART,
        BEFOREDRAGMOVE,
        DRAGMOVE,
        BEFOREDRAGEND,
        DRAGEND,
        DRAGGERREMOVED
    }
}
