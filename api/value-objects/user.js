export const weddingUser = {
  mode: 'wedding',

  personalLastName: 'Иванова',
  personalFirstName: 'Анна',
  personalMiddleName: 'Сергеевна',
  personalPhoneNumber: '37529123456',
  personalNumberOfPassport: 'MP123456',
  personalAddress: 'Минск, Ленина 15',

  citizenLastName: 'Иванова',
  citizenFirstName: 'Анна',
  citizenMiddleName: 'Сергеевна',
  citizenBirthDate: '1998-05-14',
  citizenNumberOfPassport: 'MP123456',
  citizenGender: 'female',
  citizenAddress: 'Минск, Ленина 15',

  dateOfMarriage: '2026-08-15',
  newLastName: 'Петрова',

  anotherPersonLastName: 'Петров',
  anotherPersonFirstName: 'Алексей',
  anotherPersonMiddleName: 'Викторович',
  birth_of_anotoherPerson: '1996-11-22',
  anotherPersonPassport: 'MP654321',

  birth_place: null,
  birth_mother: null,
  birth_father: null,
  birth_grandpa: null,
  birth_grandma: null,

  death_dateOfDeath: null,
  death_placeOfDeath: null
};

export const birthUser = {
  ...weddingUser,
  mode: 'birth',
  birth_place: 'Минск, Ленина 15',
  birth_mother: '1998-05-14',
  birth_father: '1998-05-14',
  birth_grandpa: '1978-05-14',
  birth_grandma: '1978-05-14'
};

export const deathUser = {
  ...weddingUser,
  mode: 'death',
  birth_place: null,
  birth_mother: null,
  birth_father: null,
  birth_grandpa: null,
  birth_grandma: null,
  death_dateOfDeath: '2026-07-25',
  death_placeOfDeath: 'Гродно, ул.Гагарина 10'
};
