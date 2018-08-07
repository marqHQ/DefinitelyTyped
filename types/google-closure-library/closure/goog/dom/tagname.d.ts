/// <reference path="../../../globals.d.ts"/>
/// <reference path="./htmlelement.d.ts"/>

declare module 'goog:goog.dom.TagName' {
    import alias = goog.dom.TagName;
    export default alias;
}

declare namespace goog.dom {
    /**
     * A tag name with the type of the element stored in the generic.
     * @template T
     */
    class TagName<T> extends __TagName<T> {}
    abstract class __TagName<T> {
        /**
         * @param {string} tagName
         */
        constructor(tagName: string);

        /** @private {string} */
        private tagName_: any /*missing*/;
    }
}

declare namespace goog.dom.TagName {
    /** @type {!goog.dom.TagName<!HTMLAnchorElement>} */
    let A: goog.dom.TagName<HTMLAnchorElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let ABBR: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let ACRONYM: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let ADDRESS: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLAppletElement>} */
    let APPLET: goog.dom.TagName<HTMLAppletElement>;

    /** @type {!goog.dom.TagName<!HTMLAreaElement>} */
    let AREA: goog.dom.TagName<HTMLAreaElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let ARTICLE: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let ASIDE: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLAudioElement>} */
    let AUDIO: goog.dom.TagName<HTMLAudioElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let B: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLBaseElement>} */
    let BASE: goog.dom.TagName<HTMLBaseElement>;

    /** @type {!goog.dom.TagName<!HTMLBaseFontElement>} */
    let BASEFONT: goog.dom.TagName<HTMLBaseFontElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let BDI: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let BDO: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let BIG: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLQuoteElement>} */
    let BLOCKQUOTE: goog.dom.TagName<HTMLQuoteElement>;

    /** @type {!goog.dom.TagName<!HTMLBodyElement>} */
    let BODY: goog.dom.TagName<HTMLBodyElement>;

    /** @type {!goog.dom.TagName<!HTMLBRElement>} */
    let BR: goog.dom.TagName<HTMLBRElement>;

    /** @type {!goog.dom.TagName<!HTMLButtonElement>} */
    let BUTTON: goog.dom.TagName<HTMLButtonElement>;

    /** @type {!goog.dom.TagName<!HTMLCanvasElement>} */
    let CANVAS: goog.dom.TagName<HTMLCanvasElement>;

    /** @type {!goog.dom.TagName<!HTMLTableCaptionElement>} */
    let CAPTION: goog.dom.TagName<HTMLTableCaptionElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let CENTER: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let CITE: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let CODE: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLTableColElement>} */
    let COL: goog.dom.TagName<HTMLTableColElement>;

    /** @type {!goog.dom.TagName<!HTMLTableColElement>} */
    let COLGROUP: goog.dom.TagName<HTMLTableColElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let COMMAND: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let DATA: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLDataListElement>} */
    let DATALIST: goog.dom.TagName<HTMLDataListElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let DD: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLModElement>} */
    let DEL: goog.dom.TagName<HTMLModElement>;

    /** @type {!goog.dom.TagName<!HTMLDetailsElement>} */
    // var DETAILS: goog.dom.TagName<HTMLDetailsElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let DFN: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLDialogElement>} */
    // var DIALOG: goog.dom.TagName<HTMLDialogElement>;

    /** @type {!goog.dom.TagName<!HTMLDirectoryElement>} */
    let DIR: goog.dom.TagName<HTMLDirectoryElement>;

    /** @type {!goog.dom.TagName<!HTMLDivElement>} */
    let DIV: goog.dom.TagName<HTMLDivElement>;

    /** @type {!goog.dom.TagName<!HTMLDListElement>} */
    let DL: goog.dom.TagName<HTMLDListElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let DT: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let EM: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLEmbedElement>} */
    let EMBED: goog.dom.TagName<HTMLEmbedElement>;

    /** @type {!goog.dom.TagName<!HTMLFieldSetElement>} */
    let FIELDSET: goog.dom.TagName<HTMLFieldSetElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let FIGCAPTION: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let FIGURE: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLFontElement>} */
    let FONT: goog.dom.TagName<HTMLFontElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let FOOTER: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLFormElement>} */
    let FORM: goog.dom.TagName<HTMLFormElement>;

    /** @type {!goog.dom.TagName<!HTMLFrameElement>} */
    let FRAME: goog.dom.TagName<HTMLFrameElement>;

    /** @type {!goog.dom.TagName<!HTMLFrameSetElement>} */
    let FRAMESET: goog.dom.TagName<HTMLFrameSetElement>;

    /** @type {!goog.dom.TagName<!HTMLHeadingElement>} */
    let H1: goog.dom.TagName<HTMLHeadingElement>;

    /** @type {!goog.dom.TagName<!HTMLHeadingElement>} */
    let H2: goog.dom.TagName<HTMLHeadingElement>;

    /** @type {!goog.dom.TagName<!HTMLHeadingElement>} */
    let H3: goog.dom.TagName<HTMLHeadingElement>;

    /** @type {!goog.dom.TagName<!HTMLHeadingElement>} */
    let H4: goog.dom.TagName<HTMLHeadingElement>;

    /** @type {!goog.dom.TagName<!HTMLHeadingElement>} */
    let H5: goog.dom.TagName<HTMLHeadingElement>;

    /** @type {!goog.dom.TagName<!HTMLHeadingElement>} */
    let H6: goog.dom.TagName<HTMLHeadingElement>;

    /** @type {!goog.dom.TagName<!HTMLHeadElement>} */
    let HEAD: goog.dom.TagName<HTMLHeadElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let HEADER: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let HGROUP: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLHRElement>} */
    let HR: goog.dom.TagName<HTMLHRElement>;

    /** @type {!goog.dom.TagName<!HTMLHtmlElement>} */
    let HTML: goog.dom.TagName<HTMLHtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let I: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLIFrameElement>} */
    let IFRAME: goog.dom.TagName<HTMLIFrameElement>;

    /** @type {!goog.dom.TagName<!HTMLImageElement>} */
    let IMG: goog.dom.TagName<HTMLImageElement>;

    /** @type {!goog.dom.TagName<!HTMLInputElement>} */
    let INPUT: goog.dom.TagName<HTMLInputElement>;

    /** @type {!goog.dom.TagName<!HTMLModElement>} */
    let INS: goog.dom.TagName<HTMLModElement>;

    /** @type {!goog.dom.TagName<!HTMLIsIndexElement>} */
    // var ISINDEX: goog.dom.TagName<HTMLIsIndexElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let KBD: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let KEYGEN: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLLabelElement>} */
    let LABEL: goog.dom.TagName<HTMLLabelElement>;

    /** @type {!goog.dom.TagName<!HTMLLegendElement>} */
    let LEGEND: goog.dom.TagName<HTMLLegendElement>;

    /** @type {!goog.dom.TagName<!HTMLLIElement>} */
    let LI: goog.dom.TagName<HTMLLIElement>;

    /** @type {!goog.dom.TagName<!HTMLLinkElement>} */
    let LINK: goog.dom.TagName<HTMLLinkElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let MAIN: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLMapElement>} */
    let MAP: goog.dom.TagName<HTMLMapElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let MARK: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let MATH: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLMenuElement>} */
    let MENU: goog.dom.TagName<HTMLMenuElement>;

    /** @type {!goog.dom.TagName<!HTMLMenuItemElement>} */
    // var MENUITEM: goog.dom.TagName<HTMLMenuItemElement>;

    /** @type {!goog.dom.TagName<!HTMLMetaElement>} */
    let META: goog.dom.TagName<HTMLMetaElement>;

    /** @type {!goog.dom.TagName<!HTMLMeterElement>} */
    let METER: goog.dom.TagName<HTMLMeterElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let NAV: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let NOFRAMES: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let NOSCRIPT: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLObjectElement>} */
    let OBJECT: goog.dom.TagName<HTMLObjectElement>;

    /** @type {!goog.dom.TagName<!HTMLOListElement>} */
    let OL: goog.dom.TagName<HTMLOListElement>;

    /** @type {!goog.dom.TagName<!HTMLOptGroupElement>} */
    let OPTGROUP: goog.dom.TagName<HTMLOptGroupElement>;

    /** @type {!goog.dom.TagName<!HTMLOptionElement>} */
    let OPTION: goog.dom.TagName<HTMLOptionElement>;

    /** @type {!goog.dom.TagName<!HTMLOutputElement>} */
    let OUTPUT: goog.dom.TagName<HTMLOutputElement>;

    /** @type {!goog.dom.TagName<!HTMLParagraphElement>} */
    let P: goog.dom.TagName<HTMLParagraphElement>;

    /** @type {!goog.dom.TagName<!HTMLParamElement>} */
    let PARAM: goog.dom.TagName<HTMLParamElement>;

    /** @type {!goog.dom.TagName<!HTMLPictureElement>} */
    let PICTURE: goog.dom.TagName<HTMLPictureElement>;

    /** @type {!goog.dom.TagName<!HTMLPreElement>} */
    let PRE: goog.dom.TagName<HTMLPreElement>;

    /** @type {!goog.dom.TagName<!HTMLProgressElement>} */
    let PROGRESS: goog.dom.TagName<HTMLProgressElement>;

    /** @type {!goog.dom.TagName<!HTMLQuoteElement>} */
    let Q: goog.dom.TagName<HTMLQuoteElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let RP: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let RT: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let RTC: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let RUBY: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let S: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let SAMP: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLScriptElement>} */
    let SCRIPT: goog.dom.TagName<HTMLScriptElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let SECTION: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLSelectElement>} */
    let SELECT: goog.dom.TagName<HTMLSelectElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let SMALL: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLSourceElement>} */
    let SOURCE: goog.dom.TagName<HTMLSourceElement>;

    /** @type {!goog.dom.TagName<!HTMLSpanElement>} */
    let SPAN: goog.dom.TagName<HTMLSpanElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let STRIKE: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let STRONG: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLStyleElement>} */
    let STYLE: goog.dom.TagName<HTMLStyleElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let SUB: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let SUMMARY: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let SUP: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let SVG: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLTableElement>} */
    let TABLE: goog.dom.TagName<HTMLTableElement>;

    /** @type {!goog.dom.TagName<!HTMLTableSectionElement>} */
    let TBODY: goog.dom.TagName<HTMLTableSectionElement>;

    /** @type {!goog.dom.TagName<!HTMLTableCellElement>} */
    let TD: goog.dom.TagName<HTMLTableCellElement>;

    /** @type {!goog.dom.TagName<!HTMLTemplateElement>} */
    let TEMPLATE: goog.dom.TagName<HTMLTemplateElement>;

    /** @type {!goog.dom.TagName<!HTMLTextAreaElement>} */
    let TEXTAREA: goog.dom.TagName<HTMLTextAreaElement>;

    /** @type {!goog.dom.TagName<!HTMLTableSectionElement>} */
    let TFOOT: goog.dom.TagName<HTMLTableSectionElement>;

    /** @type {!goog.dom.TagName<!HTMLTableCellElement>} */
    let TH: goog.dom.TagName<HTMLTableCellElement>;

    /** @type {!goog.dom.TagName<!HTMLTableSectionElement>} */
    let THEAD: goog.dom.TagName<HTMLTableSectionElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let TIME: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLTitleElement>} */
    let TITLE: goog.dom.TagName<HTMLTitleElement>;

    /** @type {!goog.dom.TagName<!HTMLTableRowElement>} */
    let TR: goog.dom.TagName<HTMLTableRowElement>;

    /** @type {!goog.dom.TagName<!HTMLTrackElement>} */
    let TRACK: goog.dom.TagName<HTMLTrackElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let TT: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let U: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLUListElement>} */
    let UL: goog.dom.TagName<HTMLUListElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let VAR: goog.dom.TagName<goog.dom.HtmlElement>;

    /** @type {!goog.dom.TagName<!HTMLVideoElement>} */
    let VIDEO: goog.dom.TagName<HTMLVideoElement>;

    /** @type {!goog.dom.TagName<!goog.dom.HtmlElement>} */
    let WBR: goog.dom.TagName<goog.dom.HtmlElement>;
}
