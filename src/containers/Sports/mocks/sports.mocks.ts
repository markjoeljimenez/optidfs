import { ISport } from '../interfaces/ISports';

export const draftKingsSportsMock: ISport[] = [
	{
		fullName: 'Golf',
		hasPublicContests: true,
		isEnabled: true,
		regionAbbreviatedSportName: 'GOLF',
		regionFullSportName: 'Golf',
		sortOrder: 1,
		sportId: 13,
		supported: true,
	},
	{
		fullName: 'Baseball',
		hasPublicContests: true,
		isEnabled: true,
		regionAbbreviatedSportName: 'MLB',
		regionFullSportName: 'Baseball',
		sortOrder: 2,
		sportId: 2,
		supported: true,
	},
];

export const yahooSportsMock: ISport[] = [
	{
		fullName: 'golf',
		hasPublicContests: true,
		isEnabled: true,
		sportId: 'golf',
		supported: true,
	},
	{
		fullName: 'mlb',
		hasPublicContests: true,
		isEnabled: true,
		sportId: 'mlb',
		supported: true,
	},
];
