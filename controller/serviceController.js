import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import { Service } from "../models/serviceSchema.js";

export const addNewService = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Service Banner Image Required!", 404));
  }
  const { serviceBanner } = req.files;
  const {
    title,
    description,
  } = req.body;
  if (
    !title ||
    !description
  ) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    serviceBanner.tempFilePath,
    { folder: "PORTFOLIO_SERVICE_IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }
  const service = await Service.create({
    title,
    description,
    serviceBanner: {
      public_id: cloudinaryResponse.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponse.secure_url, // Set your cloudinary secure_url here
    },
  });
  res.status(201).json({
    success: true,
    message: "New Service Added!",
    service,
  });
});

export const updateService = catchAsyncErrors(async (req, res, next) => {
  const newServiceData = {
    title: req.body.title,
    description: req.body.description,
  };
  if (req.files && req.files.serviceBanner) {
    const serviceBanner = req.files.serviceBanner;
    const service = await Service.findById(req.params.id);
    const serviceImageId = service.serviceBanner.public_id;
    await cloudinary.uploader.destroy(serviceImageId);
    const newServiceImage = await cloudinary.uploader.upload(
      serviceBanner.tempFilePath,
      {
        folder: "PORTFOLIO_SERVICE_IMAGES",
      }
    );
    newServiceData.serviceBanner = {
      public_id: newServiceImage.public_id,
      url: newServiceImage.secure_url,
    };
  }
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    newServiceData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Service Updated!",
    service,
  });
});

export const deleteService = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  if (!service) {
    return next(new ErrorHandler("Already Deleted!", 404));
  }
  const serviceImageId = service.serviceBanner.public_id;
  await cloudinary.uploader.destroy(serviceImageId);
  await service.deleteOne();
  res.status(200).json({
    success: true,
    message: "Service Deleted!",
  });
});

export const getAllServices = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find();
  res.status(200).json({
    success: true,
    services,
  });
});

export const getSingleService = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});
