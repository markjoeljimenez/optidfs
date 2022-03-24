import { IDraftKingsPlayer } from '../interfaces/IDraftKingsPlayer';
import { IPlayer } from '../interfaces/IPlayer';
import { IYahooPlayer } from '../interfaces/IYahooPlayer';

export const mapDraftKingsPlayers = (
	draftKingsPlayers: IDraftKingsPlayer[]
): IPlayer[] =>
	draftKingsPlayers.map((draftKingsPlayer) => ({
		id: draftKingsPlayer.id,
		firstName: draftKingsPlayer.first_name,
		lastName: draftKingsPlayer.last_name,
		fppg: draftKingsPlayer.points_per_contest,
		position: draftKingsPlayer.position,
		salary: draftKingsPlayer.salary,
		team: draftKingsPlayer.team,
		status: draftKingsPlayer.status,
		draftPositions: draftKingsPlayer.draft_positions,
		image: draftKingsPlayer.images?.[160] || draftKingsPlayer.images?.[50],
	}));

export const mapYahooPlayers = (yahooPlayers: IYahooPlayer[]): IPlayer[] =>
	yahooPlayers.map((yahooPlayer) => ({
		id: yahooPlayer.playerSalaryId,
		firstName: yahooPlayer.firstName,
		lastName: yahooPlayer.lastName,
		fppg: parseFloat(yahooPlayer.fantasyPointsPerGame.toFixed(2)),
		position: yahooPlayer.eligiblePositions.join('/'),
		salary: yahooPlayer.salary,
		team: yahooPlayer.teamAbbr,
		status: yahooPlayer.status,
		image: yahooPlayer.imageUrl,
	}));
