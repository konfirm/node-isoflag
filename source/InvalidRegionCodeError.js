/**
 * Error raised on Region codes not available as unicode (emoji) flag
 *
 * @class InvalidRegionCodeError
 * @extends {Error}
 */
class InvalidRegionCodeError extends Error {}

module.exports = InvalidRegionCodeError;
