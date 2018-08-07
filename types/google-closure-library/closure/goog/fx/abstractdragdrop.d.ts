/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="./dragger.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>
/// <reference path="../math/box.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>

declare module 'goog:goog.fx.DragDropItem' {
    import alias = goog.fx.DragDropItem;
    export default alias;
}

declare module 'goog:goog.fx.DragDropEvent' {
    import alias = goog.fx.DragDropEvent;
    export default alias;
}

declare module 'goog:goog.fx.AbstractDragDrop' {
    import alias = goog.fx.AbstractDragDrop;
    export default alias;
}

declare module 'goog:goog.fx.AbstractDragDrop.EventType' {
    import alias = goog.fx.AbstractDragDrop.EventType;
    export default alias;
}

declare namespace goog.fx {
    /**
     * Abstract class that provides reusable functionality for implementing drag
     * and drop functionality.
     *
     * This class also allows clients to define their own subtargeting function
     * so that drop areas can have finer granularity than a single element. This is
     * accomplished by using a client provided function to map from element and
     * coordinates to a subregion id.
     *
     * This class can also be made aware of scrollable containers that contain
     * drop targets by calling addScrollableContainer. This will cause dnd to
     * take changing scroll positions into account while a drag is occurring.
     *
     * @extends {goog.events.EventTarget}
     * @struct
     */
    class AbstractDragDrop extends __AbstractDragDrop {}
    abstract class __AbstractDragDrop extends goog.events.__EventTarget {
        /**
         */
        constructor();

        /**
         * List of items that makes up the drag source or drop target.
         * @protected {Array<goog.fx.DragDropItem>}
         * @suppress {underscore|visibility}
         */
        protected items_: any /*missing*/;

        /**
         * List of associated drop targets.
         * @private {Array<goog.fx.AbstractDragDrop>}
         */
        private targets_: any /*missing*/;

        /**
         * Scrollable containers to account for during drag
         * @private {Array<goog.fx.ScrollableContainer_>}
         */
        private scrollableContainers_: any /*missing*/;

        /**
         * Flag indicating if it's a drag source, set by addTarget.
         * @private {boolean}
         */
        private isSource_: any /*missing*/;

        /**
         * Flag indicating if it's a drop target, set when added as target to another
         * DragDrop object.
         * @private {boolean}
         */
        private isTarget_: any /*missing*/;

        /**
         * Subtargeting function accepting args:
         * (goog.fx.DragDropItem, goog.math.Box, number, number)
         * @private {?Function}
         */
        private subtargetFunction_: any /*missing*/;

        /**
         * Last active subtarget.
         * @private {?Object}
         */
        private activeSubtarget_: any /*missing*/;

        /**
         * Class name to add to source elements being dragged. Set by setDragClass.
         * @private {?string}
         */
        private dragClass_: any /*missing*/;

        /**
         * Class name to add to source elements. Set by setSourceClass.
         * @private {?string}
         */
        private sourceClass_: any /*missing*/;

        /**
         * Class name to add to target elements. Set by setTargetClass.
         * @private {?string}
         */
        private targetClass_: any /*missing*/;

        /**
         * The SCROLL event target used to make drag element follow scrolling.
         * @private {?EventTarget}
         */
        private scrollTarget_: any /*missing*/;

        /**
         * Dummy target, {@see maybeCreateDummyTargetForPosition_}.
         * @private {?goog.fx.ActiveDropTarget_}
         */
        private dummyTarget_: any /*missing*/;

        /**
         * Whether the object has been initialized.
         * @private {boolean}
         */
        private initialized_: any /*missing*/;

        /** @private {?Element} */
        private dragEl_: any /*missing*/;

        /** @private {?Array<!goog.fx.ActiveDropTarget_>} */
        private targetList_: any /*missing*/;

        /** @private {?goog.math.Box} */
        private targetBox_: any /*missing*/;

        /** @private {?goog.fx.ActiveDropTarget_} */
        private activeTarget_: any /*missing*/;

        /** @private {?goog.fx.DragDropItem} */
        private dragItem_: any /*missing*/;

        /** @private {?goog.fx.Dragger} */
        private dragger_: any /*missing*/;

        /**
         * Set class to add to source elements being dragged.
         *
         * @param {string} className Class to be added.  Must be a single, valid
         *     classname.
         */
        setDragClass(className: string): void;

