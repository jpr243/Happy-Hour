function searchLocation(userInput) {
  queryUrl =
    "https://api.foursquare.com/v2/venues/search?near=" +
    userInput+
    "&categoryId=4bf58dd8d48988d116941735&radius=1000&client_id=JQIY4W3MHQQLTPORXPCA2XJDIWTFHBZDTLJPO4F3IBWLH5NI&client_secret=TOTL05GAHJ5IFFA44YJL1HNPLB2HDABTV025VKIRNN34WYYV&v=20191105";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    let results = response.response.venues;
    console.log(queryUrl);
    console.log(results);
  });
}
