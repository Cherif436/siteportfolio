import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { nom, prenom, email, sujet, message } = req.body;
  if (!nom || !prenom || !email || !sujet || !message) {
    return next(
      res.status(400).json({
        success: false,
        message: "Please provide all details",
      })
    );
  }
  try {
    await sendEmail({
      email: "chercher1909@gmail.com",
      subject: "CONTACTER A TRAVERS DU SITE WEB PORTEFOLIO",
      nom,
      prenom,
      sujet,
      message,
      userEmail: email,
    });
    res.status(200).json({
      success: true,
      message: "Message envoyé avec succés.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Internal Server Error",
    });
  }
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Already Deleted!", 400));
  }
  await message.deleteOne();
  res.status(201).json({
    success: true,
    message: "Message supprimé",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(201).json({
    success: true,
    messages,
  });
});
