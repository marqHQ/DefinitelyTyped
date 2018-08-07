/// <reference path="../../../globals.d.ts"/>
/// <reference path="../math/integer.d.ts"/>

declare module 'goog:goog.net.Ipv6Address' {
    import alias = goog.net.Ipv6Address;
    export default alias;
}

declare module 'goog:goog.net.Ipv4Address' {
    import alias = goog.net.Ipv4Address;
    export default alias;
}

declare module 'goog:goog.net.IpAddress' {
    import alias = goog.net.IpAddress;
    export default alias;
}

declare namespace goog.net {
    /**
     * Abstract class defining an IP Address.
     *
     * Please use goog.net.IpAddress static methods or
     * goog.net.Ipv4Address/Ipv6Address classes.
     *
     */
    class IpAddress extends __IpAddress {}
    abstract class __IpAddress {
        /**
         * @param {!goog.math.Integer} address The Ip Address.
         * @param {number} version The version number (4, 6).
         */
        constructor(address: goog.math.Integer, version: number);

        /**
         * The IP Address.
         * @type {!goog.math.Integer}
         * @private
         */
        private ip_: goog.math.Integer;

        /**
         * The IP Address version.
         * @type {number}
         * @private
         */
        private version_: number;

        /**
         * @return {number} The IP Address version.
         */
        getVersion(): number;

        /**
         * @param {!goog.net.IpAddress} other The other IP Address.
         * @return {boolean} true if the IP Addresses are equal.
         */
        equals(other: goog.net.IpAddress): boolean;

        /**
         * @return {!goog.math.Integer} The IP Address, as an Integer.
         */
        toInteger(): goog.math.Integer;

        /**
         * @return {string} The IP Address, as an URI string following RFC 3986.
         */
        toUriString(): string;

        /**
         * @return {boolean} Whether or not the address is site-local.
         */
        isSiteLocal(): boolean;

        /**
         * @return {boolean} Whether or not the address is link-local.
         */
        isLinkLocal(): boolean;
    }

    /**
     * Takes a string or a number and returns a IPv4 Address.
     *
     * This constructor accepts strings and instance of goog.math.Integer.
     * If you pass a goog.math.Integer, make sure that its sign is set to positive.
     * @extends {goog.net.IpAddress}
     * @final
     */
    class Ipv4Address extends __Ipv4Address {}
    abstract class __Ipv4Address extends goog.net.__IpAddress {
        /**
         * @param {(string|!goog.math.Integer)} address The address to store.
         */
        constructor(address: string|goog.math.Integer);

        /**
         * The cached string representation of the IP Address.
         * @type {?string}
         * @private
         */
        private ipStr_: string|null;
    }

    /**
     * Takes a string or a number and returns an IPv6 Address.
     *
     * This constructor accepts strings and instance of goog.math.Integer.
     * If you pass a goog.math.Integer, make sure that its sign is set to positive.
     * @extends {goog.net.IpAddress}
     * @final
     */
    class Ipv6Address extends __Ipv6Address {}
    abstract class __Ipv6Address extends goog.net.__IpAddress {
        /**
         * @param {(string|!goog.math.Integer)} address The address to store.
         */
        constructor(address: string|goog.math.Integer);

        /**
         * The cached string representation of the IP Address.
         * @type {?string}
         * @private
         */
        private ipStr_: string|null;

        /**
         * @return {boolean} true if the IPv6 contains a mapped IPv4.
         */
        isMappedIpv4Address(): boolean;

        /**
         * Will return the mapped IPv4 address in this IPv6 address.
         * @return {goog.net.Ipv4Address} an IPv4 or null.
         */
        getMappedIpv4Address(): goog.net.Ipv4Address;
    }
}

declare namespace goog.net.IpAddress {
    /**
     * Parses an IP Address in a string.
     * If the string is malformed, the function will simply return null
     * instead of raising an exception.
     *
     * @param {string} address The IP Address.
     * @see {goog.net.Ipv4Address}
     * @see {goog.net.Ipv6Address}
     * @return {goog.net.IpAddress} The IP Address or null.
     */
    function fromString(address: string): goog.net.IpAddress;

    /**
     * Tries to parse a string represented as a host portion of an URI.
     * See RFC 3986 for more details on IPv6 addresses inside URI.
     * If the string is malformed, the function will simply return null
     * instead of raising an exception.
     *
     * @param {string} address A RFC 3986 encoded IP address.
     * @see {goog.net.Ipv4Address}
     * @see {goog.net.Ipv6Address}
     * @return {goog.net.IpAddress} The IP Address.
     */
    function fromUriString(address: string): goog.net.IpAddress;
}

declare namespace goog.net.Ipv4Address {
    /**
     * The Maximum length for a netmask (aka, the number of bits for IPv4).
     * @type {number}
     * @const
     */
    const MAX_NETMASK_LENGTH: number;
}

declare namespace goog.net.Ipv6Address {
    /**
     * The Maximum length for a netmask (aka, the number of bits for IPv6).
     * @type {number}
     * @const
     */
    const MAX_NETMASK_LENGTH: number;
}
