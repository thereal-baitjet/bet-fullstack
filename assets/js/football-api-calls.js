// Football Predictions API homepage: https://developer.boggio-analytics.com/
// Stuff we can do with this API: https://developer.boggio-analytics.com/getting-started/api-endpoints#predictions

// API authentication
const rapidAPIkey = 'e311795265msh0e94ea9e73557abp1cb864jsn0a54197a68b2';
const rapidAPIhost = 'football-prediction-api.p.rapidapi.com';

// DOM variables
const heroDiv = $("#hero");

// Function to use Predictions endpoint to get predictions for all matches in the next 48 hours
function getPredictions() {
    const Predictions = 'https://football-prediction-api.p.rapidapi.com/api/v2/predictions';
    
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
        console.log(data.data[0]);
        var awayTeam = data.data[0].away_team;
        var homeTeam = data.data[0].home_team;
        var matchDate = data.data[0].start_date;
        var homeOdds = data.data[0].odds['1'];
        var awayOdds = data.data[0].odds['2'];

        matchHTML = `
        <div class="card">
            <div class="card-body upcoming-match">
                <h5 class="card-title">${awayTeam} @ ${homeTeam}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${matchDate}</h6>
                <p class="card-text">Odds of ${homeTeam} Victory: ${homeOdds}</p>
                <p class="card-text">Odds of ${awayTeam} Victory: ${awayOdds}</p>
                <a href="#" class="card-link">Stats for ${homeTeam}</a>
                <a href="#" class="card-link">Stats for ${awayTeam}</a>
            </div>
        </div>
        `

        heroDiv.append(matchHTML);
    })
}

getPredictions();