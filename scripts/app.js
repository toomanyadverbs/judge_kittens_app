/* global judgeKittens */
"use strict";

//define global variable
var judgeKittens = judgeKittens || {};

//Random Integer func to get random cat pics:
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function getTwoRandomInt(min, max) {
  var first = Math.floor(Math.random() * (max - min)) + min;
  do {var second = Math.floor(Math.random() * (max - min)) + min }
  while (first === second);
  return {
      first: first,
      second: second,
  }
}

var randomIntegers = getTwoRandomInt(1, 15);
var first = randomIntegers.first;
var second = randomIntegers.second;

//call functions after document is ready
$(document).ready(function(){

var backEndUrl = 'http://localhost:3000/'
var catUrl = backEndUrl + 'cats/'
var catUrlOne = catUrl + first;
var catUrlTwo = catUrl + second


//TO STORE Cats in browser:
  // constructor function for a Cat
  // function Cat(id, name, owner, pic, ct_jdgmts_cute, ct_wins_cute, ct_jdgmts_maj, ct_wins_maj){
  //   this.id = id;
  //   this.name = name;
  //   this.owner = owner;
  //   this.pic = pic;
  //   this.ct_jdgmts_cute = ct_jdgmts_cute;
  //   this.ct_wins_cute = ct_wins_cute;
  //   this.ct_jdgmts_maj = ct_jdgmts_maj;
  //   this.ct_wins_maj = ct_wins_maj
  // };

  //Class method to create a cat using the backend API
  // Cat.create = function(){
  //   var catData = {cat: {
  //     name: $catName.val(),
  //     owner: $catOwner.val(),
  //     pic: $catPic.val(),
  //     ct_jdgmts_cute: $ct_jdgmts_cute.val(),
  //     ct_wins_cute: $ct_wins_cute.val(),
  //     ct_jdgmts_maj: $ct_jdgmts_maj.val(),
  //     ct_wins_maj: $ct_wins_maj(),
  //   }};
  // };
  // var catOne = {}

     // GET request to fill out Cat tables One and Two in the browser storage
    // $.ajax({
    //   url: catUrlOne,
    //   type: 'GET',
    //   data: 'json'
    // })
    // .done(function(cat_data){
    //   var catOne;
    //   catOne = new Cat(cat_data.id, cat_data.name, cat_data.owner,
    //   cat_data.pic, cat_data.ct_jdgmts_cute, cat_data.ct_wins_cute, cat_data.ct_jdgmts_maj, cat_data.ct_wins_maj);
    //   console.log(catOne);
    //   return catOne;
    // })
    // .fail(function(){
    //   console.log('Failed to retrieve cat data');
    // }); // end of $.ajax

    // $.ajax({
    //   url: catUrlTwo,
    //   type: 'GET',
    //   data: 'json'
    // })
    // .done(function(cat_data){
    //   var catTwo = new Cat(cat_data.id, cat_data.name, cat_data.owner,
    //   cat_data.pic, cat_data.ct_jdgmts_cute, cat_data.ct_wins_cute, cat_data.ct_jdgmts_maj, cat_data.ct_wins_maj);
    //   console.log(catTwo);
    //   return catTwo;
    //   // set the dom element to contain the movie's attributes.
    // })
    // .fail(function(){
    //   console.log('Failed to retrieve cat data');
    // }); // end of $.ajax


    //$('#catLabelOne').html('Name: ' + catOne.name + ', Owner: ');
    //$('#catImgIdOne').attr("src", backEndUrl + cat_data_one.pic);

//GET cat imgs:
  $.ajax({
    url: catUrlOne,
    type: 'GET',
    data: 'json',
  }).done(function(cat_data_one){
    $('#catLabelOne').html('Name: ' + cat_data_one.name + ', Owner: ' + cat_data_one.owner);
    $('#catImgIdOne').data('id', cat_data_one.id);
    $('#catImgIdOne').attr('data-catWinsCute', cat_data_one.ct_wins_cute);
    $('#catImgIdOne').attr("src", backEndUrl + cat_data_one.pic);
  }).fail(function(){
    console.log('error is' + error)
  });

  $.ajax({
    url: catUrlTwo,
    type: 'GET',
    data: 'json',
  }).done(function(cat_data_two){
    console.log(cat_data_two);
    $('#catLabelTwo').html('Name: ' + cat_data_two.name + ', Owner: ' + cat_data_two.owner);
    $('#catImgIdTwo').data('id', cat_data_two.id);
    $('#catImgIdTwo').attr("src", backEndUrl + cat_data_two.pic);
  }).fail(function(){
    console.log('error is' + error)
  });

//Toggle Majesty or Cute judgement
  $(".majToggle").click(function(){
    $("div").find(".selectedJudgement").addClass("col-md-3").removeClass("selectedJudgement col-md-5");
    $(this).removeClass("col-md-3").addClass("selectedJudgement col-md-5");
    $("div").find(".toggle").removeClass("cute").addClass("maj");
    $("div").find(".toggleQuestion").html("<h5>Which cat is more majestic?</h5>")
  });

  $(".cuteToggle").click(function(){
    $("div").find(".selectedJudgement").addClass("col-md-3").removeClass("selectedJudgement col-md-5");
    $(this).removeClass("col-md-3").addClass("selectedJudgement col-md-5");
    $("div").find(".toggle").removeClass("maj").addClass("cute");
    $("div").find(".toggleQuestion").html("<h5>Which cat is cuter?</h5>");
  });

  var addWin = {cat: {
    }};

//WIN functions - PATCH wins to database
  $("#catImgIdOne").click(function(){
    var catID = $('#catImgIdOne').data('id');
    var catWinsCount = $('#catImgIdOne').attr('data-catWinsCute', ct_wins_cute)
    addWin.cat.id = catID;
    addWin.cat.ct_wins_cute = catWinsCount + 1

    $.ajax({
      url: catUrlOne,
      type: 'PATCH',
      dataType: 'json',
      data: addWin
    })
    .done(function(){
      console.log('Added Judgement')
      $('.catOne').children(".ribbons").html('Winner! Judgements: ' + catWinsCount);
    })
    .fail(function(){
      console.log('Error in Posting');
    });
  });

  $("#catImgIdTwo").click(function(){
    var catID = $('#catImgIdTwo').data('id');
    var catJdgmtCount = $('#catImgIdTwo').data('ct_jdgmts_cute');
    addWin.cat.id = catID;
    addWin.cat.ct_jdgmts_cute = catJdgmtCount + 1;

    $.ajax({
      url: catUrlTwo,
      type: 'PATCH',
      dataType: 'json',
      data: addWin
    })
    .done(function(){
      console.log('Added Judgement')
      $('.catTwo').children(".ribbons").html('Winner! Judgements: ' + addWin.cat.ct_jdgmts_cute);
    })
    .fail(function(){
      console.log('Error in Posting');
    });
  });
}); //<-document ready

//jquery authenticate and get
$(function(){
  $('#get-token').on('click', function(){
    $.ajax('http://localhost:3000/login',{
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#email').val(),
          password: $('#password').val()
        }
      }),
      dataType: "json",
      method: "POST"
    }).done(function(data, textStatus) {
      $('#token').val(textStatus == 'nocontent' ? 'login failed' : data['token']);
      localStorage.setItem('token', data.token);
      console.log(data);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
      console.log(errorThrown);
    });
  });

});
