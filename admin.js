//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const DB = require("./database");

app.set('view engine', 'ejs');
app.use(express.static("public"));

let ObjArray = []; 

// - GET for all Results
app.get("/admin", function (req, res) {

  DB.getResults(function (results) {

    ObjArray = [];
    setResults(results);

    res.render("adminpanel", { ResultArray: ObjArray });
  })
});



// - POST for date specific Results
app.post("/admin", function (req, res) {

  //console.log(req.body.date);
  DB.getByDates(req.body.date, function (resultss) {

    ObjArray = [];
    setResults(resultss);

    res.render("adminpanel", { ResultArray: ObjArray });
  })

})

app.listen(process.env.PORT || 3000, function () {
  console.log("Admin Server started ...");
});


// -- logic to get data from DB and send to frontend in OBJ_ARRAY Form
function setResults(results) {

  let prev;
  if (results.length != 0) {
    prev = results[0].Result_Set;
  } else {
    prev = -1;
  }


  for (let i = 0; i < results.length;) {
    let Obj = {
      testid: null,
      tools: [],
      browsers: [],
      pairs: [],
      cnt: 0,
      date: ""
    };
    while (i < results.length && results[i].Result_Set == prev) {
      //console.log(results[i]);
      let rs = results[i];
      Obj.testid = rs.Result_Set;
      if (!Obj.tools.includes(rs.Tool_Name)) {
        Obj.tools.push(rs.Tool_Name);
      }
      if (!Obj.browsers.includes(rs.Browser_Name)) {
        Obj.browsers.push(rs.Browser_Name);
      }
      if (rs.Result == "Detected ") {
        Obj.pairs.push(" " + rs.Tool_Name + " (" + rs.Tool_Version + ") - " + rs.Browser_Name + " (" + rs.Browser_Version + ") ")
        Obj.cnt++;
      }
      Obj.date = rs.Date.toString().substring(3, 15);
      i++;
     
    }
    //console.log(Obj);    console.log("pushed...");
    ObjArray.push(Obj);
    if(i<results.length)
    prev = results[i].Result_Set;
  
  }
  // console.log(ObjArray); 

}

