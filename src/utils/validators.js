export const normalizeEmail = (email = '') => email.trim();

export const isValidEmail = (email = '') => {
  const value = normalizeEmail(email);
  return /\S+@\S+\.\S+/.test(value);
};

export const validateLoginForm = ({ email, password }) => {
  const trimmedEmail = normalizeEmail(email);

  if (!trimmedEmail || !password) {
    return { ok: false, error: 'Missing email or password.' };
  }
  if (!isValidEmail(trimmedEmail)) {
    return { ok: false, error: 'Invalid email format.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Invalid password format (min 6 chars).' };
  }

  return { ok: true, values: { email: trimmedEmail, password } };
};

export const validateSignupForm = ({ name, email, password, confirmPassword }) => {
  const trimmedName = (name || '').trim();
  const trimmedEmail = normalizeEmail(email);

  if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
    return { ok: false, error: 'Missing fields.' };
  }
  if (!isValidEmail(trimmedEmail)) {
    return { ok: false, error: 'Invalid email format.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password too short (min 6 chars).' };
  }
  if (password !== confirmPassword) {
    return { ok: false, error: 'Passwords do not match.' };
  }

  return {
    ok: true,
    values: { name: trimmedName, email: trimmedEmail, password }
  };
};
