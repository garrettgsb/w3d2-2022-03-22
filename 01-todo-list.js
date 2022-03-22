/*

CRUD - Create, Read, Update, Delete
BREAD - Browse, Read, Edit, Add, Delete

REST is basically just:

Browse - GET /resource
Read - GET /resource/:id
Edit - POST /resource/:id
Add - POST /resource
Delete - POST /resource/:id

*/

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 9999;


let todos = [
  "Get milk",
  "Wash car",
  "Walk dog",
];

function addTodo(todo) {
  todos.push(todo);
}

function removeTodo(idx) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos.splice(idx, 1);
}

function updateTodo(idx, newText) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos[idx] = newText;
}

function viewTodos() {
  return `
  <h1>Todos:</h1>
  <ul>
    ${todos.map((todo, idx) => `
      <li>
      ${todo} [${idx}]
        <form action='/todos/${idx}' method='POST'>
        <input name='newText' placeholder='New text' />
        <button>✏️</button>
        </form>
        <form action='/todos/${idx}/delete' method='POST'>
          <button>🚮</button>
        </form>
      </li>
    `).join('\n')}
  </ul>
  `;
}

app.get('/todos', (request, response) => {
  response.send(`
    ${viewTodos()}
    <form action='/todos' method='POST'>
      <input name='todo' placeholder='Todo text'/>
      <button>Create</button>
    </form>
  `);
});

app.get('/todos.json', (req, res) => {
  res.json({
    todos,
    success: true,
  });
});

app.post('/todos', (request, response) => {
  addTodo(request.body.todo);
  response.redirect('/todos');
});
app.post('/todos/:id', (request, response) => {
  const id = Number(request.params.id);
  const newText = request.body.newText;
  updateTodo(id, newText);
  response.redirect('/todos');
});

app.post('/todos/:id/delete', (request, response) => {
  const id = Number(request.params.id);
  removeTodo(id);
  response.redirect('/todos');
});






app.get('/todos/:id'); // Probably don't need this one

app.listen(PORT, () => { console.log('App is listening on port', PORT) });
