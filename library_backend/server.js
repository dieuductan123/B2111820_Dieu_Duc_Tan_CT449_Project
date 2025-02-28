require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const booksRouter = require("./routes/book.route");
const publisherRouter = require("./routes/publisher.route");
const employeeRouter = require("./routes/employee.route");
const readerRouter = require("./routes/reader.route");
const borrowReturnRouter = require("./routes/borrower.route");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/books", booksRouter);
app.use("/api/publishers", publisherRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/readers", readerRouter);
app.use("/api", borrowReturnRouter);

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


