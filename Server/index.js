const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const {
  getTeams,
  getTeamNames,
  addTeam,
  deleteTeam,
  addWin,
  removeWin,
  addLoss,
  removeLoss,
  setRecord,

  getPlayers,
  addPlayer,
  deletePlayer,
  updatePoints,
  updateRebounds,
  updateAssists,
  addToRoster,

  getGamesArr,
  createGame,
  deleteGame,
  getGame,
  updateHomePoints,
  updateAwayPoints,
  updateGameResult,
} = require("./controller");

app.get("/getPlayers", getPlayers);
app.post("/addPlayer", addPlayer);
app.delete("/deletePlayer/:id", deletePlayer);
app.put("/updatePoints/:id", updatePoints);
app.put("/updateRebounds/:id", updateRebounds);
app.put("/updateAssists/:id", updateAssists);

app.get("/getTeams", getTeams);
app.get("/getTeamNames/:id", getTeamNames);
app.post("/addTeam", addTeam);
app.delete("/deleteTeam/:id", deleteTeam);
app.put("/addWin/:id", addWin);
app.put("/removeWin/:id", removeWin);
app.put("/addLoss/:id", addLoss);
app.put("/removeLoss/:id", removeLoss);
app.put("/setRecord", setRecord);
app.put("/addToRoster/:id", addToRoster);

app.get("/getGames", getGamesArr);
app.post("/createGame", createGame);
app.get("/getGame/:id", getGame);
app.delete("/deleteGame/:id", deleteGame);
app.put("/updateHomePoints/:id", updateHomePoints);
app.put("/updateAwayPoints/:id", updateAwayPoints);
app.put("/updateGameResult/:id", updateGameResult);

app.listen(4567, () => console.log("server running on port 4567"));
