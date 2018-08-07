/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../html/trustedresourceurl.d.ts"/>
/// <reference path="../timer/timer.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.History.EventType' {
    import alias = goog.History.EventType;
    export default alias;
}

declare module 'goog:goog.History.Event' {
    import alias = goog.History.Event;
    export default alias;
}

declare module 'goog:goog.History' {
    import alias = goog.History;
    export default alias;
}

declare namespace goog {
    /**
     * A history management object. Can be instantiated in user-visible mode (uses
     * the address fragment to manage state) or in hidden mode. This object should
     * be created from a script in the document body before the document has
     * finished loading.
     *
     * To store the hidden states in browsers other than IE, a hidden iframe is
     * used. It must point to a valid html page on the same domain (which can and
     * probably should be blank.)
     *
     * Sample instantiation and usage:
     *
     * <pre>
     * // Instantiate history to use the address bar for state.
     * var h = new goog.History();
     * goog.events.listen(h, goog.history.EventType.NAVIGATE, navCallback);
     * h.setEnabled(true);
     *
     * // Any changes to the location hash will call the following function.
     * function navCallback(e) {
     *   alert('Navigated to state "' + e.token + '"');
     * }
     *
     * // The history token can also be set from code directly.
     * h.setToken('foo');
     * </pre>
     *
     * @extends {goog.events.EventTarget}
     */
    class History extends __History {}
    abstract class __History extends goog.events.__EventTarget {
        /**
         * @param {boolean=} opt_invisible True to use hidden history states instead of
         *     the user-visible location hash.
         * @param {!goog.html.TrustedResourceUrl=} opt_blankPageUrl A URL to a
         *     blank page on the same server. Required if opt_invisible is true.
         *     This URL is also used as the src for the iframe used to track history
         *     state in IE (if not specified the iframe is not given a src attribute).
         *     Access is Denied error may occur in IE7 if the window's URL's scheme
         *     is https, and this URL is not specified.
         * @param {HTMLInputElement=} opt_input The hidden input element to be used to
         *     store the history token.  If not provided, a hidden input element will
         *     be created using document.write.
         * @param {HTMLIFrameElement=} opt_iframe The hidden iframe that will be used by
         *     IE for pushing history state changes, or by all browsers if opt_invisible
         *     is true. If not provided, a hidden iframe element will be created using
         *     document.write.
         */
        constructor(
            opt_invisible?: boolean,
            opt_blankPageUrl?: goog.html.TrustedResourceUrl,
            opt_input?: HTMLInputElement,
            opt_iframe?: HTMLIFrameElement
        );

        /**
         * An input element that stores the current iframe state. Used to restore
         * the state when returning to the page on non-IE browsers.
         * @type {HTMLInputElement}
         * @private
         */
        private hiddenInput_: HTMLInputElement;

        /**
         * The window whose location contains the history token fragment. This is
         * the window that contains the hidden input. It's typically the top window.
         * It is not necessarily the same window that the js code is loaded in.
         * @type {Window}
         * @private
         */
        private window_: Window;

        /**
         * The base URL for the hidden iframe. Must refer to a document in the
         * same domain as the main page.
         * @type {!goog.html.TrustedResourceUrl|undefined}
         * @private
         */
        private iframeSrc_: goog.html.TrustedResourceUrl|undefined;

        /**
         * A timer for polling the current history state for changes.
         * @type {goog.Timer}
         * @private
         */
        private timer_: goog.Timer;

        /**
         * True if the state tokens are displayed in the address bar, false for hidden
         * history states.
         * @type {boolean}
         * @private
         */
        private userVisible_: boolean;

        /**
         * An object to keep track of the history event listeners.
         * @type {goog.events.EventHandler<!goog.History>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.History>;

        /**
         * Internet Explorer uses a hidden iframe for all history changes. Other
         * browsers use the iframe only for pushing invisible states.
         * @type {HTMLIFrameElement}
         * @private
         */
        private iframe_: HTMLIFrameElement;

        /**
         * Whether the hidden iframe has had a document written to it yet in this
         * session.
         * @type {boolean}
         * @private
         */
        private unsetIframe_: boolean;

        /**
         * IE-only variable for determining if the document has loaded.
         * @type {boolean}
         * @protected
         */
        protected documentLoaded: boolean;

        /**
         * IE-only variable for storing whether the history object should be enabled
         * once the document finishes loading.
         * @type {boolean}
         * @private
         */
        private shouldEnable_: boolean;

        /**
         * Status of when the object is active and dispatching events.
         * @type {boolean}
         * @private
         */
        private enabled_: boolean;

