const baseURL = "http://localhost:4567";

const showTeams = document.querySelector("#teamDisplay");
const makeTeam = document.querySelector("#submit");
const form = document.querySelector("form");

const wlFix = document.querySelector("#wlFix");

// Axios request to get teams array
// Loop over that array
// Create the card that displays each team in the array

const getAllTeams = () => {
  axios
    .get(`${baseURL}/getTeams`)
    .then((res) => {
      displayTeams(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayTeams = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    createTeamCard(arr[i]);
  }
};

const createTeamCard = (team) => {
  // let roster = getRoster(team.team_id);
  // console.log(getRoster(team.team_id));

  const teamCard = document.createElement("section");
  teamCard.classList.add("team-card");

  teamCard.innerHTML = `
    <div id="card">
    <button onclick="deleteTeam(${team.team_id})" id = remove>X</button>
        <p id = "team_name">${team.team_name}</p>
      <div id="record">  
        <p id = "w">Wins  ${team.wins}</p>
        <p id = "l">Losses ${team.losses}</p>
      <p> Roster: ${team.roster} </p>

    </div>
    `;
  showTeams.appendChild(teamCard);
};

const deleteTeam = (team_id) => {
  axios.delete(`${baseURL}/deleteTeam/${team_id}`).then((res) => {
    showTeams.innerHTML = ``;

    displayTeams(res.data);
  });
};

const getRoster = (teamId) => {
  let str = "";
  axios.get(`${baseURL}/getPlayers`).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].team_id === teamId) {
        str += res.data[i].player_name;
        str += " ";
      }
    }

    return str;
  });
};

const addWin = (team_id, type) => {
  axios.put(`${baseURL}/addWin/${team_id}`, { type }).then((res) => {
    showTeams.innerHTML = ``;
    displayTeams(res.data);
  });
};

const addLoss = (team_id, type) => {
  axios.put(`${baseURL}/addLoss/${team_id}`, { type }).then((res) => {
    showTeams.innerHTML = ``;
    displayTeams(res.data);
  });
};
const removeWin = (team_id, type) => {
  axios.put(`${baseURL}/removeWin/${team_id}`, { type }).then((res) => {
    showTeams.innerHTML = ``;
    displayTeams(res.data);
  });
};

const removeLoss = (team_id, type) => {
  axios.put(`${baseURL}/removeLoss/${team_id}`, { type }).then((res) => {
    showTeams.innerHTML = ``;
    displayTeams(res.data);
  });
};

const addTeam = () => {
  let nameInput = document.querySelector("teamName2.value");

  let newTeam = {
    team_name: teamName2.value,
  };
  axios.post(`${baseURL}/addTeam`, newTeam).then((res) => {
    showTeams.innerHTML = ``;

    displayTeams(res.data);
  });
  // nameInput.value = " ";
  teamName2.value = "";
};

const resetRecord = () => {
  axios.put(`${baseURL}/setRecord`).then((res) => {
    displayTeams(res.data);
  });
};

wlFix.addEventListener("click", resetRecord);
makeTeam.addEventListener("click", addTeam);
getAllTeams();
