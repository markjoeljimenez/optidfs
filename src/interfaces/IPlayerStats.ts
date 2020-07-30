export interface IPlayerStats {
	AST: number;
	BIRTHDATE: Date;
	CareerHighs: IStatsHigh[];
	CareerTotalsAllStarSeason: IStats[];
	CareerTotalsCollegeSeason: IStats[];
	CareerTotalsPostSeason: IStats[];
	CareerTotalsPreseason: IStats[];
	CareerTotalsRegularSeason: IStats[];
	COUNTRY: string;
	DISPLAY_FI_LAST: string;
	DISPLAY_FIRST_LAST: string;
	DISPLAY_LAST_COMMA_FIRST: string;
	DLEAGUE_FLAG: string;
	DRAFT_NUMBER: string;
	DRAFT_ROUND: string;
	DRAFT_YEAR: string;
	FIRST_NAME: string;
	FROM_YEAR: number;
	GAMES_PLAYED_FLAG: string;
	HEIGHT: string;
	JERSEY: string;
	LAST_AFFILIATION: string;
	LAST_NAME: string;
	NBA_FLAG: string;
	NextGame: INextGame[];
	PERSON_ID: number;
	PIE: number;
	PLAYER_ID: number;
	PLAYER_NAME: string;
	PLAYERCODE: string;
	POSITION: string;
	profile_picture: string;
	PTS: number;
	REB: number;
	ROSTERSTATUS: string;
	SCHOOL: string;
	SEASON_EXP: number;
	SeasonHighs: IStatsHigh[];
	SeasonRankingsPostSeason: IStats[];
	SeasonRankingsRegularSeason: IStats[];
	SeasonTotalsAllStarSeason: IStats[];
	SeasonTotalsCollegeSeason: IStats[];
	SeasonTotalsPostSeason: IStats[];
	SeasonTotalsPreseason: IStats[];
	SeasonTotalsRegularSeason: IPostSeason[];
	TEAM_ABBREVIATION: string;
	TEAM_CITY: string;
	TEAM_CODE: string;
	TEAM_ID: number;
	TEAM_NAME: string;
	TimeFrame: string;
	TO_YEAR: number;
	WEIGHT: string;
}

export interface IStatsHigh {
	DATE_EST: Date;
	GAME_DATE: string;
	GAME_ID: string;
	PLAYER_ID: number;
	STAT_ORDER: number;
	STAT_VALUE: number;
	STAT: string;
	VS_TEAM_ABBREVIATION: string;
	VS_TEAM_CITY: string;
	VS_TEAM_ID: number;
	VS_TEAM_NAME: string;
}

export interface IStats {
	AST: number;
	BLK: number;
	DREB: number;
	FG_PCT: number;
	FG3_PCT: number;
	FG3A: number;
	FG3M: number;
	FGA: number;
	FGM: number;
	FT_PCT: number;
	FTA: number;
	FTM: number;
	GP: number;
	GS: number;
	LEAGUE_ID: string;
	MIN: number;
	OREB: number;
	PF: number;
	PLAYER_ID: number;
	PTS: number;
	REB: number;
	STL: number;
	TEAM_ID: number;
	TOV: number;
}

export interface INextGame {
	GAME_DATE: string;
	GAME_ID: string;
	GAME_TIME?: any;
	LOCATION: string;
	PLAYER_TEAM_ABBREVIATION: string;
	PLAYER_TEAM_CITY: string;
	PLAYER_TEAM_ID: number;
	PLAYER_TEAM_NICKNAME: string;
	VS_TEAM_ABBREVIATION: string;
	VS_TEAM_CITY: string;
	VS_TEAM_ID: number;
	VS_TEAM_NICKNAME: string;
}

export interface IPostSeason {
	GP: string;
	GS: string;
	LEAGUE_ID: string;
	PLAYER_AGE: string;
	PLAYER_ID: number;
	AST: number;
	BLK: number;
	DREB: number;
	EFF: number;
	FG_PCT: number;
	FG3_PCT: number;
	FG3A: number;
	FG3M: number;
	FGA: number;
	FGM: number;
	FT_PCT: number;
	FTA: number;
	FTM: number;
	MIN: number;
	OREB: number;
	PTS: number;
	REB: number;
	STL: number;
	TOV: number;
	SEASON_ID: string;
	TEAM_ABBREVIATION: string;
	TEAM_ID: number;
}
