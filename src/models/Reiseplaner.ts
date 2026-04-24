export type Reise = {
  id: string;
  name: string;
  ziel: string;
  dauer: number;
  abenteuerlevel: number;
  zweck: string;
  jahreszeit: string;
};

export type NewReise = Omit<Reise, "id">;