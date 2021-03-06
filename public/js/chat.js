

var socket=io();

socket.on('connect',function(){
  console.log('Connected to server');
  var params=jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href='/';
    }else{
      console.log('No error');
    }
  });
  // socket.emit('createEmail',{
  //   to:'jen@example.com',
  //   text:'Hey. This is andrew.'
  // });

  // socket.emit('createMessage',{
  //   from:'Frank',
  //   text:'Hi'
  // }, function(data){
  //   console.log("Got it",data);
  //
  // });
});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
  console.log('Users list',users);
  var ol=$('<ol></ol>');
  users.forEach(function(user){
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);

});

socket.on('newMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  // console.log("newMessage",message);
  // var li=$('<li></li>');
  // li.text(`${message.from} ${formattedMessage}: ${message.text}`);
  // $('#messages').append(li);
  var template=$('#message-template').html();
  var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });

  $('#messages').append(html);

  scrollToBottom();
});


$('#message-form').on('submit',function(e){

  e.preventDefault();

  var messageTextbox=$('[name=message]');
  socket.emit('createMessage',{
    text:messageTextbox.val()
  },function(){
    messageTextbox.val('');
  });
});

var locationButton=$('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.attr('disabled','disabled').text('Sending location...');


  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });

});

socket.on('newLocationMessage',function(message){
  // var li=$('<li></li>');
  var formattedTime=moment(message.createdAt).format('h:mm a');
  // var a=$('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href',message.url);
  // li.append(a);
  // $('#messages').append(li);
  var template=$('#location-message-template').html();
  var html=Mustache.render(template,{
    from:message.from,
    url:message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);

  scrollToBottom();

});

function scrollToBottom(){
  var messages=$('#messages');
  var newMessage=messages.children('li:last-child');

  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
    console.log('hey');
  }
}
