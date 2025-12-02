function promote(userId, newRole) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const u = users.find(x => x.id === userId);
  if (!u) return;
  u.role = newRole;
  localStorage.setItem('users', JSON.stringify(users));
}