import React, { useState, useEffect, Fragment } from 'react'
import { Button, Input } from '@material-ui/core';


const DB = require('./database');

const syncURL = 'http://localhost:10102/db/heroes';

function Heroes() {


  const [database, setDatabase] = useState(null)
  const [heroes, setHeroes] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#ffffff');

  async function loadDb() {

    const db = await DB.getDatabase(
      'heroesdb', // we add a random timestamp in dev-mode to reset the database on each start
      'idb'
    );

    console.log('starting sync with ' + syncURL);
    const syncState = await db.heroes.sync({
      remote: syncURL,
      direction: {
        pull: true,
        push: true
      }
    });
    setDatabase(db);
    console.dir(syncState);
    db.heroes.find()
      .sort({
        name: 'asc'
      })
      .$.subscribe(function (heroes) {
        if (!heroes) {
          return;
        }
        console.log('observable fired');
        console.dir(heroes);

        setHeroes([...heroes]);
      });
  }

  useEffect(() => {
    if (!database) {
      loadDb();
    }
  }, [database])

  const addHero =
    () => {
      if (database) {
        database.heroes.insert({
          name: name,
          color: color
        })
      }
    }

  return (
    <Fragment>

      <Button color="primary" variant="contained" onClick={addHero} >
        Insert hero
      </Button>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <ul>
        {heroes.map(hero => {
          return <li key={hero.name}>
            <div>{hero.color}</div>
            <div>{hero.name}</div>
          </li>
        })}
      </ul>
    </Fragment>
  )
}

export default Heroes
