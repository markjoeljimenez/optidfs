import { IDraftKingsPlayer } from '../models/IDraftKingsPlayer';
import { IPlayer } from '../models/IPlayer';
import { IYahooPlayer } from '../models/IYahooPlayer';
import { Providers } from '../models/providers.enum';

export const mapDraftKingsPlayers = (
	draftKingsPlayers: IDraftKingsPlayer[]
): IPlayer[] =>
	draftKingsPlayers.map((draftKingsPlayer) => ({
		draftPositions: draftKingsPlayer.draft_positions,
		firstName: draftKingsPlayer.first_name,
		fppg: draftKingsPlayer.points_per_contest,
		id: draftKingsPlayer.id,
		image: draftKingsPlayer.images?.[160] || draftKingsPlayer.images?.[50],
		lastName: draftKingsPlayer.last_name,
		position: draftKingsPlayer.position,
		salary: draftKingsPlayer.salary,
		status: draftKingsPlayer.status,
		team: draftKingsPlayer.team,
	}));

export const mapYahooPlayers = (yahooPlayers: IYahooPlayer[]): IPlayer[] =>
	yahooPlayers.map((yahooPlayer) => ({
		firstName: yahooPlayer.firstName,
		fppg: parseFloat(yahooPlayer.fantasyPointsPerGame.toFixed(2)),
		id: yahooPlayer.playerSalaryId,
		image: yahooPlayer.imageUrl,
		lastName: yahooPlayer.lastName,
		position: yahooPlayer.eligiblePositions.join('/'),
		salary: yahooPlayer.salary,
		status: yahooPlayer.status,
		team: yahooPlayer.teamAbbr,
	}));

const providersMap = (players: (IDraftKingsPlayer | IYahooPlayer)[]) =>
	new Map<Providers, IPlayer[]>([
		[
			Providers.DraftKings,
			mapDraftKingsPlayers(players as IDraftKingsPlayer[]),
		],
		[Providers.Yahoo, mapYahooPlayers(players as IYahooPlayer[])],
	]);

export default providersMap;
