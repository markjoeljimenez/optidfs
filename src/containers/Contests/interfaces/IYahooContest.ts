export interface PaidEntryFee {
	amount: number;
	currency: string;
	value: number;
}

export interface PaidTotalPrize {
	amount: number;
	currency: string;
	currencyType: string;
	value: number;
}

export interface FirstPlacePayout {
	amount: number;
	currency: string;
	value: number;
}

export interface PerfectLineupPrize {
	amount: number;
	currency: string;
	value: number;
}

export interface IYahooContest {
	batchContestCount: number;
	earnableRewardPoints: number;
	entryCount: number;
	entryLimit: number;
	firstPlacePayout: FirstPlacePayout;
	guaranteed: boolean;
	iconUrl: string;
	id: number;
	multipleEntry: boolean;
	multipleEntryLimit: number;
	paidEntryFee: PaidEntryFee;
	paidTotalPrize: PaidTotalPrize;
	perfectLineupPrize: PerfectLineupPrize;
	pinned: number;
	promoted: boolean;
	rewardPointsEntryFee: number;
	salaryCap: number;
	scope: string;
	seriesId: number;
	slateType: string;
	sportCode: string;
	startTime: number;
	state: string;
	subleague: string;
	subleagueDisplayName: string;
	title: string;
	type: string;
	opponentExperience?: any;
	opponentSkillStatus?: any;
	restriction?: any;
}
