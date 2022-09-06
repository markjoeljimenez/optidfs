import { TPlayerStatus } from './IPlayerStatus';

export interface IPlayer {
	firstName: string;
	fppg: number;
	id: number | string;
	lastName: string;
	position: string;
	salary: number;
	status: TPlayerStatus;
	team: string;

	// DraftKings attributes
	draftPositions?: string;
	// Yahoo attributes
	fppgHistory?: number[];

	image?: string | null;

	// User entered attributes
	maxExposure?: number;
	minExposure?: number;
	projectedOwnership?: number;
}