        /**
         * Set class to add to source elements.
         *
         * @param {string} className Class to be added.  Must be a single, valid
         *     classname.
         */
        setSourceClass(className: string): void;

        /**
         * Set class to add to target elements.
         *
         * @param {string} className Class to be added.  Must be a single, valid
         *     classname.
         */
        setTargetClass(className: string): void;

        /**
         * Whether the control has been initialized.
         *
         * @return {boolean} True if it's been initialized.
         */
        isInitialized(): boolean;

        /**
         * Add item to drag object.
         *
         * @param {Element|string} element Dom Node, or string representation of node
         *     id, to be used as drag source/drop target.
         * @throws Error Thrown if called on instance of abstract class
         */
        addItem(element: Element|string): void;

        /**
         * Associate drop target with drag element.
         *
         * @param {goog.fx.AbstractDragDrop} target Target to add.
         */
        addTarget(target: goog.fx.AbstractDragDrop): void;

        /**
         * Removes the specified target from the list of drop targets.
         *
         * @param {!goog.fx.AbstractDragDrop} target Target to remove.
         */
        removeTarget(target: goog.fx.AbstractDragDrop): void;

        /**
         * Sets the SCROLL event target to make drag element follow scrolling.
         *
         * @param {EventTarget} scrollTarget The element that dispatches SCROLL events.
         */
        setScrollTarget(scrollTarget: EventTarget): void;

        /**
         * Initialize drag and drop functionality for sources/targets already added.
         * Sources/targets added after init has been called will initialize themselves
         * one by one.
         */
        init(): void;

        /**
         * Initializes a single item.
         *
         * @param {goog.fx.DragDropItem} item Item to initialize.
         * @protected
         */
        protected initItem(item: goog.fx.DragDropItem): void;

        /**
         * Called when removing an item. Removes event listeners and classes.
         *
         * @param {goog.fx.DragDropItem} item Item to dispose.
         * @protected
         */
        protected disposeItem(item: goog.fx.DragDropItem): void;

        /**
         * Removes all items.
         */
        removeItems(): void;

        /**
         * Starts a drag event for an item if the mouse button stays pressed and the
         * cursor moves a few pixels. Allows dragging of items without first having to
         * register them with addItem.
         *
         * @param {goog.events.BrowserEvent} event Mouse down event.
         * @param {goog.fx.DragDropItem} item Item that's being dragged.
         */
        maybeStartDrag(event: goog.events.BrowserEvent, item: goog.fx.DragDropItem): void;

        /**
         * Event handler that's used to start drag.
         *
         * @param {goog.events.BrowserEvent} event Mouse move event.
         * @param {goog.fx.DragDropItem} item Item that's being dragged.
         */
        startDrag(event: goog.events.BrowserEvent, item: goog.fx.DragDropItem): void;

        /**
         * Recalculates the geometry of this source's drag targets.  Call this
         * if the position or visibility of a drag target has changed during
         * a drag, or if targets are added or removed.
         *
         * TODO(user): this is an expensive operation;  more efficient APIs
         * may be necessary.
         */
        recalculateDragTargets(): void;

        /**
         * Recalculates the current scroll positions of scrollable containers and
         * allocates targets. Call this if the position of a container changed or if
         * targets are added or removed.
         */
        recalculateScrollableContainers(): void;

        /**
         * Creates the Dragger for the drag element.
         * @param {Element} sourceEl Drag source element.
         * @param {Element} el the element created by createDragElement().
         * @param {goog.events.BrowserEvent} event Mouse down event for start of drag.
         * @return {!goog.fx.Dragger} The new Dragger.
         * @protected
         */
        protected createDraggerFor(sourceEl: Element, el: Element, event: goog.events.BrowserEvent): goog.fx.Dragger;

        /**
         * Event handler that's used to stop drag. Fires a drop event if over a valid
         * target.
         *
         * @param {goog.fx.DragEvent} event Drag event.
         */
        endDrag(event: goog.fx.DragEvent): void;

        /**
         * Called after a drag operation has finished.
         *
         * @param {goog.fx.DragDropItem=} opt_dropTarget Target for successful drop.
         * @protected
         */
        protected afterEndDrag(opt_dropTarget?: goog.fx.DragDropItem): void;

        /**
         * Called once a drag operation has finished. Removes event listeners and
         * elements.
         *
         * @protected
         */
        protected disposeDrag(): void;

