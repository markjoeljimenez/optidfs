export type TYahooPlayerStatus =
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
export type TDraftkingsPlayerStatus =
	| 'None'
	| 'IL'
	| 'OUT'
	| 'DTD'
	| 'D'
	| 'C19';
export type TPlayerStatus = TYahooPlayerStatus | TDraftkingsPlayerStatus;
export type TPlayerStatusColor = 'green' | 'yellow' | 'red';
