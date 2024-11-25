export type JokeCategory = 'Programming' | 'Misc' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas';

export interface JokeFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

export interface BaseJoke {
  id: number;
  category: JokeCategory;
  flags: JokeFlags;
  safe: boolean;
  lang: string;
}

export interface SingleJoke extends BaseJoke {
  type: 'single';
  joke: string;
}

export interface TwoPartJoke extends BaseJoke {
  type: 'twopart';
  setup: string;
  delivery: string;
}

export type Joke = SingleJoke | TwoPartJoke;
