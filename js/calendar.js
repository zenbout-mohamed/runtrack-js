function readRequests() {
  return JSON.parse(localStorage.getItem('requests') || '[]');
}
function saveRequests(reqs) {
  localStorage.setItem('requests', JSON.stringify(reqs));
}

document.addEventListener('DOMContentLoaded', () => {
  const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!current) {
    alert('Connexion requise');
    window.location.href = '/pages/login.html';
    return;
  }
  const dateInput = document.getElementById('date');
  const submitBtn = document.getElementById('submitRequest');
  const list = document.getElementById('myRequests');

  function refreshList() {
    const reqs = readRequests().filter(r => r.userId === current.id);
    list.innerHTML = reqs.map(r => `
      <li class="list-group-item">
        ${r.date} — <strong>${r.status}</strong>
        ${new Date(r.date) < new Date() ? '<span class="text-muted ms-2">(date passée)</span>' : ''}
      </li>`).join('');
  }

  submitBtn.addEventListener('click', () => {
    const date = dateInput.value;
    if (!date) return alert('Choisir une date');
    if (new Date(date) < new Date().setHours(0,0,0,0)) {
      return alert('La date doit être aujourd\'hui ou dans le futur');
    }
    const reqs = readRequests();
    if (reqs.find(r => r.userId === current.id && r.date === date)) {
      return alert('Vous avez déjà une demande pour cette date');
    }
    const newReq = {
      id: 'r' + Date.now(),
      userId: current.id,
      date,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    reqs.push(newReq);
    saveRequests(reqs);
    refreshList();
    alert('Demande envoyée');
  });

  refreshList();
});
