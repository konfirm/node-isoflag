/* global source, describe, it,expect */

const Flag = source('Flag');

describe('Valid regions', () => {
	const tests = require('../data/valid.json');

	it('Flag.hasFlag indicates true', (next) => {
		tests.forEach((item) => {
			const { iso } = item;

			expect(Flag.hasFlag(iso)).to.be.true();
		});

		next();
	});

	it('Flag.factory caches', (next) => {
		tests.forEach((item) => {
			const { iso } = item;
			const flag = Flag.factory(iso);

			expect(flag).to.shallow.equal(Flag.factory(iso.toLowerCase()));
			expect(flag).to.shallow.equal(Flag.factory(iso.toUpperCase()));
		});

		next();
	});

	it('provides HTML entities', (next) => {
		tests.forEach((item) => {
			const { iso, entity } = item;
			const flag = Flag.factory(iso);

			expect(flag.toHTMLEntities()).to.equal(entity);
		});

		next();
	});

	it('provides the unicode flag symbol', (next) => {
		tests.forEach((item) => {
			const { iso, symbol } = item;
			const flag = Flag.factory(iso);

			expect(flag.toUnicodeSymbol()).to.equal(symbol);
		});

		next();
	});

	it('can be used as string', (next) => {
		tests.forEach((item) => {
			const { iso, symbol } = item;
			const flag = Flag.factory(iso);

			expect(String(flag)).to.equal(symbol);
		});

		next();
	});
});
