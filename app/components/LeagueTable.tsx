import Link from "next/link";
import { TeamSeason } from "../types";

const TABLE_HEAD = ["Team Name", "GP", "PTS", "GD"];

export function Table({ teams }: { teams: TeamSeason[] }) {
    return (
        <div className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead className="bg-emerald-600">
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
                    {teams.map(({ team: { team_name, id }, games_played, goal_difference, points }, index) => {
                        const isLast = index === teams.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={team_name} className={index % 2 === 0 ? "bg-white" : "bg-emerald-200"}>
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
                                        <strong>{games_played}</strong>
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        <strong>{points}</strong>
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        <strong>{goal_difference}</strong>
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