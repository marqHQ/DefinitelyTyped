/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.locale.scriptToLanguages' {
    import alias = goog.locale.scriptToLanguages;
    export default alias;
}

declare namespace goog.locale {
    /**
     * The script code to list of language codes map.
     * @type {!Object<string, !Array<string>>}
     */
    let scriptToLanguages: {[key: string]: string[]};
}