        /**
         * Event handler for drag events. Determines the active drop target, if any, and
         * fires dragover and dragout events appropriately.
         *
         * @param {goog.fx.DragEvent} event Drag event.
         * @private
         */
        private moveDrag_(event: goog.fx.DragEvent): void;

        /**
         * Event handler for suppressing selectstart events. Selecting should be
         * disabled while dragging.
         *
         * @param {goog.events.Event} event The selectstart event to suppress.
         * @return {boolean} Whether to perform default behavior.
         * @private
         */
        private suppressSelect_(event: goog.events.Event): boolean;

        /**
         * Sets up listeners for the scrollable containers that keep track of their
         * scroll positions.
         * @private
         */
        private initScrollableContainerListeners_(): void;

        /**
         * Cleans up the scrollable container listeners.
         * @private
         */
        private disposeScrollableContainerListeners_(): void;

        /**
         * Makes drag and drop aware of a target container that could scroll mid drag.
         * @param {Element} element The scroll container.
         */
        addScrollableContainer(element: Element): void;

        /**
         * Removes all scrollable containers.
         */
        removeAllScrollableContainers(): void;

        /**
         * Event handler for containers scrolling.
         * @param {goog.events.BrowserEvent} e The event.
         * @suppress {visibility} TODO(martone): update dependent projects.
         * @private
         */
        private containerScrollHandler_(e: goog.events.BrowserEvent): void;

        /**
         * Set a function that provides subtargets. A subtargeting function
         * returns an arbitrary identifier for each subtarget of an element.
         * DnD code will generate additional drag over / out events when
         * switching from subtarget to subtarget. This is useful for instance
         * if you are interested if you are on the top half or the bottom half
         * of the element.
         * The provided function will be given the DragDropItem, box, x, y
         * box is the current window coordinates occupied by element
         * x, y is the mouse position in window coordinates
         *
         * @param {Function} f The new subtarget function.
         */
        setSubtargetFunction(f: Function): void;

        /**
         * Creates an element for the item being dragged.
         *
         * @param {Element} sourceEl Drag source element.
         * @return {Element} The new drag element.
         */
        createDragElement(sourceEl: Element): Element;

        /**
         * Returns the position for the drag element.
         *
         * @param {Element} el Drag source element.
         * @param {Element} dragEl The dragged element created by createDragElement().
         * @param {goog.events.BrowserEvent} event Mouse down event for start of drag.
         * @return {!goog.math.Coordinate} The position for the drag element.
         */
        getDragElementPosition(el: Element, dragEl: Element, event: goog.events.BrowserEvent): goog.math.Coordinate;

        /**
         * Returns the dragger object.
         *
         * @return {goog.fx.Dragger} The dragger object used by this drag and drop
         *     instance.
         */
        getDragger(): goog.fx.Dragger;

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
         * Add possible drop target for current drag operation.
         *
         * @param {goog.fx.AbstractDragDrop} target Drag handler.
         * @param {goog.fx.DragDropItem} item Item that's being dragged.
         * @private
         */
        private addDragTarget_(target: goog.fx.AbstractDragDrop, item: goog.fx.DragDropItem): void;

        /**
         * Calculates the position and dimension of a draggable element.
         *
         * @param {goog.fx.DragDropItem} item Item that's being dragged.
         * @param {Element} element The element to calculate the box.
         *
         * @return {!goog.math.Box} Box describing the position and dimension
         *     of element.
         * @protected
         */
        protected getElementBox(item: goog.fx.DragDropItem, element: Element): goog.math.Box;

        /**
         * Calculate the outer bounds (the region all targets are inside).
         *
         * @param {goog.math.Box} box Box describing the position and dimension
         *     of a drag target.
         * @private
         */
        private calculateTargetBox_(box: goog.math.Box): void;

