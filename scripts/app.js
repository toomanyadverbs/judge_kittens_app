/*global judgeKittens, $*/
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
    url: 'http://localhost:5000/Cats/6'
  }).done(function(response) {
  var cat = JSON.parse(response);
  var newImg = $("#catOne").append("img");
  newImg.src = response.pic
  });


  $(".cuteToggle").click(function(){
    $("div").find(".selectedJudgement").addClass("col-md-3").removeClass("selectedJudgement col-md-5");
    $(this).removeClass("col-md-3").addClass("selectedJudgement col-md-5");
    $("div").find(".toggle").removeClass("maj").addClass("cute");
    $("div").find(".toggleQuestion").html("<h5>Which cat is cuter?</h5>")
  });

  $(".majToggle").click(function(){
    $("div").find(".selectedJudgement").addClass("col-md-3").removeClass("selectedJudgement");
    $(this).removeClass("col-md-3").addClass("selectedJudgement col-md-5");
    $("div").find(".toggle").removeClass("cute").addClass("maj");
    $("div").find(".toggleQuestion").html("<h5>Which cat is more majestic?</h5>")
  });


}); //<-document ready
