/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.ui.IdGenerator' {
    import alias = goog.ui.IdGenerator;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Creates a new id generator.
     * @final
     */
    class IdGenerator extends __IdGenerator {}
    abstract class __IdGenerator {
        /**
         */
        constructor();

        /**
         * Next unique ID to use
         * @type {number}
         * @private
         */
        private nextId_: number;

        /**
         * Gets the next unique ID.
         * @return {string} The next unique identifier.
         */
        getNextUniqueId(): string;
    }
}
