/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.ItemEvent' {
    import alias = goog.ui.ItemEvent;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Generic ui event class for events that take a single item like a menu click
     * event.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class ItemEvent extends __ItemEvent {}
    abstract class __ItemEvent extends goog.events.__Event {
        /**
         * @param {string} type Event Type.
         * @param {Object} target Reference to the object that is the target
         *                        of this event.
         * @param {Object} item The item that was clicked.
         */
        constructor(type: string, target: Object, item: Object);

        /**
         * Item for the event. The type of this object is specific to the type
         * of event. For a menu, it would be the menu item that was clicked. For a
         * listbox selection, it would be the listitem that was selected.
         *
         * @type {Object}
         */
        item: Object;
    }
}
