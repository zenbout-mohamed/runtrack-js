const ALLOWED_DOMAIN = "@laplateforme.fr"; 

function readUsers() {
  const raw = localStorage.getItem('users');
  if (raw) return JSON.parse(raw);
  return [];
}
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const pwd = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    if (!email.endsWith(ALLOWED_DOMAIN)) {
      msg.innerHTML = '<div class="alert alert-danger">Adresse email non autorisée (domaine invalide).</div>';
      return;
    }

    const users = readUsers();
    if (users.find(u => u.email === email)) {
      msg.innerHTML = '<div class="alert alert-warning">Un compte avec cet e-mail existe déjà.</div>';
      return;
    }

    const newUser = {
      id: 'u' + Date.now(),
      name,
      email,
      role: 'user',
      password: pwd 
    };
    users.push(newUser);
    saveUsers(users);

    msg.innerHTML = '<div class="alert alert-success">Compte créé — connectez-vous.</div>';
    form.reset();
    setTimeout(() => window.location.href = '../pages/login.html', 1000);
  });
});
