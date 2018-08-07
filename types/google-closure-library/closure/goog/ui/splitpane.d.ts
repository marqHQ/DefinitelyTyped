/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../fx/dragger.d.ts"/>
/// <reference path="../math/rect.d.ts"/>
/// <reference path="../math/size.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.SplitPane' {
    import alias = goog.ui.SplitPane;
    export default alias;
}

declare module 'goog:goog.ui.SplitPane.Orientation' {
    import alias = goog.ui.SplitPane.Orientation;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A left/right up/down Container SplitPane.
     * Create SplitPane with two goog.ui.Component opjects to split.
     * TODO(user): Support minimum splitpane size.
     * TODO(user): Allow component change/orientation after init.
     * TODO(user): Support hiding either side of handle (plus handle).
     * TODO(user): Look at setBorderBoxSize fixes and revist borderwidth code.
     *
     * @extends {goog.ui.Component}
     */
    class SplitPane extends __SplitPane {}
    abstract class __SplitPane extends goog.ui.__Component {
        /**
         * @param {goog.ui.Component} firstComponent Left or Top component.
         * @param {goog.ui.Component} secondComponent Right or Bottom component.
         * @param {goog.ui.SplitPane.Orientation} orientation SplitPane orientation.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(
            firstComponent: goog.ui.Component,
            secondComponent: goog.ui.Component,
            orientation: goog.ui.SplitPane.Orientation,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * The orientation of the containers.
         * @type {goog.ui.SplitPane.Orientation}
         * @private
         */
        private orientation_: goog.ui.SplitPane.Orientation;

        /**
         * The left/top component.
         * @type {goog.ui.Component}
         * @private
         */
        private firstComponent_: goog.ui.Component;

        /**
         * The right/bottom component.
         * @type {goog.ui.Component}
         * @private
         */
        private secondComponent_: goog.ui.Component;

        /** @private {Element} */
        private splitpaneHandle_: any /*missing*/;

        /**
         * The dragger to move the drag handle.
         * @type {goog.fx.Dragger?}
         * @private
         */
        private splitDragger_: goog.fx.Dragger|null;

        /**
         * The left/top component dom container.
         * @type {Element}
         * @private
         */
        private firstComponentContainer_: Element;

        /**
         * The right/bottom component dom container.
         * @type {Element}
         * @private
         */
        private secondComponentContainer_: Element;

        /**
         * The size (width or height) of the splitpane handle, default = 5.
         * @type {number}
         * @private
         */
        private handleSize_: number;

        /**
         * The initial size (width or height) of the left or top component.
         * @type {?number}
         * @private
         */
        private initialSize_: number|null;

        /**
         * The saved size (width or height) of the left or top component on a
         * double-click (snap).
         * This needs to be saved so it can be restored after another double-click.
         * @type {?number}
         * @private
         */
        private savedSnapSize_: number|null;

        /**
         * The first component size, so we don't change it on a window resize.
         * @type {?number}
         * @private
         */
        private firstComponentSize_: number|null;

        /**
         * If we resize as they user moves the handle (default = true).
         * @type {boolean}
         * @private
         */
        private continuousResize_: boolean;

        /**
         * Iframe overlay to prevent iframes from grabbing events.
         * @type {Element}
         * @private
         */
        private iframeOverlay_: Element;

        /**
         * Obtains the element to be decorated by class name. If multiple such elements
         * are found, preference is given to those directly attached to the specified
         * root element.
         * @param {Element} rootElement The root element from which to retrieve the
         *     element to be decorated.
         * @param {string} className The target class name.
         * @return {Element} The element to decorate.
         * @private
         */
        private getElementToDecorate_(rootElement: Element, className: string): Element;

        /**
         * Parent the passed in components to the split containers.  Call their
         * createDom methods if necessary.
         * @private
         */
        private finishSetup_(): void;

        /**
         * Sets the initial size of the left or top component.
         * @param {number} size The size in Pixels of the container.
         */
        setInitialSize(size: number): void;

        /**
         * Sets the SplitPane handle size.
         * TODO(user): Make sure this works after initialization.
         * @param {number} size The size of the handle in pixels.
         */
        setHandleSize(size: number): void;

        /**
         * Sets whether we resize on handle drag.
         * @param {boolean} continuous The continuous resize value.
         */
        setContinuousResize(continuous: boolean): void;

