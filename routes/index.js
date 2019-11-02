var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
var uuidv4 = require("uuid");
var cors = require("cors");
var mysql = require("mysql");
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require("uuid/v1");
const fs = require("fs");

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


/*GET user data*/

var connection = mysql.createConnection({
  // properties
  host: "localhost",
  user: "root",
  password: "",
  database: "keviDB"
});

  connection.connect(function(error) {
  if(error) {
    console.log(error);
  } else {
    console.log("Connected to the database!");
  }
})

router.get("/logout", function(req, res) {
  var e = req.body;
  if(req.session.loggedin) {
    req.session.loggedin = false;
    res.render("index", {
    hasLoggedIn: "false",
    title: "Du er nå logget ut",
    loginTxt: "Logg inn",
    admin: req.session.admin
  })
  } else {
    res.redirect("/");
  }
 
})

router.post("/feedback", function(req, res) {
  var bodyRes = req.body.feedback;
  
  connection.query("INSERT INTO feedback (string) VALUES ('" + bodyRes + "')", function(error, results, fields) {
    if(error) {
      console.log("Unsuccessful server post request regarding mobile feedback");
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  })
})

router.get("/minside", function(req, res) {
  if(req.session.loggedin) {
    res.render("minKonto/minKonto.ejs");
  } else {
    res.redirect("/");
  }
})

router.get("/minside/detaljer", function(req, res) {
  if(req.session.loggedin) {
    res.render("minKonto/minKonto-Detaljer.ejs", {
      errorMsg: ""
    });
  } else {
    res.redirect("/");
  }
})

router.post("/minside/byttBrukerNavn", function(req, res) {
    var username = req.body.username;
    var oldUsername = req.session.username;
    connection.query("SELECT * FROM users WHERE username = ?", [username], function(error, results, fields) {
      if(results.length > 0) {
        res.render("minKonto/minKonto-Detaljer.ejs", {
          errorMsg: "Brukernavnet er allerede tatt"
        })
      } else {

        connection.query("UPDATE users SET username = ? WHERE username = ?", [username, oldUsername], function(error, results, fields) {
      if(error == true) {
        console.log(error);
      } else {
        req.session.username = username;
        res.redirect("/");
      }
    }) 

      
  
      }
    })
    
  
  })

  router.post("/minside/byttPassord", function(req, res) {
    var password = req.body.password;
    var passwordRepeat = req.body.passwordRepeat;

    var username = req.session.username;

    if(password==passwordRepeat) {

       connection.query("UPDATE users SET password = ? WHERE username = ?", [password, username], function(error, results, fields) {
      if(error == true) {
        console.log(error);
      } else {
        req.session.username = username;
        res.redirect("/");
      }
    }) 
    
  } else {
    res.render("minKonto/minKonto-Detaljer.ejs", {
      errorMsg: "Passordene er ikke like"
    })

  }

   
  
  })  



router.post("/auth", function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
      if(username && password) {
        connection.query("SELECT * FROM users WHERE username = ? AND password = ? OR email = ? AND password = ?", [username, password, username, password], function(error, results, fields) {
          if(results.length > 0) {
            //Return logged in state
            req.session.loggedin = true;
            req.session.username = results[0].username;

            //Check wether the user is an admin or not
            var usrId = results[0].id;
            console.log(usrId);
            connection.query("SELECT * FROM adminids WHERE id = ?", [usrId], function(error, results1, fields) {
              if(results1.length > 0) {
                console.log(results1);
                req.session.admin = true;
                console.log("User " + results[0].username + " has logged in");
            res.redirect("/");
              } else {
                req.session.admin = false;
                console.log("User " + results[0].username + " has logged in");
            res.redirect("/");
              }
            })

            


          } else {
            console.log("Noen feila å logge inn med brukernavn: " + username + " og passord: " + password);
            res.render("index", {
              hasLoggedIn: "false",
              title: "Brukernavnet eller passordet er feil",
              loginTxt: "Logg inn",
              admin: req.session.admin
            })
          }
        });
      } else {
        res.send("Skriv inn brukernavn og passord!");
        res.end();
      }
});


router.post("/register", function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
    if(username.length > 0 && password.length > 0 && email.length > 0) {
      var date = new Date();

      //set the unique user id
      var id = uuid();


      connection.query("INSERT INTO users (username, id, password, email, dateJoined) VALUES ('" + username + "', '" + id + "', '" + password + "', '" + email + "','" + date + "')", function(error, results, fields) {
        if(error) {
          console.log(error);
          res.render("index", {
            hasLoggedIn: "false",
            title: "Kunne ikke lage brukeren. Prøv igjen.",
            loginTxt: "Logg inn",
            admin: req.session.admin
          })
        } else {
          res.render("index", {
              hasLoggedIn: "false",
              title: "Logg inn for å fullføre brukerregistreringen",
              loginTxt: "Logg inn",
              admin: req.session.admin
          })
        }
      });

    }

})

var quotes = ["Amen", "Gud være med deg", "Halleluja", "La det skje", "Vær frelset"];
/* GET home page. */
router.get("/", function(req, res) {
  if(req.session.loggedin) {

    var isAdmin = req.session.admin;
    var min = 0;
    var max = quotes.length - 1;

    res.render("index", {
    hasLoggedIn: "true",
    title: quotes[Math.round(Math.random() *  (+max - +min) + +min)] + ", " + req.session.username,
    loginTxt: req.session.username,
    admin: isAdmin
  });
  } else {
    res.render("index", {
    hasLoggedIn: "false",
    title: "Du er ikke logget inn",
    loginTxt: "Logg inn",
    admin: isAdmin
  });
  }
  

  
})


router.get("/skaper", function(req, res) {
  if(req.session.loggedin && req.session.admin) {
    console.log("User is admin");
    res.render("articles/articlecreator");
  } else {
    console.log("Denied user " + req.session.username + " entry to the admin tools");
    res.redirect("/");
  }
})

router.post("/skaper/leggTilArtikkel", function(req, res) {
  if(req.session.loggedin && req.session.admin) {
    var title = req.body.title;
    var desc = req.body.description;
    
    var imgs = req.body.imgFiles;
    fs.writeFile("../public/images/uploadedImages/" + imgs, imgs, function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    })

    console.log(imgs);
  }
}); 

module.exports = router;
