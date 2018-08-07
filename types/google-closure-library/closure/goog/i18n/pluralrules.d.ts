/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.i18n.pluralRules' {
    import alias = goog.i18n.pluralRules;
    export default alias;
}

declare namespace goog.i18n.pluralRules {
    /**
     * Plural pattern keyword
     * @enum {string}
     */
    enum Keyword { ZERO, ONE, TWO, FEW, MANY, OTHER }

    /**
     * Selected Plural rules by locale.
     */
    let select: any /*missing*/;
}
