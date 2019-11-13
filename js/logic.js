let searchResults = [];
let arrPhotoURL = [];
let restFotes = {};

$("#modal-validate").modal({ show: false });

// validateUserLocation
function validateUserLocation(userInput) {
  let listOfSubarbs = [
    "alexander heights",
    "alfred cove",
    "alkimos",
    "anketell",
    "applecross",
    "ardross",
    "armadale",
    "ascot",
    "ashby",
    "ashfield",
    "attadale",
    "atwell",
    "aubin grove",
    "aveley",
    "bailup",
    "balcatta",
    "baldivis",
    "balga",
    "ballajura",
    "banjup",
    "banksia grove",
    "baskerville",
    "bassendean",
    "bateman",
    "bayswater",
    "beaconsfield",
    "beckenham",
    "bedford",
    "bedfordale",
    "beechboro",
    "beechina",
    "beeliar",
    "beldon",
    "belhus",
    "bellevue",
    "belmont",
    "bennett springs",
    "bentley",
    "bertram",
    "bibra lake",
    "bickley",
    "bicton",
    "booragoon",
    "boya",
    "brabham",
    "brentwood",
    "brigadoon",
    "brookdale",
    "bull creek",
    "bullsbrook",
    "burns beach",
    "burswood",
    "butler",
    "byford",
    "calista",
    "camillo",
    "canning vale",
    "cannington",
    "carabooda",
    "cardup",
    "carine",
    "carlisle",
    "carmel",
    "carramar",
    "casuarina",
    "caversham",
    "champion lakes",
    "chidlow",
    "churchlands",
    "city beach",
    "claremont",
    "clarkson",
    "clifton park",
    "cloverdale",
    "cockburn central",
    "como",
    "connolly",
    "coogee",
    "coolbellup",
    "coolbinia",
    "cooloongup",
    "cottesloe",
    "craigie",
    "crawley",
    "cullacabardee",
    "currambine",
    "daglish",
    "dalkeith",
    "darch",
    "darling downs",
    "darlington",
    "dayton",
    "dianella",
    "doubleview",
    "duncraig",
    "east cannington",
    "east fremantle",
    "east perth",
    "east rockingham",
    "east victoria park",
    "eden hill",
    "edgewater",
    "eglinton",
    "ellenbrook",
    "embleton",
    "ferndale",
    "floreat",
    "forrestdale",
    "forrestfield",
    "fremantle",
    "garden island",
    "gidgegannup",
    "girrawheen",
    "glen forrest",
    "glendalough",
    "gnangara",
    "golden bay",
    "gooseberry hill",
    "gosnells",
    "greenmount",
    "greenwood",
    "guildford",
    "gwelup",
    "hacketts gully",
    "hamersley",
    "hamilton hill",
    "hammond park",
    "harrisdale",
    "haynes",
    "hazelmere",
    "heathridge",
    "helena valley",
    "henderson",
    "henley brook",
    "herne hill",
    "high wycombe",
    "highgate",
    "hilbert",
    "hillarys",
    "hillman",
    "hilton",
    "hocking",
    "hope valley",
    "hopeland",
    "hovea",
    "huntingdale",
    "illawarra",
    "iluka",
    "inglewood",
    "innaloo",
    "jandabup",
    "jandakot",
    "jane brook",
    "jarrahdale",
    "jindalee",
    "jolimont",
    "joondalup",
    "joondanna",
    "kalamunda",
    "kallaroo",
    "karawara",
    "kardinya",
    "karnup",
    "karragullen",
    "karrakatta",
    "karrakup",
    "karrinyup",
    "kelmscott",
    "kelscott",
    "kensington",
    "kenwick",
    "kewdale",
    "keysbrook",
    "kiara",
    "kings park",
    "kingsley",
    "kinross",
    "koondoola",
    "koongamia",
    "kwinana beach",
    "kwinana town centre",
    "landsdale",
    "langford",
    "lathlain",
    "leda",
    "leederville",
    "leeming",
    "lesmurdie",
    "lexia",
    "lockridge",
    "lynwood",
    "maddington",
    "madeley",
    "mahogany creek",
    "maida vale",
    "malaga",
    "mandogalup",
    "mandurah quays",
    "manning",
    "marangaroo",
    "mardella",
    "mariginiup",
    "marmion",
    "martin",
    "maylands",
    "medina",
    "melville",
    "menora",
    "merriwa",
    "middle swan",
    "midland",
    "midvale",
    "millendon",
    "mindarie",
    "mirrabooka",
    "morley",
    "mosman park",
    "mount claremont",
    "mount hawthorn",
    "mount helena",
    "mount lawley",
    "mount nasura",
    "mount pleasant",
    "mount richon",
    "mullaloo",
    "mundaring",
    "mundijong",
    "munster",
    "murdoch",
    "myaree",
    "naval base",
    "nedlands",
    "neerabup",
    "nollamara",
    "noranda",
    "north beach",
    "north coogee",
    "north fremantle",
    "north lake",
    "north perth",
    "northbridge",
    "nowergup",
    "oakford",
    "ocean reef",
    "o'connor",
    "oldbury",
    "orange grove",
    "orelia",
    "osborne park",
    "padbury",
    "palmyra",
    "parkerville",
    "parkwood",
    "parmelia",
    "paulls valley",
    "pearsall",
    "peppermint grove",
    "peron",
    "perth (cbd)",
    "perth airport",
    "piara waters",
    "pickering brook",
    "piesse brook",
    "pinjar",
    "port kennedy",
    "postans",
    "queens park",
    "quinns rocks",
    "redcliffe",
    "reservoir",
    "ridgewood",
    "riverton",
    "rivervale",
    "rockingham",
    "rockingham beach",
    "roleystone",
    "rossmoyne",
    "rottnest island",
    "safety bay",
    "salter point",
    "samson",
    "sawyers valley",
    "scarborough",
    "secret harbour",
    "serpentine",
    "seville grove",
    "shelley",
    "shenton park",
    "shoalwater",
    "sinagra",
    "singleton",
    "sorrento",
    "south fremantle",
    "south guildford",
    "south lake",
    "south perth",
    "southern river",
    "spearwood",
    "st james",
    "stirling",
    "stoneville",
    "stratton",
    "subiaco",
    "success",
    "swan view",
    "swanbourne",
    "tapping",
    "the lakes",
    "the spectacles",
    "the vines",
    "thornlie",
    "trigg",
    "tuart hill",
    "two rocks",
    "upper swan",
    "victoria park",
    "viveash",
    "waikiki",
    "walliston",
    "wandi",
    "wangara",
    "wanneroo",
    "warnbro",
    "warwick",
    "waterford",
    "watermans bay",
    "wattle grove",
    "wattleup",
    "wellard",
    "welshpool",
    "wembley",
    "wembley downs",
    "west leederville",
    "west perth",
    "west swan",
    "westfield",
    "westminster",
    "whitby",
    "white gum valley",
    "whiteman",
    "willagee",
    "willetton",
    "wilson",
    "winthrop",
    "woodbridge",
    "woodlands",
    "woodvale",
    "wooroloo",
    "wungong",
    "yanchep",
    "yangebup",
    "yokine"
  ];

  let userInputLower = userInput.toLowerCase();

  if (listOfSubarbs.includes(userInputLower)) {
    searchByUserLocation(userInput);
  }
  else {
    $("#modal-validate").modal("show");
  }
}

