import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  school: {
    type: String,
    required: [true, "school Required!"],
  },
  address: {
    type: String,
    required: [true, "address Required!"],
  },
  description: {
    type: String,
    required: [true, "Description Required!"],
  },
  timeline: {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
