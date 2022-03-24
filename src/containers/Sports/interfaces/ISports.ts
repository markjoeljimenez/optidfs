export interface ISport {
	fullName: string;
	hasPublicContests: boolean;
	isEnabled: boolean;
	regionAbbreviatedSportName: string;
	regionFullSportName?: string;
	sortOrder?: number;
	sportId: number;
	supported: boolean;
	positions?: string[];
}
