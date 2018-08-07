/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./container.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.ContainerScroller' {
    import alias = goog.ui.ContainerScroller;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Plug-on scrolling behavior for a container.
     *
     * Use this to style containers, such as pop-up menus, to be scrolling, and
     * automatically keep the highlighted element visible.
     *
     * To use this, first style your container with the desired overflow
     * properties and height to achieve vertical scrolling.  Also, the scrolling
     * div should have no vertical padding, for two reasons: it is difficult to
     * compensate for, and is generally not what you want due to the strange way
     * CSS handles padding on the scrolling dimension.
     *
     * The container must already be rendered before this may be constructed.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class ContainerScroller extends __ContainerScroller {}
    abstract class __ContainerScroller extends goog.__Disposable {
        /**
         * @param {!goog.ui.Container} container The container to attach behavior to.
         */
        constructor(container: goog.ui.Container);

        /**
         * The container that we are bestowing scroll behavior on.
         * @type {!goog.ui.Container}
         * @private
         */
        private container_: goog.ui.Container;

        /**
         * Event handler for this object.
         * @type {!goog.events.EventHandler<!goog.ui.ContainerScroller>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.ui.ContainerScroller>;

        /**
         * The last target the user hovered over.
         *
         * @see #onEnter_
         * @type {goog.ui.Component}
         * @private
         */
        private lastEnterTarget_: goog.ui.Component;

        /**
         * The scrollTop of the container before it was hidden.
         * Used to restore the scroll position when the container is shown again.
         * @type {?number}
         * @private
         */
        private scrollTopBeforeHide_: number|null;

        /**
         * Whether we are disabling the default handler for hovering.
         *
         * @see #onEnter_
         * @see #temporarilyDisableHover_
         * @type {boolean}
         * @private
         */
        private disableHover_: boolean;

        /**
         * Handles hover events on the container's children.
         *
         * Helps enforce two constraints: scrolling should not cause mouse highlights,
         * and mouse highlights should not cause scrolling.
         *
         * @param {goog.events.Event} e The container's ENTER event.
         * @private
         */
        private onEnter_(e: goog.events.Event): void;

        /**
         * Handles highlight events on the container's children.
         * @param {goog.events.Event} e The container's highlight event.
         * @private
         */
        private onHighlight_(e: goog.events.Event): void;

        /**
         * Handles AFTER_SHOW events on the container. Makes the container
         * scroll to the previously scrolled position (if there was one),
         * then adjust it to make the highlighted element be in view (if there is one).
         * If there was no previous scroll position, then center the highlighted
         * element (if there is one).
         * @param {goog.events.Event} e The container's AFTER_SHOW event.
         * @private
         */
        private onAfterShow_(e: goog.events.Event): void;

        /**
         * Handles hide events on the container. Clears out the last enter target,
         * since it is no longer applicable, and remembers the scroll position of
         * the menu so that it can be restored when the menu is reopened.
         * @param {goog.events.Event} e The container's hide event.
         * @private
         */
        private onHide_(e: goog.events.Event): void;

        /**
         * Centers the currently highlighted item, if this is scrollable.
         * @param {boolean=} opt_center Whether to center the highlighted element
         *     rather than simply ensure it is in view.  Useful for the first
         *     render.
         * @private
         */
        private doScrolling_(opt_center?: boolean): void;

        /**
         * Temporarily disables hover events from changing highlight.
         * @see #onEnter_
         * @private
         */
        private temporarilyDisableHover_(): void;
    }
}
