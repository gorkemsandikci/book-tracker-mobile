export const SEED_AUTHORS = [
  {
    id: 'author-orwell',
    name: 'George Orwell',
    birthYear: '1903',
    nationality: 'British',
  },
  {
    id: 'author-austen',
    name: 'Jane Austen',
    birthYear: '1775',
    nationality: 'British',
  },
  {
    id: 'author-murakami',
    name: 'Haruki Murakami',
    birthYear: '1949',
    nationality: 'Japanese',
  },
  {
    id: 'author-morrison',
    name: 'Toni Morrison',
    birthYear: '1931',
    nationality: 'American',
  },
  {
    id: 'author-garcia',
    name: 'Gabriel Garcia Marquez',
    birthYear: '1927',
    nationality: 'Colombian',
  },
  {
    id: 'author-adichie',
    name: 'Chimamanda Ngozi Adichie',
    birthYear: '1977',
    nationality: 'Nigerian',
  },
];

export const SEED_BOOKS = [
  {
    id: 'book-1984',
    title: '1984',
    authorId: 'author-orwell',
    notes: 'Dystopian classic about surveillance and control.',
  },
  {
    id: 'book-animal-farm',
    title: 'Animal Farm',
    authorId: 'author-orwell',
    notes: 'Allegory of political power and revolution.',
  },
  {
    id: 'book-pride',
    title: 'Pride and Prejudice',
    authorId: 'author-austen',
    notes: 'Witty romance and social commentary.',
  },
  {
    id: 'book-norwegian-wood',
    title: 'Norwegian Wood',
    authorId: 'author-murakami',
    notes: 'Coming-of-age story set in 1960s Tokyo.',
  },
  {
    id: 'book-kafka',
    title: 'Kafka on the Shore',
    authorId: 'author-murakami',
    notes: 'Surreal dual narrative with cats and destiny.',
  },
  {
    id: 'book-beloved',
    title: 'Beloved',
    authorId: 'author-morrison',
    notes: 'Haunting story of slavery and memory.',
  },
  {
    id: 'book-hundred-years',
    title: 'One Hundred Years of Solitude',
    authorId: 'author-garcia',
    notes: 'Magical realism across generations of the Buendia family.',
  },
  {
    id: 'book-americanah',
    title: 'Americanah',
    authorId: 'author-adichie',
    notes: 'Love, identity, and race across continents.',
  },
  {
    id: 'book-half-yellow',
    title: 'Half of a Yellow Sun',
    authorId: 'author-adichie',
    notes: 'Nigeria during the Biafran War.',
  },
];

export const SEED_LISTS = [
  {
    id: 'list-want-to-read',
    name: 'Want to Read',
    description: 'Books you plan to read next.',
    bookIds: ['book-kafka', 'book-americanah', 'book-beloved'],
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'list-already-read',
    name: 'Already Read',
    description: 'Books you have finished.',
    bookIds: ['book-1984', 'book-pride', 'book-animal-farm'],
    createdAt: '2024-01-01T00:00:00.000Z',
  },
];
