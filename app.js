require('dotenv').config();
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const Customer = require('./Customer');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

console.log("Welcome to the CRM!");

function showMenu() {
  console.log(`
  What would you like to do?

    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. Quit
  `);
}

async function main() {
  let running = true;

  while (running) {
    showMenu();
    const choice = prompt('Number of action to run: ');

    switch (choice) {
      case '1':
        const name = prompt('Enter customer name: ');
        const age = prompt('Enter customer age: ');
        const newCustomer = new Customer({ name, age });
        await newCustomer.save();
        console.log('Customer created successfully!');
        break;

      case '2':
        const customers = await Customer.find();
        console.log('Customers:');
        customers.forEach(c => {
          console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`);
        });
        break;

      case '3':
        const updateId = prompt('Enter the customer ID to update: ');
        const newName = prompt('Enter new customer name: ');
        const newAge = prompt('Enter new customer age: ');
        await Customer.findByIdAndUpdate(updateId, { name: newName, age: newAge });
        console.log('Customer updated successfully!');
        break;

      case '4':
        const deleteId = prompt('Enter the customer ID to delete: ');
        await Customer.findByIdAndDelete(deleteId);
        console.log('Customer deleted successfully!');
        break;

      case '5':
        console.log('Exiting...');
        running = false;
        mongoose.connection.close();
        break;

      default:
        console.log('Invalid choice, please try again.');
    }
  }
}

main();
