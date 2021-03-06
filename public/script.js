const socket= io('') ;

alert("Though you can join same room again, but it is still advisable to not join the same room for smooth performance:)");

var vidgrid= document.getElementById("vid-grid") ; // Element of page where all the video streams will be added
// initializing peerjs 
var mpeer= new Peer(undefined, {
    path : '/peerjs' ,
    host: '/' ,
    port: 443
}) 

var myuserid ; // Self userid generated by Peerjs
var video_meet= false ; // Variable that will store if self user is currently present in video meeting
const peers= {}  // Dictionary to save the call with a remote user
var num_users=0 ; // This variable will save the number of participants present in video meeting at any time
var a=true ; var v=true ;  // setting audio and video true for initial stream
let mycalls= new Array() ; // This array will save all the calls that the user is attending
let myvidstr ;  // self video stream that will be sent to all peers

// when a new peer connection is eastablished
mpeer.on('open', id => {
    myuserid=id ; // self user id will be saved
   socket.emit('join-room', Room_id, id, name) ;  // everyone in the room will be notified
})

 // Function will be called when a new user join the room
socket.on('user-connected', (userId, username) => {
    // It will be added in the chat that username has joined room
    $('ul').append(`<li class="message"><b>${username} joined this room. WELCOME ${username}!! :)</b><br/></li>`)
})

socket.on('user-connected-video', (userId, username) => {
    $('ul').append(`<li class="message"><b>${username} joined video meeting :) :) :)</b><br/></li>`)
    // Now if self user is also present in the meeting then he will call the remote user
    if(video_meet)
    connectNewuser(userId, myvidstr) ; // calling the function to exchange streams with new user
})

// To remove the user when he is disconnected
socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close() //if he had not closed the call before leaving then it will be closed now
  })
  
// When received the message that a user has left the video meet
socket.on('user-left-video', (userId, username) => {
    // It will be added in the chat that username has left meeting
    $('ul').append(`<li class="message"><b>${username} left video meeting :( :( :(</b><br/></li>`)
    if (peers[userId]) peers[userId].close()  // his call will be closed
  })
  
// Here the new user is called with own stream , and received his stream in the answer then we can add his stream on our page
function connectNewuser(userid , stream){
    num_users++ ;
    // first we connect to the peer
    var conn = mpeer.connect('userid');
    conn.on('open', function(){
      conn.send(String(myuserid)); //we can send some data to that user
    });
    const vide= document.createElement('video')  ;
    const call= mpeer.call(userid,myvidstr) ;  // calling new user with own stream and received his answer
    // adding video stream received in answer
    call.on('stream', userVideoStream => {
        addvid(vide, userVideoStream) // adding his stream in own window
    }) ;

    peers[userid] = call  // saving the call with user
    mycalls.push(call) ;  // adding call in array of calls
    // close function will be called when remote user close the call
    call.on('close', () => { 
        num_users-- ;    // number of participants in video meet decreased
        vide.remove() ; //  video of user removed
        adjust_videos() ;
      })   
}

// User called by a user that was already present in meeting.
// Call contains remote user's video stream. Here we will add his stream and answer the call with own stream
mpeer.on('call', call => {
    num_users++ ; // number of participants in video meet increased
    navigator.mediaDevices.getUserMedia({
        video:v ,
        audio:a
    }).then(stream=> {
        
        peers[call.peer] = call ;
        mycalls.push(call) ; 
        call.answer(myvidstr) ;  // Answer the call with own A/V stream.
        const vide= document.createElement('video')  ;
        call.on('stream', remoteStream => {
        addvid(vide, remoteStream)   // adding the stream that the new user send with call
    });
    
     call.on('close', () => {
        num_users-- ; 
        vide.remove() ; 
        adjust_videos() ; 
      })
    })
});

// Video element for self video
const myvid= document.createElement('video') ;
myvid.setAttribute("id", "myvideoloc") ; // giving id so that when user leave meeting, he can release media devices
myvid.muted=true ;

// Function to start the video meeting
function start_now() {
// setting up of self video stream by using audio and video devices of system
navigator.mediaDevices.getUserMedia({
    video:v ,
    audio:a
}).then(stream=>{
    num_users++ ; // increase the number of participants in video meeting
    myvidstr=stream ; // setting self video stream
    addvid(myvid,myvidstr) // adding own stream on page
})
socket.emit('joined-video', Room_id, myuserid, name) ; //To tell everyone in the room that user has joined video meet
}

// Function that will be called when user wants to join video meeting
function start_video_meeting() {
    alert("If you have joined video meeting in other room then please leave that to avoid any technical problem.") ;
    
    video_meet= true ; // setting that user is present in video meeting

     // Style of page will be changed
     var x= document.getElementsByClassName("main__left") ;
     var y= document.getElementsByClassName("main__right") ;
     var c= document.getElementsByClassName("main__controls") ;
 
     x[0].style.flex= 0.8 ; y[0].style.flex=0.2 ; c[0].style.visibility= "visible" ;
     vidgrid.innerHTML='' ;  // This will delete all the elements present at the plae of videos
     start_now() ;  // Calling the function that will start thew video meeting for user
}

function leave_video() {
    video_meet= false ;
    var i;
    // releasing the media devices when leaving meeting
    myvidstr.getTracks().forEach( (track) => {
        track.stop();
        });
    let k= document.getElementById("myvideoloc") ;
    k.srcObject= null ;
    // loop to close all the video user was attending
    for(i=0; i<mycalls.length; i++)
    {
        mycalls[i].close() ;
    }
    // Message to soccket to tell that user has left the video meeting
    socket.emit('user-discon-video',Room_id, myuserid, name) ;
    
    // again changing the elements that were previously changed when user joined video meeting
    var x= document.getElementsByClassName("main__left") ;
    var y= document.getElementsByClassName("main__right") ;
    var c= document.getElementsByClassName("main__controls") ;

    x[0].style.flex= 0.2 ; y[0].style.flex=0.8 ; c[0].style.visibility= "hidden" ;
    vidgrid.innerHTML='' ;  // This will remove all the videos that were there

    // Now all the buttons that were deleted will be created again
    var but = document.createElement("button"); //Button to join video meeting
    but.innerHTML= "Join Video" ;
    but.setAttribute("id", "video_meet") ;
    but.setAttribute("onclick", "start_video_meeting()")
    var chat_leave = document.createElement("button"); // Button to leave chat room
    chat_leave.innerHTML= "Leave Room" ;
    chat_leave.setAttribute("id", "leave_chat") ;
    chat_leave.setAttribute("onclick", "leave()")
    var cop = document.createElement("button");  // Button to copy meeting invite link
    cop.innerHTML= "Copy Link" ;
    cop.setAttribute("id", "copy_button_old") ;
    cop.setAttribute("onclick", "Copy()")
    var mail = document.createElement("button"); // Button to invite via mail
    mail.innerHTML= "Invite via Email" ;
    mail.setAttribute("id", "sendmail") ;
    mail.setAttribute("onclick", "sendEmail")

    // Buttons will be again added to page
    vidgrid.append(but) ; 
    vidgrid.append(cop) ; 
    vidgrid.append(mail) ; 
    vidgrid.append(chat_leave) ;   
}

// Utility function to add video streams on page
const addvid= (video, stream) => {
    video.srcObject= stream ;
    video.addEventListener('loadedmetadata', ()=> {
    video.play() 
    })
    vidgrid.append(video) ; // video added to page
    adjust_videos() ; // Videos will be adjusted depending on number of users in meeting
}

