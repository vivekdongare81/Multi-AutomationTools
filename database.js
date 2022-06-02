var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vivekkasql",
});

module.exports.insertResult = (tool, browser, result, Set_Id) => {

  con.connect(function (err) {
    if (err) throw err;

    var sql =
      "SELECT Tool_Id FROM automation_tools.a_tools  where Tool_Name = ?;";
    con.query(sql, [tool], function (err, tool_id) {
      if (err) throw err;
      tool_id = tool_id[0].Tool_Id;

      var sql =
        "SELECT Browser_Id FROM automation_tools.browsers  where Browser_Name = ?";
      con.query(sql, [browser], function (err, browser_id) {
        if (err) throw err;
        // console.log(browser_id +" ->" +browser);
        browser_id = browser_id[0].Browser_Id;
        var sql =
          "INSERT INTO `automation_tools`.`test_results` (`Tool_Id`, `Browser_Id`, `Result`, `Result_Set` ) VALUES ( ?, ? ,? , ?)";
        var msg = result == false ? "Not Detected " : "Detected ";
        con.query(sql, [tool_id, browser_id, msg, Set_Id], function (err, result) {
          if (err) throw err;
          console.log("record inserted" + result);
        });
      });
    });
  });
};
// module.exports = {insertResult}

module.exports. getResultSet = (callback) => {
  con.connect(function (err) {
    if (err) throw err;
  });
  var sql =
    "SELECT MAX(Result_Set) as Set_Id FROM automation_tools.test_results ;";
  con.query(sql, function (err, tool_id) {
    console.log(tool_id);
     return callback(tool_id);
  })
}

module.exports. getResults = (callback) => {
  con.connect(function (err) {
    if (err) throw err;
  });
  var sql =
    "SELECT Result_Id,Result_Set, Browser_Name, Browser_Version, Tool_Name, Tool_Version, Result , Date FROM (automation_tools.test_results inner join automation_tools.a_tools on automation_tools.test_results.Tool_Id = automation_tools.a_tools.Tool_Id) inner join automation_tools.browsers on automation_tools.test_results.Browser_Id = automation_tools.browsers.Browser_Id order by Result_Id desc;";
  con.query(sql, function (err, tool_id) {
    //console.log(tool_id);
     return callback(tool_id);
  })
}

module.exports. getByDates = (date ,callback) => {
  con.connect(function (err) {
    if (err) throw err;
  });
  var sql =
    `SELECT Result_Id,Result_Set, Browser_Name, Browser_Version, Tool_Name, Tool_Version, Result , Date FROM (automation_tools.test_results inner join automation_tools.a_tools on automation_tools.test_results.Tool_Id = automation_tools.a_tools.Tool_Id) inner join automation_tools.browsers on automation_tools.test_results.Browser_Id = automation_tools.browsers.Browser_Id WHERE Date LIKE '${date}%' order by Result_Id desc;`;
  con.query(sql, function (err, tool_id) {
    //console.log(tool_id);
     return callback(tool_id);
  })
}

