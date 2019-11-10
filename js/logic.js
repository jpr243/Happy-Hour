let searchResults = [];
let arrPhotoURL = [];
let restFotes = [];

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
    // let lat = response.response.venues[0].location.lat;
    // let lng = response.response.venues[0].location.lng;
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
      "?&client_id=LXW4D1FR20T23BWGUZEGLJHBLPHZOYB2XXRFUK233JM0KHJD&client_secret=1NHWFLIFEX1RDNFRDPN4TL04GW0LO4SLWXBFWOGB31BD2K3H&v=20191105";

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
    // arrPhotoURL[i] = getPhotos(locations[i].name); //array that contains the photo for the bar chosen
    getZomPub(locations[i].name, i);
    arrPhotoURL[i] = restFotes.slice(0);
    restFotes = [];
  }
  console.log("Final array of photo urls: " + arrPhotoURL);
}

function getZomPub(pubName, i) {  //even with the precise name input to the api, zomato still returns multiple establishments
                                  //so this function filters the Zomato results for the exact pub
  let queryURL = "https://developers.zomato.com/api/v2.1/search?q='" + pubName + "'";
  // let restFotes;
  console.log(queryURL);
  $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "user-key": "7c5b101b634a31bcfcda3cf933e803ba" }

  }).done(function(respZomato){  //iterate through the 
    console.log(respZomato);
    $.each(respZomato.restaurants, function(j, pubDeets){  //loop through the list of potentially matching restaurants
                                                           //to find the exact match using regex .test function

      let testName = new RegExp(pubDeets.restaurant.name);  //create a regular expression of the name of the current restaurant from the Zomato API
      if (testName.test(pubName)) {   //regex test if the Zomato restaurant name matches the name from foursquare
        console.log("regex works for " + pubName + ".");
        // restFotes = getPhotoPub(pubDeets, i)  //call function to retrieve the Zomato photos
        getPhotoPub(pubDeets);
        return false;
      }
    })
  })
  // return restFotes;
}

function getPhotoPub(pubDeets) {  //iterate through the object containing the photos for each matching restaurant in Zomato 
  $.each(pubDeets.restaurant.photos, function(j, fote) {
    // console.log(fote.photo.url);
    // let foteURL = fote.photo.url;
    // console.log(foteURL);
    // console.log(restFotes);
    restFotes[j] = fote.photo.url;
  })
  console.log(restFotes);
}
