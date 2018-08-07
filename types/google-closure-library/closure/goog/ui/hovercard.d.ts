/// <reference path="../../../globals.d.ts"/>
/// <reference path="./advancedtooltip.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../positioning/abstractposition.d.ts"/>

declare module 'goog:goog.ui.HoverCard' {
    import alias = goog.ui.HoverCard;
    export default alias;
}

declare module 'goog:goog.ui.HoverCard.TriggerEvent' {
    import alias = goog.ui.HoverCard.TriggerEvent;
    export default alias;
}

declare module 'goog:goog.ui.HoverCard.EventType' {
    import alias = goog.ui.HoverCard.EventType;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Create a hover card object.  Hover cards extend tooltips in that they don't
     * have to be manually attached to each element that can cause them to display.
     * Instead, you can create a function that gets called when the mouse goes over
     * any element on your page, and returns whether or not the hovercard should be
     * shown for that element.
     *
     * Alternatively, you can define a map of tag names to the attribute name each
     * tag should have for that tag to trigger the hover card.  See example below.
     *
     * Hovercards can also be triggered manually by calling
     * `triggerForElement`, shown without a delay by calling
     * `showForElement`, or triggered over other elements by calling
     * `attach`.  For the latter two cases, the application is responsible
     * for calling `detach` when finished.
     *
     * HoverCard objects fire a TRIGGER event when the mouse moves over an element
     * that can trigger a hovercard, and BEFORE_SHOW when the hovercard is
     * about to be shown.  Clients can respond to these events and can prevent the
     * hovercard from being triggered or shown.
     *
     * @extends {goog.ui.AdvancedTooltip}
     */
    class HoverCard extends __HoverCard {}
    abstract class __HoverCard extends goog.ui.__AdvancedTooltip {
        /**
         * @param {Function|Object} isAnchor Function that returns true if a given
         *     element should trigger the hovercard.  Alternatively, it can be a map of
         *     tag names to the attribute that the tag should have in order to trigger
         *     the hovercard, e.g., {A: 'href'} for all links.  Tag names must be all
         *     upper case; attribute names are case insensitive.
         * @param {boolean=} opt_checkDescendants Use false for a performance gain if
         *     you are sure that none of your triggering elements have child elements.
         *     Default is true.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper to use for
         *     creating and rendering the hovercard element.
         * @param {Document=} opt_triggeringDocument Optional document to use in place
         *     of the one included in the DomHelper for finding triggering elements.
         *     Defaults to the document included in the DomHelper.
         */
        constructor(
            isAnchor: Function|Object,
            opt_checkDescendants?: boolean,
            opt_domHelper?: goog.dom.DomHelper,
            opt_triggeringDocument?: Document
        );

        /**
         * Map of tag names to attribute names that will trigger a hovercard.
         * @type {Object}
         * @private
         */
        private anchors_: Object;

        /**
         * Whether anchors may have child elements.  If true, then we need to check
         * the parent chain of any mouse over event to see if any of those elements
         * could be anchors.  Default is true.
         * @type {boolean}
         * @private
         */
        private checkDescendants_: boolean;

        /**
         * Array of anchor elements that should be detached when we are no longer
         * associated with them.
         * @type {!Array<Element>}
         * @private
         */
        private tempAttachedAnchors_: Element[];

        /**
         * Document containing the triggering elements, to which we listen for
         * mouseover events.
         * @type {Document}
         * @private
         */
        private document_: Document;

        /**
         * Anchor of hovercard currently being shown.  This may be different from
         * `anchor` property if a second hovercard is triggered, when
         * `anchor` becomes the second hovercard while `currentAnchor_`
         * is still the old (but currently displayed) anchor.
         * @type {Element}
         * @private
         */
        private currentAnchor_: Element;

        /**
         * Maximum number of levels to search up the dom when checking descendants.
         * @type {number}
         * @private
         */
        private maxSearchSteps_: number;

        /**
         * This function can be overridden by passing a function as the first parameter
         * to the constructor.
         * @param {Node} node Node to test.
         * @return {boolean} Whether or not hovercard should be shown.
         * @private
         */
        private isAnchor_(node: Node): boolean;

