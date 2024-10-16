const mongoose = require('mongoose');

// Define the customer schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Create and export the model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
