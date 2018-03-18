/// <reference path="../../globals.d.ts"/>

declare namespace closure.docs {
    /** @define {string} */
    let LOCATION: any /*missing*/;

    /**
     * Returns a value from the global `_JEKYLL_DATA` object, which contains the
     * 'page' and 'site' data from Jekyll.  This allows to configure the JS
     * behavior from the frontmatter.  It is effectively `goog.getObjectByName`,
     * except we're not currently depending on Closure.
     * @param {string} param
     * @return {*} Result, or undefined.
     */
    function get(param: string): any;

    /**
     * Applies the given function to each element.
     * @param {string} selector A query selector.
     * @param {function(!Element)} func
     */
    function forEachElement(selector: string, func: (_0: Element) => void): void;

    /**
     * Runs a callback on each heading.
     * @param {function(!Element, number)} func
     */
    function forEachHeading(func: (_0: Element, _1: number) => void): void;

    /**
     * Adds a scroll listener to the document.
     * The listener adds a "scrolled" and a "down" class to the body element
     * to indicate (respectively) whether the page is scrolled at all, and
     * whether the last scroll was down.
     */
    function addScrollListener(): void;

    /**
     * Add a listener so that clicking on #-only links calls scrollToHash
     * instead of the browser default.
     */
    function interceptLinkClicks(): void;

    /**
     * Removes the first <h1> header in the article and writes it into
     * the header and title.  This should be done before building the
     * TOC so that the title doesn't show up as an entry.
     */
    function findTitle(): void;

    /**
     * Iterates over heading elements to add/correct numbers.
     * Anything that looks like a number will be adjusted.
     * Specifically, one can simply write "### 1.1" for all
     * headings and this function will fill in the correct
     * number.  Also assigns IDs if one isn't already given.
     */
    function autoNumber(): void;

    /**
     * Replaces the text content of intra-document links to match the
     * linked section's heading.  This is necessary when auto-numbering
     * is used in order to get the right number in the text.  It is
     * triggered by links whose text is exactly two or more question marks.
     */
    function fixLinkText(): void;

    /**
     * Builds the table of contents.  This should run after
     * autoNumber so that the correct text makes it in.
     */
    function buildToc(): void;

    /**
     * Fix some syntax highlighting.  Rouge does a poor job highlighting JS.
     * It marks every identifier as 'nx' regardless of how it is used, whereas
     * GitHub-flavored markdown highlights the final identifier in a qualified
     * function name as a function.  This function finds any 'nx' identifier
     * that is followed by an open-paren and changes it to 'nf'.
     */
    function fixSyntaxHighlighting(): void;

    /**
     * Highlights callouts.  A callout is a paragraph that begins with
     * 'NOTE:' or 'TIP:' or 'WARNING:' (or several others).  These are
     * highlighted by adding the 'callout-*' to the classlist, where
     * '*' is 'note', 'tip', 'warning', etc.
     */
    function highlightCallouts(): void;

    /**
     * Sets the URL on the edit link.
     */
    function setEditLink(): void;

    /**
     * Marks the current page and section as 'active' in nav menus.
     */
    function markActiveNav(): void;

    /**
     * Kicks off Google Analytics.  This is just a pretty-printed
     * version of the standard installation code.
     * @suppress {checkTypes}
     */
    function startAnalytics(): void;

    /**
     * Initialize everything.
     */
    function initialize(): void;
}
