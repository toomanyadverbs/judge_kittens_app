To run ruby server:
ruby -run -e httpd . -p3000

rails server -p3000
// Take 1:

$.ajax({
  type: 'GET',
  url: 'http://localhost:5000/cat/1'
}).done(function(response) {
  var cat = JSON.parse(response);
  var newImg = $("#pictureDiv").append("img");
  newImg.src = response.pic
});

// Take 2;

// assumptions:
// spans with ids cat-name-one and cat-name-two exist
// spans with ids cat-owner-one and cat-owner-two exist
// img tags with id cat-image-one and cat-image-two exist

// <div class="cat"><p><span id="cat-name-one"></span><br/>
// Owned by <span id="cat-owner-one"></p>
// <img id="cat-image-one" src="">

var loadCat = function (position, id) {
    var catNameId = '#cat-name-' + position;
    var catOwnerId = '#cat-owner-' + position;
    var catImageId = '#cat-image-' + position;

    $.ajax({
      type: GET,
      url: 'http://localhost:5000/cat/' + id
  }).done(function(response) {
    // we expect response to be a JSON string which, when parsed,
    // represents our cat.
    var cat = JSON.parse(response);
    $(catNameId).text(cat.name);
    $(catOwnerId).text(cat.owner);
    $(catImageId).attr("src", cat.pic);
      }).fail(function(error){
        console.log('GET /cat/:id call failed, error is ' + error);
    });
};

loadCat('one', 3);
loadCat('two', 17);
