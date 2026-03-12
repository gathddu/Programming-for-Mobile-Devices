export interface Actor {
  readonly id: string;
  readonly name: string;
  readonly character: string;
  readonly image: string;
  readonly bio: string;
  readonly birthDate: string;
  readonly birthPlace: string;
}

export interface Film {
  readonly id: string;
  readonly title: string;
  readonly releaseDate: string;
  readonly image: string;
  readonly description: string;
  readonly actorIds: readonly string[];
}

export type TabType = 'actors' | 'films' | 'form';
