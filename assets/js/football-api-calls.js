// Football Predictions API homepage: https://developer.boggio-analytics.com/
// Stuff we can do with this API: https://developer.boggio-analytics.com/getting-started/api-endpoints#predictions

// API authentication
const rapidAPIkey = 'e311795265msh0e94ea9e73557abp1cb864jsn0a54197a68b2';
const rapidAPIhost = 'football-prediction-api.p.rapidapi.com';

// DOM variables
const getMatches = $("#upcomingBtn");
const upcomingContainer = $("#upcomingContainer");

var matchHTML = "";

// Function to use Predictions endpoint to get predictions for all matches in the next 48 hours
function getPredictions() {
    const Predictions = 'https://football-prediction-api.p.rapidapi.com/api/v2/predictions?federation=UEFA';
    
    fetch(Predictions, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": rapidAPIkey,
            "x-rapidapi-host": rapidAPIhost
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var upcomingMatchCount = 0;
        var dataArray = data.data;
        dataArray.forEach(function(match) {
            if (match.competition_name == 'Premier League' && match.competition_cluster == 'England') {
                upcomingMatchCount += 1;
                var awayTeam = match.away_team;
                var homeTeam = match.home_team;
                var matchDate = match.start_date;
                var homeOdds = match.odds['1'];
                var awayOdds = match.odds['2'];
        
                matchHTML += `<div class="card col-4 mx-2">
                        <div class="card-body upcoming-match">
                        <h5 class="card-title">${awayTeam} @ ${homeTeam}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${matchDate}</h6>
                        <p class="card-text">${homeTeam} Odds: ${homeOdds}</p>
                        <p class="card-text">${awayTeam} Odds: ${awayOdds}</p>
                        <p class="card-text text-muted">Stats</p>
                        <a href="#" class="card-link">${homeTeam}</a>
                        <a href="#" class="card-link">${awayTeam}</a>
                        <a href="#" class="card-link block-link">Head-to-Head</a>
                        </div>
                        </div>
                `;
            }
        })
        if (upcomingMatchCount === 0) {
            matchHTML += 
            `<div class="card col-4 mx-2">
            <div class="card-body upcoming-match">
            <h5 class="card-title">No Upcoming Games</h5>
            <p>Please take a look around and check back tomorrow!</p>
            </div>
            </div>
            `
        }

        upcomingContainer.append(matchHTML);

    })
}

getMatches.click(getPredictions);