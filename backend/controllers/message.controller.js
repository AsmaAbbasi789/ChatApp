 import Conversation from "../models/conversation.model.js";
 import Message from "../models/message.model.js";
 import { getReceiverSocketId, io } from "../socket/socket.js";


 export const sendMessage = async(req, res) => {
     try {
         const {message} = req.body;
         const {id: recieverId} = req.params;
         const senderId = req.user._id;

         let conversation = await Conversation.findOne({
             participants :{$all : [senderId, recieverId]}
         })

         if (!conversation){
             conversation = await Conversation.create({
                 participants: [senderId, recieverId]
             })
         }

         const newMessage = new Message({
             senderId,
             recieverId,
             message
         })

         if (newMessage){
             conversation.messages.push(newMessage._id)
         }

        
         // await conversation.save();
         // await newMessage.save();

         await Promise.all([conversation.save(), newMessage.save()])

         //  Socket IO Functionality ...
         const receiverSocketId = getReceiverSocketId(recieverId);
 		if (receiverSocketId) {
 			// io.to(<socket_id>).emit() used to send events to specific client
 			io.to(receiverSocketId).emit("newMessage", newMessage);
 		}

         res.status(201).json(newMessage)

     } catch(error){
         console.log("Error in send message controller..", error.message);
         res.status(500).json({error: "Internal serverv error"})
     }
 }


 export const getMessages = async(req, res) => {
     try {
         const {id: userToChatId} = req.params;
         const senderId = req.user._id;
        
         const conversation = await Conversation.findOne({
             participants: {$all: [senderId, userToChatId]}
         }).populate("messages");  //not msg ref id rather all actual messages

         if (!conversation) return res.status(200).json([])

         res.status(200).json(conversation.messages)

     } catch(error) {
         console.log("Error in getMessages controller..", error.message);
         res.status(500).json({error: "Internal Server error"})
     }
 }
