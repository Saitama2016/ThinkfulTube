const youTubeSearchURL = "https://www.googleapis.com/youtube/v3/search";

//Create HTML Template for thumbnail image
let resultHTMLTemplate = (
  "<div>" + 
    "<a class='jsImageLink' href=''><img class='jsImage' src=''></a>" +
  "</div>"
);

//Create a function that takes a searchTerm and callback to get data from YouTube API 
function getDataFromAPI(searchTerm, callback){
  const query = {
    part: 'snippet',
    key: "AIzaSyBiDppWQpU3tOHpil2Yyyj-O8Ctm55e2l8",
    q: `${searchTerm} in:name`
  }
  //Get JSON from YouTube search URL, query, and callback
  $.getJSON(youTubeSearchURL, query, callback);
}

//Render thumbnail with HTML Template
function renderResult(result) {
  let template = $(resultHTMLTemplate);
  template.find(".jsImage").attr("src", result.snippet.thumbnails.medium.url);
  template.find(".jsImageLink").attr("href", "https://www.youtube.com/watch?v=" + result.id.videoId);
  return template;
}

//Create a function to display search results by taking data from YouTube
function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult (item));
  $('.jsSearchResults').html(results);
}

//Use an event listener to list results from the query after clicking submit
function watchSubmit() {
  $('.jsSearchForm').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.jsQuery');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromAPI(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);