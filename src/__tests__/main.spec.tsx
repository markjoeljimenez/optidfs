import { addOne } from '../scripts/main';

describe('Testing main functions', () => {
	test('Add one to input', () => {
		const input = 0;
		const output = 1;

		expect(addOne(input)).toEqual(output);
	});
});
