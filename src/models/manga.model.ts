export enum MangaState {
  Reading = "reading",
  OnHold = "on hold",
  Completed = "completed",
  Dropped = "dropped",
}

export interface IManga {
  _id: string;
  name: string;
  state: MangaState;
  chapter: number;
  image: string; // Base64 string
  link: string;
  description: string;
  genre: string[];
  created_at: string;
  updated_at: string;
}

export interface IMangaCreate {
  name: string;
  state: MangaState | "";
  chapter: number | null;
  image: string;
  link: string;
  description: string;
  genre: string[];
}

export interface IMangaUpdate {
  name: string;
  state: MangaState | "";
  chapter: number | null;
  image: string;
  link: string;
  description: string;
  genre: string[];
}
