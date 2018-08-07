/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../disposable/disposable.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="./attributes.d.ts"/>

declare module 'goog:goog.a11y.aria.Announcer' {
    import alias = goog.a11y.aria.Announcer;
    export default alias;
}

declare namespace goog.a11y.aria {
    /**
     * Class that allows messages to be spoken by assistive technologies that the
     * user may have active.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class Announcer extends __Announcer {}
    abstract class __Announcer extends goog.__Disposable {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper DOM helper.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * @type {goog.dom.DomHelper}
         * @private
         */
        private domHelper_: goog.dom.DomHelper;

        /**
         * Map of priority to live region elements to use for communicating updates.
         * Elements are created on demand.
         * @type {Object<goog.a11y.aria.LivePriority, !Element>}
         * @private
         */
        private liveRegions_: {[key: string]: Element};

        /**
         * Announce a message to be read by any assistive technologies the user may
         * have active.
         * @param {string} message The message to announce to screen readers.
         * @param {goog.a11y.aria.LivePriority=} opt_priority The priority of the
         *     message. Defaults to POLITE.
         */
        say(message: string, opt_priority?: goog.a11y.aria.LivePriority): void;

        /**
         * Returns an aria-live region that can be used to communicate announcements.
         * @param {!goog.a11y.aria.LivePriority} priority The required priority.
         * @return {!Element} A live region of the requested priority.
         * @private
         */
        private getLiveRegion_(priority: goog.a11y.aria.LivePriority): Element;
    }
}
