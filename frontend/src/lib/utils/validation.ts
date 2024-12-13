export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}