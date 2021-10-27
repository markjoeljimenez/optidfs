export interface IPlayer {
	id: number;
	firstName: string;
	lastName: string;
	salary: number;
	fppg: number;
	position: string;
	team: string;

	// User entered attributes
	minExposure?: number;
	projectedOwnership?: number;

	// Yahoo attributes
	fppgHistory?: number[];

	// DraftKings attributes
	draftPositions?: string;
}
