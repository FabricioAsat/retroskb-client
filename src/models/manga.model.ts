export enum MangaState {
  Reading = "reading",
  Completed = "completed",
  Abandoned = "abandoned",
  Deleted = "deleted",
  OnHold = "on hold",
}

export interface IManga {
  _id: string;
  name: string;
  state: MangaState;
  chapter: number;
  image: string; // Base64 string
  link: string;
  created_at: string;
  updated_at: string;
}

export interface IMangaCreate {
  name: string;
  state: MangaState | "";
  chapter: number;
  image?: string;
  link: string;
}

export interface IMangaUpdate {
  name?: string;
  state?: MangaState;
  chapter?: number;
  image?: string;
  link?: string;
}
