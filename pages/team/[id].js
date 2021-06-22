import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import User from '../../components/user'

function Team({ team, teamMembersIds }) {
  console.log(teamMembersIds);

  return (
    <div className="tempo-wrap">
      <Head>
        <title>{team.name} - Team</title>
        <meta property="og:title" content={team.name} key="title" />
      </Head>

      <Link href="/">Back to Teams</Link>

      <h1>{team.name}</h1>
 
      <div className="member-list">
        {teamMembersIds.map(item => <User key={item} uid={item} />)}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  // Call external API endpoint to get team data
  const res = await fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/${params.id}`)
  const team = await res.json()

  let teamMembersIds = []

  teamMembersIds.push(team.teamLeadId)
  team.teamMemberIds.forEach(tmid => {
    teamMembersIds.push(tmid)
  })

  return {
    props: {
      team,
      teamMembersIds
    },
  }
}

export default Team

