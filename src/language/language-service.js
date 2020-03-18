
const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  },

  getLanguageHead(db, head) {
    return db
      .raw(`SELECT original, correct_count, incorrect_count, total_score
      FROM word w JOIN "language" l ON w.language_id = l.id
      WHERE w.id = ${head};`)
  },

  populate(db, language_id){
    return db.raw(`SELECT original
    FROM word w JOIN "language" l ON w.language_id = l.id
    where l.id = ${language_id}
    order by w.id`)
  },

  getWord(db, language_id, word){
    return db.raw(`SELECT "translation"
    FROM word w JOIN "language" l ON w.language_id = l.id
    where l.id = ${language_id}
    and original = '${word}';`)
  },

  getValues(db, language_id, word){
    return db.raw(`SELECT memory_value, correct_count, incorrect_count, total_score
    FROM word w JOIN "language" l ON w.language_id = l.id
    where l.id = ${language_id}
    and original = '${word}';`)
  },

  setValues(db, language_id, word, values){
    db.raw(`BEGIN;

    UPDATE
      word
    SET
        memory_value = ${values.memory_value}, 
        correct_count = ${values.correct_count}, 
        incorrect_count = ${values.incorrect_count}
    WHERE
      language_id = ${language_id} and original = '${word}';
    
    UPDATE
      "language"
    SET
      total_score = ${values.total_score}
    WHERE
      id = ${language_id};
    
    COMMIT;`)

  },
};

module.exports = LanguageService;