        /**
         * Creates a dummy target for the given cursor position. The assumption is to
         * create as big dummy target box as possible, the only constraints are:
         * - The dummy target box cannot overlap any of real target boxes.
         * - The dummy target has to contain a point with current mouse coordinates.
         *
         * NOTE: For performance reasons the box construction algorithm is kept simple
         * and it is not optimal (see example below). Currently it is O(n) in regard to
         * the number of real drop target boxes, but its result depends on the order
         * of those boxes being processed (the order in which they're added to the
         * targetList_ collection).
         *
         * The algorithm.
         * a) Assumptions
         * - Mouse pointer is in the bounding box of real target boxes.
         * - None of the boxes have negative coordinate values.
         * - Mouse pointer is not contained by any of "real target" boxes.
         * - For targets inside a scrollable container, the box used is the
         *   intersection of the scrollable container's box and the target's box.
         *   This is because the part of the target that extends outside the scrollable
         *   container should not be used in the clipping calculations.
         *
         * b) Outline
         * - Initialize the fake target to the bounding box of real targets.
         * - For each real target box - clip the fake target box so it does not contain
         *   that target box, but does contain the mouse pointer.
         *   -- Project the real target box, mouse pointer and fake target box onto
         *      both axes and calculate the clipping coordinates.
         *   -- Only one coordinate is used to clip the fake target box to keep the
         *      fake target as big as possible.
         *   -- If the projection of the real target box contains the mouse pointer,
         *      clipping for a given axis is not possible.
         *   -- If both clippings are possible, the clipping more distant from the
         *      mouse pointer is selected to keep bigger fake target area.
         * - Save the created fake target only if it has a big enough area.
         *
         *
         * c) Example
         * <pre>
         *        Input:           Algorithm created box:        Maximum box:
         * +---------------------+ +---------------------+ +---------------------+
         * | B1      |        B2 | | B1               B2 | | B1               B2 |
         * |         |           | |   +-------------+   | |+-------------------+|
         * |---------x-----------| |   |             |   | ||                   ||
         * |         |           | |   |             |   | ||                   ||
         * |         |           | |   |             |   | ||                   ||
         * |         |           | |   |             |   | ||                   ||
         * |         |           | |   |             |   | ||                   ||
         * |         |           | |   +-------------+   | |+-------------------+|
         * | B4      |        B3 | | B4               B3 | | B4               B3 |
         * +---------------------+ +---------------------+ +---------------------+
         * </pre>
         *
         * @param {number} x Cursor position on the x-axis.
         * @param {number} y Cursor position on the y-axis.
         * @return {goog.fx.ActiveDropTarget_} Dummy drop target.
         * @private
         */
        private maybeCreateDummyTargetForPosition_(x: number, y: number): any;

        /**
         * Returns the target for a given cursor position.
         *
         * @param {goog.math.Coordinate} position Cursor position.
         * @return {goog.fx.ActiveDropTarget_} Target for position or null if no target
         *     was defined for the given position.
         * @private
         */
        private getTargetFromPosition_(position: goog.math.Coordinate): any;

        /**
         * Checks whatever a given point is inside a given box.
         *
         * @param {number} x Cursor position on the x-axis.
         * @param {number} y Cursor position on the y-axis.
         * @param {goog.math.Box} box Box to check position against.
         * @return {boolean} Whether the given point is inside `box`.
         * @protected
         * @deprecated Use goog.math.Box.contains.
         */
        protected isInside(x: number, y: number, box: goog.math.Box): boolean;

        /**
         * Gets the scroll distance as a coordinate object, using
         * the window of the current drag element's dom.
         * @return {!goog.math.Coordinate} Object with scroll offsets 'x' and 'y'.
         * @protected
         */
        protected getScrollPos(): goog.math.Coordinate;

        /**
         * Get the position of a drag event.
         * @param {goog.fx.DragEvent} event Drag event.
         * @return {!goog.math.Coordinate} Position of the event.
         * @protected
         */
        protected getEventPosition(event: goog.fx.DragEvent): goog.math.Coordinate;
    }

    /**
     * Object representing a drag and drop event.
     *
     * @extends {goog.events.Event}
     * @struct
     */
    class DragDropEvent extends __DragDropEvent {}
    abstract class __DragDropEvent extends goog.events.__Event {
        /**
         * @param {string} type Event type.
         * @param {goog.fx.AbstractDragDrop} source Source drag drop object.
         * @param {goog.fx.DragDropItem} sourceItem Source item.
         * @param {goog.fx.AbstractDragDrop=} opt_target Target drag drop object.
         * @param {goog.fx.DragDropItem=} opt_targetItem Target item.
         * @param {Element=} opt_targetElement Target element.
         * @param {number=} opt_clientX X-Position relative to the screen.
         * @param {number=} opt_clientY Y-Position relative to the screen.
         * @param {number=} opt_x X-Position relative to the viewport.
         * @param {number=} opt_y Y-Position relative to the viewport.
         * @param {Object=} opt_subtarget The currently active subtarget.
         * @param {goog.events.BrowserEvent=} opt_browserEvent The browser event
         *     that caused this dragdrop event.
         */
        constructor(
            type: string,
            source: goog.fx.AbstractDragDrop,
            sourceItem: goog.fx.DragDropItem,
            opt_target?: goog.fx.AbstractDragDrop,
            opt_targetItem?: goog.fx.DragDropItem,
            opt_targetElement?: Element,
            opt_clientX?: number,
            opt_clientY?: number,
            opt_x?: number,
            opt_y?: number,
            opt_subtarget?: Object,
            opt_browserEvent?: goog.events.BrowserEvent
        );

