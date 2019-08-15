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
    }).then(function (answer) {
        var managerInput = answer.managerChoice;
        switch (managerInput) {
            case 'Products for Sale':
                forSale();
                startMenu();
                break;
            case 'View Low Inventory':
                lowInventory();
                startMenu();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
        }
    })


}

startMenu();


// Manager should be able to:
// view products for sale
// view low inventory <5
// add to inventory
// add new product


var forSale = function () {
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
        console.log('');
        console.log('');
    })
};

// function for low inventory
var lowInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity<=5", function (err, result) {
        if (err) throw err;
        console.log('');
        console.log('');
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
        console.log('');
        console.log('');
    })
}

var addToInventory = function () {
    forSale();
    inquirer.prompt({
        name: "productToResupply",
        type: "input",
        message: "Enter id number of product you'd like to resupply: "
    }).then(function (answer) {
        var selection = answer.productToResupply;
        connection.query('SELECT * FROM products WHERE ID=?', selection, function (err, result) {
            if (err) throw err;
            if (result.length === 0) {
                console.log("That product does not exist.  Please enter a valid ID.")
                addToInventory();
            } else {
                // prompt about quantity to add to stock_quantity
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to add?"
                }).then(function (answerTwo) {
                    var quantity = parseInt(answerTwo.quantity);
                    console.log("You have added " + quantity + " to " + result[0].product_name);
                    //update database with new quantity
                    var newQuantity = result[0].stock_quantity + quantity;
                    connection.query(
                        "UPDATE products SET stock_quantity = " + newQuantity + " WHERE id = " + result[0].id, function (err, resultUpdate) {
                            if (err) throw err;
                            forSale();
                            startMenu();
                        }
                    )
                })
            }
        })
    })
}


var addNewProduct = function () {
    function validateName(name) {
        return name !== "";
    }
    var questions = [
        {
            name: "newProductName",
            type: "input",
            message: "Name of product you'd like to add: ",
            validate: validateName
        }, {
            name: "newProductDept",
            type: "list",
            message: "In which department does this item belong?",
            choices: ["Vegetables", "Fruits"]
        }
    ]
    inquirer.prompt(questions).then(function (answer) {
        var newProduct = answer.newProductName;
        var newProductDepartment = answer.newProductDept;
        connection.query(
            "INSERT INTO products (product_name, department_name) VALUES (newProduct, newProductDepartment)", function (err) {
                if (err) throw err;
                forSale();
            }
        )
    })
};

