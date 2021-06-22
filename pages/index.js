import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'

function Home({ teams }) {
  const TEAMS = teams;
  const [name, setName] = useState('');
  const [foundTeams, setFoundTeams] = useState(TEAMS);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = TEAMS.filter((team) => {
        return team.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundTeams(results);
    } else {
      setFoundTeams(TEAMS);
    }
    setName(keyword);
  };

  return (
    <div className="tempo-wrap">
      <Head>
        <title>Tempo Teams</title>
        <meta property="og:title" content="Tempo Teams" key="title" />
      </Head>

      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter Teams"
      />

      <ul className="team-list">
        {foundTeams && foundTeams.length > 0 ? (
          foundTeams.map((item) => (
            <li key={item.id} className="team">
              <Link href={`/team/${item.id}`}>
                {item.name}
              </Link>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  // Call external API endpoint to get teams list
  const res = await fetch('https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams')
  const teams = await res.json()

  return {
    props: {
      teams
    }
  }
}

export default Home
