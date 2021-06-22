import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'

function Team({ team, teamMembersArray }) {
  const TEAMS = teamMembersArray;
  const [firstName, setName] = useState('');
  const [foundTeams, setFoundTeams] = useState(TEAMS);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = TEAMS.filter((user) => {
        return user.firstName.toLowerCase().includes(keyword.toLowerCase()) || user.lastName.toLowerCase().includes(keyword.toLowerCase());
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
        <title>{team.name} - Team</title>
        <meta property="og:title" content={team.name} key="title" />
      </Head>

      <input
        type="search"
        value={firstName}
        onChange={filter}
        className="input"
        placeholder="Filter Team Members"
      />

      <Link href="/">Back to Teams</Link>
      <h1>{team.name}</h1>

      <div className="member-list">

        {foundTeams && foundTeams.length > 0 ? (
          foundTeams.map((item) => (

            <div className="member-item">
               <picture className="avatar">
                 <img
                   src={item.avatarUrl}
                  />
               </picture>
               {item.firstName ? <div className="member-info">
                 <h2>{item.firstName} {item.lastName}</h2>
                 <p>{item.displayName}</p>
                 <p className="member-location">
                   <span className="loc-ico"><svg version="1.1" x="0px" y="0px"viewBox="0 0 297 297"><path d="M148.5,0C85.646,0,34.511,51.136,34.511,113.989c0,25.11,8.008,48.926,23.157,68.873c13.604,17.914,32.512,31.588,53.658,38.904l27.464,68.659c1.589,3.971,5.434,6.574,9.71,6.574c4.276,0,8.121-2.603,9.71-6.574l27.464-68.659c21.146-7.316,40.054-20.99,53.658-38.904c15.149-19.947,23.157-43.763,23.157-68.873C262.489,51.136,211.354,0,148.5,0z M148.5,72.682c22.777,0,41.308,18.53,41.308,41.308c0,22.777-18.53,41.309-41.308,41.309c-22.777,0-41.308-18.531-41.308-41.309C107.192,91.212,125.723,72.682,148.5,72.682z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>
                   {item.location}
                  </p>
               </div> : ''}
             </div>

          ))
        ) : (
          <h1>No results found!</h1>
        )}

      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  // Call external API endpoint to get team data
  const res = await fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/${params.id}`)
  const team = await res.json()

  let teamMembersIds = []
  let teamMembersArray = []

  teamMembersIds.push(team.teamLeadId)
  team.teamMemberIds.forEach(tmid => {
    teamMembersIds.push(tmid)
  })

  // Get all team members
  for (const tmid of teamMembersIds) {
    const resb = await fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/${tmid}`)
    const teammember = await resb.json()
    teamMembersArray.push(teammember)
  }

  return {
    props: {
      team,
      teamMembersArray
    },
  }
}

export default Team

