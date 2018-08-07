/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../mockmatchers.d.ts"/>

declare module 'goog:goog.testing.events.EventMatcher' {
    import alias = goog.testing.events.EventMatcher;
    export default alias;
}

declare namespace goog.testing.events {
    /**
     * A matcher that verifies that an argument is a `goog.events.Event` of a
     * particular type.
     * @extends {goog.testing.mockmatchers.ArgumentMatcher}
     * @final
     */
    class EventMatcher extends __EventMatcher {}
    abstract class __EventMatcher extends goog.testing.mockmatchers.__ArgumentMatcher {
        /**
         * @param {string} type The single type the event argument must be of.
         */
        constructor(type: string);
    }
}
