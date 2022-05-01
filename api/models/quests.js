const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const opts = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};

const QuestSchema = new Schema(
  {
    assunto: [String],
    memory: Number,
    question: String,
    answer: [String],
    link: [String],
    image: String,
    images: [String],
    lastDayVisited: String,
  },
  opts
);

QuestSchema.plugin(mongoosePaginate);

const model = mongoose.model("quest", QuestSchema);

model.paginate().then({});

module.exports = model;
