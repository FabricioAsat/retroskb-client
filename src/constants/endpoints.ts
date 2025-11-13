export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}${import.meta.env.VITE_ENDPOINT_REGISTER}`,
    LOGIN: `${API_BASE_URL}${import.meta.env.VITE_ENDPOINT_LOGIN}`,
    ME: `${API_BASE_URL}${import.meta.env.VITE_ENDPOINT_ME}`,
  },
  MANGAS: {
    BASE: `${API_BASE_URL}${import.meta.env.VITE_ENDPOINT_MANGAS}`,
    BY_ID: (id: string) =>
      `${API_BASE_URL}${import.meta.env.VITE_ENDPOINT_MANGAS}/${id}`,
  },
  BACKUP: {
    IMPORT: `${API_BASE_URL}${import.meta.env.VITE_BACKUP_IMPORT}`,
    EXPORT: `${API_BASE_URL}${import.meta.env.VITE_BACKUP_EXPORT}`,
  },
  HEALTH: `${API_BASE_URL}/health`,
};
