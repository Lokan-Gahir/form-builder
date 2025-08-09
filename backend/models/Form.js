const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // categorize, cloze, comprehension
  text: String,
  image: String,
  meta: mongoose.Schema.Types.Mixed
});

const FormSchema = new mongoose.Schema({
  title: String,
  description: String,
  headerImage: String,
  questions: [QuestionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);
