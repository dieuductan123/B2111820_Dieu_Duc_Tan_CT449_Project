const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require("./routes/book.route"); 

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Hello from the server! Welcome to the Library Application"})
});

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


