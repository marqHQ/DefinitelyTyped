/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.i18n.currencyCodeMapTier2' {
    import alias = goog.i18n.currencyCodeMapTier2;
    export default alias;
}

declare module 'goog:goog.i18n.currencyCodeMap' {
    import alias = goog.i18n.currencyCodeMap;
    export default alias;
}

declare namespace goog.i18n {
    /**
     * Deprecated, this data is not being updated. Please use
     * {@link goog.i18n.currency}.
     *
     * The mapping of currency symbol through intl currency code.
     * The source of information is mostly from wikipedia and CLDR. Since there is
     * no authoritative source, items are judged by personal perception.

     * If an application need currency support that available in tier2, it
     * should extend currencyCodeMap to include tier2 data by doing this:
     *     goog.object.extend(goog.i18n.currencyCodeMap,
     *                        goog.i18n.currencyCodeMapTier2);
     *
     * @deprecated Use {@link goog.i18n.currency.getLocalCurrencyPattern} instead.
     * @const {!Object<string, string>}
     */
    const currencyCodeMap: any /*missing*/;

    /**
     * Deprecated, this data is not being updated. Please use
     * {@link goog.i18n.currency}.
     *
     * This group of currency data is unlikely to be used. In case they are,
     * program need to merge it into goog.locale.CurrencyCodeMap.
     *
     * @deprecated Call {@link goog.i18n.currency.addTier2Support} and then use
     *     {@link goog.i18n.currency.getLocalCurrencyPattern}.
     * @const {!Object<string, string>}
     */
    const currencyCodeMapTier2: any /*missing*/;
}
