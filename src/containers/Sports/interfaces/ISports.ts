export interface ISport {
	fullName: string;
	hasPublicContests: boolean;
	isEnabled: boolean;
	sportId: number | string;
	supported: boolean;
	positions?: string[];
	regionAbbreviatedSportName?: string;
	regionFullSportName?: string;
	sortOrder?: number;
}
