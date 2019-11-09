let searchResults = [];

function searchByUserLocation(userInput) {
  queryUrl =
    "https://api.foursquare.com/v2/venues/search?near=" +
    userInput +
    "&categoryId=4bf58dd8d48988d116941735&radius=1000&client_id=JQIY4W3MHQQLTPORXPCA2XJDIWTFHBZDTLJPO4F3IBWLH5NI&client_secret=TOTL05GAHJ5IFFA44YJL1HNPLB2HDABTV025VKIRNN34WYYV&v=20191105";

  $.ajax({
    url: queryUrl,
    method: "GET",
    datatype: "json",
    success: showResults
  });

  function showResults(response) {
    searchResults = response.response.venues;
    console.log(queryUrl);
    let lat = response.response.venues[0].location.lat;
    let lng = response.response.venues[0].location.lng;
    appendLocationDetailsToPage(searchResults);
    getPhotos(lat, lng);
  }
}

function appendLocationDetailsToPage(locations) {
  for (let i = 0; i < locations.length; i++) {
    console.log(locations[i].name);
  }
}

function getPhotos(lat, lng) {
  let queryURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&q=" + suburb + "&cuisines=bar%2C%20pub%2C%20nightlife";
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { "user-key": "7c5b101b634a31bcfcda3cf933e803ba" }
    }).then(function(response){
        ajaxResponse = response;
        console.log(response);
        showPhotos();
    })
}
