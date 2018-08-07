/// <reference path="../../../globals.d.ts"/>
/// <reference path="../log/log.d.ts"/>

declare module 'goog:goog.tweak.StringSetting' {
    import alias = goog.tweak.StringSetting;
    export default alias;
}

declare module 'goog:goog.tweak.NumericSetting' {
    import alias = goog.tweak.NumericSetting;
    export default alias;
}

declare module 'goog:goog.tweak.ButtonAction' {
    import alias = goog.tweak.ButtonAction;
    export default alias;
}

declare module 'goog:goog.tweak.BooleanSetting' {
    import alias = goog.tweak.BooleanSetting;
    export default alias;
}

declare module 'goog:goog.tweak.BooleanInGroupSetting' {
    import alias = goog.tweak.BooleanInGroupSetting;
    export default alias;
}

declare module 'goog:goog.tweak.BooleanGroup' {
    import alias = goog.tweak.BooleanGroup;
    export default alias;
}

declare module 'goog:goog.tweak.BaseSetting' {
    import alias = goog.tweak.BaseSetting;
    export default alias;
}

declare module 'goog:goog.tweak.BasePrimitiveSetting' {
    import alias = goog.tweak.BasePrimitiveSetting;
    export default alias;
}

declare module 'goog:goog.tweak.BaseEntry' {
    import alias = goog.tweak.BaseEntry;
    export default alias;
}

declare namespace goog.tweak {
    /**
     * Base class for all Registry entries.
     */
    class BaseEntry extends __BaseEntry {}
    abstract class __BaseEntry {
        /**
         * @param {string} id The ID for the entry. Must contain only letters,
         *     numbers, underscores and periods.
         * @param {string} description A description of what the entry does.
         */
        constructor(id: string, description: string);

        /**
         * An ID to uniquely identify the entry.
         * @type {string}
         * @private
         */
        private id_: string;

        /**
         * A descriptive label for the entry.
         * @type {string}
         */
        label: string;

        /**
         * A description of what this entry does.
         * @type {string}
         */
        description: string;

        /**
         * Functions to be called whenever a setting is changed or a button is
         * clicked.
         * @type {!Array<!Function>}
         * @private
         */
        private callbacks_: Function[];

        /**
         * The logger for this class.
         * @type {goog.log.Logger}
         * @protected
         */
        protected logger: goog.log.Logger;

        /**
         * Whether a restart is required for changes to the setting to take effect.
         * @type {boolean}
         * @private
         */
        private restartRequired_: boolean;

        /**
         * @return {string} Returns the entry's ID.
         */
        getId(): string;

        /**
         * Returns whether a restart is required for changes to the setting to take
         * effect.
         * @return {boolean} The value.
         */
        isRestartRequired(): boolean;

        /**
         * Sets whether a restart is required for changes to the setting to take
         * effect.
         * @param {boolean} value The new value.
         */
        setRestartRequired(value: boolean): void;

        /**
         * Adds a callback that should be called when the setting has changed (or when
         * an action has been clicked).
         * @param {!Function} callback The callback to add.
         */
        addCallback(callback: Function): void;

        /**
         * Removes a callback that was added by addCallback.
         * @param {!Function} callback The callback to add.
         */
        removeCallback(callback: Function): void;

        /**
         * Calls all registered callbacks.
         */
        fireCallbacks(): void;
    }

    /**
     * Base class for all tweak entries that are settings. Settings are entries
     * that are associated with a query parameter.
     * @extends {goog.tweak.BaseEntry}
     */
    class BaseSetting extends __BaseSetting {}
    abstract class __BaseSetting extends goog.tweak.__BaseEntry {
        /**
         * @param {string} id The ID for the setting.
         * @param {string} description A description of what the setting does.
         */
        constructor(id: string, description: string);

        /**
         * The value of this setting's query parameter.
         * @type {string|undefined}
         * @protected
         */
        protected initialQueryParamValue: string|undefined;

        /**
         * The query parameter that controls this setting.
         * @type {?string}
         * @private
         */
        private paramName_: string|null;

        /**
         * Whether initialize() has been called (or is in the middle of being called).
         * @type {goog.tweak.BaseSetting.InitializeState_}
         * @private
         */
        private initializeState_: any;

