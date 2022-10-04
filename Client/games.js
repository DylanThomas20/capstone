const baseURL = "http://localhost:4567";

const homeTeamSelection = document.querySelector("#homeTeamID");
const awayTeamSelection = document.querySelector("#awayTeamID");
const makeGame = document.querySelector("#submit");
const showGames = document.querySelector("#gameDisplay");
const gameOver = document.querySelector("#gameOver");

const finalCheck = document.querySelector("#final");

const homePlayerAdd = document.querySelector("#addHome");
const homePlayerSub = document.querySelector("#subHome");

const wlFix = document.querySelector("#wlFix");

const getAllGames = () => {
  axios
    .get(`${baseURL}/getGames`)
    .then((res) => {
      displayGames(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayGames = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    createGameCard(arr[i]);
  }
};

const createGameCard = (game) => {
  const gameCard = document.createElement("section");
  gameCard.classList.add("team-card");
  let final = "";
  if (game.game_over === true) {
    final = "Final";
  } else {
    final = "Not Final";
  }

  gameCard.innerHTML = `
    <div id="card">
    <button onclick="deleteGame(${game.game_id})" id = remove>X</button>
    <div id="fullScoreBoard">   
      <div id="homeScoreBoard">
        <p id = "homeTeamName">${game.home_team}</p>
        <p id = "homeTeamScore">${game.home_score}</p>
        <button onclick ="updateHomeScore(${game.game_id}, 'add')"id = addHome>+</button>
        <button onclick ="updateHomeScore(${game.game_id}, 'subtract')"id = subHome>-</button>
      </div>
      
      <div id="awayScoreBoard">  
        <p id = "awayTeamName">${game.away_team}</p>
        <p id = "awayTeamScore">${game.away_score}</p>
        <button onclick ="updateAwayScore(${game.game_id}, 'add')"id = addAway>+</button>
        <button onclick ="updateAwayScore(${game.game_id}, 'subtract')"id = subAway>-</button>
        
        </div>
      </div
        
      <div id="finalC">  <p id = "final">${final}</p>
        <button id="finalBtn" onclick="updateWL(${game.game_id})">Update Final</button>
    </div>  
  </div>
    `;
  showGames.appendChild(gameCard);

  if (final === "Final" && game.home_score > game.away_score) {
    findTeamWin(game.home_team);
    findTeamLoss(game.away_team);
  }
  if (final === "Final" && game.home_score < game.away_score) {
    findTeamWin(game.away_team);
    findTeamLoss(game.home_team);
  }
};

const findTeamWin = (teamName) => {
  axios.get(`${baseURL}/getTeams`).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].team_name === teamName) {
        addWin(res.data[i].team_id, "win");
      }
    }
  });
};
const findTeamLoss = (teamName) => {
  axios.get(`${baseURL}/getTeams`).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].team_name === teamName) {
        addLoss(res.data[i].team_id, "loss");
      }
    }
  });
};

const addWin = (team_id, type) => {
  axios.put(`${baseURL}/addWin/${team_id}`, { type }).then((res) => {});
};
const addLoss = (team_id, type) => {
  axios.put(`${baseURL}/addLoss/${team_id}`, { type }).then((res) => {});
};

const updateHomeScore = (game_id, type) => {
  axios.put(`${baseURL}/updateHomePoints/${game_id}`, { type }).then((res) => {
    showGames.innerHTML = ``;
    getAllGames();
  });
};
const updateAwayScore = (game_id, type) => {
  axios.put(`${baseURL}/updateAwayPoints/${game_id}`, { type }).then((res) => {
    showGames.innerHTML = ``;
    console.log(game_id);
    getAllGames();
  });
};

const deleteGame = (game_id) => {
  axios.delete(`${baseURL}/deleteGame/${game_id}`).then((res) => {
    showGames.innerHTML = ``;
    displayGames(res.data);
  });
};

const homeTeamSelect = () => {
  axios.get(`${baseURL}/getTeams`).then((res) => {
    res.data.forEach((teams) => {
      const teamSelector = document.createElement("option");
      teamSelector.setAttribute("id", "teamID", teams["team_id"]);
      teamSelector.textContent = teams.team_name;
      homeTeamSelection.appendChild(teamSelector);
    });
  });
};
const awayTeamSelect = () => {
  axios.get(`${baseURL}/getTeams`).then((res) => {
    res.data.forEach((teams) => {
      const teamSelector = document.createElement("option");
      teamSelector.setAttribute("id", "teamID", teams["team_id"]);
      teamSelector.textContent = teams.team_name;
      awayTeamSelection.appendChild(teamSelector);
    });
  });
};

const createGame = () => {
  if (homeTeamID.value === awayTeamID.value) {
    return alert(`Same team selected twice`);
  }
  let newGame = {
    home_team: homeTeamID.value,
    away_team: awayTeamID.value,
  };

  axios.post(`${baseURL}/createGame`, newGame).then((res) => {
    showGames.innerHTML = ``;

    displayGames(res.data);
  });
};

const updateWL = (game_id) => {
  axios.put(`${baseURL}/updateGameResult/${game_id}`).then((res) => {
    showGames.innerHTML = ``;
    getAllGames();
  });
};

const addHPP = () => {};
const subHPP = () => {};

const resetRecord = () => {
  axios.put(`${baseURL}/setRecord`).then((res) => {
    // displayTeams(res.data);
  });
};

makeGame.addEventListener("click", createGame);
wlFix.addEventListener("click", resetRecord);

// homePlayerAdd.addEventListener("click", addHPP);
// homePlayerSub.addEventListener("click", subHPP);

homeTeamSelect();
awayTeamSelect();
resetRecord();
getAllGames();
