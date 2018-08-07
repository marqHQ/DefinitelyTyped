/// <reference path="../../../globals.d.ts"/>
/// <reference path="./field.d.ts"/>
/// <reference path="../events/events.d.ts"/>

declare module 'goog:goog.editor.SeamlessField' {
    import alias = goog.editor.SeamlessField;
    export default alias;
}

declare namespace goog.editor {
    /**
     * This class encapsulates an editable field that blends in with the
     * surrounding page.
     * To see events fired by this object, please see the base class.
     *
     * @extends {goog.editor.Field}
     */
    class SeamlessField extends __SeamlessField {}
    abstract class __SeamlessField extends goog.editor.__Field {
        /**
         * @param {string} id An identifer for the field. This is used to find the
         *     field and the element associated with this field.
         * @param {Document=} opt_doc The document that the element with the given
         *     id can be found it.
         */
        constructor(id: string, opt_doc?: Document);

        /**
         * The key used for listening for the "dragover" event.
         * @type {goog.events.Key}
         * @private
         */
        private listenForDragOverEventKey_: goog.events.Key;

        /**
         * The key used for listening for the iframe "load" event.
         * @type {goog.events.Key}
         * @private
         */
        private listenForIframeLoadEventKey_: goog.events.Key;

        /**
         * Sets the min height of this editable field's iframe. Only used in growing
         * mode when an iframe is used. This will cause an immediate field sizing to
         * update the field if necessary based on the new min height.
         * @param {number} height The min height specified as a number of pixels,
         *    e.g., 75.
         */
        setMinHeight(height: number): void;

        /**
         * Whether the field should be rendered with a fixed height, or should expand
         * to fit its contents.
         * @type {boolean}
         * @private
         */
        private isFixedHeight_: boolean;

        /**
         * Whether the fixed-height handling has been overridden manually.
         * @type {boolean}
         * @private
         */
        private isFixedHeightOverridden_: boolean;

        /**
         * @param {boolean} newVal Explicitly set whether the field should be
         *    of a fixed-height. This overrides auto-detection.
         */
        overrideFixedHeight(newVal: boolean): void;

        /**
         * Auto-detect whether the current field should have a fixed height.
         * @private
         */
        private autoDetectFixedHeight_(): void;

        /**
         * Resize the iframe in response to the wrapper div changing size.
         * @private
         */
        private handleOuterDocChange_(): void;

        /**
         * Sizes the iframe to its body's height.
         * @private
         */
        private sizeIframeToBodyHeightGecko_(): void;

        /**
         * @return {number} The height of the editable iframe's body.
         * @private
         */
        private getIframeBodyHeightGecko_(): number;

        /**
         * Sizes the iframe to its container div's width. The width of the div
         * is controlled by its containing context, not by its contents.
         * if it extends outside of it's contents, then it gets a horizontal scroll.
         * @private
         */
        private sizeIframeToWrapperGecko_(): void;

        /**
         * Perform all the sizing immediately.
         */
        doFieldSizingGecko(): void;

        /**
         * Acquires a lock on resizing the field iframe. This is used to ensure that
         * modifications we make while in a mutation event handler don't cause
         * infinite loops.
         * @return {boolean} False if the lock is already acquired.
         * @private
         */
        private acquireSizeIframeLockGecko_(): boolean;

        /**
         * Releases a lock on resizing the field iframe. This is used to ensure that
         * modifications we make while in a mutation event handler don't cause
         * infinite loops.
         * @private
         */
        private releaseSizeIframeLockGecko_(): void;

        /**
         * String containing the css rules that, if applied to a document's body,
         * would style that body as if it were the original element we made editable.
         * See goog.cssom.iframe.style.getElementContext for more details.
         * @type {string}
         * @private
         */
        private iframeableCss_: string;

        /**
         * Gets the css rules that should be used to style an iframe's body as if it
         * were the original element that we made editable.
         * @param {boolean=} opt_forceRegeneration Set to true to not read the cached
         * copy and instead completely regenerate the css rules.
         * @return {string} The string containing the css rules to use.
         */
        getIframeableCss(opt_forceRegeneration?: boolean): string;

        /**
         * Sets the css rules that should be used inside the editable iframe.
         * Note: to clear the css cache between makeNotEditable/makeEditable,
         * call this with "" as iframeableCss.
         * TODO(user): Unify all these css setting methods + Nick's open
         * CL.  This is getting ridiculous.
         * @param {string} iframeableCss String containing the css rules to use.
         */
        setIframeableCss(iframeableCss: string): void;
    }
}

declare namespace goog.editor.SeamlessField {
}
