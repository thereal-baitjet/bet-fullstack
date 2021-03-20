//dom variables
let soccerAPI = $("#soccerapi");
let highlights = $("#highlight-vids");
let team1 = $("#team1");
let team2 = $("#team2");

function getHighlights() {
  const highlights = "https://www.scorebat.com/video-api/v1/";

  fetch(highlights, {
    method: "GET",
  }).then(function (response) {
    return response.json();
  });
}
