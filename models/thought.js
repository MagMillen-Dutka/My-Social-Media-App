const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionsSchema = require("./reactions");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Leave a thought!",
      minlength: 1,
      maxlength: 230,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

const thought = model("thought", thoughtSchema);

module.exports = thought;