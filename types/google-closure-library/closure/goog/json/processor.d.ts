/// <reference path="../../../globals.d.ts"/>
/// <reference path="../string/parser.d.ts"/>
/// <reference path="../string/stringifier.d.ts"/>

declare module 'goog:goog.json.Processor' {
    import alias = goog.json.Processor;
    export default alias;
}

declare namespace goog.json {
    interface Processor extends goog.string.Parser, goog.string.Stringifier {}
}
