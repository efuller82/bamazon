var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table3');

//connect to db
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Isaaczoeezra1!",
    database: "bamazon"
})

connection.connect();
// menu when running bamazonManager.js
var startMenu = function () {
    inquirer.prompt({
        name: "managerChoice",
        type: "list",
        message: "What would you like to do?",
        choices: ['Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    })
}

startMenu();


// Manager should be able to:
// view products for sale
// view low inventory <5
// add to inventory
// add new product


var forSale = function () {
    console.log("Connected as id: " + connection.threadId);
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.log('');
        console.log('');
        // set up table
        var table = new Table({
            head: ['ID', 'Product Name', 'Cost', 'Quantity'],
            colWidths: [8, 30, 10, 10],
            colAligns: ['center', 'left', 'left', 'center'],
            style: {
                head: ['blue'],
                compact: true
            }
        });
        // loop through db and push results to the table array
        for (var i = 0; i < result.length; i++) {
            table.push([result[i].id, result[i].product_name, '$' + result[i].price, result[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log('');
    })
};

var lowInventory = function () { }
var addToInventory = function () { }
var addNewProduct = function () { }