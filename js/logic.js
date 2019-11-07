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
    appendLocationDetailsToPage(searchResults);
    getLatAndLong(searchResults);
  }
}

function appendLocationDetailsToPage(locations) {
  for (let i = 0; i < locations.length; i++) {
    let barNames = locations[i].name;
    
    let barPicture = $("#result-template").clone().appendTo("#bar-results");
    barPicture.attr("class", "bars");
    $(".bars").css("display", "block");

    let barModal = $("#portfolioModal1").clone().appendTo("#page-top")
    barModal.attr("class", "bar-modals");
  }
}

function getLatAndLong(locations) {
  for (let i = 0; i < locations.length; i++) {
    let latitude = searchResults[i].location.lat;
    let longitude = searchResults[i].location.lng;
    console.log(locations[i].name, latitude, longitude);
  }
}