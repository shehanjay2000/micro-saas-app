const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

const api = 'http://localhost:3000/api/todos';

async function fetchTodos() {
  const res = await fetch(api);
  const todos = await res.json();
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className =
      'flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm hover:shadow-md transition fade-in';

    li.innerHTML = `
      <div class="flex items-center gap-3">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete('${todo._id}')" />
        <span class="${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}">${todo.text}</span>
      </div>
      <button onclick="deleteTodo('${todo._id}')" class="text-red-500 hover:text-red-600 transition">🗑</button>
    `;

    list.appendChild(li);
  });
}

async function toggleComplete(id) {
  await fetch(`${api}/${id}`, { method: 'PATCH' });
  fetchTodos();
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
