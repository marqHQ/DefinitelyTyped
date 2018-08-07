/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./inputhandler.d.ts"/>

declare module 'goog:goog.ui.ac.RichInputHandler' {
    import alias = goog.ui.ac.RichInputHandler;
    export default alias;
}

declare namespace goog.ui.ac {
    /**
     * Class for managing the interaction between an autocomplete object and a
     * text-input or textarea.
     * @extends {goog.ui.ac.InputHandler}
     */
    class RichInputHandler extends __RichInputHandler {}
    abstract class __RichInputHandler extends goog.ui.ac.__InputHandler {
        /**
         * @param {?string=} opt_separators Seperators to split multiple entries.
         * @param {?string=} opt_literals Characters used to delimit text literals.
         * @param {?boolean=} opt_multi Whether to allow multiple entries
         *     (Default: true).
         * @param {?number=} opt_throttleTime Number of milliseconds to throttle
         *     keyevents with (Default: 150).
         */
        constructor(
            opt_separators?: string|null,
            opt_literals?: string|null,
            opt_multi?: boolean|null,
            opt_throttleTime?: number|null
        );
    }
}
