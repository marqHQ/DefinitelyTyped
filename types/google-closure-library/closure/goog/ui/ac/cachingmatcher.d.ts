/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.ui.ac.CachingMatcher' {
    import alias = goog.ui.ac.CachingMatcher;
    export default alias;
}

declare namespace goog.ui.ac {
    /**
     * A matcher which wraps another (typically slow) matcher and
     * keeps a client-side cache of the results. For instance, you can use this to
     * wrap a RemoteArrayMatcher to hide the latency of the underlying matcher
     * having to make ajax request.
     *
     * Objects in the cache are deduped on their stringified forms.
     *
     * Note - when the user types a character, they will instantly get a set of
     * local results, and then some time later, the results from the server will
     * show up.
     *
     * @final
     */
    class CachingMatcher extends __CachingMatcher {}
    abstract class __CachingMatcher {
        /**
         * @param {!Object} baseMatcher The underlying matcher to use. Must implement
         *     requestMatchingRows.
         */
        constructor(baseMatcher: Object);

        /** @private {!Array<!Object>}} The cache. */
        private rows_: any /*missing*/;

        /**
         * Set of stringified rows, for fast deduping. Each element of this.rows_
         * is stored in rowStrings_ as (' ' + row) to ensure we avoid builtin
         * properties like 'toString'.
         * @private {Object<string, boolean>}
         */
        private rowStrings_: any /*missing*/;

        /**
         * Maximum number of rows in the cache. If the cache grows larger than this,
         * the entire cache will be emptied.
         * @private {number}
         */
        private maxCacheSize_: any /*missing*/;

        /** @private {!Object} The underlying matcher to use. */
        private baseMatcher_: any /*missing*/;

        /**
         * Local matching function.
         * @private {function(string, number, !Array<!Object>): !Array<!Object>}
         */
        private getMatchesForRows_: any /*missing*/;

        /** @private {number} Number of matches to request from the base matcher. */
        private baseMatcherMaxMatches_: any /*missing*/;

        /** @private {goog.async.Throttle} */
        private throttledTriggerBaseMatch_: any /*missing*/;

        /** @private {string} */
        private mostRecentToken_: any /*missing*/;

        /** @private {Function} */
        private mostRecentMatchHandler_: any /*missing*/;

        /** @private {number} */
        private mostRecentMaxMatches_: any /*missing*/;

        /**
         * The set of rows which we last displayed.
         *
         * NOTE(reinerp): The need for this is subtle. When a server result comes
         * back, we don't want to suddenly change the list of results without the user
         * doing anything. So we make sure to add the new server results to the end of
         * the currently displayed list.
         *
         * We need to keep track of the last rows we displayed, because the "similar
         * matcher" we use locally might otherwise reorder results.
         *
         * @private {Array<!Object>}
         */
        private mostRecentMatches_: any /*missing*/;

        /**
         * Sets the number of milliseconds with which to throttle the match requests
         * on the underlying matcher.
         *
         * Default value: 150.
         *
         * @param {number} throttleTime .
         */
        setThrottleTime(throttleTime: number): void;

        /**
         * Sets the maxMatches to use for the base matcher. If the base matcher makes
         * AJAX requests, it may help to make this a large number so that the local
         * cache gets populated quickly.
         *
         * Default value: 100.
         *
         * @param {number} maxMatches The value to set.
         */
        setBaseMatcherMaxMatches(maxMatches: number): void;

        /**
         * Sets the maximum size of the local cache. If the local cache grows larger
         * than this size, it will be emptied.
         *
         * Default value: 1000.
         *
         * @param {number} maxCacheSize .
         */
        setMaxCacheSize(maxCacheSize: number): void;

        /**
         * Sets the local matcher to use.
         *
         * The local matcher should be a function with the same signature as
         * {@link goog.ui.ac.ArrayMatcher.getMatchesForRows}, i.e. its arguments are
         * searchToken, maxMatches, rowsToSearch; and it returns a list of matching
         * rows.
         *
         * Default value: {@link goog.ui.ac.ArrayMatcher.getMatchesForRows}.
         *
         * @param {function(string, number, !Array<!Object>): !Array<!Object>}
         *     localMatcher
         */
        setLocalMatcher(localMatcher: (_0: string, _1: number, _2: Object[]) => Object[]): void;

        /**
         * Function used to pass matches to the autocomplete.
         * @param {string} token Token to match.
         * @param {number} maxMatches Max number of matches to return.
         * @param {Function} matchHandler callback to execute after matching.
         */
        requestMatchingRows(token: string, maxMatches: number, matchHandler: Function): void;

        /** Clears the cache. */
        clearCache(): void;

        /**
         * Adds the specified rows to the cache.
         * @param {!Array<!Object>} rows .
         * @private
         */
        private addRows_(rows: Object[]): void;

        /**
         * Checks if the cache is larger than the maximum cache size. If so clears it.
         * @private
         */
        private clearCacheIfTooLarge_(): void;

        /**
         * Triggers a match request against the base matcher. This function is
         * unthrottled, so don't call it directly; instead use
         * this.throttledTriggerBaseMatch_.
         * @private
         */
        private triggerBaseMatch_(): void;

        /**
         * Handles a match response from the base matcher.
         * @param {string} token The token against which the base match was called.
         * @param {!Array<!Object>} matches The matches returned by the base matcher.
         * @private
         */
        private onBaseMatch_(token: string, matches: Object[]): void;
    }
}
