/// <reference path="../../../globals.d.ts"/>

declare namespace global {
    /**
     * The goog namespace in the global scope.
     */
    let goog: any /*missing*/;

    /**
     * Imports a script using Node's require() API.
     *
     * @param {string} src The script source.
     * @param {string=} opt_sourceText The optional source text to evaluate.
     * @return {boolean} True if the script was imported, false otherwise.
     */
    function CLOSURE_IMPORT_SCRIPT(src: string, opt_sourceText?: string): boolean;

    /**
     * Loads a file when using Closure's goog.require() API with goog.modules.
     *
     * @param {string} src The file source.
     * @return {string} The file contents.
     */
    function CLOSURE_LOAD_FILE_SYNC(src: string): string;
}

declare namespace goog {
    /**
     * Bootstraps a file into the global scope.
     *
     * This is strictly for cases where normal require() won't work,
     * because the file declares global symbols with 'var' that need to
     * be added to the global scope.
     * @suppress {missingProvide}
     *
     * @param {string} file The path to the file.
     */
    function nodeGlobalRequire(file: string): void;
}
