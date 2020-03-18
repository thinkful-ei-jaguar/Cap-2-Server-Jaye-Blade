const bcrypt = require('bcryptjs');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UserService = {
  hasUserWithUserName(db, username) {
    return db('user')
      .where({ username })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('user')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one upper case, lower case, number and special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
    };
  },
  populateUserWords(db, user_id) {
    return db.transaction(async trx => {
      const [languageId] = await trx
        .into('language')
        .insert([
          { name: 'Japanese', user_id },
        ], ['id']);

      // when inserting words,
      // we need to know the current sequence number
      // so that we can set the `next` field of the linked language
      const seq = await db
        .from('word_id_seq')
        .select('last_value')
        .first();

      const languageWords = [
        ['Imo', 'Potato', 2],
        ['Minikui', 'Ugly', 3],
        ['Muda', 'Futility', 4],
        ['Yomu', 'To Read', 5],
        ['Raijin', 'Thunder God', 6],
        ['Ai', 'Love', 7],
        ['Nekomimi', 'Cat Ear', 8],
        ['Bideogēmu O Shimasu', 'To Play Video Game', 9],
        ['Gambatte', 'Do Your Best', 10],
        ['Kaigi-Teki', 'Skeptical', 11],
        ['Oyasumi', 'Good Night', 12],
        ['Teinei', 'Polite', 13],
        ['Kawaii', 'Cute', 14],
        ['Rika', 'Science', 15],
        ['Nani Kore', 'Whats This', 16],
        ['Okashī', 'Funny', 17],
        ['Itadakimasu', 'Lets Eat', 18],
        ['Baka Na', 'Impossible', 19],
        ['Kowai', 'Scary', 20],
        ['Shitsuke', 'Discipline', 21],
        ['Chotto Matte', 'Wait A Moment', null]
      ];

      const [languageHeadId] = await trx
        .into('word')
        .insert(
          languageWords.map(([original, translation, nextInc]) => ({
            language_id: languageId.id,
            original,
            translation,
            next: nextInc
              ? Number(seq.last_value) + nextInc
              : null
          })),
          ['id']
        );

      await trx('language')
        .where('id', languageId.id)
        .update({
          head: languageHeadId.id,
        });
    });
  },
};

module.exports = UserService;
