/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.history.Html5History' {
    import alias = goog.history.Html5History;
    export default alias;
}

declare module 'goog:goog.history.Html5History.TokenTransformer' {
    import alias = goog.history.Html5History.TokenTransformer;
    export default alias;
}

declare namespace goog.history {
    /**
     * An implementation compatible with goog.History that uses the HTML5
     * history APIs.
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class Html5History extends __Html5History {}
    abstract class __Html5History extends goog.events.__EventTarget {
        /**
         * @param {Window=} opt_win The window to listen/dispatch history events on.
         * @param {goog.history.Html5History.TokenTransformer=} opt_transformer
         *     The token transformer that is used to create URL from the token
         *     when storing token without using hash fragment.
         */
        constructor(opt_win?: Window, opt_transformer?: goog.history.Html5History.TokenTransformer);

        /**
         * The window object to use for history tokens.  Typically the top window.
         * @type {Window}
         * @private
         */
        private window_: Window;

        /**
         * The token transformer that is used to create URL from the token
         * when storing token without using hash fragment.
         * @type {goog.history.Html5History.TokenTransformer}
         * @private
         */
        private transformer_: goog.history.Html5History.TokenTransformer;

        /**
         * The fragment of the last navigation. Used to eliminate duplicate/redundant
         * NAVIGATE events when a POPSTATE and HASHCHANGE event are triggered for the
         * same navigation (e.g., back button click).
         * @private {?string}
         */
        private lastFragment_: any /*missing*/;

        /**
         * Status of when the object is active and dispatching events.
         * @type {boolean}
         * @private
         */
        private enabled_: boolean;

        /**
         * Whether to use the fragment to store the token, defaults to true.
         * @type {boolean}
         * @private
         */
        private useFragment_: boolean;

        /**
         * If useFragment is false the path will be used, the path prefix will be
         * prepended to all tokens. Defaults to '/'.
         * @type {string}
         * @private
         */
        private pathPrefix_: string;

        /**
         * Starts or stops the History.  When enabled, the History object
         * will immediately fire an event for the current location. The caller can set
         * up event listeners between the call to the constructor and the call to
         * setEnabled.
         *
         * @param {boolean} enable Whether to enable history.
         */
        setEnabled(enable: boolean): void;

        /**
         * Returns the current token.
         * @return {string} The current token.
         */
        getToken(): string;

        /**
         * Sets the history state.
         * @param {string} token The history state identifier.
         * @param {string=} opt_title Optional title to associate with history entry.
         */
        setToken(token: string, opt_title?: string): void;

        /**
         * Replaces the current history state without affecting the rest of the history
         * stack.
         * @param {string} token The history state identifier.
         * @param {string=} opt_title Optional title to associate with history entry.
         */
        replaceToken(token: string, opt_title?: string): void;

        /**
         * Sets whether to use the fragment to store tokens.
         * @param {boolean} useFragment Whether to use the fragment.
         */
        setUseFragment(useFragment: boolean): void;

        /**
         * Sets the path prefix to use if storing tokens in the path. The path
         * prefix should start and end with slash.
         * @param {string} pathPrefix Sets the path prefix.
         */
        setPathPrefix(pathPrefix: string): void;

        /**
         * Gets the path prefix.
         * @return {string} The path prefix.
         */
        getPathPrefix(): string;

        /**
         * Gets the current hash fragment, if useFragment_ is enabled.
         * @return {?string} The hash fragment.
         * @private
         */
        private getFragment_(): string|null;

        /**
         * Gets the URL to set when calling history.pushState
         * @param {string} token The history token.
         * @return {string} The URL.
         * @private
         */
        private getUrl_(token: string): string;

        /**
         * Handles history events dispatched by the browser.
         * @param {goog.events.BrowserEvent} e The browser event object.
         * @private
         */
        private onHistoryEvent_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.history.Html5History {
    interface TokenTransformer {
        /**
         * Retrieves a history token given the path prefix and
         * `window.location` object.
         *
         * @param {string} pathPrefix The path prefix to use when storing token
         *     in a path; always begin with a slash.
         * @param {Location} location The `window.location` object.
         *     Treat this object as read-only.
         * @return {string} token The history token.
         */
        retrieveToken(pathPrefix: string, location: Location): string;

        /**
         * Creates a URL to be pushed into HTML5 history stack when storing
         * token without using hash fragment.
         *
         * @param {string} token The history token.
         * @param {string} pathPrefix The path prefix to use when storing token
         *     in a path; always begin with a slash.
         * @param {Location} location The `window.location` object.
         *     Treat this object as read-only.
         * @return {string} url The complete URL string from path onwards
         *     (without {@code protocol://host:port} part); must begin with a
         *     slash.
         */
        createUrl(token: string, pathPrefix: string, location: Location): string;
    }

    /**
     * Returns whether Html5History is supported.
     * @param {Window=} opt_win Optional window to check.
     * @return {boolean} Whether html5 history is supported.
     */
    function isSupported(opt_win?: Window): boolean;
}
