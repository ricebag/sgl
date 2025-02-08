'use client';

import { fetchTeamFixtures } from "@/app/actions";
import { TeamWithDetails } from "@/app/types";
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { FixtureList } from "@/app/components/FixtureList";
import { HorizontalLine } from "@/app/components/HorizontalLine";

export default function TeamPage() {
    const { team_id } = useParams<{ team_id: string; }>()
    const [team, setTeam] = useState<TeamWithDetails>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTeamFixtures(team_id);
            console.log({ data });

            setTeam(data! as TeamWithDetails);
        };

        fetchData();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.3 }} >
            <main className="flex-1 flex flex-col gap-6 px-4 mt-20 items-center w-full">
                <div className="flex flex-row items-center gap-4 mt-6">
                    <img className="object-cover aspect-square md:w-[300px] md:h-[300px] w-[150px] h-[150px] rounded-full" src={team?.team_photo} alt="" />

                    <div className="flex flex-col gap-4">
                        <p className="text-2xl align-center">{team?.team_name}</p>
                        {team?.player_team.map(({ player }, idx) => (
                            <div key={team_id + idx}>
                                <p>
                                    Player Name: <strong>{player.nick_name}</strong>
                                </p>
                                <p>
                                    Full Name: <strong>{player.first_name} {player.last_name}</strong>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


                {team?.fixtures && (
                    <>
                        <HorizontalLine title="Fixtures" />
                        <FixtureList fixtures={team?.fixtures as any} />
                    </>
                )}
            </main >
        </motion.div>
    );
}
