export interface IPlayer {
	id: number;
	firstName: string;
	lastName: string;
	salary: number;
	fppg: number;
	position: string;
	team: string;
	status: string;

	// User entered attributes
	minExposure?: number;
	projectedOwnership?: number;

	// Yahoo attributes
	fppgHistory?: number[];

	// DraftKings attributes
	draftPositions?: string;
	image?: string | null;
}
