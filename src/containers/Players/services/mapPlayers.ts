import { IDraftKingsPlayer } from '../models/IDraftKingsPlayer';
import { IPlayer } from '../models/IPlayer';
import { IYahooPlayer } from '../models/IYahooPlayer';
import { Providers } from '../models/providers.enum';

const providersMap = new Map<Providers, (p: any) => IPlayer[]>([
	[Providers.DraftKings, mapDraftKingsPlayers],
	[Providers.Yahoo, mapYahooPlayers],
]);

export function mapDraftKingsPlayers(
	draftKingsPlayers: IDraftKingsPlayer[]
): IPlayer[] {
	return draftKingsPlayers.map((draftKingsPlayer) => ({
		draftPositions: draftKingsPlayer.draft_positions,
		firstName: draftKingsPlayer.first_name,
		fppg: draftKingsPlayer.points_per_contest,
		id: draftKingsPlayer.id,
		image:
			draftKingsPlayer.images
				?.one_hundred_and_sixty_pixels_by_one_hundred_and_sixty_pixels_url ||
			draftKingsPlayer.images?.fifty_pixels_by_fifty_pixels_url,
		lastName: draftKingsPlayer.last_name,
		position: draftKingsPlayer.position,
		salary: draftKingsPlayer.salary,
		status: 'None', // @TODO: Fix this on the backend first
		team: draftKingsPlayer.team,
	}));
}

export function mapYahooPlayers(yahooPlayers: IYahooPlayer[]): IPlayer[] {
	return yahooPlayers.map((yahooPlayer) => ({
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
}

export default providersMap;