        /**
         * Sets the value of the entry based on the value of the query parameter. Once
         * this is called, configuration settings (associated query parameter, token,
         * etc) may not be changed.
         * @param {?string} value The part of the query param for this setting after
         *     the '='. Null if it is not present.
         * @protected
         */
        protected initialize(value: string|null): void;

        /**
         * Returns the value to be used in the query parameter for this tweak.
         * @return {?string} The encoded value. Null if the value is set to its
         *     default.
         */
        getNewValueEncoded(): string|null;

        /**
         * Asserts that this tweak has not been initialized yet.
         * @param {string} funcName Function name to use in the assertion message.
         * @protected
         */
        protected assertNotInitialized(funcName: string): void;

        /**
         * Returns whether the setting is currently being initialized.
         * @return {boolean} Whether the setting is currently being initialized.
         * @protected
         */
        protected isInitializing(): boolean;

        /**
         * Sets the initial query parameter value for this setting. May not be called
         * after the setting has been initialized.
         * @param {string} value The initial query parameter value for this setting.
         */
        setInitialQueryParamValue(value: string): void;

        /**
         * Returns the name of the query parameter used for this setting.
         * @return {?string} The param name. Null if no query parameter is directly
         *     associated with the setting.
         */
        getParamName(): string|null;

        /**
         * Sets the name of the query parameter used for this setting. If null is
         * passed the the setting will not appear in the top-level query string.
         * @param {?string} value The new value.
         */
        setParamName(value: string|null): void;

        /**
         * Applies the default value or query param value if this is the first time
         * that the function has been called.
         * @protected
         */
        protected ensureInitialized(): void;
    }

    /**
     * Base class for all settings that wrap primitive values.
     * @extends {goog.tweak.BaseSetting}
     */
    class BasePrimitiveSetting extends __BasePrimitiveSetting {}
    abstract class __BasePrimitiveSetting extends goog.tweak.__BaseSetting {
        /**
         * @param {string} id The ID for the setting.
         * @param {string} description A description of what the setting does.
         * @param {*} defaultValue The default value for this setting.
         */
        constructor(id: string, description: string, defaultValue: any);

        /**
         * The default value of the setting.
         * @type {?}
         * @private
         */
        private defaultValue_: any;

        /**
         * The value of the tweak.
         * @type {?}
         * @private
         */
        private value_: any;

        /**
         * The value of the tweak once "Apply Tweaks" is pressed.
         * @type {?}
         * @private
         */
        private newValue_: any;

        /**
         * Returns the query param encoded representation of the setting's value.
         * @return {string} The encoded value.
         * @protected
         */
        protected encodeNewValue(): string;

        /**
         * If the setting has the restartRequired option, then returns its initial
         * value. Otherwise, returns its current value.
         * @return {?} The value.
         */
        getValue(): any;

        /**
         * Returns the value of the setting to use once "Apply Tweaks" is clicked.
         * @return {?} The value.
         */
        getNewValue(): any;

        /**
         * Sets the value of the setting. If the setting has the restartRequired
         * option, then the value will not be changed until the "Apply Tweaks" button
         * is clicked. If it does not have the option, the value will be update
         * immediately and all registered callbacks will be called.
         * @param {?} value The value.
         */
        setValue(value: any): void;

        /**
         * Returns the default value for this setting.
         * @return {?} The default value.
         */
        getDefaultValue(): any;

        /**
         * Sets the default value for the tweak.
         * @param {?} value The new value.
         */
        setDefaultValue(value: any): void;
    }

    /**
     * A registry setting for string values.
     * @extends {goog.tweak.BasePrimitiveSetting}
     * @final
     */
    class StringSetting extends __StringSetting {}
    abstract class __StringSetting extends goog.tweak.__BasePrimitiveSetting {
        /**
         * @param {string} id The ID for the setting.
         * @param {string} description A description of what the setting does.
         */
        constructor(id: string, description: string);

        /**
         * Valid values for the setting.
         * @type {Array<string>|undefined}
         */
        validValues_: string[]|undefined;

        /**
         * Sets the valid values for the setting.
         * @param {Array<string>|undefined} values Valid values.
         */
        setValidValues(values: string[]|undefined): void;

        /**
         * Returns the valid values for the setting.
         * @return {Array<string>|undefined} Valid values.
         */
        getValidValues(): string[]|undefined;
    }

