/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../../dom/viewportsizemonitor.d.ts"/>
/// <reference path="../popupbase.d.ts"/>
/// <reference path="../../log/log.d.ts"/>
/// <reference path="../../math/box.d.ts"/>
/// <reference path="../../positioning/positioning.d.ts"/>

declare module 'goog:goog.ui.editor.Bubble' {
    import alias = goog.ui.editor.Bubble;
    export default alias;
}

declare namespace goog.ui.editor {
    /**
     * Property bubble UI element.
     * @extends {goog.events.EventTarget}
     */
    class Bubble extends __Bubble {}
    abstract class __Bubble extends goog.events.__EventTarget {
        /**
         * @param {Element} parent The parent element for this bubble.
         * @param {number} zIndex The z index to draw the bubble at.
         */
        constructor(parent: Element, zIndex: number);

        /**
         * Dom helper for the document the bubble should be shown in.
         * @type {!goog.dom.DomHelper}
         * @private
         */
        private dom_: goog.dom.DomHelper;

        /**
         * Event handler for this bubble.
         * @type {goog.events.EventHandler<!goog.ui.editor.Bubble>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.ui.editor.Bubble>;

        /**
         * Object that monitors the application window for size changes.
         * @type {goog.dom.ViewportSizeMonitor}
         * @private
         */
        private viewPortSizeMonitor_: goog.dom.ViewportSizeMonitor;

        /**
         * Maps panel ids to panels.
         * @type {Object<goog.ui.editor.Bubble.Panel_>}
         * @private
         */
        private panels_: {[key: string]: any};

        /**
         * Container element for the entire bubble.  This may contain elements related
         * to look and feel or styling of the bubble.
         * @type {Element}
         * @private
         */
        private bubbleContainer_: Element;

        /**
         * Container element for the bubble panels - this should be some inner element
         * within (or equal to) bubbleContainer.
         * @type {Element}
         * @private
         */
        private bubbleContents_: Element;

        /**
         * Element showing the close box.
         * @type {!Element}
         * @private
         */
        private closeBox_: Element;

        /**
         * Popup that controls showing and hiding the bubble at the appropriate
         * position.
         * @type {goog.ui.PopupBase}
         * @private
         */
        private popup_: goog.ui.PopupBase;

        /**
         * Creates and adds DOM for the bubble UI to the given container.  This default
         * implementation just returns the container itself.
         * @param {!goog.dom.DomHelper} dom DOM helper to use.
         * @param {!Element} container Element to add the new elements to.
         * @return {!Element} The element where bubble content should be added.
         * @protected
         */
        protected createBubbleDom(dom: goog.dom.DomHelper, container: Element): Element;

        /**
         * A logger for goog.ui.editor.Bubble.
         * @type {goog.log.Logger}
         * @protected
         */
        protected logger: goog.log.Logger;

        /**
         * @return {Element} The element that where the bubble's contents go.
         */
        getContentElement(): Element;

        /**
         * @return {Element} The element that contains the bubble.
         * @protected
         */
        protected getContainerElement(): Element;

        /**
         * @return {goog.events.EventHandler<T>} The event handler.
         * @protected
         * @this {T}
         * @template T
         */
        protected getEventHandler(): goog.events.EventHandler<this>;

        /**
         * Handles user resizing of window.
         * @private
         */
        private handleWindowResize_(): void;

        /**
         * Sets whether the bubble dismisses itself when the user clicks outside of it.
         * @param {boolean} autoHide Whether to autohide on an external click.
         */
        setAutoHide(autoHide: boolean): void;

        /**
         * Returns whether there is already a panel of the given type.
         * @param {string} type Type of panel to check.
         * @return {boolean} Whether there is already a panel of the given type.
         */
        hasPanelOfType(type: string): boolean;

