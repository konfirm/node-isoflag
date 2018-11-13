const InvalidRegionCodeError = require('./InvalidRegionCodeError.js');

const storage = new WeakMap();
const cache = new Map();

/**
 *
 *
 * @class Flag
 */
class Flag {
	/**
	 * Creates an instance of Flag
	 *
	 * @param     {string}  iso
	 * @memberof  Flag
	 */
	constructor(iso) {
		if (!this.constructor.hasFlag(iso)) {
			throw new InvalidRegionCodeError('Invalid ISO3166 Alpha 2 region');
		}

		storage.set(this, { iso: iso.toUpperCase() });
	}

	/**
	 * Create the unicode representation of the region flag
	 *
	 * @returns   string
	 * @memberof  Flag
	 */
	toUnicodeSymbol() {
		return this.getUnicode()
			.map((codepoint) => String.fromCodePoint(codepoint))
			.join('');
	}

	/**
	 * Create the HTML entity representation of the region flag
	 *
	 * @returns   string
	 * @memberof  Flag
	 */
	toHTMLEntities() {
		return this.getUnicode()
			.map((codepoint) => `&#x${codepoint.toString(16)};`)
			.join('');
	}

	/**
	 * Obtain the mapped unicode codepoints representing the unicode flag
	 *
	 * @returns
	 * @memberof  Flag
	 */
	getUnicode() {
		const { iso } = storage.get(this);
		const range = [...Array(26)].map((_, index) =>
			String.fromCharCode(65 + index)
		);
		const offset = 0x1f1e6;

		return iso.split('').map((char) => offset + range.indexOf(char));
	}

	/**
	 * Determine whether the region code can be represented as a flag (emoji)
	 *
	 * @static
	 * @param     string  iso
	 * @returns   bool
	 * @memberof  Flag
	 */
	static hasFlag(iso) {
		const pattern = /^(A[^ABHJKNPVY]|B[^CKPUX]|C[^BEJQST]|D[EGJKMOZ]|E[ACEGHR-U]|F[IJKMOR]|G[^CJKOVXZ]|H[KMNRTU]|I[CDEL-OQ-T]|J[EMOP]|K[EGHIMNPRWYZ]|L[ABCIKR-VY]|M[^BIJ]|N[ACEFGILOPRUZ]|OM|P[AE-HK-NRSTWY]|QA|R[EOSUW]|S[^FPQUW]|T[^BEIPQSUXY]|U[AGMNSYZ]|V[ACEGINU]|W[FS]|XK|Y[ET]|Z[AMW])$/i;

		return pattern.test(iso);
	}

	/**
	 * Return an instance of Flag for the provided ISO3166 alpha2 code
	 *
	 * @static
	 * @param     string  iso
	 * @returns   Flag
	 * @memberof  Flag
	 */
	static factory(iso) {
		const upper = iso.toUpperCase();

		if (!cache.has(upper)) {
			cache.set(upper, new this(iso));
		}

		return cache.get(upper);
	}

	/**
	 * Return the string representation of the flag
	 *
	 * @returns   string
	 * @memberof  Flag
	 */
	toString() {
		return this.toUnicodeSymbol();
	}
}

module.exports = Flag;
