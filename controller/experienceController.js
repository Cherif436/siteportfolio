import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Experience } from "../models/experienceSchema.js";

export const postExperience = catchAsyncErrors(async (req, res, next) => {
  const { title, school, address, description, from, to } = req.body;
  const newExperience = await Experience.create({
    title,
    school,
    address,
    description,
    experience: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Experience Added!",
    newExperience,
  });
});

export const updateExperience = catchAsyncErrors(async (req, res, next) => {
  const experienceData = {
    title: req.body.title,
    school: req.body.school,
    address: req.body.address,
    description: req.body.description,
    experience: {
      from: req.body.from,
      to: req.body.to,
    }
    
  };
  
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    experienceData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Experience Updated!",
    experience,
  });
});

export const deleteExperience = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let experience = await Experience.findById(id);
  if (!experience) {
    return next(new ErrorHandler("Experience not found", 404));
  }
  await experience.deleteOne();
  res.status(200).json({
    success: true,
    message: "Experience Deleted!",
  });
});

export const getAllExperiences = catchAsyncErrors(async (req, res, next) => {
  const experiences = await Experience.find();
  res.status(200).json({
    success: true,
    experiences,
  });
});

export const getSingleExperience = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const experience = await Experience.findById(id);
    res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});