// Searches by user input and returns bars in WA within 1km.
function searchByUserLocation(userInput) {
  queryUrl =
    "https://api.foursquare.com/v2/venues/search?near=" +
    userInput +
    "%20WA&categoryId=4bf58dd8d48988d116941735&radius=1000&client_id=LXW4D1FR20T23BWGUZEGLJHBLPHZOYB2XXRFUK233JM0KHJD&client_secret=1NHWFLIFEX1RDNFRDPN4TL04GW0LO4SLWXBFWOGB31BD2K3H&v=20191105";

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
    appendPubPhotos(searchResults);
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
        contact: contactDetails
      });
    });
  }
}

function appendOpeningHoursAndContactDetails(i, hours, contact) {
  if (hours !== undefined) {
    $("#modal-" + i);
    restFotes = [];
  }
}
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

function appendPubPhotos(searchResults) {
  searchResults.forEach((pub, index) => {
    console.log("Getting photos for " + pub.name);
    console.log(pub);
    getZomatoPhotos(pub.name, pub.location.lat, pub.location.lng, index, 0);
  });
}

function getZomatoPhotos(pubName, latitude, longitude, index, zomatoCycle) {
  console.log("Latitude: " + latitude + " Longitude: " + longitude);
  console.log("zomatoCycle: " + zomatoCycle);
  if (zomatoCycle == 1) {
    console.log("Couldn't find match in Zomato.");
    console.table(comparisons);
  } else {
    let queryURL =
      "https://developers.zomato.com/api/v2.1/search?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&start=" +
      zomatoCycle * 20 +
      "&sort='real_distance'&radius=100&order='asc'&q='" +
      pubName.replace(/[^a-zA-Z0-9-_]/g, " ") +
      "'";
    //let queryURL = "https://developers.zomato.com/api/v2.1/search?=" + latitude +"&lon="+longitude+"&start="+zomatoCycle*20+"&radius=5";
    //let queryURL = "https://developers.zomato.com/api/v2.1/locations?lat=" + latitude +"&lon="+longitude+"&query='"+pubName+"'"+"&count=20";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "user-key": "7c5b101b634a31bcfcda3cf933e803ba" }
    }).done(zomatoPhotosResponse =>
      processZomatoPhotos(
        zomatoPhotosResponse,
        pubName,
        index,
        zomatoCycle,
        latitude,
        longitude
      )
    );
  }
}

