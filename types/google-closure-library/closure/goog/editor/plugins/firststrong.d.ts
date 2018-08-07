/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>

declare module 'goog:goog.editor.plugins.FirstStrong' {
    import alias = goog.editor.plugins.FirstStrong;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * First Strong plugin.
     * @extends {goog.editor.Plugin}
     * @final
     */
    class FirstStrong extends __FirstStrong {}
    abstract class __FirstStrong extends goog.editor.__Plugin {
        /**
         */
        constructor();

        /**
         * Indicates whether or not the cursor is in a paragraph we have not yet
         * finished evaluating for directionality. This is set to true whenever the
         * cursor is moved, and set to false after seeing a strong character in the
         * paragraph the cursor is currently in.
         *
         * @type {boolean}
         * @private
         */
        private isNewBlock_: boolean;

        /**
         * Indicates whether or not the current paragraph the cursor is in should be
         * set to Right-To-Left directionality.
         *
         * @type {boolean}
         * @private
         */
        private switchToRtl_: boolean;

        /**
         * Indicates whether or not the current paragraph the cursor is in should be
         * set to Left-To-Right directionality.
         *
         * @type {boolean}
         * @private
         */
        private switchToLtr_: boolean;

        /**
         * @return {Element} The lowest Block element ancestor of the node where the
         *     next character will be placed.
         * @private
         */
        private getBlockAncestor_(): Element;

        /**
         * @return {boolean} Whether the paragraph where the next character will be
         *     entered contains only non-Strong characters.
         * @private
         */
        private isNeutralBlock_(): boolean;

        /**
         * Checks if an element is a list element ('UL' or 'OL').
         *
         * @param {Element} element The element to test.
         * @return {boolean} Whether the element is a list element ('UL' or 'OL').
         * @private
         */
        private isList_(element: Element): boolean;

        /**
         * Returns the text within the local paragraph around the cursor.
         * Notice that for GECKO a BR represents a pargraph change despite not being a
         * block element.
         *
         * @param {Element} root The first block element ancestor of the node the cursor
         *     is in.
         * @param {Node} cursorLocation Node where the cursor currently is, marking the
         *     paragraph whose text we will return.
         * @param {function(Node): boolean} isParagraphBoundary The function to
         *     determine if a node represents the start or end of the paragraph.
         * @return {string} the text in the paragraph around the cursor location.
         * @private
         */
        private getTextAround_(root: Element, cursorLocation: Node, isParagraphBoundary: (_0: Node) => boolean): string;
    }
}

declare namespace goog.editor.plugins.FirstStrong {
    /**
     * The name of the attribute which records the input text.
     *
     * @type {string}
     * @const
     */
    const INPUT_ATTRIBUTE: string;
}
