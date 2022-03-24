export interface Team {
	code: string;
	abbr: string;
}

export interface Odds {
	awayDecimalOdds: number;
	homeDecimalOdds: number;
	drawDecimalOdds?: any;
	awayFractionalOdds: string;
	homeFractionalOdds: string;
	drawFractionalOdds?: any;
	lastUpdate: number;
	bookName: string;
	overUnder: number;
	awaySpread: number;
	homeSpread: number;
	awayMoneyLine: number;
	homeMoneyLine: number;
	drawMoneyLine: number;
}

export interface Game {
	code: string;
	started: boolean;
	startTime: number;
	status: string;
	statusType: string;
	rawStatus: string;
	stadiumType: string;
	homeTeam: Team;
	awayTeam: Team;
	forecast?: any;
	odds: Odds;
}

export type IYahooPlayerStatus = 'N/A' | 'INJ' | 'O' | 'Q' | 'IR';

export interface IYahooPlayer {
	code: string;
	firstName: string;
	lastName: string;
	sportCode: string;
	number: string;
	jerseyNumber: string;
	status: string;
	imageUrl: string;
	largeImageUrl: string;
	team: Team;
	teamAbbr: string;
	playerGameCode: string;
	game: Game;
	salary: number;
	locked: boolean;
	originalSalary: number;
	projectedPoints: number;
	points: number;
	stats: any[];
	starting: string;
	lineupOrder?: any;
	primaryPosition: string;
	eligiblePositions: string[];
	fantasyPointsPerGame: number;
	fantasyPointsHistory: number[];
	fppgHistory: number[];
	fantasyPointsStdDev: number;
	playerSalaryId: number;
	noteFreshness: string;
	liveStatus?: any;
	extendedStatus?: any;
	golfStatus?: any;
}
