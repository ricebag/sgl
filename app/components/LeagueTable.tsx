import Link from "next/link";
import { TeamSeason } from "../types";

const TABLE_HEAD = ["Position", "Team Name", "GP", "PTS", "GD"];

export function Table({ teams }: { teams: TeamSeason[] }) {
    return (
        <div className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left text-lg">
                <thead className="bg-sky-200">
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <p
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70 text-center"
                                >
                                    <strong>{head}</strong>
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {teams.map(({ team: { team_name, id }, games_played, goal_difference, points }, index) => {
                        const isLast = index === teams.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b-4 border-blue-gray-50 font";

                        return (
                            <tr key={team_name} className={
                                index === 0 ? 'bg-yellow-500'
                                    : index === 1 ? 'bg-zinc-400'
                                        : index === 2 ? 'bg-amber-600'
                                            : teams.length - index < 3 ? 'bg-red-300' : 'bg-gray-100'}>
                                <td className={classes}>
                                    <p className={"flex justify-center w-full"}>
                                        <strong>{index + 1}</strong>
                                    </p>
                                </td>
                                <td className={classes}>
                                    <Link
                                        href={`/team/${id}`}
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        <strong>{team_name}</strong>
                                    </Link>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal text-center"
                                    >
                                        <strong>{games_played}</strong>
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal text-center"
                                    >
                                        <strong>{points}</strong>
                                    </p>
                                </td>
                                <td className={classes}>
                                    <p
                                        color="blue-gray"
                                        className="font-normal text-center"
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