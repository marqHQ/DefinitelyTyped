/// <reference path="../../../globals.d.ts"/>
/// <reference path="./emailaddress.d.ts"/>

declare module 'goog:goog.format.InternationalizedEmailAddress' {
    import alias = goog.format.InternationalizedEmailAddress;
    export default alias;
}

declare namespace goog.format {
    /**
     * Formats an email address string for display, and allows for extraction of
     * the individual components of the address.
     * @extends {goog.format.EmailAddress}
     */
    class InternationalizedEmailAddress extends __InternationalizedEmailAddress {}
    abstract class __InternationalizedEmailAddress extends goog.format.__EmailAddress {
        /**
         * @param {string=} opt_address The email address.
         * @param {string=} opt_name The name associated with the email address.
         */
        constructor(opt_address?: string, opt_name?: string);
    }
}

declare namespace goog.format.InternationalizedEmailAddress {
    /**
     * Checks if the provided string is a valid local part (part before the '@') of
     * an EAI email address.
     * @param {string} str The local part to check.
     * @return {boolean} Whether the provided string is a valid local part.
     */
    function isValidLocalPartSpec(str: string): boolean;

    /**
     * Checks if the provided string is a valid domain part (part after the '@') of
     * an EAI email address.
     * @param {string} str The domain part to check.
     * @return {boolean} Whether the provided string is a valid domain part.
     */
    function isValidDomainPartSpec(str: string): boolean;

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
     * Parses a string containing email addresses of the form
     * "name" &lt;address&gt; into an array of email addresses.
     * @param {string} str The address list.
     * @return {!Array<!goog.format.EmailAddress>} The parsed emails.
     */
    function parseList(str: string): goog.format.EmailAddress[];

    /**
     * Parses an email address of the form "name" &lt;address&gt; into
     * an email address.
     * @param {string} addr The address string.
     * @return {!goog.format.EmailAddress} The parsed address.
     */
    function parse(addr: string): goog.format.EmailAddress;

    /**
     * @param {string} ch The character to test.
     * @return {boolean} Whether the provided character is an address separator.
     */
    function isAddressSeparator(ch: string): boolean;
}
