/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.history.Event' {
    import alias = goog.history.Event;
    export default alias;
}

declare namespace goog.history {
    /**
     * Event object dispatched after the history state has changed.
     * @extends {goog.events.Event}
     * @final
     */
    class Event extends __Event {}
    abstract class __Event extends goog.events.__Event {
        /**
         * @param {string} token The string identifying the new history state.
         * @param {boolean} isNavigation True if the event was triggered by a browser
         *     action, such as forward or back, clicking on a link, editing the URL, or
         *     calling {@code window.history.(go|back|forward)}.
         *     False if the token has been changed by a `setToken` or
         *     `replaceToken` call.
         */
        constructor(token: string, isNavigation: boolean);

        /**
         * The current history state.
         * @type {string}
         */
        token: string;

        /**
         * Whether the event was triggered by browser navigation.
         * @type {boolean}
         */
        isNavigation: boolean;
    }
}
