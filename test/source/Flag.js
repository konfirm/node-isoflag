/* global source, describe, it,expect */

const Flag = source('Flag');
const InvalidRegionCodeError = source('InvalidRegionCodeError');

describe('Flag', () => {
	it('Flag.factory re-uses instances', (next) => {
		const one = Flag.factory('NL');
		const two = Flag.factory('nl');

		expect(one).to.shallow.equal(two);

		next();
	});

	it('represents the flag when stringified', (next) => {
		expect(String(Flag.factory('NL'))).to.equal('🇳🇱');
		expect(String(Flag.factory('nl'))).to.equal('🇳🇱');

		expect(String(new Flag('NL'))).to.equal('🇳🇱');
		expect(String(new Flag('nl'))).to.equal('🇳🇱');

		expect(Flag.factory('NL').toUnicodeSymbol()).to.equal('🇳🇱');
		expect(Flag.factory('nl').toUnicodeSymbol()).to.equal('🇳🇱');

		expect(new Flag('NL').toUnicodeSymbol()).to.equal('🇳🇱');
		expect(new Flag('nl').toUnicodeSymbol()).to.equal('🇳🇱');

		next();
	});

	it('throws on invalid region codes', (next) => {
		expect(() => new Flag('AB')).to.throw(InvalidRegionCodeError);

		next();
	});
});