        /**
         * Returns whether the orientation for the split pane is vertical
         * or not.
         * @return {boolean} True if the orientation is vertical, false otherwise.
         */
        isVertical(): boolean;

        /**
         * Initializes the handle by assigning the correct height/width and adding
         * the correct class as per the orientation.
         * @private
         */
        private setUpHandle_(): void;

        /**
         * Sets the orientation class for the split pane handle.
         * @protected
         */
        protected setOrientationClassForHandle(): void;

        /**
         * Sets the orientation of the split pane.
         * @param {goog.ui.SplitPane.Orientation} orientation SplitPane orientation.
         */
        setOrientation(orientation: goog.ui.SplitPane.Orientation): void;

        /**
         * Gets the orientation of the split pane.
         * @return {goog.ui.SplitPane.Orientation} The orientation.
         */
        getOrientation(): goog.ui.SplitPane.Orientation;

        /**
         * Move and resize a container.  The sizing changes the BorderBoxSize.
         * @param {Element} element The element to move and size.
         * @param {goog.math.Rect} rect The top, left, width and height to change to.
         * @private
         */
        private moveAndSize_(element: Element, rect: goog.math.Rect): void;

        /**
         * @return {?number} The size of the left/top component.
         */
        getFirstComponentSize(): number|null;

        /**
         * Set the size of the left/top component, and resize the other component based
         * on that size and handle size.
         * @param {?number=} opt_size The size of the top or left, in pixels. If
         *     unspecified, leaves the size of the first component unchanged but adjusts
         *     the size of the second component to fit the split pane size.
         */
        setFirstComponentSize(opt_size?: number|null): void;

        /**
         * Set the size of the left/top component, and resize the other component based
         * on that size and handle size. Unlike the public method, this takes the
         * current pane size which avoids the expensive getBorderBoxSize() call
         * when we have the size available.
         *
         * @param {!goog.math.Size} splitpaneSize The current size of the splitpane.
         * @param {?number=} opt_size The size of the top or left, in pixels.
         * @private
         */
        private setFirstComponentSize_(splitpaneSize: goog.math.Size, opt_size?: number|null): void;

        /**
         * Set the size of the splitpane.  This is usually called by the controlling
         * application.  This will set the SplitPane BorderBoxSize.
         * @param {!goog.math.Size} size The size to set the splitpane.
         * @param {?number=} opt_firstComponentSize The size of the top or left
         *     component, in pixels.
         */
        setSize(size: goog.math.Size, opt_firstComponentSize?: number|null): void;

        /**
         * Snap the container to the left or top on a Double-click.
         * @private
         */
        private snapIt_(): void;

        /**
         * Handle the start drag event - set up the dragger.
         * @param {goog.events.Event} e The event.
         * @private
         */
        private handleDragStart_(e: goog.events.Event): void;

        /**
         * Find the location relative to the splitpane.
         * @param {number} left The x location relative to the window.
         * @return {number} The relative x location.
         * @private
         */
        private getRelativeLeft_(left: number): number;

        /**
         * Find the location relative to the splitpane.
         * @param {number} top The y location relative to the window.
         * @return {number} The relative y location.
         * @private
         */
        private getRelativeTop_(top: number): number;

        /**
         * Handle the drag event. Move the containers.
         * @param {!goog.fx.DragEvent} e The event.
         * @private
         */
        private handleDrag_(e: goog.fx.DragEvent): void;

        /**
         * Handle the drag end event. If we're not doing continuous resize,
         * resize the component.  If we're doing continuous resize, the component
         * is already the correct size.
         * @param {!goog.fx.DragEvent} e The event.
         * @private
         */
        private handleDragEnd_(e: goog.fx.DragEvent): void;

        /**
         * Handle the Double-click. Call the snapIt method which snaps the container
         * to the top or left.
         * @param {goog.events.Event} e The event.
         * @private
         */
        private handleDoubleClick_(e: goog.events.Event): void;
    }
}

declare namespace goog.ui.SplitPane {
    /**
     * Events.
     * @enum {string}
     */
    enum EventType { HANDLE_DRAG, HANDLE_DRAG_END, HANDLE_SNAP }

    /**
     * Orientation values for the splitpane.
     * @enum {string}
     */
    enum Orientation { HORIZONTAL, VERTICAL }
}
