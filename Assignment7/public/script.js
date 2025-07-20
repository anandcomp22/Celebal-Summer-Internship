const API = '/user';
let token = localStorage.getItem('token') || '';

const modal = document.getElementById('itemModal');
const itemForm = document.getElementById('itemForm');
const itemTable = document.getElementById('itemTable');

function saveItem(event) {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const id = document.getElementById('itemId').value;
  const user = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,  // <-- Add this
    age: document.getElementById('age').value,
    status: document.getElementById('status').value,
  };
  const url = id ? `/user/${id}` : '/user';
  const method = id ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        closeModal();
        loadUsers();
      }
    });
}


function setAuthHeader(headers = {}) {
  return {
    ...headers,
    'Authorization': `Bearer ${token}`
  };
}

async function login(email, password) {
  try {
    const res = await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      token = data.token;
      alert('Login successful');
      loadUsers();
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (err) {
    alert('Error during login');
  }
}

function logout() {
  localStorage.removeItem('token');
  token = '';
  alert('Logged out');
  itemTable.innerHTML = '';
  window.location.href = '/';
}

function openModal(editItem = null) {
  modal.style.display = 'flex';
  itemForm.reset();
  document.getElementById('itemId').value = '';
  document.getElementById('modalTitle').innerText = editItem ? 'Edit User' : 'Add New User';

  if (editItem) {
    document.getElementById('itemId').value = editItem._id;
    document.getElementById('name').value = editItem.name;
    document.getElementById('email').value = editItem.email;
    document.getElementById('age').value = editItem.age;
    document.getElementById('status').value = editItem.status || 'active';
  }
}

function closeModal() {
  modal.style.display = 'none';
}

// Handle form submission (Create or Edit)
itemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('itemId').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = parseInt(document.getElementById('age').value);
  const status = document.getElementById('status').value;

  const user = { name, email, age, status };

  try {
    if (id) {
      await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: setAuthHeader({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user)
      });
    } else {
      await fetch(API, {
        method: 'POST',
        headers: setAuthHeader({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user)
      });
    }
    closeModal();
    loadUsers();
  } catch (err) {
    alert('Error saving user');
  }
});

async function deleteUser(id) {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    await fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: setAuthHeader()
    });
    loadUsers();
  } catch (err) {
    alert('Error deleting user');
  }
}

async function loadUsers(searchTerm = '') {
  if (!token) {
    alert('Please log in first!');
    return;
  }

  try {
    const res = await fetch(API, {
      headers: setAuthHeader()
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.error || 'Unauthorized access. Please log in again.');
      return;
    }

    const users = await res.json();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderTable(filtered);
    updateStats(users);
  } catch (err) {
    alert('Error loading users');
  }
}

function renderTable(users) {
  itemTable.innerHTML = '';

  users.forEach(user => {
    const tr = document.createElement('tr');
    const status = user.status || 'active';
    const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-';

    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td><span class="badge ${status}">${status}</span></td>
      <td>${createdDate}</td>
      <td>
        <i class="fa fa-pen edit-btn" data-user='${JSON.stringify(user)}'></i>
        <i class="fa fa-trash delete-btn" data-id="${user._id}"></i>
      </td>
    `;
    itemTable.appendChild(tr);
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = JSON.parse(btn.getAttribute('data-user'));
      openModal(user);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteUser(id);
    });
  });
}

function filterItems() {
  const term = document.getElementById('search').value;
  loadUsers(term);
}

function updateStats(users) {
  document.getElementById('totalCount').innerText = `${users.length} items`;
  document.getElementById('activeCount').innerText = `${users.filter(u => u.status === 'active').length} item`;
  document.getElementById('pendingCount').innerText = `${users.filter(u => u.status === 'pending').length} item`;
  document.getElementById('inactiveCount').innerText = `${users.filter(u => u.status === 'inactive').length} items`;
}

// Modal background click to close
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Initial load if token exists
if (token) {
  loadUsers();
}

// Event listeners
document.getElementById('openModalBtn').addEventListener('click', () => openModal());
document.getElementById('closeModalBtn').addEventListener('click', () => closeModal());
document.getElementById('search').addEventListener('input', filterItems);
