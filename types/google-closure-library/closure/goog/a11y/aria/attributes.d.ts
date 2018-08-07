/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.a11y.aria.State' {
    import alias = goog.a11y.aria.State;
    export default alias;
}

declare module 'goog:goog.a11y.aria.SortValues' {
    import alias = goog.a11y.aria.SortValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.SelectedValues' {
    import alias = goog.a11y.aria.SelectedValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.RelevantValues' {
    import alias = goog.a11y.aria.RelevantValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.PressedValues' {
    import alias = goog.a11y.aria.PressedValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.OrientationValues' {
    import alias = goog.a11y.aria.OrientationValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.LivePriority' {
    import alias = goog.a11y.aria.LivePriority;
    export default alias;
}

declare module 'goog:goog.a11y.aria.InvalidValues' {
    import alias = goog.a11y.aria.InvalidValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.GrabbedValues' {
    import alias = goog.a11y.aria.GrabbedValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.ExpandedValues' {
    import alias = goog.a11y.aria.ExpandedValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.DropEffectValues' {
    import alias = goog.a11y.aria.DropEffectValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.CheckedValues' {
    import alias = goog.a11y.aria.CheckedValues;
    export default alias;
}

declare module 'goog:goog.a11y.aria.AutoCompleteValues' {
    import alias = goog.a11y.aria.AutoCompleteValues;
    export default alias;
}

declare namespace goog.a11y.aria {
    /**
     * ARIA states and properties.
     * @enum {string}
     */
    enum State {
        ACTIVEDESCENDANT,
        ATOMIC,
        AUTOCOMPLETE,
        BUSY,
        CHECKED,
        COLINDEX,
        CONTROLS,
        DESCRIBEDBY,
        DISABLED,
        DROPEFFECT,
        EXPANDED,
        FLOWTO,
        GRABBED,
        HASPOPUP,
        HIDDEN,
        INVALID,
        LABEL,
        LABELLEDBY,
        LEVEL,
        LIVE,
        MULTILINE,
        MULTISELECTABLE,
        ORIENTATION,
        OWNS,
        POSINSET,
        PRESSED,
        READONLY,
        RELEVANT,
        REQUIRED,
        ROWINDEX,
        SELECTED,
        SETSIZE,
        SORT,
        VALUEMAX,
        VALUEMIN,
        VALUENOW,
        VALUETEXT
    }

    /**
     * ARIA state values for AutoCompleteValues.
     * @enum {string}
     */
    enum AutoCompleteValues { INLINE, LIST, BOTH, NONE }

    /**
     * ARIA state values for DropEffectValues.
     * @enum {string}
     */
    enum DropEffectValues { COPY, MOVE, LINK, EXECUTE, POPUP, NONE }

    /**
     * ARIA state values for LivePriority.
     * @enum {string}
     */
    enum LivePriority { OFF, POLITE, ASSERTIVE }

    /**
     * ARIA state values for OrientationValues.
     * @enum {string}
     */
    enum OrientationValues { VERTICAL, HORIZONTAL }

    /**
     * ARIA state values for RelevantValues.
     * @enum {string}
     */
    enum RelevantValues { ADDITIONS, REMOVALS, TEXT, ALL }

    /**
     * ARIA state values for SortValues.
     * @enum {string}
     */
    enum SortValues { ASCENDING, DESCENDING, NONE, OTHER }

    /**
     * ARIA state values for CheckedValues.
     * @enum {string}
     */
    enum CheckedValues { TRUE, FALSE, MIXED, UNDEFINED }

    /**
     * ARIA state values for ExpandedValues.
     * @enum {string}
     */
    enum ExpandedValues { TRUE, FALSE, UNDEFINED }

    /**
     * ARIA state values for GrabbedValues.
     * @enum {string}
     */
    enum GrabbedValues { TRUE, FALSE, UNDEFINED }

    /**
     * ARIA state values for InvalidValues.
     * @enum {string}
     */
    enum InvalidValues { FALSE, TRUE, GRAMMAR, SPELLING }

    /**
     * ARIA state values for PressedValues.
     * @enum {string}
     */
    enum PressedValues { TRUE, FALSE, MIXED, UNDEFINED }

    /**
     * ARIA state values for SelectedValues.
     * @enum {string}
     */
    enum SelectedValues { TRUE, FALSE, UNDEFINED }
}
