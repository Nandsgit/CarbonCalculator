const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const surveyResultSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    form: {
        type: Object,
        required: true,
        unique: false,
        trim: true,
    },
    form_vals: {
        type: Object,
        required: true,
        unique: false,
        trim: true
    },
    co2: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
    },
}, { timestamps: true })

const SurveyResult = mongoose.model('SurveyResult', surveyResultSchema);

module.exports = SurveyResult;
