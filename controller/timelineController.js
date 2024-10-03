import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timelineSchema.js";

export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, school, address, description, from, to } = req.body;
  const newTimeline = await Timeline.create({
    title,
    school,
    address,
    description,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline Added!",
    newTimeline,
  });
});

export const updateTimeline = catchAsyncErrors(async (req, res, next) => {
  const timelineData = {
    title: req.body.title,
    school: req.body.school,
    address: req.body.address,
    description: req.body.description,
    timeline: {
      from: req.body.from,
      to: req.body.to,
    }
    
  };
  
  const timeline = await Timeline.findByIdAndUpdate(
    req.params.id,
    timelineData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Timeline Updated!",
    timeline,
  });
});

export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }
  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "Timeline Deleted!",
  });
});

export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    timelines,
  });
});

export const getSingleTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const timeline = await Timeline.findById(id);
    res.status(200).json({
      success: true,
      timeline,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});
