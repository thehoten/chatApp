var socket=io();

socket.on('connect',function(){
  console.log('Connected to server');

  // socket.emit('createEmail',{
  //   to:'jen@example.com',
  //   text:'Hey. This is andrew.'
  // });

  // socket.emit('createMessage',{
  //   from:'Andrew',
  //   text:'Yup, that works for me'
  // });
});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
  console.log("newMessage",message);
});
