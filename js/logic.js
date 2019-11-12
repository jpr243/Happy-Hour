let searchResults = [];
let arrPhotoURL = [];
let restFotes = {};

// Searches by user input and returns bars in WA within 1km.
function searchByUserLocation(userInput) {
  queryUrl =
    "https://api.foursquare.com/v2/venues/search?near=" +
    userInput +
    "%20WA&categoryId=4bf58dd8d48988d116941735&radius=1000&limit=5&client_id=LXW4D1FR20T23BWGUZEGLJHBLPHZOYB2XXRFUK233JM0KHJD&client_secret=1NHWFLIFEX1RDNFRDPN4TL04GW0LO4SLWXBFWOGB31BD2K3H&v=20191105";

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
    appendLocationDetailsToPage(searchResults);
    // getPubPhotos(searchResults);
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
    
    getPubPhotos(locations)
  }
}

// New ajax query for venue hours and phone number where available.
function getMoreBarDetails(locations) {
  for (let i = 0; i < locations.length; i++) {
    let venueId = locations[i].id;
    queryUrl =
      "https://api.foursquare.com/v2/venues/" +
      venueId +
      "?&client_id=CVLB2JMHWA0N40KS4OYWLBJRT0OUIV5OOJE5RPFX3BEZXFKT&client_secret=UPTXBIFIG5XNITT4XJZTL0EBYDRQ0H1VGV2Q5GC1PYPKCEZ1&v=20191105";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

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

function appendImagesToModal(photo, i) {
  let barImage = $("#modal-" + i).find("#bar-image");
  $(barImage).attr("src", photo);
  console.log("Appended");
}

function getPubPhotos(locations) {
  for (let i = 0; i < locations.length; i++) {
    console.log(locations[i].name);
    getZomPub(locations[i].name, i);
  }
}


function appendOpeningHoursAndContactDetails(i, hours, contact) {
  if (hours !== undefined) {
    $("#modal-" + i)
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
        restFotes = {pub: pubName};
        getPhotoPub(pubDeets, i);
        return false;
      }
    })
    //populate the array containing the pub and photo objects
    if (restFotes.pub !== undefined) {
      console.log(restFotes.pub);
      arrPhotoURL[i] = restFotes;
    }
    restFotes = {};
    console.log(arrPhotoURL);
  })
}

function getPhotoPub(pubDeets, i) {  //iterate through the object containing the photos for each matching restaurant in Zomato
  let photo = [];
  // $.each(pubDeets.restaurant.photo, function(j, fote) {
    photo = pubDeets.restaurant.photos[0].photo.url;
    appendImagesToModal(photo, i);
  }
  
