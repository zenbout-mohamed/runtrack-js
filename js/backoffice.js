document.addEventListener('DOMContentLoaded', () => {
  const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!current || (current.role !== 'moderator' && current.role !== 'admin')) {
    alert('Accès réservé aux modérateurs');
    window.location.href = '/pages/login.html';
    return;
  }
  function readRequests(){ return JSON.parse(localStorage.getItem('requests') || '[]'); }
  function saveRequests(r){ localStorage.setItem('requests', JSON.stringify(r)); }

  const list = document.getElementById('pendingList');

  function render() {
    const pending = readRequests().filter(r => r.status === 'pending');
    list.innerHTML = pending.map(r => {
      const user = JSON.parse(localStorage.getItem('users')).find(u => u.id === r.userId) || {name:'inconnu'};
      return `<li class="list-group-item d-flex justify-content-between align-items-center">
        <div>${r.date} — ${user.name} (${user.email})</div>
        <div>
          <button class="btn btn-sm btn-success me-1" data-id="${r.id}" data-action="accept">Accepter</button>
          <button class="btn btn-sm btn-danger" data-id="${r.id}" data-action="refuse">Refuser</button>
        </div>
      </li>`;
    }).join('');
  }

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    const reqs = readRequests();
    const r = reqs.find(x => x.id === id);
    if (!r) return;
    if (new Date(r.date) < new Date().setHours(0,0,0,0)) {
      return alert('Impossible de modifier : la date est passée.');
    }
    r.status = action === 'accept' ? 'accepted' : 'refused';
    saveRequests(reqs);
    render();
  });

  render();
});
