// need inquirer
//need mysql
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("cli-table3");

// connect to db
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Isaaczoeezra1!",
    database: "bamazon"
})


connection.connect();

var display = function () {
    // test connection
    console.log("Connected as id: " + connection.threadId);
    //display data
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.log();
        console.log();
        console.log();
        console.log();

        // setting up table design
        var table = new Table({
            head: ['ID', 'Product Name', 'Cost'],
            colWidths: [8, 30, 10],
            colAligns: ['center', 'left', 'left'],
            style: {
                head: ['blue'],
                compact: true
            }
        });
        for (var i = 0; i < result.length; i++) {
            table.push([result[i].id, result[i].product_name, '$' + result[i].price]);
        }
        console.log(table.toString());
        console.log('');
    })
};

display();

