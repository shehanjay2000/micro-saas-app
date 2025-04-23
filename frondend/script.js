const api = 'http://localhost:3000/api/todos';

async function fetchTodos() {
  const res = await fetch(api);
  const todos = await res.json();
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'bg-white p-2 shadow flex justify-between';
    li.innerHTML = `
      <span>${todo.text}</span>
      <button onclick="deleteTodo('${todo._id}')" class="text-red-500">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;

  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${api}/${id}`, { method: 'DELETE' });
  fetchTodos();
}

fetchTodos();
