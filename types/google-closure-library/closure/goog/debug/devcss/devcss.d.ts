/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.debug.DevCss' {
    import alias = goog.debug.DevCss;
    export default alias;
}

declare module 'goog:goog.debug.DevCss.UserAgent' {
    import alias = goog.debug.DevCss.UserAgent;
    export default alias;
}

declare namespace goog.debug {
    /**
     * A class for solving development CSS issues/emulating the CSS Compiler.
     * @throws {Error} When userAgent detection fails.
     * @final
     */
    class DevCss extends __DevCss {}
    abstract class __DevCss {
        /**
         * @param {goog.debug.DevCss.UserAgent=} opt_userAgent The user agent, if not
         *     passed in, will be determined using goog.userAgent.
         * @param {number|string=} opt_userAgentVersion The user agent's version.
         *     If not passed in, will be determined using goog.userAgent.
         */
        constructor(opt_userAgent?: goog.debug.DevCss.UserAgent, opt_userAgentVersion?: number|string);

        /**
         * One of goog.debug.DevCss.UserAgent.
         * @type {string}
         * @private
         */
        private userAgent_: string;

        /**
         * @const @private
         */
        readonly userAgentTokens_: any /*missing*/;

        /**
         * @type {number|string}
         * @private
         */
        private userAgentVersion_: number|string;

        /**
         * @type {boolean}
         * @private
         */
        private isIe6OrLess_: boolean;

        /**
         * @type {Array<{classNames,combinedClassName,els}>}
         * @private
         */
        private ie6CombinedMatches_:
            {classNames: any /*missing*/; combinedClassName: any /*missing*/; els: any /*missing*/}[];

        /**
         * Rewrites the CSSOM as needed to activate any useragent-specific selectors.
         * @param {boolean=} opt_enableIe6ReadyHandler If true(the default), and the
         *     userAgent is ie6, we set a document "ready" event handler to walk the DOM
         *     and make combined selector className changes. Having this parameter also
         *     aids unit testing.
         */
        activateBrowserSpecificCssRules(opt_enableIe6ReadyHandler?: boolean): void;

        /**
         * Generates user agent token match strings with comparison and version bits.
         * For example:
         *   userAgentTokens_.ANY will be like 'GECKO'
         *   userAgentTokens_.LESS_THAN will be like 'GECKO-LT3' etc...
         * @private
         */
        private generateUserAgentTokens_(): void;

        /**
         * Gets the version number bit from a selector matching userAgentToken.
         * @param {string} selectorText The selector text of a CSS rule.
         * @param {string} userAgentToken Includes the LTE/GTE bit to see if it matches.
         * @return {string|undefined} The version number.
         * @private
         */
        private getVersionNumberFromSelectorText_(selectorText: string, userAgentToken: string): string|undefined;

        /**
         * Extracts a rule version from the selector text, and if it finds one, calls
         * compareVersions against it and the passed in token string to provide the
         * value needed to determine if we have a match or not.
         * @param {CSSRule} cssRule The rule to test against.
         * @param {string} token The match token to test against the rule.
         * @return {!Array|undefined} A tuple with the result of the compareVersions
         *     call and the matched ruleVersion.
         * @private
         */
        private getRuleVersionAndCompare_(cssRule: CSSRule, token: string): any[]|undefined;

        /**
         * Replaces a CSS selector if we have matches based on our useragent/version.
         * Example: With a selector like ".USERAGENT-IE-LTE6 .class { prop: value }" if
         * we are running IE6 we'll end up with ".class { prop: value }", thereby
         * "activating" the selector.
         * @param {CSSRule} cssRule The cssRule to potentially replace.
         * @private
         */
        private replaceBrowserSpecificClassNames_(cssRule: CSSRule): void;

        /**
         * Replaces IE6 combined selector rules with a workable development alternative.
         * IE6 actually parses .class1.class2 {} to simply .class2 {} which is nasty.
         * To fully support combined selectors in IE6 this function needs to be paired
         * with a call to replace the relevant DOM elements classNames as well.
         * @see {this.addIe6CombinedClassNames_}
         * @param {CSSRule} cssRule The rule to potentially fix.
         * @private
         */
        private replaceIe6CombinedSelectors_(cssRule: CSSRule): void;

        /**
         * Gets the appropriate new combined selector text for IE6.
         * Also adds an entry onto ie6CombinedMatches_ with relevant info for the
         * likely following call to walk the DOM and rewrite the class attribute.
         * Example: With a selector like
         *     ".class2 { -goog-ie6-selector: .class1.class2; prop: value }".
         * this function will return:
         *     ".class1_class2 { prop: value }".
         * @param {string} cssText The CSS selector text and css rule text combined.
         * @return {?string} The rewritten css rule text.
         * @private
         */
        private getIe6CombinedSelectorText_(cssText: string): string|null;

        /**
         * Adds combined selectors with underscores to make them "work" in IE6.
         * @see {this.replaceIe6CombinedSelectors_}
         * @private
         */
        private addIe6CombinedClassNames_(): void;
    }
}

declare namespace goog.debug.DevCss {
    /**
     * A list of possible user agent strings.
     * @enum {string}
     */
    enum UserAgent { OPERA, IE, GECKO, FIREFOX, WEBKIT, SAFARI, MOBILE, EDGE }
}
