const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const {generateMessage}=require('./utils/message');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');
  socket.on('disconnect',()=>{
    console.log('client disconnected');
  });

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','A new user joined'));



  // socket.emit('newMessage',{
  //   from: 'John',
  //   text: 'See you then',
  //   createdAt: 123123
  // });



  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt: new Date().getTime()
    // });

  });

});


server.listen(port,()=>{
  console.log(`server is up on port 3000`);
});
