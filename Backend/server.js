const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const {Server} = require("socket.io")
const http = require("http")



const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser")

require("./config/db");
require("dotenv").config();
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser())

const userRoutes = require("./routes/userRoutes");
const societyRoutes = require("./routes/societyRoutes");
const importantNumberRoutes = require("./routes/importantNumberRoutes");
const ownerRoute = require("./routes/ownerRoute")
const tenantRoute = require("./routes/tenantRoute")
const expensesRoute = require("./routes/expensesRoutes")
const noteRoute = require("./routes/noteRoutes")
const facilityRoute = require("./routes/facilityRoutes")
const complaintRoute = require("./routes/createComplaintRoutes")
const requestsRoute = require("./routes/requestTrackingRoutes")
const securityprotocolRoute = require("./routes/securityProtocolRoutes")
const annoucementRoute = require("./routes/annoucementRoutes")
const securityGuardRoute = require("./routes/securityGuardRoutes")
const incomeRoute = require("./routes/incomeeRoutes");

const chatRoute = require("./routes/chatRoute")

// const router = require("./routes/chatRoute");


// chat server
const server = http.createServer(app)
const io = new Server( server , {
  cors :{
    origin : "*",
    methods : ["GET" , "POST"],
  }
})

io.on("connection" , (socket) =>{
  console.log(`User connected : ${socket.id}`)
})

// chat connection 
io.on("connection" , (socket) =>{
  console.log(`User connected : ${socket.id}`)

  socket.on("joinchat" , (chatId) =>{
    socket.join(chatId);
    console.log(`User joined chat : ${chatId}`);
    
  })

  socket.on("sendMessage" , (data) =>{
    const {chatId , message} = data;
    io.to(chatId).emit("receivemessage" , message)
  })


  socket.on("disconnected" , () =>{
    console.log("User disconnected")
  })
})
const router = require("./routes/UniversalLogin");

const PaymentRoute = require("./routes/paymentRoute");

const visitor = require("./routes/VisitorRoute")


//user registration , login and update Profile
app.use("/universal",router);
app.use("/payment",PaymentRoute);
app.use("/api/v1",userRoutes);

//create society api
app.use('/api/societies', societyRoutes);

//create Important Number
app.use('/api/v2/important-numbers', importantNumberRoutes);

//resident apis
app.use('/api/v2/Owner', ownerRoute);
app.use('/api/v2/tenant', tenantRoute);

// financial management
app.use('/api/v2/income', incomeRoute);
app.use('/api/v2/expenses', expensesRoute);
app.use('/api/v2/note', noteRoute);

//facility management
app.use('/api/v2/facility', facilityRoute);

// complaint tracking
app.use('/api/v2/complaint', complaintRoute);
app.use('/api/v2/requests', requestsRoute);

//security management
app.use('/api/v2/securityprotocol', securityprotocolRoute);

// securityGuard
app.use('/api/v2/security', securityGuardRoute);

// Annoucement
app.use('/api/v2/annoucement', annoucementRoute);


app.use('/chat' , chatRoute)

// visitor tracking
app.use("/api/v2/Visitor",visitor);


app.listen(PORT, () => {
  console.log(`Server is running on port Number ${PORT}`);
});