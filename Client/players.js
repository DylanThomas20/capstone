const baseURL = "http://localhost:4567";

const showPlayers = document.querySelector("#playerDisplay");
const makePlayer = document.querySelector("#submit");
const teamSelection = document.querySelector("#teamID");

const wlFix = document.querySelector("#wlFix");

const getAllPlayers = () => {
  axios
    .get(`${baseURL}/getPlayers`)
    .then((res) => {
      displayPlayers(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayPlayers = (arr) => {
  arr.sort(function (a, b) {
    return parseFloat(a.team_id) - parseFloat(b.team_id);
  });
  for (let i = 0; i < arr.length; i++) {
    createPlayerCard(arr[i]);
  }
};

const addToRoster = (teamId) => {
  axios.put(`${baseURL}/addToRoster/${teamId}`).then((res) => {});
};

const createPlayerCard = (player) => {
  const playerCard = document.createElement("section");
  const playerID = player.player_id;

  playerCard.classList.add("player-card");
  playerCard.innerHTML = `
    <div id="card">
    <button id="deleteBtn" onclick="deletePlayer(${player.player_id})">X</button>
        <p id = "playerNameCard">${player.player_name}</p>
        <p id = 'jerseyNumber'>#${player.jersey_number}</p>
        <p id = "teamName">${player.team_name}</p>
    </div>
    `;
  showPlayers.appendChild(playerCard);
};

const teamSelect = () => {
  axios.get(`${baseURL}/getTeams`).then((res) => {
    res.data.forEach((teams) => {
      const teamSelector = document.createElement("option");
      teamSelector.setAttribute("value", teams["team_id"]);
      teamSelector.textContent = teams.team_name;
      teamSelection.appendChild(teamSelector);
    });
  });
};

const deletePlayer = (player_id) => {
  axios.delete(`${baseURL}/deletePlayer/${player_id}`).then((res) => {
    showPlayers.innerHTML = ``;

    displayPlayers(res.data);
  });
};

const getTeamId = (teamName) => {
  axios.get(`${baseURL}/getTeams`).then((res) => {
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].team_name === teamName) {
        numberf = teams[i].team_id;
      } else {
        numberf = 100;
      }
    }
  });
  return numberf;
};

const addPlayer = () => {
  // console.log("test");

  if (playerName.value.length > 0) {
    if (num.value.length > 0) {
      let teamSelector = document.querySelector("#teamID");
      let firstNameInput = document.querySelector("#firstName");
      let lastNameInput = document.querySelector("#lastName");
      let jerseyInput = document.querySelector("#num");
      let teamNAME = document.querySelector("#teamID");

      if (num.value < 0) {
        return alert(`Not a valid jersey number`);
      }
      if (num.value > 99) {
        return alert(`Not a valid jersey number`);
      }

      let newPlayer = {
        team_name: teamSelector[+teamSelector.value - 1].textContent,
        team_id: +teamSelector.value,
        player_name: playerName.value,
        jersey_number: num.value,
      };

      axios.post(`${baseURL}/addPlayer`, newPlayer).then((res) => {
        showPlayers.innerHTML = ``;

        displayPlayers(res.data);
      });
    } else {
      return alert(`Not a valid jersey number`);
    }
  } else {
    return alert(`Not a valid player name`);
  }

  playerName.value = "";
  num.value = "";
};

const resetRecord = () => {
  axios.put(`${baseURL}/setRecord`).then((res) => {
    displayTeams(res.data);
  });
};

wlFix.addEventListener("click", resetRecord);
makePlayer.addEventListener("click", addPlayer);
teamSelect();

getAllPlayers();
