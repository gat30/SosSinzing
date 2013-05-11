
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , mongojs = require('mongojs')
  , path = require('path')
  , async = require('async'),
    _ = require('underscore'),
    ObjectId = mongojs.ObjectId;

var app = express();


// Connect Mongojs
/*if (process.env.NODE_ENV == "development") {
  var port = 3000;
  var db = mongojs('localhost/SosSizing',['charte']);
} else {
   var port = 80;
   var db = mongojs('localhost/SosSizing',['charte']);
 }*/

var port = 3002;
var db = mongojs('localhost/SosSizing',['charte', 'combinaison']);

// Get articles
app.get('/chartes/:sexe',function(req,res){

  db.charte.find({sexe : req.params.sexe},function(err, docs){
    res.jsonp(docs);
  });
});

//mettre en place un paramètre (exemple : sexe)
app.get('/combis/:sexe',function(req,res){
  
  db.combinaison.find({sexe : req.params.sexe},function(err, docs){
    res.jsonp(docs);
  });
});


///////////rajouter everflex2013 h et f (image deja la )
app.get('/scub',function(req,res){

  db.combinaison.save(
    {
      nom: "Everflex",
      sexe: "h",
      epaisseur: "3mm",
      annee: "2011",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/everflex-men-3mm-2011.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved 1");
  });
  db.combinaison.save(
    {
      nom: "Everflex",
      sexe: "h",
      epaisseur: "3mm",
      annee: "2012",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/everflex-men-3mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
  db.combinaison.save(
    {
      nom: "Everflex",
      sexe: "h",
      epaisseur: "5mm",
      annee: "2012",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/everflex-men-5mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
  db.combinaison.save(
    {
      nom: "Everflex",
      sexe: "h",
      epaisseur: "7mm",
      annee: "2012",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/everflex-men-7mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Oneflex",
      sexe: "h",
      epaisseur: "5mm",
      annee: "2012",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/oneflex-men-5mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Oneflex",
      sexe: "h",
      epaisseur: "7mm",
      annee: "2012",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/oneflex-men-7mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Profile",
      sexe: "h",
      epaisseur: "3mm",
      annee: "2012",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/profile-men-3mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Profile",
      sexe: "h",
      epaisseur: "5mm",
      annee: "2012",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/profile-men-5mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Profile",
      sexe: "h",
      epaisseur: "7mm",
      annee: "2012",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/profile-men-7mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Profile",
      sexe: "h",
      epaisseur: "7mm",
      annee: "2013",
      charte : ObjectId("51865f070001f6bc0400002a"),
      taux : "",
      urlImage : "pictures/scubapro/profile-men-7mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
  res ="ok";
});


app.get('/aqua',function(req,res){

  db.combinaison.save(
    {
      nom: "Balance confort",
      sexe: "h",
      epaisseur: "5,5mm",
      annee: "2012",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/balanceconfort-men-5,5mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved 1");
  });
  db.combinaison.save(
    {
      nom: "Balance confort",
      sexe: "h",
      epaisseur: "5,5mm",
      annee: "2013",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/balanceconfort-men-5,5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Balance confort",
      sexe: "h",
      epaisseur: "7mm",
      annee: "2012",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/balanceconfort-men-7mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Bali",
      sexe: "h",
      epaisseur: "3,5mm",
      annee: "2013",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/bali-men-3,5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Bali",
      sexe: "h",
      epaisseur: "3mm",
      annee: "2012",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/bali-men-3mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Diveflex",
      sexe: "h",
      epaisseur: "5,5mm",
      annee: "2013",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/diveflex-men-5,5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Dive",
      sexe: "h",
      epaisseur: "3mm",
      annee: "2013",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/dive-men-3mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Dive",
      sexe: "h",
      epaisseur: "5,5mm",
      annee: "2013",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/dive-men-5,5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Dive",
      sexe: "h",
      epaisseur: "7mm",
      annee: "2013",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/dive-men-7mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Safaga",
      sexe: "h",
      epaisseur: "5mm",
      annee: "2013",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/safaga-men-5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Safaga",
      sexe: "h",
      epaisseur: "7mm",
      annee: "2013",
      charte : ObjectId("518662780001f6bc0400002c"),
      taux : "",
      urlImage : "pictures/aqualung/safaga-men-7mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
  res ="ok";
});

app.get('/test',function(req,res){

  db.combinaison.save(
    {
      nom: "Everflex",
      sexe: "f",
      epaisseur: "3mm",
      annee: "2011",
      charte : ObjectId("518660530001f6bc0400002b"),
      taux : "",
      urlImage : "pictures/scubapro/everflex-women-3mm-2011.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved 1");
  });
  db.combinaison.save(
    {
      nom: "Everflex",
      sexe: "f",
      epaisseur: "3mm",
      annee: "2012",
      charte : ObjectId("518660530001f6bc0400002b"),
      taux : "",
      urlImage : "pictures/scubapro/everflex-women-3mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
  db.combinaison.save(
    {
      nom: "Everflex",
      sexe: "f",
      epaisseur: "5mm",
      annee: "2012",
      charte : ObjectId("518660530001f6bc0400002b"),
      taux : "",
      urlImage : "pictures/scubapro/everflex-women-5mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
  db.combinaison.save(
    {
      nom: "Everflex",
      sexe: "f",
      epaisseur: "7mm",
      annee: "2012",
      charte : ObjectId("518660530001f6bc0400002b"),
      taux : "",
      urlImage : "pictures/scubapro/everflex-women-7mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Profile",
      sexe: "f",
      epaisseur: "3mm",
      annee: "2012",
      charte : ObjectId("518660530001f6bc0400002b"),
      taux : "",
      urlImage : "pictures/scubapro/profile-women-3mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Profile",
      sexe: "f",
      epaisseur: "5mm",
      annee: "2012",
      charte : ObjectId("518660530001f6bc0400002b"),
      taux : "",
      urlImage : "pictures/scubapro/profile-women-5mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Profile",
      sexe: "f",
      epaisseur: "7mm",
      annee: "2012",
      charte : ObjectId("518660530001f6bc0400002b"),
      taux : "",
      urlImage : "pictures/scubapro/profile-women-7mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Profile",
      sexe: "f",
      epaisseur: "7mm",
      annee: "2013",
      charte : ObjectId("518660530001f6bc0400002b"),
      taux : "",
      urlImage : "pictures/scubapro/profile-women-7mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
  res ="ok";
});


app.get('/coucou',function(req,res){

  db.combinaison.save(
    {
      nom: "Balance confort",
      sexe: "f",
      epaisseur: "5,5mm",
      annee: "2012",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/balanceconfort-women-5,5mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved 1");
  });
  db.combinaison.save(
    {
      nom: "Balance confort",
      sexe: "f",
      epaisseur: "5,5mm",
      annee: "2013",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/balanceconfort-women-5,5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Balance confort",
      sexe: "f",
      epaisseur: "7mm",
      annee: "2012",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/balanceconfort-women-7mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Bali",
      sexe: "f",
      epaisseur: "3,5mm",
      annee: "2013",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/bali-women-3,5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Bali",
      sexe: "f",
      epaisseur: "3mm",
      annee: "2012",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/bali-women-3mm-2012.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Diveflex",
      sexe: "f",
      epaisseur: "5,5mm",
      annee: "2013",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/diveflex-women-5,5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Dive",
      sexe: "f",
      epaisseur: "3mm",
      annee: "2013",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/dive-women-3mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Dive",
      sexe: "f",
      epaisseur: "5,5mm",
      annee: "2013",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/dive-women-5,5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Dive",
      sexe: "f",
      epaisseur: "7mm",
      annee: "2013",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/dive-women-7mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Safaga",
      sexe: "f",
      epaisseur: "5mm",
      annee: "2013",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/safaga-women-5mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
db.combinaison.save(
    {
      nom: "Safaga",
      sexe: "f",
      epaisseur: "7mm",
      annee: "2013",
      charte : ObjectId("518663770001f6bc0400002d"),
      taux : "",
      urlImage : "pictures/aqualung/safaga-women-7mm-2013.jpg"
    }, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
  });
  res ="ok";
});
// all environments
app.set('port', process.env.PORT || 3002);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'site')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
