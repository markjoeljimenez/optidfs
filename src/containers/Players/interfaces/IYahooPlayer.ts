export interface Team {
	abbr: string;
	code: string;
}

export interface Odds {
	awayDecimalOdds: number;
	awayFractionalOdds: string;
	awayMoneyLine: number;
	awaySpread: number;
	bookName: string;
	drawMoneyLine: number;
	homeDecimalOdds: number;
	homeFractionalOdds: string;
	homeMoneyLine: number;
	homeSpread: number;
	lastUpdate: number;
	overUnder: number;
	drawDecimalOdds?: any;
	drawFractionalOdds?: any;
}

export interface Game {
	awayTeam: Team;
	code: string;
	homeTeam: Team;
	odds: Odds;
	rawStatus: string;
	stadiumType: string;
	startTime: number;
	started: boolean;
	status: string;
	statusType: string;
	forecast?: any;
}

export type IYahooPlayerStatus = 'N/A' | 'INJ' | 'O' | 'Q' | 'IR';

export interface IYahooPlayer {
	code: string;
	eligiblePositions: string[];
	fantasyPointsHistory: number[];
	fantasyPointsPerGame: number;
	fantasyPointsStdDev: number;
	firstName: string;
	fppgHistory: number[];
	game: Game;
	imageUrl: string;
	jerseyNumber: string;
	largeImageUrl: string;
	playerGameCode: string;
	teamAbbr: string;
	noteFreshness: string;
	number: string;
	originalSalary: number;
	projectedPoints: number;
	stats: any[];
	points: number;
	primaryPosition: string;
	lineupOrder?: any;
	starting: string;
	sportCode: string;
	team: Team;
	lastName: string;
	status: string;
	locked: boolean;
	playerSalaryId: number;
	extendedStatus?: any;
	liveStatus?: any;
	salary: number;
	golfStatus?: any;
}
