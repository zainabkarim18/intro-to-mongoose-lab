/*-------------------------------- Starter Code --------------------------------*/
require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    // console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    console.log("Welcome to the CRM");
    await runQueries()
}
const Customer = require('./models/customer');


const prompt = require("prompt-sync")();
const username = prompt("What is your name? ");


console.log(`Your name is ${username}`)



const runQueries = async () => {
    // console.log('Queries running.');
    await display();
};
connect()

const display = async () => {
    console.log('What would you like to do?\n' +
        '1. Create a customer\n' +
        '2. View all customers\n' +
        '3. Update a customer\n' +
        '4. Delete a customer\n' +
        '5. Quit'
    );
    await choseNumber();
}

const choseNumber = async () => {
    const number = prompt("Number of action to run:");
    const num = parseInt(number);
    switch (num) {
        case 1:
            await createCustomer();
            break;
        case 2:
            viewAllCustomer();
            break;
        case 3:
            updateCustomer();
            break;
        case 4:
            deleteCustomer();
            break;
        default:
            quit();
            break;
    }
}
/*-------------------------------- Query Functions --------------------------------*/


//Add
const createCustomer = async () => {
    const addCustomer = {
        name: prompt("What is your name? "),
        age: prompt("What is your age? "),
    };

    const newCustomer = await Customer.create(addCustomer);
    console.log("New Customer: ", newCustomer);

    display();
}

//Show
const viewAllCustomer = async () => {
    const showCustomer = await Customer.find()
    console.log("All Customers: ", showCustomer);

    display();
}


//Update
const updateCustomer = async () => {
    const id = prompt("what is the id of the customer you would like to update? ");
    const updateCustomer = await Customer.findByIdAndUpdate(
        id,
        { name: prompt("What is the customers new name? "),
          age: prompt("What is the customers new age? ")
        },
        { new: true }
    );
    console.log("Updated Customer: ", updateCustomer);

    display();
}    

//Delete
const deleteCustomer = async () => {
    const id = prompt("what is the id of the customer you would like to delete?");
    const removedCustomer = await Customer.findByIdAndDelete(id);
    console.log('Removed Customer: ', removedCustomer);

    display();
} 


const quit = async () =>{
    await mongoose.disconnect();
    console.log('exiting...');
    process.exit();
}