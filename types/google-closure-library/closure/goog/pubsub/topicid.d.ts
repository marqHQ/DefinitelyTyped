/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.pubsub.TopicId' {
    import alias = goog.pubsub.TopicId;
    export default alias;
}

declare namespace goog.pubsub {
    /**
     * A templated class that is used to register `goog.pubsub.PubSub`
     * subscribers.
     *
     * Typical usage for a publisher:
     * <code>
     *   /** @type {!goog.pubsub.TopicId<!zorg.State>}
     *   zorg.TopicId.STATE_CHANGE = new goog.pubsub.TopicId(
     *       goog.events.getUniqueId('state-change'));
     *
     *   // Compiler enforces that these types are correct.
     *   pubSub.publish(zorg.TopicId.STATE_CHANGE, zorg.State.STARTED);
     * </code>
     *
     * Typical usage for a subscriber:
     * <code>
     *   // Compiler enforces the callback parameter type.
     *   pubSub.subscribe(zorg.TopicId.STATE_CHANGE, function(state) {
     *     if (state == zorg.State.STARTED) {
     *       // Handle STARTED state.
     *     }
     *   });
     * </code>
     *
     * @template PAYLOAD
     * @final
     * @struct
     */
    class TopicId<PAYLOAD> extends __TopicId<PAYLOAD> {}
    abstract class __TopicId<PAYLOAD> {
        /**
         *   /** @type {!goog.pubsub.TopicId<!zorg.State>}
         * @param {string} topicId
         */
        constructor(topicId: string);

        /**
         * @const
         * @private
         */
        private readonly topicId_: any /*missing*/;
    }
}
