export const getColorVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();
