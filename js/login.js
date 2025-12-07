function readUsers() {
  try { return JSON.parse(localStorage.getItem('users') || '[]'); } catch { return []; }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      msg.innerHTML = '<div class="alert alert-warning">Remplis l\'email et le mot de passe.</div>';
      return;
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      msg.innerHTML = '<div class="alert alert-danger">E-mail ou mot de passe incorrect.</div>';
      return;
    }

    const session = { id: user.id, name: user.name, email: user.email, role: user.role };
    localStorage.setItem('currentUser', JSON.stringify(session));

    if (user.role === 'admin') {
      window.location.href = '../pages/admin.html';
    } else if (user.role === 'moderator') {
      window.location.href = '../pages/backoffice.html';
    } else {
      window.location.href = '../pages/calendar.html';
    }
  });
});