function processZomatoPhotos(zomatoPhotosResponse, pubName, index) {
  console.log("Processing Zomato response: ");
  console.log(zomatoPhotosResponse);

  for (let i = 0; i < zomatoPhotosResponse.restaurants.length; i++) {
    let zomatoRestaurant = zomatoPhotosResponse.restaurants[i];
    if (isItTheActualPub(zomatoRestaurant, pubName)) {
      let zomatoPhotoArray = zomatoRestaurant.restaurant.photos;
      appendZomatoImagesToModal({
        zomatoPhotoArray: zomatoPhotoArray,
        pubName: pubName,
        index: index
      });
      appendZomatoImagesToCards({
        zomatoPhotoArray: zomatoPhotoArray,
        pubName: pubName,
        index: index
      });
      break;
    }
  }
}

function isItTheActualPub(zomatoRestaurant, pubName) {
  console.log(
    "Comparing " + zomatoRestaurant.restaurant.name + " and " + pubName
  );

  let stringSimilarity = stringSimilarityFunction(
    zomatoRestaurant.restaurant.name,
    pubName
  );
  if (stringSimilarity < 5) {
    console.log("Similar strings!" + stringSimilarity);
    return true;
  } else {
    console.log("Not similar strings: " + stringSimilarity);
    return false;
  }
}

function appendZomatoImagesToModal(inputs) {
  console.log("Appending to modal");
  console.log(inputs);

  let imageDiv = $("#modal-" + inputs.index).find("#bar-image");

  imageDiv.attr("src", inputs.zomatoPhotoArray[0].photo.url);
  console.log("Successfully appended to modal");
}

function appendZomatoImagesToCards(inputs) {
  console.log("Appending to card");

  let imagePreview = $("#template-" + inputs.index).find("#preview-image");

  imagePreview.attr("src", inputs.zomatoPhotoArray[0].photo.url);
  console.log("Successfully appended to card");
}

// Compute the edit distance between the two given strings
function stringSimilarityFunction(a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}
