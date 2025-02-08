import Link from "next/link";
import { Team } from "../types";

interface Fixture {
    team_2_score: number;
    team_1_score: number;
    id: string;
    scheduled_date: string;
    team_1: Team;
    team_2: Team;
}

export function FixtureList({ fixtures }: { fixtures: Fixture[] }) {
    return (
        <div className="h-full w-full overflow-scroll flex justify-center">
            <table className="w-[60%] table-auto text-left">
                <thead className="bg-emerald-600">
                    <tr>
                        <th
                            key={'Date'}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                        >
                            <p
                                color="blue-gray"
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                {'Date'}
                            </p>
                        </th>
                        <th
                            key={'Home Team'}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                        >
                            <p
                                color="blue-gray"
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                {'Home Team'}
                            </p>
                        </th>
                        <th className="w-[60px]"/>
                        <th
                            key={'Away Team'}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                        >
                            <p
                                color="blue-gray"
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                {'Away Team'}
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fixtures.map((fixture, index) => (
                        <tr key={fixture.id} className={index % 2 === 0 ? "bg-white" : "bg-emerald-200"}>
                            <td className='justify-center items-center py-4 text-center'>
                                {new Date(fixture.scheduled_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                            </td>
                            <td className='justify-center items-center py-4 text-center'>
                                <Link
                                    href={`/team/${fixture.team_1.id}`}
                                    className="font-normal"
                                >
                                    {fixture.team_1.team_name}
                                </Link>
                            </td>
                            <td className='justify-center items-center text-center space-between'>
                                <div className="flex justify-between">
                                    <strong>{fixture.team_1_score}</strong>
                                    <span>vs</span>
                                    <strong>{fixture.team_2_score}</strong>
                                </div>
                            </td>
                            <td className='justify-center items-center py-4 text-center'>
                                <Link
                                    href={`/team/${fixture.team_1.id}`}
                                    className="font-normal"
                                >
                                    {fixture.team_2.team_name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}