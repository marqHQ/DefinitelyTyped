/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.events.EventId' {
    import alias = goog.events.EventId;
    export default alias;
}

declare namespace goog.events {
    /**
     * A templated class that is used when registering for events. Typical usage:
     *
     *    /** @type {goog.events.EventId<MyEventObj>} *\
     *    var myEventId = new goog.events.EventId(
     *        goog.events.getUniqueId(('someEvent'));
     *
     *    // No need to cast or declare here since the compiler knows the
     *    // correct type of 'evt' (MyEventObj).
     *    something.listen(myEventId, function(evt) {});
     *
     * @template T
     * @struct
     * @final
     */
    class EventId<T> extends __EventId<T> {}
    abstract class __EventId<T> {
        /**
         *    /** @type {goog.events.EventId<MyEventObj>} *\
         * @param {string} eventId
         */
        constructor(eventId: string);

        /** @const */
        readonly id: any /*missing*/;
    }
}
