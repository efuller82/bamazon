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
        console.log('');
        console.log('');
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
        // Loop through db results and push them to table array
        for (var i = 0; i < result.length; i++) {
            table.push([result[i].id, result[i].product_name, '$' + result[i].price]);
        }
        console.log(table.toString());
        console.log('');
    })
};

var buy = function () {
    inquirer.prompt({
        name: "buyProduct",
        type: "input",
        message: "Please enter the ID number of the product you wish to buy: "
    }).then(function (answer) {
        var selection = answer.buyProduct;
        connection.query('SELECT * FROM products WHERE ID=?', selection, function (err, result) {
            if (err) throw err;
            if (result.length === 0) {
                console.log("That product does not exist. Please enter a valid ID.")

                buy();
            } else {
                // inquirer about quantity of purchase
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?"
                }).then(function (answerTwo) {
                    // this will handle if there is enough inventory
                    var quantity = answerTwo.quantity;
                    if (quantity > result[0].stock_quantity) {
                        console.log("Derp! There are only " + result[0].stock_quantity + " remaining in inventory.  Please try again.")
                        buy();
                        // if there is enough quantity
                    } else {
                        console.log("Purchased " + quantity + " " + result[0].product_name + " @ $" + result[0].price);
                        console.log("____________________________");
                        console.log("Total: " + "$" + (quantity * result[0].price).toFixed(2));
                        // connect to database to update quantity
                        var newQuantity = result[0].stock_quantity - quantity;
                        connection.query(
                            "UPDATE products SET stock_quantity = " + newQuantity + " WHERE id = " + result[0].id, function (err, resultUpdate) {
                                if (err) throw err;
                                console.log("____________________________");
                                console.log("Thank you for your order! Good health!");
                                // connection.end();
                                buy();
                            }
                        )
                    }

                })
            }
        });
    });
};


display();
buy();

