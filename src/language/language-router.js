const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const languageRouter = express.Router();
const jsonBodyParser = express.json();
const Link = require('./Link')

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        });

      req.language = language;

      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      res.json({
        language: req.language,
        words,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/head', async (req, res, next) => {
    LanguageService.getLanguageHead(req.app.get('db'), req.language.head)
    .then(nextHead => {
      const { correct_count, incorrect_count, original, total_score } = nextHead.rows[0]
      const output = {
        nextWord: original,
        totalScore: total_score,
        wordCorrectCount: correct_count,
        wordIncorrectCount: incorrect_count
      }
      res.json(output);
    })
    .catch(next);
  });

languageRouter
  .route('/guess')
  .post(jsonBodyParser, async (req, res, next) => {
    const { guess } = req.body
    if(!guess){
      return res.status(400).json({
        error: `Missing 'guess' in request body`
      })
    }
    
    // let list = new Link()
    // const orgwords = await LanguageService.populate(req.app.get('db'), req.language.id)
    // orgwords.rows.map(word => list.insertLast(word.original))
    
    // let answer = await LanguageService.getWord(req.app.get('db'), req.language.id, list.head.value)
    // answer = answer.rows[0].translation.trim()
    // const values = await LanguageService.getValues(req.app.get('db'), req.language.id, list.head.value)
    // let { memory_value, correct_count, incorrect_count, total_score } = values.rows[0]
    // let isCorrect
    // if(guess === answer){
    //   isCorrect = true
    //   memory_value *= 2
    //   correct_count += 1
    //   total_score += 1
    // }
    // else {
    //   isCorrect = false
    //   memory_value = 1
    //   incorrect_count += 1
    // }
    // const newValues = {
    //   memory_value, 
    //   correct_count, 
    //   incorrect_count, 
    //   total_score
    // }
    // LanguageService.setValues(req.app.get('db'), req.language.id, list.head.value, newValues)
    // temp = list.head.value
    // list.remove(list.head.value)
    // list.insertAt(temp, memory_value)
    // const nextValues = await LanguageService.getValues(req.app.get('db'), req.language.id, list.head.value)
    // correct_count = nextValues.rows[0].correct_count
    // incorrect_count = nextValues.rows[0].incorrect_count


    // const output = {
    //   nextWord: list.head.value,
    //   wordCorrectCount: correct_count,
    //   wordIncorrectCount: incorrect_count,
    //   totalScore: total_score,
    //   answer,
    //   isCorrect,
    // }
    // res.json(output)
  })

module.exports = languageRouter;
