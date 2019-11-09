let searchResults = [];

function searchByUserLocation(userInput) {
  queryUrl =
    "https://api.foursquare.com/v2/venues/search?near=" +
    userInput +
    "%20WA&categoryId=4bf58dd8d48988d116941735&radius=1000&client_id=JQIY4W3MHQQLTPORXPCA2XJDIWTFHBZDTLJPO4F3IBWLH5NI&client_secret=TOTL05GAHJ5IFFA44YJL1HNPLB2HDABTV025VKIRNN34WYYV&v=20191105";

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
    getLatAndLong(searchResults);
    getMoreBarDetails(searchResults);
  }
}

function appendLocationDetailsToPage(locations) {
  for (let i = 0; i < locations.length; i++) {
    let barName = locations[i].name;
    let barAddress = locations[i].location.address;
    templateClone = $("#result-template")
      .clone()
      .appendTo("#bar-results");
    $(templateClone).attr("id", "template-" + i);
    $(templateClone)
      .find("#modal-target")
      .attr("data-target", "#modal-" + i);
    templateClone.attr("class", "bars");
    $(".bars").css("display", "block");

    let barModal = $("#portfolioModal1")
      .clone()
      .appendTo("#page-top");
    $(barModal).attr("id", "modal-" + i);
    $(barModal).attr("aria-labelledby", "modal-" + i + "Label");
    $(barModal)
      .find(".bar-names")
      .html(barName);
    $(barModal)
      .find(".bar-address")
      .html(barAddress);
  }
}

function getMoreBarDetails(locations) {
  for (let i = 0; i < locations.length; i++) {
    let venueId = locations[i].id;
    queryUrl =
      "https://api.foursquare.com/v2/venues/" +
      venueId +
      "?&client_id=GHTRMLUX0F5IQYOXBJUC2055AE0QB3YHCDKJ515HWZWVMSSA&client_secret=FFBQ2IP0B2XSBZL2DJO44HCGKV3QU535C3KN15FYPPMBIRBR&v=20191105";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response.venue.hours);
    });
  }
}

function getLatAndLong(locations) {
  for (let i = 0; i < locations.length; i++) {
    let latitude = searchResults[i].location.lat;
    let longitude = searchResults[i].location.lng;
    console.log(locations[i].name, latitude, longitude);
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
