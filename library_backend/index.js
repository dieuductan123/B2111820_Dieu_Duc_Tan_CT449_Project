const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const booksRouter = require("./routes/book.route");
const publisherRouter = require("./routes/publisher.route");
const employeeRouter = require("./routes/employee.route");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/books", booksRouter);
app.use("/api/publishers", publisherRouter);
app.use("/api/employees", employeeRouter);

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


