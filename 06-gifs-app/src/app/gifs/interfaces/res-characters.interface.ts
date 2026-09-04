export interface CharacterResponse {
  info: Info;
  results: CharacterItem[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface CharacterItem {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Location {
  name: string;
  url: string;
}
