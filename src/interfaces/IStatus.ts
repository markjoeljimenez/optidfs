export enum Status {
	// Yahoo
	'N/A' = 'green',
	INJ = 'red',
	IR = 'red',
	O = 'red',
	GTD = 'yellow',
	Q = 'yellow',
	COVID = 'red',
	PUP = 'red',

	// DraftKings
	None = 'green',
	OUT = 'red',
	DTD = 'yellow',
	D = 'red',
	C19 = 'red',
}

export enum StatusTranslation {
	// Yahoo
	'N/A' = 'Active',
	INJ = 'Injured',
	IR = 'Injured (IR)',
	O = 'Out',
	Q = 'Questionable',
	GTD = 'GTD',
	COVID = 'COVID-19',
	PUP = 'Injured (PUP)',

	// DraftKings
	None = 'Active',
	OUT = 'Out',
	DTD = 'DTD',
	D = 'Doubtful',
	C19 = 'COVID-19',
}
