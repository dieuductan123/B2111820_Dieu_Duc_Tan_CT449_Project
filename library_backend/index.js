const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({message: "Hello from the server! Welcome to the Library Application"})
})

app.listen(process.env.PORT, ()=>{
  console.log('Server is listening on port 3000...')
})