import { IDraftKingsPlayer } from '../../interfaces/draftkings/IDraftKingsPlayer';
import { IPlayer } from '../../interfaces/IPlayer';
import { IYahooPlayer } from '../../interfaces/yahoo/IYahooPlayer';

export const mapDraftKingsPlayersToPlayers = (
	draftKingsPlayers: IDraftKingsPlayer[]
): IPlayer[] =>
	draftKingsPlayers.map((draftKingsPlayer) => ({
		id: draftKingsPlayer.id,
		firstName: draftKingsPlayer.first_name,
		lastName: draftKingsPlayer.last_name,
		fppg: draftKingsPlayer.points_per_contest,
		position: draftKingsPlayer.draft_positions,
		salary: draftKingsPlayer.salary,
		team: draftKingsPlayer.team,
	}));

export const mapYahooPlayersToPlayers = (
	yahooPlayers: IYahooPlayer[]
): IPlayer[] =>
	yahooPlayers.map((yahooPlayer) => ({
		id: yahooPlayer.playerSalaryId,
		firstName: yahooPlayer.firstName,
		lastName: yahooPlayer.lastName,
		fppg: parseFloat(yahooPlayer.fantasyPointsPerGame.toFixed(2)),
		position: yahooPlayer.eligiblePositions.join('/'),
		salary: yahooPlayer.salary,
		team: yahooPlayer.teamAbbr,
	}));
