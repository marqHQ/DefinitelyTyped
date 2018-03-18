/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare namespace goog.ui.equation {
    class ChangeEvent extends __ChangeEvent {}
    /** Fake class which should be extended to avoid inheriting static properties */
    abstract class __ChangeEvent extends goog.events.__Event {
        /**
         * Event fired when equation changes.
         * @constructor
         * @param {boolean} isValid Whether the equation is valid.
         * @extends {goog.events.Event}
         * @final
         */
        constructor(isValid: boolean);

        /**
         * Whether equation is valid.
         * @type {boolean}
         */
        isValid: boolean;
    }
}
