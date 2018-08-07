/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.i18n.ordinalRules' {
    import alias = goog.i18n.ordinalRules;
    export default alias;
}

declare namespace goog.i18n.ordinalRules {
    /**
     * Ordinal pattern keyword
     * @enum {string}
     */
    enum Keyword { ZERO, ONE, TWO, FEW, MANY, OTHER }

    /**
     * Selected Ordinal rules by locale.
     */
    let select: any /*missing*/;
}
