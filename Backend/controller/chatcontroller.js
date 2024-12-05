const Chat = require("../models/chatModel")
const User = require("../models/userModel")

const createmessage = async (req, res) => {
  let { senderId, receiverId, messageContent } = req.body
  try {
    const chat = new Chat({ senderId, receiverId, messageContent })
    await chat.save();
    res.status(201).json(chat)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getChathistory = async (req, res) => {
  const { adminId, residentId } = req.params;

  try {
      // Query the database for chat history between the admin and resident
      const history = await Chat.find({
          $or: [
              { senderId: adminId, receiverId: residentId },
              { senderId: residentId, receiverId: adminId }
          ]
      }).sort({ Timestamp: 1 });

      res.status(200).json(history);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const updatechatstatus = async (req, res) => {
  const { chatId } = req.params

  try {
    const updatedchat = await Chat.findByIdAndUpdate(chatId, { status: "read" }, { new: true })
    res.status(201).json(updatedchat)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deletechat = async (req, res) => {
  const { chatId } = req.params

  try {
    await Chat.findByIdAndDelete(chatId)
    res.status(201).json({ message: "message deleted" })
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getadmincontact = async (req , res) =>{
  const {residentId} = req.params

  try{
    const adminIds = await Chat.find({residentId}).distinct("adminId")
    const admincontact = await User.find({_id : {$in : adminIds}})
    res.status(201).json(admincontact)
  }catch(error){
    res.status(201).json({error : error.message})
  }
}

const getresidentcontact = async (req , res) =>{
  const {adminId} = req.params

  try{
    const residentIds = await Chat.find({adminId}).distinct("residentId")
    const residentcontact = await User.find({_id : {$in : adminId}})
    res.status(201).json(residentcontact)
  }catch(error){
    res.status(201).json({error : error.message})
  }
}

module.exports = {createmessage , getChathistory , updatechatstatus , deletechat , getadmincontact , getresidentcontact}