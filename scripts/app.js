/* global judgeKittens */
"use strict";

//define global variable
var judgeKittens = judgeKittens || {};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


//call functions after document is ready
$(document).ready(function(){

//getRandomInt(Cat.first[id], Cat.last[id])

    $.ajax({
      type: 'GET',
      url: 'https://floating-refuge-2919.herokuapp.com/Cats/1'
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

  $(".cuteToggle").click(function(){
    $("div").find(".selectedJudgement").addClass("col-md-3").removeClass("selectedJudgement col-md-5");
    $(this).removeClass("col-md-3").addClass("selectedJudgement col-md-5");
    $("div").find(".toggle").removeClass("maj").addClass("cute");
    $("div").find(".toggleQuestion").html("<h5>Which cat is cuter?</h5>")
  });

  $(".majToggle").click(function(){
    $("div").find(".selectedJudgement").addClass("col-md-3").removeClass("selectedJudgement col-md-5");
    $(this).removeClass("col-md-3").addClass("selectedJudgement col-md-5");
    $("div").find(".toggle").removeClass("cute").addClass("maj");
    $("div").find(".toggleQuestion").html("<h5>Which cat is more majestic?</h5>")
  });


}); //<-document ready
