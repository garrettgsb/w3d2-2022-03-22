const express = require('express');
const app = express();
const PORT = 9999;

let visitorCount = 0;
let counter = 500;

function increment() { counter++; }
function decrement() { counter--; }
function setTo(value) { counter = value; }
function reset() { setTo(0); }

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  visitorCount++;
  response.send(`
  <h1>${counter}</h1>
  <form action='/increment' method='POST'>
    <button>Increment</button>
  </form>


  <form action='/decrement' method='POST'>
    <button>Decrement</button>
  </form>

  <form action='/set' method='POST'>
    <input name='newValue' placeholder='New value'/>
    <button>Set</button>
  </form>

  <form action='/reset' method='POST'>
    <button>Reset</button>
  </form>
  <br>
  <small>Visitors: ${visitorCount}</small>
  `);
});

app.post('/increment', (request, response) => {
  increment();
  response.redirect('/');
});

app.post('/decrement', (request, response) => {
  decrement();
  response.redirect('/');
});

app.post('/reset', (request, response) => {
  reset();
  response.redirect('/');
});

app.post('/set', (request, response) => {
  console.log(request.body);
  const newValue = Number(request.body.newValue);
  setTo(newValue);
  response.redirect('/');
});

app.listen(PORT, () => { console.log('App is listening on port', PORT) });
