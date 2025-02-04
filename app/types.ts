export type Team = {
    id: string;
    team_name: string;
    games_played: number;
    won: number;
    drawn: number;
    lost: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
    points: number;
    team_photo: string;
};

export type Player = {
    id: string;
    first_name: string;
    last_name: string;
    nick_name: string;
};

export type TeamWithPlayers = Team & {
    player_team: {
        created_at: string;
        id: string
        player_id: string;
        player: Player;
        team_id: string;
    }[]
    players: Player[];
};