        /**
         * Reference to the source goog.fx.AbstractDragDrop object.
         * @type {goog.fx.AbstractDragDrop}
         */
        dragSource: goog.fx.AbstractDragDrop;

        /**
         * Reference to the source goog.fx.DragDropItem object.
         * @type {goog.fx.DragDropItem}
         */
        dragSourceItem: goog.fx.DragDropItem;

        /**
         * Reference to the target goog.fx.AbstractDragDrop object.
         * @type {goog.fx.AbstractDragDrop|undefined}
         */
        dropTarget: goog.fx.AbstractDragDrop|undefined;

        /**
         * Reference to the target goog.fx.DragDropItem object.
         * @type {goog.fx.DragDropItem|undefined}
         */
        dropTargetItem: goog.fx.DragDropItem|undefined;

        /**
         * The actual element of the drop target that is the target for this event.
         * @type {Element|undefined}
         */
        dropTargetElement: Element|undefined;

        /**
         * X-Position relative to the screen.
         * @type {number|undefined}
         */
        clientX: number|undefined;

        /**
         * Y-Position relative to the screen.
         * @type {number|undefined}
         */
        clientY: number|undefined;

        /**
         * X-Position relative to the viewport.
         * @type {number|undefined}
         */
        viewportX: number|undefined;

        /**
         * Y-Position relative to the viewport.
         * @type {number|undefined}
         */
        viewportY: number|undefined;

        /**
         * The subtarget that is currently active if a subtargeting function
         * is supplied.
         * @type {Object|undefined}
         */
        subtarget: Object|undefined;

        /**
         * The browser event that caused this dragdrop event.
         * @const
         */
        readonly browserEvent: any /*missing*/;
    }

    /**
     * Class representing a source or target element for drag and drop operations.
     *
     * @throws Error If no element argument is provided or if the type is invalid
     * @extends {goog.events.EventTarget}
     * @struct
     */
    class DragDropItem extends __DragDropItem {}
    abstract class __DragDropItem extends goog.events.__EventTarget {
        /**
         * @param {Element|string} element Dom Node, or string representation of node
         *     id, to be used as drag source/drop target.
         * @param {Object=} opt_data Data associated with the source/target.
         */
        constructor(element: Element|string, opt_data?: Object);

        /**
         * Reference to drag source/target element
         * @type {Element}
         */
        element: Element;

        /**
         * Data associated with element.
         * @type {Object|undefined}
         */
        data: Object|undefined;

        /**
         * Drag object the item belongs to.
         * @type {goog.fx.AbstractDragDrop?}
         * @private
         */
        private parent_: goog.fx.AbstractDragDrop|null;

        /**
         * Event handler for listeners on events that can initiate a drag.
         * @type {!goog.events.EventHandler<!goog.fx.DragDropItem>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.fx.DragDropItem>;

        /**
         * The current element being dragged. This is needed because a DragDropItem
         * can have multiple elements that can be dragged.
         * @private {?Element}
         */
        private currentDragElement_: any /*missing*/;

        /** @private {?goog.math.Coordinate} */
        private startPosition_: any /*missing*/;

        /**
         * Get the data associated with the source/target.
         * @return {Object|null|undefined} Data associated with the source/target.
         */
        getData(): Object|null|undefined;

        /**
         * Gets the element that is actually draggable given that the given target was
         * attempted to be dragged. This should be overridden when the element that was
         * given actually contains many items that can be dragged. From the target, you
         * can determine what element should actually be dragged.
         *
         * @param {Element} target The target that was attempted to be dragged.
         * @return {Element} The element that is draggable given the target. If
         *     none are draggable, this will return null.
         */
        getDraggableElement(target: Element): Element;

