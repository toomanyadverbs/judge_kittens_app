/*global ticTacToe, $*/
"use strict";

//define global variable
var judgeKittens = judgeKittens || {};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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

}); //<-document ready
