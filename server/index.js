require('dotenv').config();
const express = require('express');
var cors = require('cors')

const app = express();

// const http = require('http');
// const server = http.createServer(app);
// const io = require("socket.io")(server)

app.use(express.json());
// app.use(pino);
app.use(cors())

const port = process.env.PORT || 3001


app.use(express.static(__dirname + '/client/'));

app.listen(port,()=>{
    console.log("App is listening to port http://localhost:"+port)
})


// app.get('/rotate',(req,res)=>{
//   console.log("sending.............",req.body)
//   io.emit("rotate",req.body)
//   res.sendStatus(200)
// })

// app.get("/world",(req,res)=>{
//   io.emit("world",req.body)
//   res.sendStatus(200)
// })

// app.get("/hands",(req,res)=>{
//   io.emit("hands",req.body)
//   res.sendStatus(200)
// })

// io.on('connection', (socket) => {
//     console.log('a user connected');
    
   

// //     // socket.on("animateAvatar",sigml=>{
// //     //     console.log("mssg from react",sigml)
// //     //     io.emit("avatar",String(sigml))
// //     // })
// //     // socket.on('playStopped',()=>{
// //     //     io.emit('playStopState')
//     // })
//   });
  

// server.listen(3001, () =>
//     console.log('Express server is running on http://localhost:3001')
// );



