import React from "react";
import "./LeaderBord.css";
import Header from "../../components/header";

const LeaderBord = () => {
  const leaderboardData = [
    {
      id: 1,
      login: "Player1",
      xp: 1000,
      games: 15,
      wins: 10,
      losses: 5,
    },
    {
      id: 2,
      login: "Player2",
      xp: 800,
      games: 15,
      wins: 8,
      losses: 7,
    },
    {
        id: 3,
        login: "Player3",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player4",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player5",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player6",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player7",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player8",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player9",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player10",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player11",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      {
        id: 4,
        login: "Player12",
        xp: 800,
        games: 15,
        wins: 8,
        losses: 7,
      },
      
  ];

  return (
    <div className="leaderbord_background">
      <Header title="Leader Board " />

      <div className="leaderbord_container">

        <div className="leaderboard_header">
        {/* <div className="leaderboard_column"></div> */}
          <div className="leaderboard_column"></div>
          <div className="leaderboard_column">XP</div>
          <div className="leaderboard_column">Games</div>
          <div className="leaderboard_column">Win</div>
          <div className="leaderboard_column">Lose</div>
        </div>
        <div className="leaderboard_scroll">
          {leaderboardData.map((player) => (
            <div key={player.id} className="leaderboard_row">
              <div className="leaderboard_column">{player.login}</div>
              <div className="leaderboard_column">{player.xp}</div>
              <div className="leaderboard_column">{player.games}</div>
              <div className="leaderboard_column">{player.wins}</div>
              <div className="leaderboard_column">{player.losses}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBord;
