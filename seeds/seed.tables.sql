BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Japanese', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'Imo', 'Potato', 2),
  (2, 1, 'Minikui', 'Ugly ', 3),
  (3, 1, 'Muda', 'Futility', 4),
  (4, 1, 'Yomu', 'To Read', 5),
  (5, 1, 'Raijin', 'Thunder God', 6),
  (6, 1, 'Ai', 'Love', 7),
  (7, 1, 'Nekomimi', 'Cat Ear', 8),
  (8, 1, 'Bideogēmu O Shimasu', 'To Play Video Game', 9),
  (9, 1, 'Gambatte', 'Do Your Best', 10),
  (10, 1, 'Kaigi-Teki', 'Skeptical', 11),
  (11, 1, 'Oyasumi', 'Good Night', 12),
  (12, 1, 'Teinei', 'Polite', 13),
  (13, 1, 'Kawaii', 'Cute', 14),
  (14, 1, 'Rika', 'Science', 15),
  (15, 1, 'Nani Kore', 'Whats This', 16),
  (16, 1, 'Okashī', 'Funny', 17),
  (17, 1, 'Itadakimasu', 'Lets Eat', 18),
  (18, 1, 'Baka Na', 'Impossible', 19),
  (19, 1, 'Kowai', 'Scary', 20),
  (20, 1, 'Shitsuke', 'Discipline', 21),
  (21, 1, 'Chotto Matte', 'Wait A Moment', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
