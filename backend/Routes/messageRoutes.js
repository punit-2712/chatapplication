// There will be two routes


const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("..//Controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//1. sending the message
router.route("/").post(protect, sendMessage);


//2. fecthing the message
router.route("/:chatId").get(protect, allMessages);


module.exports = router;