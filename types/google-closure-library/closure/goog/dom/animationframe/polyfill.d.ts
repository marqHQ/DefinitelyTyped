/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.dom.animationFrame.polyfill' {
    export = goog.dom.animationFrame.polyfill;
}

declare namespace goog.dom.animationFrame.polyfill {
    /**
     * Installs the requestAnimationFrame (and cancelAnimationFrame) polyfill.
     */
    function install(): void;
}
