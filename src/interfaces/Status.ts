export type TYahooStatus =
	| 'N/A'
	| 'COVID'
	| 'GTD'
	| 'IL10'
	| 'IL60'
	| 'IL7'
	| 'INJ'
	| 'IR'
	| 'O'
	| 'PUP'
	| 'Q'
	| 'SUSP';
export type TDraftkingsStatus = 'None' | 'OUT' | 'DTD' | 'D' | 'C19';
export type TStatus = TYahooStatus | TDraftkingsStatus;
export type TStatusColor = 'green' | 'yellow' | 'red';

export const StatusMap = new Map<
	TStatus,
	{
		color: TStatusColor;
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
]);
