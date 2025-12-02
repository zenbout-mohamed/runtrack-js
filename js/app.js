function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {

  const user = getCurrentUser();


  const navLogin = document.getElementById('navLogin');
  const navLogout = document.getElementById('navLogout');
  const navCalendar = document.getElementById('navCalendar');
  const navBackoffice = document.getElementById('navBackoffice');
  const navAdmin = document.getElementById('navAdmin');

  
  const notConnected = document.getElementById('notConnected');
  const connected = document.getElementById('connected');
  const welcomeName = document.getElementById('welcomeName');
  const btnGoBackoffice = document.getElementById('btnGoBackoffice');
  const btnGoAdmin = document.getElementById('btnGoAdmin');

  if (user) {
    navLogin.classList.add('d-none');
    navLogout.classList.remove('d-none');
    navCalendar.classList.remove('d-none');

    if (user.role === 'moderator' || user.role === 'admin') {
      navBackoffice.classList.remove('d-none');
      if (btnGoBackoffice) btnGoBackoffice.classList.remove('d-none');
    }

    if (user.role === 'admin') {
      navAdmin.classList.remove('d-none');
      if (btnGoAdmin) btnGoAdmin.classList.remove('d-none');
    }

    
    if (notConnected) notConnected.classList.add('d-none');
    if (connected) connected.classList.remove('d-none');
    
    if (welcomeName) welcomeName.textContent = `Bienvenue, ${user.name} !`;

    
    navLogout.addEventListener('click', logout);

  } else {
    
    if (navCalendar) navCalendar.classList.add('d-none');
    if (navBackoffice) navBackoffice.classList.add('d-none');
    if (navAdmin) navAdmin.classList.add('d-none');

    if (notConnected) notConnected.classList.remove('d-none');
    if (connected) connected.classList.add('d-none');
  }
});