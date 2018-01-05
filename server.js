const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let HEROES = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

app.get('/heroes', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  if (req.query) {
    let heroes = [];
    HEROES.forEach((item, index) => {
      if (item.name.search(req.query.name) >= 0) {
        heroes.push(item);
      }
    })
    res.send(heroes);
  } else {
    res.send(HEROES);
  } 
});

app.get('/hero/:id', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  let hero = HEROES.find(hero => {
    return hero.id == req.params.id;
  });
  res.send(hero);
})

app.post('/updateHeroes', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  if (!req.body.data) {
    let body = '';
    let jsonStr = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      jsonStr = JSON.parse(body);
      for (let i = 0; i < HEROES.length; i++) {
        if (HEROES[i].id === jsonStr.id) {
          HEROES[i].name = jsonStr.name;
        }
      }
      res.send(true);
    })
  }
  
})

app.post('/addHero', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    body = JSON.parse(body);
    let hero = {
      id: HEROES[HEROES.length-1].id + 1,
      name: body.name
    }
    HEROES.push(hero);
    res.send(hero);
  })
})

app.post('/deleteHero', (req, res) => {
  res.set({'Access-Control-Allow-Origin': '*'});
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    body = JSON.parse(body);
    HEROES.forEach((item, index) => {
      if (item.id === body.id) {
        HEROES.splice(index, 1);
        return;
      }
    })
    res.send(body);
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000');
})