        /**
         * If the user mouses over an element with the correct tag and attribute, then
         * trigger the hovercard for that element.  If anchors could have children, then
         * we also need to check the parent chain of the given element.
         * @param {goog.events.Event} e Mouse over event.
         * @private
         */
        private handleTriggerMouseOver_(e: goog.events.Event): void;

        /**
         * Triggers the hovercard to show after a delay.
         * @param {Element} anchorElement Element that is triggering the hovercard.
         * @param {goog.positioning.AbstractPosition=} opt_pos Position to display
         *     hovercard.
         * @param {Object=} opt_data Data to pass to the onTrigger event.
         */
        triggerForElement(anchorElement: Element, opt_pos?: goog.positioning.AbstractPosition, opt_data?: Object): void;

        /**
         * Sets the current anchor element at the time that the hovercard is shown.
         * @param {Element} anchor New current anchor element, or null if there is
         *     no current anchor.
         * @private
         */
        private setCurrentAnchor_(anchor: Element): void;

        /**
         * If given anchor is in the list of temporarily attached anchors, then
         * detach and remove from the list.
         * @param {Element|undefined} anchor Anchor element that we may want to detach
         *     from.
         * @private
         */
        private detachTempAnchor_(anchor: Element|undefined): void;

        /**
         * Called when an element triggers the hovercard.  This will return false
         * if an event handler sets preventDefault to true, which will prevent
         * the hovercard from being shown.
         * @param {!goog.ui.HoverCard.TriggerEvent} triggerEvent Event object to use
         *     for trigger event.
         * @return {boolean} Whether hovercard should be shown or cancelled.
         * @protected
         */
        protected onTrigger(triggerEvent: goog.ui.HoverCard.TriggerEvent): boolean;

        /**
         * Abort pending hovercard showing, if any.
         */
        cancelTrigger(): void;

        /**
         * If hovercard is in the process of being triggered, then cancel it.
         * @private
         */
        private maybeCancelTrigger_(): void;

        /**
         * This method gets called when we detect that a trigger event will not lead
         * to the hovercard being shown.
         * @protected
         */
        protected onCancelTrigger(): void;

        /**
         * Gets the DOM element that triggered the current hovercard.  Note that in
         * the TRIGGER or CANCEL_TRIGGER events, the current hovercard's anchor may not
         * be the one that caused the event, so use the event's anchor property instead.
         * @return {Element} Object that caused the currently displayed hovercard (or
         *     pending hovercard if none is displayed) to be triggered.
         */
        getAnchorElement(): Element;

        /**
         * Sets the max number of levels to search up the dom if checking descendants.
         * @param {number} maxSearchSteps Maximum number of levels to search up the
         *     dom if checking descendants.
         */
        setMaxSearchSteps(maxSearchSteps: number): void;
    }
}

declare namespace goog.ui.HoverCard {
    /**
     * Create a trigger event for specified anchor and optional data.
     * @extends {goog.events.Event}
     * @final
     */
    class TriggerEvent extends __TriggerEvent {}
    abstract class __TriggerEvent extends goog.events.__Event {
        /**
         * @param {goog.ui.HoverCard.EventType} type Event type.
         * @param {goog.ui.HoverCard} target Hovercard that is triggering the event.
         * @param {Element} anchor Element that triggered event.
         * @param {Object=} opt_data Optional data to be available in the TRIGGER event.
         */
        constructor(type: goog.ui.HoverCard.EventType, target: goog.ui.HoverCard, anchor: Element, opt_data?: Object);

        /**
         * Element that triggered the hovercard event.
         * @type {Element}
         */
        anchor: Element;

        /**
         * Optional data to be passed to the listener.
         * @type {Object|undefined}
         */
        data: Object|undefined;
    }

    /**
     * Enum for event type fired by HoverCard.
     * @enum {string}
     */
    enum EventType { TRIGGER, CANCEL_TRIGGER, BEFORE_SHOW, SHOW, BEFORE_HIDE, HIDE }
}
