let searchResults = [];
let arrPhotoURL = [];
let restFotes = [];

// Searches by user input and returns bars in WA within 1km.
function searchByUserLocation(userInput) {
  queryUrl =
    "https://api.foursquare.com/v2/venues/search?near=" +
    userInput +
    "%20WA&categoryId=4bf58dd8d48988d116941735&radius=1000&client_id=JQIY4W3MHQQLTPORXPCA2XJDIWTFHBZDTLJPO4F3IBWLH5NI&client_secret=TOTL05GAHJ5IFFA44YJL1HNPLB2HDABTV025VKIRNN34WYYV&v=20191105";

  $.ajax({
    url: queryUrl,
    method: "GET",
    datatype: "json",
    success: showResults,
    error: noResultsFound
  });

  // If query returns response, get results and call append functions.
  function showResults(response) {
    searchResults = response.response.venues;
    console.log(queryUrl);
    // let lat = response.response.venues[0].location.lat;
    // let lng = response.response.venues[0].location.lng;
    appendLocationDetailsToPage(searchResults);
    getMoreBarDetails(searchResults);
  }

  // If no response, display error message in HTML.
  function noResultsFound() {
    let noResultsDiv = $("#portfolio").append("<div>");
    let noResultsAlert = $(noResultsDiv).append("<p>");
    $(noResultsAlert).html("No results found :(");
    $(noResultsAlert).attr("id", "no-results-message");
  }
}

// Appends results and modals dynamically to page.
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

// New ajax query for venue hours and phone number where available.
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
      console.log(queryUrl);

      let venueHours = response.response.venue.hours.status;
      console.log(venueHours);

      let contactDetails = response.response.venue.contact.formattedPhone;
      console.log(contactDetails);

      appendOpeningHoursAndContactDetails({
        loop: i,
        hours: venueHours,
        contact: contactDetails,
      });
    });
  }
}

function getLatAndLong(locations) {
  for (let i = 0; i < locations.length; i++) {
    let latitude = searchResults[i].location.lat;
    let longitude = searchResults[i].location.lng;
    console.log(locations[i].name, latitude, longitude);
    getZomPub(locations[i].name, i);
    arrPhotoURL = [ {pub: "Captain Stirling Hotel",
                     photos: ["https://b.zmtcdn.com/data/reviews_photos/937/57a80e1814c8b8dfa6c32dbf38989937_1509103086.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/82d/c3951ddbe030e535b981e85800a6182d_1500722823.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/c0e/3323b1472c566f817ccf2d33ffe7fc0e_1509103092.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/5a9/1476432470eef009ef3438915d6125a9_1509103091.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/c18/c25818e78a453a1cdd708ff6815d4c18_1500722823.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/13f/131214b7a4d7b45c198903900a17013f_1509103089.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/1ec/aef644c75249d421c44e4d2a03f551ec_1500722824.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/852/5f4d0600df9a1711caf58b53af2f0852_1500722824.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/253/5aef167df8e3bb352dada47fc6555253_1500722822.jpg"
                     ,"https://b.zmtcdn.com/data/reviews_photos/e9b/1e07183e6b7d2ed86b633f8429860e9b_1500722824.jpg"]},
                    {pub: "Varsity Bar", 
                    photos: ["https://b.zmtcdn.com/data/reviews_photos/dd7/fd3a2450069eb37f3f2d4ef91786bdd7_1571983140.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/82d/c3951ddbe030e535b981e85800a6182d_1500722823.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/c0e/3323b1472c566f817ccf2d33ffe7fc0e_1509103092.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/5a9/1476432470eef009ef3438915d6125a9_1509103091.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/c18/c25818e78a453a1cdd708ff6815d4c18_1500722823.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/13f/131214b7a4d7b45c198903900a17013f_1509103089.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/1ec/aef644c75249d421c44e4d2a03f551ec_1500722824.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/852/5f4d0600df9a1711caf58b53af2f0852_1500722824.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/253/5aef167df8e3bb352dada47fc6555253_1500722822.jpg"
                    ,"https://b.zmtcdn.com/data/reviews_photos/e9b/1e07183e6b7d2ed86b633f8429860e9b_1500722824.jpg"]}
                    ,{pub: "The Mount", 
                      photos: []}]

    // arrPhotoURL[i] = restFotes.slice(0);
    restFotes = [];
  }}
// Appends results from getMoreBarDetails function to existing modals.
function appendOpeningHoursAndContactDetails(inputs) {
  // inputs = {loop: i, hours: venueHours, contact: contactDetails}
  if (inputs.hours !== undefined) {
    $("#modal-" + inputs.loop)
      .find("#bar-hours")
      .html(inputs.hours);
  } else {
    $("#modal-" + inputs.loop)
      .find("#bar-hours")
      .html("No opening hours available");
  }

  if (inputs.contact !== undefined) {
    $("#modal-" + inputs.loop)
      .find("#bar-phone")
      .html(inputs.contact);
  } else {
    $("#modal-" + inputs.loop)
      .find("#bar-phone")
      .html("No contact details available");
  }
}

function getZomPub(pubName, i) {  //even with the precise name input to the api, zomato still returns multiple establishments
                                  //so this function filters the Zomato results for the exact pub
  let queryURL = "https://developers.zomato.com/api/v2.1/search?q='" + pubName + "'";
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
        getPhotoPub(pubDeets);
        return false;
      }
    })
  })
}

function getPhotoPub(pubDeets) {  //iterate through the object containing the photos for each matching restaurant in Zomato 
  $.each(pubDeets.restaurant.photos, function(j, fote) {
    restFotes[j] = fote.photo.url;
  })
  console.log(restFotes);
}
  
