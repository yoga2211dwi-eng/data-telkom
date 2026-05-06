// authService.js
const VALID_CREDENTIALS = [
  { username: 'yoga',  password: '12345', role: 'officer',  displayName: 'Yoga Pratama' },
  { username: 'admin', password: 'admin', role: 'admin',    displayName: 'Administrator' },
];

export const validateCredentials = (username, password) => {
  const user = VALID_CREDENTIALS.find(u => u.username === username && u.password === password);
  if (user) {
    const { password: _pw, ...safeUser } = user;
    return { success: true, user: safeUser };
  }
  return { success: false, error: 'Username atau password tidak valid.' };
};

export const saveSession = (user) => sessionStorage.setItem('alista_user', JSON.stringify(user));
export const getSession = () => {
  try { return JSON.parse(sessionStorage.getItem('alista_user')); } 
  catch { return null; }
};
export const clearSession = () => sessionStorage.removeItem('alista_user');