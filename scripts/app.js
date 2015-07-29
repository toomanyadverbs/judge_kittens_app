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
  do {
    var second = Math.floor(Math.random() * (max - min)) + min
  }
  while (first === second);
  return {
    first: first,
    second: second,
  }
}

var randomIntegers = getTwoRandomInt(1, 15);
var first = randomIntegers.first;
var second = randomIntegers.second;


//--------------------------
//-----DOCUMENT READY-------
//--------------------------

$(document).ready(function() {

  var backEndUrl = 'http://localhost:3000/'
  var catUrl = backEndUrl + 'cats/'
  var catUrlOne = catUrl + first;
  var catUrlTwo = catUrl + second


  //TO STORE Cats in browser:
  // constructor function for Cat
  function Cat(id, name, owner, pic, ct_jdgmts_cute, ct_wins_cute, ct_jdgmts_maj, ct_wins_maj) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.pic = pic;
    this.ct_jdgmts_cute = ct_jdgmts_cute;
    this.ct_wins_cute = ct_wins_cute;
    this.ct_jdgmts_maj = ct_jdgmts_maj;
    this.ct_wins_maj = ct_wins_maj
  };

  var catOne;
  var catTwo;

  //---------------------------
  // GET request to fill out Cat tables One and Two in the browser storage
  //---------------------------
  $.ajax({
    url: catUrlOne,
    type: 'GET',
    data: 'json'
  })
    .done(function(cat_data) {
      var cat;
      cat = new Cat(cat_data.id, cat_data.name, cat_data.owner,
        cat_data.pic, cat_data.ct_jdgmts_cute, cat_data.ct_wins_cute, cat_data.ct_jdgmts_maj, cat_data.ct_wins_maj);
      console.log(cat);
      catOne = cat;
      $('#catLabelOne').html('<h5>' + catOne.name + '</h5> Belongs to: ' + catOne.owner);
      $('#catImgIdOne').attr("src", backEndUrl + catOne.pic);
    })
    .fail(function() {
      console.log('Failed to retrieve cat data');
    }); // end of $.ajax

  $.ajax({
    url: catUrlTwo,
    type: 'GET',
    data: 'json'
  })
    .done(function(cat_data) {
      var cat;
      cat = new Cat(cat_data.id, cat_data.name, cat_data.owner,
        cat_data.pic, cat_data.ct_jdgmts_cute, cat_data.ct_wins_cute, cat_data.ct_jdgmts_maj, cat_data.ct_wins_maj);
      console.log(cat);
      catTwo = cat;
      $('#catLabelTwo').html('<h5>' + catTwo.name + '</h5> Belongs to: ' + catTwo.owner);
      $('#catImgIdTwo').attr("src", backEndUrl + catTwo.pic);
    })
    .fail(function() {
      console.log('Failed to retrieve cat data');
    }); // end of $.ajax


  //-------------------------------------
  //--Toggle Majesty or Cute judgement---
  //-------------------------------------

  $(".majToggle").click(function() {
    $("div").find(".selectedJudgement").addClass("col-md-3").removeClass("selectedJudgement col-md-5");
    $(this).removeClass("col-md-3").addClass("selectedJudgement col-md-5");
    $("div").find(".toggle").removeClass("cute").addClass("maj");
    $("div").find(".toggleQuestion").html("<h3>⬐ Which cat is more majestic? &#11022;</h3>")
  });

  $(".cuteToggle").click(function() {
    $("div").find(".selectedJudgement").addClass("col-md-3").removeClass("selectedJudgement col-md-5");
    $(this).removeClass("col-md-3").addClass("selectedJudgement col-md-5");
    $("div").find(".toggle").removeClass("maj").addClass("cute");
    $("div").find(".toggleQuestion").html("<h3>⬐ Which cat is cuter? &#11022;</h3>");
  });

  //------------------------------------------------
  //----------- on click - WIN functions ------------
  //----------- PATCH wins to db    -----------------
  //----------- change question to a 'refresh' button--
  //---------------------------------------------------

  var addWin = {
    cat: {}
  };

  $("#catImgIdOne").click(function() {
    // var catID = $('#catImgIdOne').data('id');
    // var catJdgmtCount = $('#catImgIdOne').data('ct_jdgmts_cute');
    // addWin.cat.id = catID;
    // addWin.cat.ct_jdgmts_cute = catJdgmtCount + 1;
    addWin.cat.ct_jdgmts_cute = catOne.ct_jdgmts_cute + 1;
    addWin.cat.ct_wins_cute = catOne.ct_wins_cute + 1;
    addWin.cat.ct_jdgmts_cute = catTwo.ct_jdgmts_cute + 1;

    $.ajax({
      url: catUrlOne,
      type: 'PATCH',
      dataType: 'json',
      data: addWin
    })
      .done(function() {
        console.log('Added Judgement');
        $('#catRibbonsOne').html('<h5>Winner!</h5> Judgements: ' + (catOne.ct_jdgmts_cute + 1) + ', Wins: ' + (catOne.ct_wins_cute + 1));
        $('#catRibbonsTwo').html('<h5><br/></h5>Judgements: ' + (catTwo.ct_jdgmts_cute + 1) + ', Wins: ' + (catTwo.ct_wins_cute));
      })
      .fail(function() {
        console.log('Error in Posting');
      });
  });

  $("#catImgIdTwo").click(function() {
    // var catID = $('#catImgIdTwo').data('id');
    // var catJdgmtCount = $('#catImgIdTwo').data('ct_jdgmts_cute');
    // addWin.cat.id = catID;
    // addWin.cat.ct_jdgmts_cute = catJdgmtCount + 1;
    addWin.cat.ct_jdgmts_cute = catTwo.ct_jdgmts_cute + 1;
    addWin.cat.ct_wins_cute = catTwo.ct_wins_cute + 1;
    addWin.cat.ct_jdgmts_cute = catOne.ct_jdgmts_cute + 1;

    $.ajax({
      url: catUrlTwo,
      type: 'PATCH',
      dataType: 'json',
      data: addWin
    })
      .done(function() {
        console.log('Added Judgement')
        $('#catRibbonsTwo').html('<h5>Winner!</h5> Judgements: ' + (catTwo.ct_jdgmts_cute + 1) + ', Wins: ' + (catTwo.ct_wins_cute + 1));
        $('#catRibbonsOne').html('<h5><br/></h5>Judgements: ' + (catOne.ct_jdgmts_cute + 1) + ', Wins: ' + (catOne.ct_wins_cute));
      })
      .fail(function() {
        console.log('Error in Posting');
      });
  });
}); //--------------<-document ready




//--------------------------
//-----USER AUTHENTICATION--
//--------------------------
//jquery authenticate and get
$(function() {
  $('#get-token').on('click', function() {
    $.ajax('http://localhost:3000/login', {
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
    }).fail(function(jqxhr, textStatus, errorThrown) {
      console.log(textStatus);
      console.log(errorThrown);
    });
  });

});
