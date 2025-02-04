import Link from "next/link";
import { Team } from "../types";

const TABLE_HEAD = ["Team Name", "GP", "W", "D", "L", "GF", "GA", "GD", "PTS"];

export function Table({ teams }: { teams: Team[] }) {
    return (
        <div className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead className="bg-gray-400">
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <p
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {teams.map(({ id, team_name, games_played, won, drawn, lost, goals_for, goals_against, goal_difference, points }, index) => {
                        const isLast = index === teams.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={team_name} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                                <td className={classes}>
                                    <Link
                                        href={`/team/${id}`}
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {team_name}
                                    </Link>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {games_played}
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {won}
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {drawn}
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {lost}
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {goals_for}
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {goals_against}
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {goal_difference}
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {points}
                                    </p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}