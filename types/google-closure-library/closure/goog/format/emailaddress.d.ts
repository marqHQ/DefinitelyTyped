/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.format.EmailAddress' {
    import alias = goog.format.EmailAddress;
    export default alias;
}

declare namespace goog.format {
    /**
     * Formats an email address string for display, and allows for extraction of
     * the individual components of the address.
     */
    class EmailAddress extends __EmailAddress {}
    abstract class __EmailAddress {
        /**
         * @param {string=} opt_address The email address.
         * @param {string=} opt_name The name associated with the email address.
         */
        constructor(opt_address?: string, opt_name?: string);

        /**
         * The name or personal string associated with the address.
         * @type {string}
         * @private
         */
        private name_: string;

        /**
         * The email address.
         * @type {string}
         * @protected
         */
        protected address: string;

        /**
         * Get the name associated with the email address.
         * @return {string} The name or personal portion of the address.
         * @final
         */
        getName(): string;

        /**
         * Get the email address.
         * @return {string} The email address.
         * @final
         */
        getAddress(): string;

        /**
         * Set the name associated with the email address.
         * @param {string} name The name to associate.
         * @final
         */
        setName(name: string): void;

        /**
         * Set the email address.
         * @param {string} address The email address.
         * @final
         */
        setAddress(address: string): void;

        /**
         * Return the address in a standard format:
         *  - remove extra spaces.
         *  - Surround name with quotes if it contains special characters.
         * @param {string} specialChars String that contains the characters that require
         *  the display name to be quoted.
         * @return {string} The cleaned address.
         * @protected
         */
        protected toStringInternal(specialChars: string): string;

        /**
         * Determines if the current object is a valid email address.
         * @return {boolean} Whether the email address is valid.
         */
        isValid(): boolean;
    }
}

declare namespace goog.format.EmailAddress {
    /**
     * Match string for characters that require display names to be quoted and are
     * not address separators.
     * @type {string}
     * @const
     * @package
     */
    const SPECIAL_CHARS: string;

    /**
     * Checks if the provided string is a valid email address. Supports both
     * simple email addresses (address specs) and addresses that contain display
     * names.
     * @param {string} str The email address to check.
     * @return {boolean} Whether the provided string is a valid address.
     */
    function isValidAddress(str: string): boolean;

    /**
     * Checks if the provided string is a valid address spec (local@domain.com).
     * @param {string} str The email address to check.
     * @return {boolean} Whether the provided string is a valid address spec.
     */
    function isValidAddrSpec(str: string): boolean;

    /**
     * Checks if the provided string is a valid local part (part before the '@') of
     * an email address.
     * @param {string} str The local part to check.
     * @return {boolean} Whether the provided string is a valid local part.
     */
    function isValidLocalPartSpec(str: string): boolean;

    /**
     * Checks if the provided string is a valid domain part (part after the '@') of
     * an email address.
     * @param {string} str The domain part to check.
     * @return {boolean} Whether the provided string is a valid domain part.
     */
    function isValidDomainPartSpec(str: string): boolean;

    /**
     * Parses an email address of the form "name" &lt;address&gt; into
     * an email address.
     * @param {string} addr The address string.
     * @return {!goog.format.EmailAddress} The parsed address.
     */
    function parse(addr: string): goog.format.EmailAddress;

    /**
     * Parses a string containing email addresses of the form
     * "name" &lt;address&gt; into an array of email addresses.
     * @param {string} str The address list.
     * @return {!Array<!goog.format.EmailAddress>} The parsed emails.
     */
    function parseList(str: string): goog.format.EmailAddress[];

    /**
     * @param {string} ch The character to test.
     * @return {boolean} Whether the provided character is an address separator.
     */
    function isAddressSeparator(ch: string): boolean;
}
