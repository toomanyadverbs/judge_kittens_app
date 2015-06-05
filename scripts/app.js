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

var catUrl = 'http://localhost:3000/cats/';
var catUrlOne = catUrl + first;
var catUrlTwo = catUrl + second

  $.ajax({
    url: catUrlOne,
    type: 'GET',
    data: 'json',
  }).done(function(cat_data_one){
    console.log(cat_data_one);
    $('#catLabelOne').html('Name: ' + cat_data_one.name + ', Owner: ' + cat_data_one.owner);
    $('#catImgIdOne').data('id', cat_data_one.id).data('ct_jdgmts_cute', cat_data_one.ct_jdgmts_cute);
    $('#catImgIdOne').attr("src", "http://localhost:3000/" + cat_data_one.pic);
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
    $('#catImgIdTwo').data('id', cat_data_two.id).data('ct_jdgmts_cute', cat_data_two.ct_jdgmts_cute);
    $('#catImgIdTwo').attr("src", "http://localhost:3000/" + cat_data_two.pic);
  }).fail(function(){
    console.log('error is' + error)
  });


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

  $("#catImgIdOne").click(function(){
    var catID = $('#catImgIdOne').data('id');
    var catJdgmtCount = $('#catImgIdOne').data('ct_jdgmts_cute');
    addWin.cat.id = catID;
    addWin.cat.ct_jdgmts_cute = catJdgmtCount + 1;

    debugger;
    $.ajax({
      url: catUrlOne,
      type: 'PATCH',
      dataType: 'json',
      data: addWin
    })
    .done(function(){
      console.log('Added Judgement')
      $('.catOne').children(".ribbons").html('Winner! Judgements: ' + addWin.cat.ct_jdgmts_cute);
    })
    .fail(function(){
      console.log('Error in Posting');
    });  });

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
