//dom variables
let soccerAPI = $(".soccerapi");
let highlights = $(".highlight-vids");
let team1 = $(".team1");
let team2 = $(".team2");
let videoTarget = $("#videoTarget");
getHighlights();

function getHighlights() {
  const url = "https://www.scorebat.com/video-api/v1/";

  fetch(url, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      processHighlights(data);
    });
}
function processHighlights(data) {
  let onlyPremierLeague = data.filter(function (item) {
    // console.log(item);
    let competitionName = item.competition.name;
    // console.log(competitionName);
    if (competitionName === "ENGLAND: Premier League") {
      return true;
    } else {
      return false;
    }
  });
  console.log(onlyPremierLeague);
  let match = onlyPremierLeague[rand(0, onlyPremierLeague.length)];
  let html = match.videos[0].embed;
  videoTarget.html(html);
  //   console.log(side1, side2);
  let name1 = match.side1.name;
  console.log(name1);
  let name2 = match.side2.name;
  console.log(name2);
  team1.text(name1);
  team2.text(name2);
}

function rand(low, high) {
  let diff = high - low;
  return Math.floor(Math.random() * diff) + low;
}
