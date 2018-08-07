/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../structs/pool.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>

declare module 'goog:goog.ui.IframeMask' {
    import alias = goog.ui.IframeMask;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Controller for an iframe mask. The mask is only valid in the current
     * document, or else the document of the given DOM helper.
     *
     * @extends {goog.Disposable}
     */
    class IframeMask extends __IframeMask {}
    abstract class __IframeMask extends goog.__Disposable {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper for the relevant
         *     document.
         * @param {goog.structs.Pool=} opt_iframePool An optional source of iframes.
         *     Iframes will be grabbed from the pool when they're needed and returned
         *     to the pool (but still attached to the DOM) when they're done.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper, opt_iframePool?: goog.structs.Pool<any>);

        /**
         * The DOM helper for this document.
         * @type {goog.dom.DomHelper}
         * @private
         */
        private dom_: goog.dom.DomHelper;

        /**
         * An Element to snap the mask to. If none is given, defaults to
         * a full-screen iframe mask.
         * @type {Element}
         * @private
         */
        private snapElement_: Element;

        /**
         * An event handler for listening to popups and the like.
         * @type {goog.events.EventHandler<!goog.ui.IframeMask>}
         * @private
         */
        private handler_: goog.events.EventHandler<goog.ui.IframeMask>;

        /**
         * An iframe pool.
         * @type {goog.structs.Pool|undefined}
         * @private
         */
        private iframePool_: goog.structs.Pool<any>|undefined;

        /**
         * An iframe.
         * @type {HTMLIFrameElement}
         * @private
         */
        private iframe_: HTMLIFrameElement;

        /**
         * The z-index of the iframe mask.
         * @type {number}
         * @private
         */
        private zIndex_: number;

        /**
         * The opacity of the iframe mask, expressed as a value between 0 and 1, with
         * 1 being totally opaque.
         * @type {number}
         * @private
         */
        private opacity_: number;

        /**
         * Removes the mask from the screen.
         */
        hideMask(): void;

        /**
         * Gets the iframe to use as a mask. Creates a new one if one has not been
         * created yet.
         * @return {!HTMLIFrameElement} The iframe.
         * @private
         */
        private getIframe_(): HTMLIFrameElement;

        /**
         * Applies the iframe mask to the screen.
         */
        applyMask(): void;

        /**
         * Sets the opacity of the mask. Will take effect the next time the mask
         * is applied.
         * @param {number} opacity A value between 0 and 1, with 1 being
         *     totally opaque.
         */
        setOpacity(opacity: number): void;

        /**
         * Sets the z-index of the mask. Will take effect the next time the mask
         * is applied.
         * @param {number} zIndex A z-index value.
         */
        setZIndex(zIndex: number): void;

        /**
         * Sets the element to use as the bounds of the mask. Takes effect immediately.
         * @param {Element} snapElement The snap element, which the iframe will be
         *     "snapped" around.
         */
        setSnapElement(snapElement: Element): void;

        /**
         * Listens on the specified target, hiding and showing the iframe mask
         * when the given event types are dispatched.
         * @param {goog.events.EventTarget} target The event target to listen on.
         * @param {string} showEvent When this event fires, the mask will be applied.
         * @param {string} hideEvent When this event fires, the mask will be hidden.
         * @param {Element=} opt_snapElement When the mask is applied, it will
         *     automatically snap to this element. If no element is specified, it will
         *     use the default snap element.
         */
        listenOnTarget(
            target: goog.events.EventTarget, showEvent: string, hideEvent: string, opt_snapElement?: Element
        ): void;

        /**
         * Removes all handlers attached by listenOnTarget.
         */
        removeHandlers(): void;
    }
}

declare namespace goog.ui.IframeMask {
}
