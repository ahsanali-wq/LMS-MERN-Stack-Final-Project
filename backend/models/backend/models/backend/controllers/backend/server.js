const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://user:pass@cluster.mongodb.net/LMS") // MongoDB Integration
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
