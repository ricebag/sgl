'use client';

import { Table } from "./components/LeagueTable";
import { Season, TeamSeason, FixtureWeek } from "./types";
import { FixtureList } from './components/FixtureList';
import { useState, useEffect } from 'react';
import { fetchFixtures, fetchSeasons } from './actions';
import { motion } from "motion/react"

export default function Home() {
  const [season, setSeason] = useState<number>(new Date().getFullYear());
  const [fixtureWeek, setFixtureWeek] = useState<number>(1);
  const [fixtureWeeks, setFixtureWeeks] = useState<FixtureWeek[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [teams, setTeams] = useState<TeamSeason[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const seasonsData = await fetchSeasons()
      const thisSeason = seasonsData?.find(seasonN => seasonN.year === season);

      const fixturesData = await fetchFixtures(season, fixtureWeek);
      const sortedTeams = thisSeason?.team_season.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference;
        return a.team.team_name.localeCompare(b.team.team_name);
      });

      const currentFixtureWeek = thisSeason?.fixture_week.find(fw => {
        return fw.fixtures.filter(fixture => {
          if (!fixture.team_1_score && !fixture.team_2_score) {
            return true
          }
          return false
        }).length
      }) || thisSeason?.fixture_week[thisSeason?.fixture_week.length - 1];

      setSeasons(seasonsData!);
      setFixtureWeeks(thisSeason?.fixture_week!);
      setFixtureWeek(currentFixtureWeek?.fixture_week || 1);
      setFixtures(fixturesData!);
      setTeams(sortedTeams!);
    };

    fetchData();
  }, [season]);

  useEffect(() => {
    const fetchData = async () => {
      const fixturesData = await fetchFixtures(season, fixtureWeek);

      setFixtures(fixturesData!);
    };

    fetchData();
  }, [fixtureWeek]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.3 }} >
      <main className="flex-1 flex flex-col gap-6">
        <img
          className="object-cover w-full     max-h-[703px]"
          src='https://xctajhalcbjujvqqdaqo.supabase.co/storage/v1/object/public/team-photos//sgl.jpg'
          alt=""
        />
        <div className="px-10">
          <div className='flex justify-between'>
            <h1 className="text-2xl font-medium py-6">League Standings</h1>

            <div className="flex items-center">
              <label className="font-medium mx-2" htmlFor="season">Season</label>
              <select className="border rounded p-2" id='season' onChange={(e) => setSeason(parseInt(e.target.value))}>
                {seasons?.map((season) => (
                  <option key={season.id} value={season.year}>{season.year}</option>
                ))}
              </select>
            </div>
          </div>
          {!!teams?.length && <Table teams={teams} />}
        </div>

        {!!fixtures?.length && (
          <div className="flex flex-col px-10">
            <div className='flex justify-between'>
              <h1 className="text-2xl font-medium py-6">Upcoming Fixtures</h1>

              <div className="flex items-center">
                <label className="font-medium mx-2" htmlFor="fixtureWeek">Season</label>
                <select className="border rounded p-2" id='fixtureWeek' onChange={(e) => setFixtureWeek(parseInt(e.target.value))}>
                  {fixtureWeeks?.map((fw) => (
                    <option key={fw.id} value={fw.fixture_week}>{fw.fixture_week}</option>
                  ))}
                </select>
              </div>
            </div>
            <FixtureList fixtures={fixtures} />
          </div>
        )}
      </main >
    </motion.div>
  );
}