const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSurveySchema = new Schema({
    form: {
        type: Object,
        required: true,
        unique: false,
        trim: true,
    }
}, { timestamps: true })

const FeedbackSurveyResult = mongoose.model('FeedbackSurveyResult', feedbackSurveySchema);

module.exports = FeedbackSurveyResult;
