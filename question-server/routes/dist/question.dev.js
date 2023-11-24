"use strict";

var express = require('express');

var router = express.Router();

var Question = require('./question.json');

var fs = require('fs');

var path = require('path');

router.get('/', function (req, res, next) {
  try {
    var totalMarks = req.query.totalMarks;
    var marksOfEasyQuestions = req.query.easy;
    var marksOfMediumQuestions = req.query.medium;
    var marksOfHardQuestions = req.query.hard;
    var subject = req.query.subject;
    var easyQuestions = Question.data.filter(function (question) {
      return question.difficulty === 'easy' && question.subject === subject.toLowerCase();
    });
    var mediumQuestions = Question.data.filter(function (question) {
      return question.difficulty === 'medium' && question.subject === subject.toLowerCase();
    });
    var hardQuestions = Question.data.filter(function (question) {
      return question.difficulty === 'hard' && question.subject === subject.toLowerCase();
    });

    if (marksOfEasyQuestions > easyQuestions.length * 2 || marksOfMediumQuestions > mediumQuestions.length * 5 || marksOfHardQuestions > hardQuestions.length * 10) {
      res.status(500).send("Not enough questions in the question bank");
      return;
    }

    var easyQuestionsArray = [];
    var mediumQuestionsArray = [];
    var hardQuestionsArray = [];

    while (marksOfEasyQuestions > 0) {
      var randomIndex = Math.floor(Math.random() * easyQuestions.length);
      var question = easyQuestions[randomIndex];

      if (!easyQuestionsArray.includes(question)) {
        easyQuestionsArray.push(question);
        marksOfEasyQuestions -= question.marks;
      }
    }

    while (marksOfMediumQuestions > 0) {
      var _randomIndex = Math.floor(Math.random() * mediumQuestions.length);

      var _question = mediumQuestions[_randomIndex];

      if (!mediumQuestionsArray.includes(_question)) {
        mediumQuestionsArray.push(_question);
        marksOfMediumQuestions -= _question.marks;
      }
    }

    while (marksOfHardQuestions > 0) {
      var _randomIndex2 = Math.floor(Math.random() * hardQuestions.length);

      var _question2 = hardQuestions[_randomIndex2];

      if (!hardQuestionsArray.includes(_question2)) {
        hardQuestionsArray.push(_question2);
        marksOfHardQuestions -= _question2.marks;
      }
    }

    var questions = easyQuestionsArray.concat(mediumQuestionsArray, hardQuestionsArray);
    console.log(questions);
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;