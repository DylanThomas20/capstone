const teams = require("./db.json");
const players = require("./db2.json");
const games = require("./db3.json");
let gameId = 4;
let playerId = 11;
let teamId = 2;
// Get, Put, Delete, Push

module.exports = {
  getTeams: (req, res) => {
    res.status(200).send(teams);
  },
  getTeamNames: (req, res) => {
    // const index = teams.findIndex((el) => el.team_id === +req.params.id);
    // console.log(index);
    // res.status(200).send(teams[index].team_name);
  },
  addTeam: (req, res) => {
    const { team_name } = req.body;

    let newTeamObject = {
      team_id: teamId,
      team_name: team_name,
      wins: 0,
      losses: 0,
      roster: [],
    };
    teams.push(newTeamObject);

    teamId++;

    res.status(200).send(teams);
  },

  deleteTeam: (req, res) => {
    const index = teams.findIndex((el) => el.team_id === +req.params.id);

    teams.splice(index, 1);

    res.status(200).send(teams);
  },

  addWin: (req, res) => {
    const index = teams.findIndex((el) => el.team_id === +req.params.id);
    const { type } = req.body;

    if (type === "win") {
      teams[index].wins++;
    }
    res.status(200).send(teams);
  },
  removeWin: (req, res) => {
    const index = teams.findIndex((el) => el.team_id === +req.params.id);
    const { type } = req.body;
    if (teams[index].wins > 0) {
      if (type === "win") {
        teams[index].wins--;
      }
    }
    res.status(200).send(teams);
  },

  addLoss: (req, res) => {
    const index = teams.findIndex((el) => el.team_id === +req.params.id);
    const { type } = req.body;

    if (type === "loss") {
      teams[index].losses++;
    }
    res.status(200).send(teams);
  },
  removeLoss: (req, res) => {
    const index = teams.findIndex((el) => el.team_id === +req.params.id);
    const { type } = req.body;
    if (teams[index].losses > 0) {
      if (type === "loss") {
        teams[index].losses--;
      }
    }
    res.status(200).send(teams);
  },
  setRecord: (req, res) => {
    for (let i = 0; i < teams.length; i++) {
      teams[i].wins = 0;
      teams[i].losses = 0;
    }
    res.status(200).send(teams);
  },
  //PLAYERS
  getPlayers: (req, res) => {
    res.status(200).send(players);
  },

  addToRoster: (req, res) => {
    const index = players.findIndex((el) => el.player_id === +req.params.id);
    teams[index].roster.push(players[index].player_name);

    res.status(200).send(teams);
  },

  addPlayer: (req, res) => {
    const { team_name, team_id, player_name, jersey_number } = req.body;

    let newPlayerObject = {
      player_id: playerId,
      team_id: team_id,
      team_name: team_name,
      player_name: player_name,
      jersey_number: jersey_number,
      points: 0,
      rebounds: 0,
      assists: 0,
    };
    players.push(newPlayerObject);

    teams[team_id - 1].roster.push(` ${player_name} `);

    playerId++;

    res.status(200).send(players);
  },

  deletePlayer: (req, res) => {
    const index = players.findIndex((el) => el.player_id === +req.params.id);

    players.splice(index, 1);

    res.status(200).send(players);
  },

  updatePoints: (req, res) => {
    const index = players.findIndex((el) => el.player_id === +req.params.id);
    const { type } = req.body;

    if (type === "add") {
      players[index].points++;
    }
    if (type === "subtract") {
      players[index].points--;
    }
    res.status(200).send(players);
  },
  updateRebounds: (req, res) => {
    const index = players.findIndex((el) => el.player_id === +req.params.id);
    const { type } = req.body;

    if (type === "add") {
      players[index].rebounds++;
    }
    if (type === "subtract") {
      players[index].rebounds--;
    }
    res.status(200).send(players);
  },
  updateAssists: (req, res) => {
    const index = players.findIndex((el) => el.player_id === +req.params.id);
    const { type } = req.body;

    if (type === "add") {
      players[index].assists++;
    }
    if (type === "subtract") {
      players[index].assists--;
    }
    res.status(200).send(players);
  },

  //GAMES

  getGamesArr: (req, res) => {
    res.status(200).send(games);
  },
  deleteGame: (req, res) => {
    const index = games.findIndex((el) => el.game_id === +req.params.id);

    games.splice(index, 1);

    res.status(200).send(games);
  },
  getGame: (req, res) => {
    const index = games.findIndex((el) => el.game_id === +req.params.id);
    console.log(index);
    res.status(200).send(games[index]);
  },
  updateHomePoints: (req, res) => {
    const index = games.findIndex((el) => el.game_id === +req.params.id);
    const { type } = req.body;

    if (type === "add") {
      games[index].home_score++;
    }
    if (type === "subtract") {
      games[index].home_score--;
    }

    res.status(200).send(games[index]);
  },
  updateAwayPoints: (req, res) => {
    const index = games.findIndex((el) => el.game_id === +req.params.id);
    const { type } = req.body;

    if (type === "add") {
      games[index].away_score++;
    }
    if (type === "subtract") {
      games[index].away_score--;
    }

    res.status(200).send(games[index]);
  },
  updateGameResult: (req, res) => {
    const index = games.findIndex((el) => el.game_id === +req.params.id);

    if (games[index].game_over === true) {
      games[index].game_over = false;
    } else {
      games[index].game_over = true;
    }
    res.status(200).send(games[index]);
  },
  createGame: (req, res) => {
    const { home_team, away_team } = req.body;

    let newGameObject = {
      game_id: gameId,
      home_team: home_team,
      home_score: 0,
      away_team: away_team,
      away_score: 0,
      game_over: false,
    };
    games.push(newGameObject);

    gameId++;

    res.status(200).send(games);
  },
};
