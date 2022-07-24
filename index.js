const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')
const path = require('path');


connectToMongo();

const app = express()
const port = process.env.PORT || 5000
require("dotenv").config();

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/faq',require('./routes/faq'))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, 'client', 'build', 'index.html')))
  app.get('/*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`)
})
