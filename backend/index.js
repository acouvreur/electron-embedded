
const express = require('express')
const cors = require('cors');
const app = express()
const port = 4000

app.use(cors());
// app.get('/', (req, res) => res.send('"Hello World!"'))
app.get('/', (req, res) => {
  let sum = 0;
  for (var i = 0; i < 199999999; i++) {
    if (i % 2 === 0) {
      sum += i;
    }
  }
  res.send(`"Hello World! ${sum}"`)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
