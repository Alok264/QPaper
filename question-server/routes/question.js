const express = require('express');
const router = express.Router();
const Question = require('./question.json');
const fs = require('fs');
const path = require('path');


router.get('/', (req, res, next) => {
    try{
        const totalMarks = req.query.totalMarks;
        let marksOfEasyQuestions = req.query.easy;
        let marksOfMediumQuestions = req.query.medium;
        let marksOfHardQuestions = req.query.hard;
        const subject = req.query.subject;

        const easyQuestions = Question.data.filter((question) => {
            return question.difficulty === 'easy' && question.subject === subject.toLowerCase();
        }
        );
        const mediumQuestions = Question.data.filter((question) => {
            return question.difficulty === 'medium' && question.subject === subject.toLowerCase();
        }
        );
        const hardQuestions = Question.data.filter((question) => {
            return question.difficulty === 'hard' && question.subject === subject.toLowerCase();
        }
        );

        if(marksOfEasyQuestions>easyQuestions.length*2 || marksOfMediumQuestions>mediumQuestions.length*5 || marksOfHardQuestions>hardQuestions.length*10){
            res.status(500).send("Not enough questions in the question bank");
            return;
        }

        let easyQuestionsArray = [];
        let mediumQuestionsArray = [];
        let hardQuestionsArray = [];

        while(marksOfEasyQuestions > 0){
            const randomIndex = Math.floor(Math.random() * easyQuestions.length);
            const question = easyQuestions[randomIndex];
            if(!easyQuestionsArray.includes(question)){
                easyQuestionsArray.push(question);
                marksOfEasyQuestions -= question.marks;
            }
        }
        while(marksOfMediumQuestions > 0){
            const randomIndex = Math.floor(Math.random() * mediumQuestions.length);
            const question = mediumQuestions[randomIndex];
            if(!mediumQuestionsArray.includes(question)){
                mediumQuestionsArray.push(question);
                marksOfMediumQuestions -= question.marks;
            }
        }
        while(marksOfHardQuestions > 0){
            const randomIndex = Math.floor(Math.random() * hardQuestions.length);
            const question = hardQuestions[randomIndex];
            if(!hardQuestionsArray.includes(question)){
                hardQuestionsArray.push(question);
                marksOfHardQuestions -= question.marks;
            }
        }
        const questions = easyQuestionsArray.concat(mediumQuestionsArray, hardQuestionsArray);
        console.log(questions);
        res.status(200).send(questions);
    }
    catch(err){
        res.status(500).send(err.message);
    }
}
);

module.exports = router;