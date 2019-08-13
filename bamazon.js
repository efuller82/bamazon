// need inquirer
//need mysql
var mysql = require('mysql');
var inquirer = require('inquirer');

// connect to db
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Isaaczoeezra1!",
    database: "bamazon"
})


connection.connect(function (err) {
    if (err) throw err;
    // test connection
    console.log("Connected as id: " + connection.threadId);
    //display data
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.log(result);
    })
})


// display all items available for sale, including:
// id, names, prices

// prompt user with two messages

    // ask them the name of the product they'd like to buy

    // it should then ask how many they'd like to buy

// Once order is placed, app should check if there is enough of the product 
// to fulfill request
    // if not, log a phrase "insufficient quantity!" then prevent order from going through

// If store does have enough, fill the order:
    // update the SQL db to reflect the remaining quantity
    // Once the update goes through, show the customer the total cost of their purchase