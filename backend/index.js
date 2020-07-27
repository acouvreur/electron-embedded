
const express = require('express')
const cors = require('cors');
const app = express()
const port = 4000

const database = require('./database')

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

async function loadDb() {

  const dbSuffix = new Date().getTime(); // we add a random timestamp in dev-mode to reset the database on each start

  const db = await database.getDatabase(
    'heroesdb' + dbSuffix,
    'memory'
  );

  /**
   * spawn a server
   * which is used as sync-goal by page.js
   */
  console.log('start server');
  await db.server({
    path: '/db',
    port: 10102,
    cors: true
  });
  console.log('started server');

  // show heroes table in console
  db.heroes.find().sort('name').$.subscribe(heroDocs => {
    console.log('### got heroes(' + heroDocs.length + '):');
    heroDocs.forEach(doc => console.log(
      doc.name + '  |  ' + doc.color
    ));
  });

}
loadDb();