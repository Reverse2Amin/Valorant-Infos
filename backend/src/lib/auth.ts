const users: { username: string; password: string }[] = [];

export async function registerUser(username: string, password: string) {
  if (users.find(u => u.username === username)) {
    return { error: "Benutzer existiert bereits" };
  }
  users.push({ username, password });
  return { message: "Registrierung erfolgreich" };
}

export async function loginUser(username: string, password: string) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { error: "Falsche Anmeldedaten" };
  return { message: "Login erfolgreich" };
}
