export function isValidEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function isValidDate(date: string): boolean {
  if (!date) return false;

  const birthDate = new Date(date);
  if (isNaN(birthDate.getTime())) return false;

  const today = new Date();

  const age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  const exactAge = hasHadBirthdayThisYear ? age : age - 1;

  return exactAge >= 13 && exactAge <= 120;
}

export function isValidPassword(password: string): boolean {
  if (!password) return false;
  return password.length >= 8;
}

export function isValidUsername(username: string): boolean {
  if (!username) return false;
  return username.length >= 4;
}

export function isValidChapter(chapter: string): boolean {
  if (!chapter) return false;
  const re = /^[1-9]\d{0,3}$/;
  return re.test(chapter);
}
