document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('loginForm');
  const msg = document.getElementById('loginMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const pwd = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === pwd);

    if (!user) {
      msg.innerHTML = '<div class="alert alert-danger">Identifiants incorrects.</div>';
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));

    msg.innerHTML = '<div class="alert alert-success">Connexion réussie !</div>';

    if (user.role === 'admin') {
      setTimeout(() => window.location.href = "../pages/admin.html", 500);
    } 
    else if (user.role === 'moderator') {
      setTimeout(() => window.location.href = "../pages/backoffice.html", 500);
    }
    else {
      setTimeout(() => window.location.href = "../pages/calendar.html", 500);
    }
  });
});