        /**
         * Whether the object is performing polling with longer intervals. This can
         * occur for instance when setting the location of the iframe when in invisible
         * mode and the server that is hosting the blank html page is down. In FF, this
         * will cause the location of the iframe to no longer be accessible, with
         * permision denied exceptions being thrown on every access of the history
         * token. When this occurs, the polling interval is elongated. This causes
         * exceptions to be thrown at a lesser rate while allowing for the history
         * object to resurrect itself when the html page becomes accessible.
         * @type {boolean}
         * @private
         */
        private longerPolling_: boolean;

        /**
         * The last token set by the history object, used to poll for changes.
         * @type {?string}
         * @private
         */
        private lastToken_: string|null;

        /**
         * If not null, polling in the user invisible mode will be disabled until this
         * token is seen. This is used to prevent a race condition where the iframe
         * hangs temporarily while the location is changed.
         * @type {?string}
         * @private
         */
        private lockedToken_: string|null;

        /**
         * Starts or stops the History polling loop. When enabled, the History object
         * will immediately fire an event for the current location. The caller can set
         * up event listeners between the call to the constructor and the call to
         * setEnabled.
         *
         * On IE, actual startup may be delayed until the iframe and hidden input
         * element have been loaded and can be polled. This behavior is transparent to
         * the caller.
         *
         * @param {boolean} enable Whether to enable the history polling loop.
         */
        setEnabled(enable: boolean): void;

        /**
         * Callback for the window onload event in IE. This is necessary to read the
         * value of the hidden input after restoring a history session. The value of
         * input elements is not viewable until after window onload for some reason (the
         * iframe state is similarly unavailable during the loading phase.)  If
         * setEnabled is called before the iframe has completed loading, the history
         * object will actually be enabled at this point.
         * @protected
         */
        protected onDocumentLoaded(): void;

        /**
         * Handler for the Gecko pageshow event. Restarts the history object so that the
         * correct state can be restored in the hash or iframe.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onShow_(e: goog.events.BrowserEvent): void;

        /**
         * Handles HTML5 onhashchange events on browsers where it is supported.
         * This is very similar to {@link #check_}, except that it is not executed
         * continuously. It is only used when
         * `goog.History.isOnHashChangeSupported()` is true.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onHashChange_(e: goog.events.BrowserEvent): void;

        /**
         * @return {string} The current token.
         */
        getToken(): string;

        /**
         * Sets the history state. When user visible states are used, the URL fragment
         * will be set to the provided token.  Sometimes it is necessary to set the
         * history token before the document title has changed, in this case IE's
         * history drop down can be out of sync with the token.  To get around this
         * problem, the app can pass in a title to use with the hidden iframe.
         * @param {string} token The history state identifier.
         * @param {string=} opt_title Optional title used when setting the hidden iframe
         *     title in IE.
         */
        setToken(token: string, opt_title?: string): void;

        /**
         * Replaces the current history state without affecting the rest of the history
         * stack.
         * @param {string} token The history state identifier.
         * @param {string=} opt_title Optional title used when setting the hidden iframe
         *     title in IE.
         */
        replaceToken(token: string, opt_title?: string): void;

        /**
         * Gets the location fragment for the current URL.  We don't use location.hash
         * directly as the browser helpfully urlDecodes the string for us which can
         * corrupt the tokens.  For example, if we want to store: label/%2Froot it would
         * be returned as label//root.
         * @param {Window} win The window object to use.
         * @return {string} The fragment.
         * @private
         */
        private getLocationFragment_(win: Window): string;

        /**
         * Sets the history state. When user visible states are used, the URL fragment
         * will be set to the provided token. Setting opt_replace to true will cause the
         * navigation to occur, but will replace the current history entry without
         * affecting the length of the stack.
         *
         * @param {string} token The history state identifier.
         * @param {boolean} replace Set to replace the current history entry instead of
         *    appending a new history state.
         * @param {string=} opt_title Optional title used when setting the hidden iframe
         *     title in IE.
         * @private
         */
        private setHistoryState_(token: string, replace: boolean, opt_title?: string): void;

        /**
         * Sets or replaces the URL fragment. The token does not need to be URL encoded
         * according to the URL specification, though certain characters (like newline)
         * are automatically stripped.
         *
         * If opt_replace is not set, non-IE browsers will append a new entry to the
         * history list. Setting the hash does not affect the history stack in IE
         * (unless there is a pre-existing named anchor for that hash.)
         *
         * Older versions of Webkit cannot query the location hash, but it still can be
         * set. If we detect one of these versions, always replace instead of creating
         * new history entries.
         *
         * window.location.replace replaces the current state from the history stack.
         * http://www.whatwg.org/specs/web-apps/current-work/#dom-location-replace
         * http://www.whatwg.org/specs/web-apps/current-work/#replacement-enabled
         *
         * @param {string} token The new string to set.
         * @param {boolean=} opt_replace Set to true to replace the current token
         *    without appending a history entry.
         * @private
         */
        private setHash_(token: string, opt_replace?: boolean): void;

