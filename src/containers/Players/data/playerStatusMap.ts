import { TPlayerStatus, TPlayerStatusColor } from '../models/IPlayerStatus';

export const PlayerStatusMap = new Map<
	TPlayerStatus,
	{
		color: TPlayerStatusColor;
		translation: string;
	}
>([
	// Yahoo
	[
		'N/A',
		{
			color: 'green',
			translation: 'Active',
		},
	],
	[
		'COVID',
		{
			color: 'red',
			translation: 'COVID-19',
		},
	],
	[
		'GTD',
		{
			color: 'yellow',
			translation: 'GTD',
		},
	],
	[
		'IL10',
		{
			color: 'red',
			translation: 'Injured (10 Days)',
		},
	],
	[
		'IL60',
		{
			color: 'red',
			translation: 'Injured (60 Days)',
		},
	],
	[
		'IL7',
		{
			color: 'red',
			translation: 'Injured (7 Days)',
		},
	],
	[
		'INJ',
		{
			color: 'red',
			translation: 'Injured',
		},
	],
	[
		'IR',
		{
			color: 'red',
			translation: 'Injured (IR)',
		},
	],
	[
		'O',
		{
			color: 'red',
			translation: 'Out',
		},
	],
	[
		'PUP',
		{
			color: 'red',
			translation: 'Injured (PUP)',
		},
	],
	[
		'Q',
		{
			color: 'yellow',
			translation: 'Questionable',
		},
	],
	[
		'SUSP',
		{
			color: 'red',
			translation: 'Suspended',
		},
	],

	// Draftkings
	[
		'None',
		{
			color: 'green',
			translation: 'Active',
		},
	],
	[
		'OUT',
		{
			color: 'red',
			translation: 'Out',
		},
	],
	[
		'DTD',
		{
			color: 'yellow',
			translation: 'DTD',
		},
	],
	[
		'D',
		{
			color: 'red',
			translation: 'Doubtful',
		},
	],
	[
		'C19',
		{
			color: 'red',
			translation: 'COVID-19',
		},
	],
	[
		'IL',
		{
			color: 'red',
			translation: '60 Day IL',
		},
	],
]);
