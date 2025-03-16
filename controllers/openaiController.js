const OpenAI= require("openai");
const axios = require("axios");
const externalApi = require("../controllers/sportApiController");
const utils = require("../utils/utils");



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateText = async (req, res) => {
  try {
    const baseData = req.body
    let res1 = await axios.get(process.env.BASE_URL + "api/" + `${baseData.sport}/${baseData.league}/${baseData.matchId}/odds`);
  
    const {home, draw, away} = res1.data.odds;
    console.log("xd");
    const data = JSON.stringify(res1.data.history);
    let prompt = utils.interpolate(process.env.SECOND_PROMPT, {home, draw, away,data});
    console.log("aa");
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "system", content: process.env.BASE_PROMPT},
        {role: "user", content: prompt},
      ],
      response_format: {type: "json_object"},
    });
    res.status(200).json(JSON.parse(response.choices[0].message.content));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateText,
};
