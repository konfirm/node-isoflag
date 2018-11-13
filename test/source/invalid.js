/* global source, describe, it,expect */

const Flag = source('Flag');
const InvalidRegionCodeError = source('InvalidRegionCodeError');

describe('Invalid regions', () => {
	it('rejects invalid 2 letter codes', (next) => {
		const tests = require('../data/invalid.json');

		tests.forEach((code) => {
			expect(() => new Flag(code)).to.throw(InvalidRegionCodeError);
		});

		next();
	});

	it('rejects 3 letter codes', (next) => {
		const letters = [...Array(26)].map((_, index) =>
			String.fromCharCode(65 + index)
		);

		letters.forEach((a) => {
			letters.forEach((b) => {
				letters.forEach((c) => {
					const code = `${a}${b}${c}`;

					expect(() => new Flag(code)).to.throw(
						InvalidRegionCodeError
					);
				});
			});
		});

		next();
	});

	it('rejects 3 number codes (un.m49)', (next) => {
		const codes = [...Array(999)].map((_, index) =>
			`000${index + 1}`.slice(-3)
		);

		codes.forEach((code) => {
			expect(() => new Flag(code)).to.throw(InvalidRegionCodeError);
		});

		next();
	});
});
