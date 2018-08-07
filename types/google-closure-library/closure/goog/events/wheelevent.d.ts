/// <reference path="../../../globals.d.ts"/>
/// <reference path="./browserevent.d.ts"/>

declare module 'goog:goog.events.WheelEvent' {
    import alias = goog.events.WheelEvent;
    export default alias;
}

declare namespace goog.events {
    /**
     * A common class for wheel events. This is used with the WheelHandler.
     *
     * @extends {goog.events.BrowserEvent}
     * @final
     */
    class WheelEvent extends __WheelEvent {}
    abstract class __WheelEvent extends goog.events.__BrowserEvent {
        /**
         * @param {Event} browserEvent Browser event object.
         * @param {goog.events.WheelEvent.DeltaMode} deltaMode The delta mode units of
         *     the wheel event.
         * @param {number} deltaX The number of delta units the user in the X axis.
         * @param {number} deltaY The number of delta units the user in the Y axis.
         * @param {number} deltaZ The number of delta units the user in the Z axis.
         */
        constructor(
            browserEvent: Event,
            deltaMode: goog.events.WheelEvent.DeltaMode,
            deltaX: number,
            deltaY: number,
            deltaZ: number
        );

        /** @type {goog.events.WheelEvent.EventType} */
        type: any;

        /**
         * An enum corresponding to the units of this event.
         * @type {goog.events.WheelEvent.DeltaMode}
         */
        deltaMode: goog.events.WheelEvent.DeltaMode;

        /**
         * The number of delta units in the X axis.
         * @type {number}
         */
        deltaX: number;

        /**
         * The number of delta units in the Y axis.
         * @type {number}
         */
        deltaY: number;

        /**
         * The number of delta units in the Z axis.
         * @type {number}
         */
        deltaZ: number;

        /**
         * The number of delta pixels in the X axis. Code that doesn't want to handle
         * different deltaMode units can just look here.
         * @type {number}
         */
        pixelDeltaX: number;

        /**
         * The number of pixels in the Y axis. Code that doesn't want to
         * handle different deltaMode units can just look here.
         * @type {number}
         */
        pixelDeltaY: number;

        /**
         * The number of pixels scrolled in the Z axis. Code that doesn't want to
         * handle different deltaMode units can just look here.
         * @type {number}
         */
        pixelDeltaZ: number;
    }
}

declare namespace goog.events.WheelEvent {
    /**
     * Enum type for the events fired by the wheel handler.
     * @enum {string}
     */
    enum EventType { WHEEL }

    /**
     * Units for the deltas in a WheelEvent.
     * @enum {number}
     */
    enum DeltaMode { PIXEL, LINE, PAGE }
}
