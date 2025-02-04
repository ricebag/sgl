import { TeamWithPlayers } from "@/app/types";
import { createClient } from "@/utils/supabase/server";

// export async function generateStaticParams() {
//     const supabase = await createClient();
//     const { data: teams } = await supabase.from("teams").select(`*, player_team(*, players(*))`);
//     // const posts = await fetch('https://.../posts').then((res) => res.json())

//     return posts.map((post) => ({
//         slug: post.slug,
//     }))
// }

export default async function TeamPage({
    params,
}: {
    params: Promise<{ team_id: string }>
}) {
    const supabase = await createClient();
    const teamId = (await params).team_id

    const { data: team } = await supabase.from("team").select(`*, player_team(*, player(*))`).eq('id', teamId).single<TeamWithPlayers>();

    return (
        <>
            <main className="flex-1 flex flex-row gap-6 px-4 mt-20">
                <div>
                    <img className="object-cover w-[300px] h-[300px] rounded-full" src={team?.team_photo} alt="" />

                    {team?.team_name}
                </div>

                <div>

                    {team?.player_team.map(({ player }, idx) => (
                        <div key={teamId + idx}>
                            <p>
                                Player Name: {player.nick_name}
                            </p>
                            <p>
                                Full Name: {player.first_name} {player.last_name}
                            </p>
                        </div>
                    ))}
                </div>
                {/* <Table teams={teams as Team[]} /> */}
            </main >
        </>
    );
}
