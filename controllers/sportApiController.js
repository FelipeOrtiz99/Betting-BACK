const axios = require("axios");
const utils = require("../utils/utils");

const fetchData = async (req, res) => {
  try {
    const response = await axios.get(process.env.EXTERNAL_BASE_URL + "soccer/uefa.champions/summary?event=732200");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchOdds = async (req, res) => {
  try {
    const { sport, league, matchId } = req.params;
    const response = await axios.get(process.env.EXTERNAL_BASE_URL + `${sport}/${league}/summary?event=${matchId}`);
    
    if (response.data.error) {
      return res.status(404).json({ error: response.data.error });
    }

    if (response.status === 200) {
      return res.status(200).json({
        history: {
        lastfivegames: [utils.getLastResultsTeam(response.data.boxscore.form)],
        stadistics: [utils.getStadisticsLeague(response.data.boxscore.teams)],
        headtohead: [utils.getHeadToHead(response.data.boxscore, response.data.headToHeadGames[0])]}, 
        odds: utils.clearOddsObject(response.data.odds),
        liveScore :  {[response.data.header.competitions[0].competitors[0].homeAway]: response.data.header.competitions[0].competitors[0].score, [response.data.header.competitions[0].competitors[1].homeAway]: response.data.header.competitions[0].competitors[1].score, matchTime: response.data.header.competitions[0].status.displayClock}
      });
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
}

const fetchOddsTeamsNPlayers = async (req, res) => { 

  try{

    const { sport, league, matchId } = req.params;
    const response = await axios.get(process.env.EXTERNAL_BASE_URL + `${sport}/${league}/summary?event=${matchId}`);
    if (response.data.error) {
      return res.status(404).json({ error: response.data.error });
    }
    if (response.status === 200) {
      return res.status(200).json({
        players: utils.getPlayerOdds(response.data.odds),
      });
    }
    res.json(response.data);

  }catch(error){
    res.status(500).json({ error: error.message });
  }
}




module.exports = {
  fetchData,
  fetchOdds,
  fetchOddsTeamsNPlayers
};
