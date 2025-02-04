import { createClient } from '@/utils/supabase/server';
import { Table } from "./components/table";
import { Team } from "./types";

export default async function Home() {
  const supabase = await createClient();
  const { data: teams } = await supabase.from("team").select(`*`).returns<Team[]>();
  const { data: fixtures } = await supabase.from("fixtures").select(`*, team_1(team_name), team_2(team_name)`);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6">
        <img
          className="object-cover w-full     max-h-[703px]"
          src='https://xctajhalcbjujvqqdaqo.supabase.co/storage/v1/object/public/team-photos//sgl.jpg'
          alt=""
        />
        <div className="px-10">
          <h1 className="text-2xl font-medium py-6">League Standings</h1>
          {teams?.length && <Table teams={teams} />}
        </div>

        <div className="px-10">
          <h1 className="text-2xl font-medium py-6">Upcoming Fixtures</h1>
          {/* {teams?.length && <Table teams={teams} />} */}
          {fixtures?.length && fixtures.map((fixture) => (
            <div key={fixture.id} className="flex justify-between py-2">
              <p>{fixture.team_1.team_name} vs {fixture.team_2.team_name}</p>
              <p>{fixture.scheduled_date}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
