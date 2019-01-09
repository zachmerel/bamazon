var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "dewey0908",
  database: "products_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the displayItems function after the connection is made to display the items available
  displayItems()
  //start function asks which item they would like and either purchases or not based on availability
  start();
});
function displayItems(){
  connection.query("SELECT id,product_name,price FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
function start() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

inquirer
  .prompt([
    {
      name: "choice",
      type: "rawlist",
      choices: function () {
        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
          choiceArray.push(results[i].product_name);
        }
        return choiceArray;
      },
      message: "What is the ID of the product you would like to buy?"
    },
    {
      name: "productAmount",
      type: "input",
      message: "How much of this itme would you like?"
    }
  ])
  .then(function (answer) {
    // get the information of the chosen item
    let chosenItem;
    for (let i = 0; i < results.length; i++) {
      if (results[i].item_name === answer.choice) {
        chosenItem = results[i];
      }
    }
    // determine if item is in stock
    if (chosenItem.stock_quantity < parseInt(answer.productAmount)) {
      // bid was high enough, so update db, let the user know, and start over
      connection.query(
        "UPDATE auctions SET ? WHERE ?",
        [
          {
            stock_quantity: answer.productAmount
          },
          {
            id: chosenItem.id
          }
        ],
        function (error) {
          if (error) throw err;
          console.log("Item purchased");
          start();
        }
      );
    }
    else {
      // the item is out of stock
      console.log("Insufficient quantity!");
      start();
    }
  });
});
}