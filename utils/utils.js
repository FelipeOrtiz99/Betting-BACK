function clearOddsObject(odds) {

    let homeProbability, awayProbability, drawProbability;

    homeProbability = getHomeOdds(odds);
    drawProbability = getDrawOdds(odds);
    awayProbability = getAwayOdds(odds);    

    let probatityTotal = homeProbability + awayProbability + drawProbability;

    return {
        home: (homeProbability / probatityTotal * 100).toFixed(2),
        draw: (drawProbability / probatityTotal * 100).toFixed(2),
        away: (awayProbability / probatityTotal * 100).toFixed(2)
    };
}

function getHomeOdds(data) {
    for (const match in data) {
        if (data[match].provider.id === '58') {
            return moneyLineToProbability(data[match].homeTeamOdds.moneyLine);

        }
    }
}

function getDrawOdds(data) {
    for (const match in data) {
        if (data[match].provider.id === '58') {
            return moneyLineToProbability(data[match].drawOdds.moneyLine);

        }
    }
}

function prueba(){
    
}

function getAwayOdds(data) {
    for (const match in data) {
        if (data[match].provider.id === '58') {
            return moneyLineToProbability(data[match].awayTeamOdds.moneyLine);
        }
    }
}

function moneyLineToProbability(moneyLine) {
    if (moneyLine > 0) {
        return 100 / (moneyLine + 100);
    } else {
        return Math.abs(moneyLine) / (Math.abs(moneyLine) + 100);
    }
}

function getLastResultsTeam(data) {
    const lastResultsHome = [];
    const lastResultsAway = [];
    let i = 1
    for (const match of data) {
        for(const j in match.events){
            i === 1 ? lastResultsHome.push(match.events[j].gameResult) : lastResultsAway.push(match.events[j].gameResult);
        }
        i++;
    }
    return {lastResultsHome, lastResultsAway}; 
}

function getStadisticsLeague(data) {

    const stadisticsHome = [];
    const stadisticsAway = [];

    if (data[0].statistics === undefined) {
        return {stadisticsHome: [], stadisticsAway: []};
    }

    let i = 1
    for (const match of data) {
        for (const j of match.statistics) {
          i === 1 ? stadisticsHome.push({[j.label]: j.displayValue}) : stadisticsAway.push({[j.label]: j.displayValue});
        }
        i++;
    }

    return {stadisticsHome, stadisticsAway};
}


function getHeadToHead(data, data2) {
    const idHomeTeam = data.teams[0].homeAway === "home" ? data.teams[0].team.id : data.teams[1].team.id;
    const idAwayTeam = data.teams[1].homeAway === "away" ? data.teams[1].team.id : data.teams[0].team.id;

    const headToHead = [];
    for (const match of data2.events) {
        let obj = {};

        if (match.homeTeamId === idHomeTeam && match.awayTeamId === idAwayTeam) {
            obj = {
                homeScore: match.homeTeamScore,
                awayScore: match.awayTeamScore,
                homeTeamAdvance: match.homeTeamAdvance,
                awayTeamAdvance: match.awayTeamAdvance
            };
        } else if (match.homeTeamId === idAwayTeam && match.awayTeamId === idHomeTeam) {
            obj = {
                homeScore: match.awayTeamScore,
                awayScore: match.homeTeamScore,
                homeTeamAdvance: match.awayTeamAdvance,
                awayTeamAdvance: match.homeTeamAdvance
            };
        }
        headToHead.push(obj);
    }
    return headToHead;
}

function interpolate(template, variables) {
    return new Function(...Object.keys(variables), `return \`${template}\`;`)(...Object.values(variables));
}

function getTeamOdds(data) {
    const teamOdds = [];
    let goalsLinear = {};

    for (const match of data) {

            if (Object.keys(match.bettingOdds.teamOdds.preMatchOverUnderHandicap).length > 0 && Object.keys(match.bettingOdds.teamOdds.preMatchGoalLineUnder).length > 0 && Object.keys(match.bettingOdds.teamOdds.preMatchGoalLineOver).length > 0) { 

                goalsLinear = {
                    handicap: match.bettingOdds.teamOdds.preMatchOverUnderHandicap.value,
                    under: {
                        probability: (1 / fractionalToDecimal(match.bettingOdds.teamOdds.preMatchGoalLineUnder.value) * 100).toFixed(2)
                    },
                    over: {
                        probability: (1 / fractionalToDecimal(match.bettingOdds.teamOdds.preMatchGoalLineOver.value) * 100).toFixed(2)
                    }
                };
            
            }

    }
    return {teamOdds, goalsLinear};
}

function getPlayerOdds(data) {
    let playerOddsFirstGoal = [];
    let playerOddsAnyTime = [];
    for (const match in data) {

            if (data[match].bettingOdds.playerOdds === undefined || Object.keys(data[match].bettingOdds.playerOdds).length === 0) {
                return {playerOddsFirstGoal: [], playerOddsAnyTime: []};
            }

            playerOddsFirstGoal = data[match].bettingOdds.playerOdds.preMatchFirstGoalScorer
            playerOddsAnyTime = data[match].bettingOdds.playerOdds.preMatchAnyTimeGoalScorer

            playerOddsFirstGoal = playerOddsFirstGoal
            .filter(player => player.value)
            .map(player => ({
                player: player.player,
                probability: (1 / fractionalToDecimal(player.value) * 100).toFixed(2)
            }))
            .sort((a, b) => b.probability - a.probability) 
            .slice(0, 10);

            playerOddsAnyTime = playerOddsAnyTime
            .filter(player => player.value)
            .map(player => ({
                player: player.player,
                probability: (1 / fractionalToDecimal(player.value) * 100).toFixed(2) 
            }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 10);           

        }
    return {playerOddsFirstGoal, playerOddsAnyTime};
}

const fractionalToDecimal = (fraction) => {
    const [num, den] = fraction.split("/").map(Number);
    return (num / den) + 1;
};


module.exports = {
    clearOddsObject,
    getHomeOdds,
    getDrawOdds,
    getAwayOdds,
    getLastResultsTeam,
    getStadisticsLeague,
    getHeadToHead,
    interpolate,
    getTeamOdds,
    getPlayerOdds
};