        /**
         * Gets the element that is currently being dragged.
         *
         * @return {Element} The element that is currently being dragged.
         */
        getCurrentDragElement(): Element;

        /**
         * Gets all the elements of this item that are potentially draggable/
         *
         * @return {!Array<Element>} The draggable elements.
         */
        getDraggableElements(): Element[];

        /**
         * Event handler for mouse down.
         *
         * @param {goog.events.BrowserEvent} event Mouse down event.
         * @private
         */
        private mouseDown_(event: goog.events.BrowserEvent): void;

        /**
         * Sets the dragdrop to which this item belongs.
         * @param {goog.fx.AbstractDragDrop} parent The parent dragdrop.
         */
        setParent(parent: goog.fx.AbstractDragDrop): void;

        /**
         * Adds mouse move, mouse out and mouse up handlers.
         *
         * @param {goog.events.BrowserEvent} event Mouse down event.
         * @param {Element} element Element.
         * @private
         */
        private maybeStartDrag_(event: goog.events.BrowserEvent, element: Element): void;

        /**
         * Event handler for mouse move. Starts drag operation if moved more than the
         * threshold value.
         *
         * @param {goog.events.BrowserEvent} event Mouse move or mouse out event.
         * @private
         */
        private mouseMove_(event: goog.events.BrowserEvent): void;

        /**
         * Event handler for mouse up. Removes mouse move, mouse out and mouse up event
         * handlers.
         *
         * @param {goog.events.BrowserEvent} event Mouse up event.
         * @private
         */
        private mouseUp_(event: goog.events.BrowserEvent): void;
    }

    /**
     * Class representing an active drop target
     *
     * @struct
     * @private
     */
    class ActiveDropTarget_ extends __ActiveDropTarget_ {}
    abstract class __ActiveDropTarget_ {
        /**
         * @param {goog.math.Box} box Box describing the position and dimension of the
         *     target item.
         * @param {goog.fx.AbstractDragDrop=} opt_target Target that contains the item
               associated with position.
         * @param {goog.fx.DragDropItem=} opt_item Item associated with position.
         * @param {Element=} opt_element Element of item associated with position.
         */
        constructor(
            box: goog.math.Box,
            opt_target?: goog.fx.AbstractDragDrop,
            opt_item?: goog.fx.DragDropItem,
            opt_element?: Element
        );

        /**
         * Box describing the position and dimension of the target item
         * @type {goog.math.Box}
         * @private
         */
        private box_: goog.math.Box;

        /**
         * Target that contains the item associated with position
         * @type {goog.fx.AbstractDragDrop|undefined}
         * @private
         */
        private target_: goog.fx.AbstractDragDrop|undefined;

        /**
         * Item associated with position
         * @type {goog.fx.DragDropItem|undefined}
         * @private
         */
        private item_: goog.fx.DragDropItem|undefined;

        /**
         * The draggable element of the item associated with position.
         * @type {Element}
         * @private
         */
        private element_: Element;

        /**
         * If this target is in a scrollable container this is it.
         * @private {?goog.fx.ScrollableContainer_}
         */
        private scrollableContainer_: any /*missing*/;
    }

    /**
     * Class for representing a scrollable container
     * @private
     */
    class ScrollableContainer_ extends __ScrollableContainer_ {}
    abstract class __ScrollableContainer_ {
        /**
         * @param {Element} element the scrollable element.
         */
        constructor(element: Element);

        /**
         * The targets that lie within this container.
         * @type {Array<goog.fx.ActiveDropTarget_>}
         * @private
         */
        private containedTargets_: any[];

        /**
         * The element that is this container
         * @type {Element}
         * @private
         */
        private element_: Element;

        /**
         * The saved scroll left location for calculating deltas.
         * @type {number}
         * @private
         */
        private savedScrollLeft_: number;

        /**
         * The saved scroll top location for calculating deltas.
         * @type {number}
         * @private
         */
        private savedScrollTop_: number;

        /**
         * The space occupied by the container.
         * @type {goog.math.Box}
         * @private
         */
        private box_: goog.math.Box;
    }
}

declare namespace goog.fx.AbstractDragDrop {
    /**
     * Constants for event names
     * @const
     */
    const EventType: any /*missing*/;

    /**
     * Constant for distance threshold, in pixels, an element has to be moved to
     * initiate a drag operation.
     * @type {number}
     */
    let initDragDistanceThreshold: number;
}
