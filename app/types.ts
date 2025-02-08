export type Team = {
    id: string;
    team_name: string;
    team_photo: string;
};

export type Player = {
    id: string;
    first_name: string;
    last_name: string;
    nick_name: string;
};

export type TeamWithDetails = Team & {
    player_team: {
        created_at: string;
        id: string
        player_id: string;
        player: Player;
        team_id: string;
    }[]
    players: Player[];
    fixtures: Fixture[];
};

export type TeamSeason = {
    id: string;
    created_at: string;
    team: Team;
    season: Season;
    games_played: number;
    won: number;
    lost: number;
    drawn: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
    points: number;
}

export type Fixture = {
    id: string;
    created_at: string;
    scheduled_date: string;
    team_1: Team;
    team_2: Team;
    team_1_score: number;
    team_2_score: number;
    winner: string;
}

export type FixtureWeek = {
    id: string;
    created_at: string;
    fixture_week: number;
    fixtures: Fixture[];
}

export type Season = {
    id: string;
    year: number;
    created_at: string;
    team_season: TeamSeason[];
    fixture_week: FixtureWeek[];
}
