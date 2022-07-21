export interface IPlayer {
	firstName: string;
	fppg: number;
	id: number;
	lastName: string;
	position: string;
	salary: number;
	status: string;
	team: string;

	// DraftKings attributes
	draftPositions?: string;
	// Yahoo attributes
	fppgHistory?: number[];

	image?: string | null;

	// User entered attributes
	minExposure?: number;
	projectedOwnership?: number;
}
