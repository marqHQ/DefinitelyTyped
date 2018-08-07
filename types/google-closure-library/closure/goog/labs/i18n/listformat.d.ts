/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.labs.i18n.ListFormat' {
    import alias = goog.labs.i18n.ListFormat;
    export default alias;
}

declare module 'goog:goog.labs.i18n.GenderInfo' {
    import alias = goog.labs.i18n.GenderInfo;
    export default alias;
}

declare module 'goog:goog.labs.i18n.GenderInfo.Gender' {
    import alias = goog.labs.i18n.GenderInfo.Gender;
    export default alias;
}

declare namespace goog.labs.i18n {
    /**
     * ListFormat provides a method to format a list/array of objects to a string,
     * in a user friendly way and in a locale sensitive manner.
     * If the objects are not strings, toString is called to convert them.
     * The constructor initializes the object based on the locale data from
     * the current goog.labs.i18n.ListFormatSymbols.
     *
     * Similar to the ICU4J class com.ibm.icu.text.ListFormatter:
     *   http://icu-project.org/apiref/icu4j/com/ibm/icu/text/ListFormatter.html
     * @final
     */
    class ListFormat extends __ListFormat {}
    abstract class __ListFormat {
        /**
         */
        constructor();

        /**
         * String for lists of exactly two items, containing {0} for the first,
         * and {1} for the second.
         * For instance '{0} and {1}' will give 'black and white'.
         * @private {string}
         *
         * Example: for "black and white" the pattern is "{0} and {1}"
         * While for a longer list we have "cyan, magenta, yellow, and black"
         * Think "{0} start {1} middle {2} middle {3} end {4}"
         * The last pattern is "{0}, and {1}." Note the comma before "and".
         * So the "Two" pattern can be different than Start/Middle/End ones.
         */
        private listTwoPattern_: any /*missing*/;

        /**
         * String for the start of a list items, containing {0} for the first,
         * and {1} for the rest.
         * @private {string}
         */
        private listStartPattern_: any /*missing*/;

        /**
         * String for the start of a list items, containing {0} for the first part
         * of the list, and {1} for the rest of the list.
         * @private {string}
         */
        private listMiddlePattern_: any /*missing*/;

        /**
         * String for the end of a list items, containing {0} for the first part
         * of the list, and {1} for the last item.
         *
         * This is how start/middle/end come together:
         *   start = '{0}, {1}'  middle = '{0}, {1}',  end = '{0}, and {1}'
         * will result in the typical English list: 'one, two, three, and four'
         * There are languages where the patterns are more complex than
         * '{1} someText {1}' and the start pattern is different than the middle one.
         *
         * @private {string}
         */
        private listEndPattern_: any /*missing*/;

        /**
         * Replaces the {0} and {1} placeholders in a pattern with the first and
         * the second parameter respectively, and returns the result.
         * It is a helper function for goog.labs.i18n.ListFormat.format.
         *
         * @param {string} pattern used for formatting.
         * @param {string} first object to add to list.
         * @param {string} second object to add to list.
         * @return {string} The formatted list string.
         * @private
         */
        private patternBasedJoinTwoStrings_(pattern: string, first: string, second: string): string;

        /**
         * Formats an array of strings into a string.
         * It is a user facing, locale-aware list (i.e. 'red, green, and blue').
         *
         * @param {!Array<string|number>} items Items to format.
         * @return {string} The items formatted into a string, as a list.
         */
        format(items: string|number[]): string;
    }

    /**
     * GenderInfo provides a method to determine the gender of a list/array
     * of objects when one knows the gender of each item of the list.
     * It does this in a locale sensitive manner.
     * The constructor initializes the object based on the locale data from
     * the current goog.labs.i18n.ListFormatSymbols.
     *
     * Similar to the ICU4J class com.icu.util.GenderInfo:
     *   http://icu-project.org/apiref/icu4j/com/ibm/icu/util/GenderInfo.html
     * @final
     */
    class GenderInfo extends __GenderInfo {}
    abstract class __GenderInfo {
        /**
         */
        constructor();

        /**
         * Stores the language-aware mode of determining the gender of a list.
         * @private {goog.labs.i18n.GenderInfo.ListGenderStyle_}
         */
        private listGenderStyle_: any /*missing*/;

        /**
         * Determines the overal gender of a list based on the gender of all the list
         * items, in a locale-aware way.
         * @param {!Array<!goog.labs.i18n.GenderInfo.Gender>} genders An array of
         *        genders, will give the gender of the list.
         * @return {goog.labs.i18n.GenderInfo.Gender} Get the gender of the list.
         */
        getListGender(genders: goog.labs.i18n.GenderInfo.Gender[]): goog.labs.i18n.GenderInfo.Gender;
    }
}

declare namespace goog.labs.i18n.GenderInfo {
    /**
     * Enumeration for the possible gender values.
     * Gender: OTHER means either the information is unavailable,
     * or the person has declined to state MALE or FEMALE.
     * @enum {number}
     */
    enum Gender { MALE, FEMALE, OTHER }
}
