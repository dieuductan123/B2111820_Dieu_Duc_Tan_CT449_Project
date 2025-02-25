const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({message: "Hello from the server! Welcome to the Library Application"})
})

const mongoURI = 'mongodb://localhost:27017/borrow_book_app';
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port 3000...");
    });
  })
  .catch(() => 
    console.log("Connection failed!")
  );


