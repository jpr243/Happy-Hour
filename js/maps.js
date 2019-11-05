function searchLocation(userInput) {
  searchTerm = userInput;
  queryUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    userInput +
    ".json?types=poi&access_token=pk.eyJ1IjoibWFkZGllY2xhcmUiLCJhIjoiY2syaDVobmM3MDZlYzNob2h3dXZoZWM3MiJ9.OAX_vNLH05xN2n1612UXkQ";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    let results = response.features;
    console.log(queryUrl);
    console.log(results);
  });
}
