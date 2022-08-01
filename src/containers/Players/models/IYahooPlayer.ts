import { TPlayerStatus } from '@/containers/Players/models/IPlayerStatus';

export interface BaseTeam {
	abbr: string;
	code: string;
}

export interface Team extends BaseTeam {
	location: string;
	name: string;
	teamName: string;
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
	awayTeam: BaseTeam;
	code: string;
	gameId: string;
	homeTeam: BaseTeam;
	odds: Odds;
	rawStatus: string;
	stadiumType: string;
	startTime: number;
	started: boolean;
	status: string;
	statusType: string;
	forecast?: any;
}

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
	lastName: string;
	locked: boolean;
	noteFreshness: string;
	number: string;
	originalSalary: number;
	playerGameCode: string;
	playerSalaryId: number;
	points: number;
	primaryPosition: string;
	projectedPoints: number;
	salary: number;
	sportCode: string;
	starting: string;
	stats: any[];
	status: TPlayerStatus;
	team: Team;
	teamAbbr: string;
	extendedStatus?: any;
	golfStatus?: any;
	lineupOrder?: any;
	liveStatus?: any;
}
