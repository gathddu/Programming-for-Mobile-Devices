import { Film } from '../types/index';

export const filmsData: readonly Film[] = [
  {
    id: '1',
    title: 'The Notebook',
    releaseDate: '2018-11-30',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=500&fit=crop',
    description: 'A historical drama exploring the complex relationships between Queen Anne and two women vying for her affection. The film brilliantly captures the intricate power dynamics and emotional turmoil within the royal court, featuring stunning cinematography and exceptional performances that showcase the depth of human connection and rivalry. This masterpiece examines themes of love, loyalty, and manipulation with wit and sophistication.',
    actorIds: ['1', '4'],
  },
  {
    id: '2',
    title: 'Fleabag',
    releaseDate: '2020-06-05',
    image: 'https://images.unsplash.com/photo-1489599849228-ed4dc59b2e84?w=400&h=500&fit=crop',
    description: 'A special comedy event featuring Phoebe Waller-Bridge performing her acclaimed one-woman show. The performance brilliantly combines stand-up comedy with theatrical storytelling, delivering sharp observations about modern life and relationships. With her signature wit and vulnerability, she creates an intimate connection with the audience while exploring themes of identity, love, and self-discovery with remarkable honesty and humor.',
    actorIds: ['2'],
  },
  {
    id: '3',
    title: 'The Florida Project',
    releaseDate: '2017-05-22',
    image: 'https://images.unsplash.com/photo-1533613220915-609f21a91335?w=400&h=500&fit=crop',
    description: 'A psychological thriller featuring two lighthouse keepers isolated on a remote island. The film creates an atmosphere of mounting tension and psychological unraveling as the characters descend into madness and paranoia. With its striking black-and-white cinematography and intense performances, the movie explores themes of isolation, obsession, and the fragility of human sanity in extraordinary and disturbing ways.',
    actorIds: ['3'],
  },
  {
    id: '4',
    title: 'Ex Machina',
    releaseDate: '2015-04-10',
    image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=500&fit=crop',
    description: 'A science fiction thriller exploring artificial intelligence and consciousness through the story of a programmer invited to test a sophisticated AI robot. The film raises profound philosophical questions about what it means to be human and intelligent, featuring thought-provoking dialogue and stunning visual effects. With its intelligent screenplay and compelling performances, the movie challenges viewers to question the nature of consciousness and manipulation.',
    actorIds: ['4'],
  },
  {
    id: '5',
    title: 'Superbad',
    releaseDate: '2007-08-13',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=500&fit=crop',
    description: 'A coming-of-age comedy following two best friends navigating the ups and downs of high school life. The film captures the humor and heart of adolescence with its authentic characters and relatable situations. With its witty dialogue, memorable scenes, and genuine performances, the movie celebrates the bonds of friendship and the challenges of growing up.',
    actorIds: ['6'],
  },
];