    /**
     * A registry setting for numeric values.
     * @extends {goog.tweak.BasePrimitiveSetting}
     * @final
     */
    class NumericSetting extends __NumericSetting {}
    abstract class __NumericSetting extends goog.tweak.__BasePrimitiveSetting {
        /**
         * @param {string} id The ID for the setting.
         * @param {string} description A description of what the setting does.
         */
        constructor(id: string, description: string);

        /**
         * Valid values for the setting.
         * @type {Array<number>|undefined}
         */
        validValues_: number[]|undefined;

        /**
         * Sets the valid values for the setting.
         * @param {Array<number>|undefined} values Valid values.
         */
        setValidValues(values: number[]|undefined): void;

        /**
         * Returns the valid values for the setting.
         * @return {Array<number>|undefined} Valid values.
         */
        getValidValues(): number[]|undefined;
    }

    /**
     * A registry setting that can be either true of false.
     * @extends {goog.tweak.BasePrimitiveSetting}
     */
    class BooleanSetting extends __BooleanSetting {}
    abstract class __BooleanSetting extends goog.tweak.__BasePrimitiveSetting {
        /**
         * @param {string} id The ID for the setting.
         * @param {string} description A description of what the setting does.
         */
        constructor(id: string, description: string);
    }

    /**
     * An entry in a BooleanGroup.
     * @extends {goog.tweak.BooleanSetting}
     * @final
     */
    class BooleanInGroupSetting extends __BooleanInGroupSetting {}
    abstract class __BooleanInGroupSetting extends goog.tweak.__BooleanSetting {
        /**
         * @param {string} id The ID for the setting.
         * @param {string} description A description of what the setting does.
         * @param {!goog.tweak.BooleanGroup} group The group that this entry belongs
         *     to.
         */
        constructor(id: string, description: string, group: goog.tweak.BooleanGroup);

        /**
         * The token to use in the query parameter.
         * @type {string}
         * @private
         */
        private token_: string;

        /**
         * The BooleanGroup that this setting belongs to.
         * @type {!goog.tweak.BooleanGroup}
         * @private
         */
        private group_: goog.tweak.BooleanGroup;

        /**
         * Sets the token to use in the query parameter.
         * @param {string} value The value.
         */
        setToken(value: string): void;

        /**
         * Returns the token to use in the query parameter.
         * @return {string} The value.
         */
        getToken(): string;

        /**
         * Returns the BooleanGroup that this setting belongs to.
         * @return {!goog.tweak.BooleanGroup} The BooleanGroup that this setting
         *     belongs to.
         */
        getGroup(): goog.tweak.BooleanGroup;
    }

    /**
     * A registry setting that contains a group of boolean subfield, where all
     * entries modify the same query parameter. For example:
     *     ?foo=setting1,-setting2
     * @extends {goog.tweak.BaseSetting}
     * @final
     */
    class BooleanGroup extends __BooleanGroup {}
    abstract class __BooleanGroup extends goog.tweak.__BaseSetting {
        /**
         * @param {string} id The ID for the setting.
         * @param {string} description A description of what the setting does.
         */
        constructor(id: string, description: string);

        /**
         * A map of token->child entry.
         * @type {!Object<!goog.tweak.BooleanSetting>}
         * @private
         */
        private entriesByToken_: {[key: string]: goog.tweak.BooleanSetting};

        /**
         * A map of token->true/false for all tokens that appeared in the query
         * parameter.
         * @type {!Object<boolean>}
         * @private
         */
        private queryParamValues_: {[key: string]: boolean};

        /**
         * Returns the map of token->boolean settings.
         * @return {!Object<!goog.tweak.BooleanSetting>} The child settings.
         */
        getChildEntries(): {[key: string]: goog.tweak.BooleanSetting};

        /**
         * Adds the given BooleanSetting to the group.
         * @param {goog.tweak.BooleanInGroupSetting} boolEntry The entry.
         */
        addChild(boolEntry: goog.tweak.BooleanInGroupSetting): void;
    }

    /**
     * A registry action (a button).
     * @extends {goog.tweak.BaseEntry}
     * @final
     */
    class ButtonAction extends __ButtonAction {}
    abstract class __ButtonAction extends goog.tweak.__BaseEntry {
        /**
         * @param {string} id The ID for the setting.
         * @param {string} description A description of what the setting does.
         * @param {!Function} callback Function to call when the button is clicked.
         */
        constructor(id: string, description: string, callback: Function);
    }
}

declare namespace goog.tweak.BaseSetting {
}
