export enum Status {
	// Yahoo
	'N/A' = 'green',
	COVID = 'red',
	GTD = 'yellow',
	IL10 = 'red',
	IL60 = 'red',
	IL7 = 'red',
	INJ = 'red',
	IR = 'red',
	O = 'red',
	PUP = 'red',
	Q = 'yellow',
	SUSP = 'red',

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
	IL7 = 'Injured (7 Days)',
	IL10 = 'Injured (10 Days)',
	IL60 = 'Injured (60 Days)',
	SUSP = 'Suspended',

	// DraftKings
	None = 'Active',
	OUT = 'Out',
	DTD = 'DTD',
	D = 'Doubtful',
	C19 = 'COVID-19',
}
