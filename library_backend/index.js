const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const booksRouter = require("./routes/book.route"); 

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use("/api/books", booksRouter);

mongoose
  .connect(process.env.mongoURI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}...`);
    });
  })
  .catch(() => 
    console.log("Connection failed!")
  );