        /**
         * Sets the hidden iframe state. On IE, this is accomplished by writing a new
         * document into the iframe. In Firefox, the iframe's URL fragment stores the
         * state instead.
         *
         * Older versions of webkit cannot set the iframe, so ignore those browsers.
         *
         * @param {string} token The new string to set.
         * @param {boolean=} opt_replace Set to true to replace the current iframe state
         *     without appending a new history entry.
         * @param {string=} opt_title Optional title used when setting the hidden iframe
         *     title in IE.
         * @private
         */
        private setIframeToken_(token: string, opt_replace?: boolean, opt_title?: string): void;

        /**
         * Return the current state string from the hidden iframe. On internet explorer,
         * this is stored as a string in the document body. Other browsers use the
         * location hash of the hidden iframe.
         *
         * Older versions of webkit cannot access the iframe location, so always return
         * null in that case.
         *
         * @return {?string} The state token saved in the iframe (possibly null if the
         *     iframe has never loaded.).
         * @private
         */
        private getIframeToken_(): string|null;

        /**
         * Checks the state of the document fragment and the iframe title to detect
         * navigation changes. If `goog.HistoryisOnHashChangeSupported()` is
         * `false`, then this runs approximately twenty times per second.
         * @param {boolean} isNavigation True if the event was initiated by a browser
         *     action, false if it was caused by a setToken call. See
         *     {@link goog.history.Event}.
         * @private
         */
        private check_(isNavigation: boolean): void;

        /**
         * Updates the current history state with a given token. Called after a change
         * to the location or the iframe state is detected by poll_.
         *
         * @param {string} token The new history state.
         * @param {boolean} isNavigation True if the event was initiated by a browser
         *     action, false if it was caused by a setToken call. See
         *     {@link goog.history.Event}.
         * @private
         */
        private update_(token: string, isNavigation: boolean): void;

        /**
         * Sets if the history oject should use longer intervals when polling.
         *
         * @param {boolean} longerPolling Whether to enable longer polling.
         * @private
         */
        private setLongerPolling_(longerPolling: boolean): void;

        /**
         * Opera cancels all outstanding timeouts and intervals after any rapid
         * succession of navigation events, including the interval used to detect
         * navigation events. This function restarts the interval so that navigation can
         * continue. Ideally, only events which would be likely to cause a navigation
         * change (mousedown and keydown) would be bound to this function. Since Opera
         * seems to ignore keydown events while the alt key is pressed (such as
         * alt-left or right arrow), this function is also bound to the much more
         * frequent mousemove event. This way, when the update loop freezes, it will
         * unstick itself as the user wiggles the mouse in frustration.
         * @private
         */
        private operaDefibrillator_(): void;
    }
}

declare namespace goog.History {
    /**
     * Constant for the history change event type.
     * @deprecated Use goog.history.Event.
     * @final
     */
    class Event extends __Event {}
    abstract class __Event {
        /**
         */
        constructor();
    }

    /**
     * Whether the browser supports HTML5 history management's onhashchange event.
     * {@link http://www.w3.org/TR/html5/history.html}. IE 9 in compatibility mode
     * indicates that onhashchange is in window, but testing reveals the event
     * isn't actually fired.
     * @return {boolean} Whether onhashchange is supported.
     */
    function isOnHashChangeSupported(): boolean;

    /**
     * Whether the current browser is Internet Explorer prior to version 8. Many IE
     * specific workarounds developed before version 8 are unnecessary in more
     * current versions.
     * @type {boolean}
     */
    let LEGACY_IE: boolean;

    /**
     * Whether the browser always requires the hash to be present. Internet Explorer
     * before version 8 will reload the HTML page if the hash is omitted.
     * @type {boolean}
     */
    let HASH_ALWAYS_REQUIRED: boolean;

    /**
     * Types of polling. The values are in ms of the polling interval.
     * @enum {number}
     */
    enum PollingType { NORMAL, LONG }

    /**
     * Constant for the history change event type.
     * @enum {string}
     * @deprecated Use goog.history.EventType.
     */
    enum EventType { /* goog.history.EventType */ }
}
