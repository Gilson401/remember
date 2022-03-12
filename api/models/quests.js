const mongoose = require('mongoose');
const { Schema } = mongoose;

const opts = {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
};

const QuestSchema = new Schema({
    assunto: [String],
    memory: Number,
    question: String,
    answer: [String],
    link: [String],
    image: String,

}, opts);

module.exports = mongoose.model('quest', QuestSchema);
