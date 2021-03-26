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
        console.log(dataArray);
        for (var i=0; i<3; i++) {
            var match = dataArray[i]
            upcomingMatchCount += 1;
            var id = match.id;
            var awayTeam = match.away_team;
            var homeTeam = match.home_team;
            var matchDate = match.start_date;
            var homeOdds = match.odds['1'];
            var awayOdds = match.odds['2'];
    
            matchHTML += `<div class="card col-4 data-card-no=${i}">
                    <div class="card-body upcoming-match">
                    <h5 class="card-title">${awayTeam} @ ${homeTeam}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${matchDate}</h6>
                    <p class="card-text">Odds of ${homeTeam} Victory: ${homeOdds}</p>
                    <p class="card-text">Odds of ${awayTeam} Victory: ${awayOdds}</p>
                    <p class="card-text text-muted">Stats</p>
                    <a href="#" class="card-link">${homeTeam}</a>
                    <a href="#" class="card-link block-link">Head-to-Head</a>
                    <a href="#" class="card-link">${awayTeam}</a>
                    </div>
                    </div>
            `;
        }
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

function getHomeStats(id) {
    const HomeStats = `https://football-prediction-api.p.rapidapi.com/api/v2/home-league-stats/${id}`;
    
    fetch(HomeStats, {
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
        console.log(data);
    })
}

function getAwayStats(id) {
    const AwayStats = `https://football-prediction-api.p.rapidapi.com/api/v2/home-league-stats/${id}`;
    
    fetch(AwayStats, {
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
        console.log(data);
    })
}

function getHeadToHead(id) {
    const HeadtoHead = `https://football-prediction-api.p.rapidapi.com/api/v2/home-league-stats/${id}`;
    
    fetch(HeadtoHead, {
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
        console.log(data);
    })
}

function getIDs() {
    const Predictions = `https://football-prediction-api.p.rapidapi.com/api/v2/get-list-of-fixture-ids`;
    
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
        console.log(data);
    })
}

getMatches.click(getPredictions);

// event listener (delegated) on links
// send associated ID to correct API
// wipe out card content and show API content