        /**
         * Adds a panel to the bubble.
         * @param {string} type The type of bubble panel this is.  Should usually be
         *     the same as the tagName of the targetElement.  This ensures multiple
         *     bubble panels don't appear for the same element.
         * @param {string} title The title of the panel.
         * @param {Element} targetElement The target element of the bubble.
         * @param {function(Element): void} contentFn Function that when called with
         *     a container element, will add relevant panel content to it.
         * @param {boolean=} opt_preferTopPosition Whether to prefer placing the bubble
         *     above the element instead of below it.  Defaults to preferring below.
         *     If any panel prefers the top position, the top position is used.
         * @return {string} The id of the panel.
         */
        addPanel(
            type: string,
            title: string,
            targetElement: Element,
            contentFn: (_0: Element) => void,
            opt_preferTopPosition?: boolean
        ): string;

        /**
         * Removes the panel with the given id.
         * @param {string} id The id of the panel.
         */
        removePanel(id: string): void;

        /**
         * Opens the bubble.
         * @private
         */
        private openBubble_(): void;

        /**
         * Closes the bubble.
         * @private
         */
        private closeBubble_(): void;

        /**
         * Handles the popup's hide event by removing all panels and dispatching a
         * HIDE event.
         * @protected
         */
        protected handlePopupHide(): void;

        /**
         * Returns the visibility of the bubble.
         * @return {boolean} True if visible false if not.
         */
        isVisible(): boolean;

        /**
         * Returns the margin box.
         * @return {goog.math.Box}
         * @protected
         */
        protected getMarginBox(): goog.math.Box;

        /**
         * Positions and displays this bubble below its targetElement. Assumes that
         * the bubbleContainer is already contained in the document object it applies
         * to.
         */
        reposition(): void;

        /**
         * A helper for reposition() - positions the bubble in regards to the position
         * of the elements the bubble is attached to.
         * @param {goog.positioning.Corner} targetCorner The corner of
         *     the target element.
         * @param {goog.positioning.Corner} bubbleCorner The corner of the bubble.
         * @param {number} overflow Overflow handling mode bitmap,
         *     {@see goog.positioning.Overflow}.
         * @return {number} Status bitmap, {@see goog.positioning.OverflowStatus}.
         * @private
         */
        private positionAtAnchor_(
            targetCorner: goog.positioning.Corner, bubbleCorner: goog.positioning.Corner, overflow: number
        ): number;

        /**
         * Returns the viewport box to use when positioning the bubble.
         * @return {goog.math.Box}
         * @protected
         */
        protected getViewportBox(): goog.math.Box;
    }
}

declare namespace goog.ui.editor.Bubble {
    /**
     * Private class used to describe a bubble panel.
     * @private
     */
    class Panel_ extends __Panel_ {}
    abstract class __Panel_ {
        /**
         * @param {goog.dom.DomHelper} dom DOM helper used to create the panel.
         * @param {string} id ID of the panel.
         * @param {string} type Type of the panel.
         * @param {string} title Title of the panel.
         * @param {Element} targetElement Element the panel is showing for.
         * @param {boolean} preferBottomPosition Whether this panel prefers to show
         *     below the target element.
         */
        constructor(
            dom: goog.dom.DomHelper,
            id: string,
            type: string,
            title: string,
            targetElement: Element,
            preferBottomPosition: boolean
        );

        /**
         * The type of bubble panel.
         * @type {string}
         */
        type: string;

        /**
         * The target element of this bubble panel.
         * @type {Element}
         */
        targetElement: Element;

        /**
         * Whether the panel prefers to be placed below the target element.
         * @type {boolean}
         */
        preferBottomPosition: boolean;

        /**
         * The element containing this panel.
         * @type {!Element}
         */
        element: Element;

        /**
         * @return {Element} The element in the panel where content should go.
         */
        getContentElement(): Element;
    }

    /**
     * The css class name of the bubble container element.
     * @type {string}
     */
    let BUBBLE_CLASSNAME: string;
}
