const router = require('express').Router();

require('dotenv').config();

let FeedbackSurveyResult = require('../models/feedback_survey.model');

router.route('/save').post((req, res) => {
    const form = req.body;

    const newFeedbackSurvey = new FeedbackSurveyResult({
        form: form,
    })

    newFeedbackSurvey.save()
        .then(() => {
            res.status(200).json('Feedback Saved Successfully');
        })
        .catch(err => {
            res.status(500).json('Error: Unknown error. Please try again later.');
        });
});

module.exports = router;