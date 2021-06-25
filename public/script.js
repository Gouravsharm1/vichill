const socket= io('/') ;
var a=true ; var v=true ;  // setting audio and video true for initial stream
const vidgrid= document.getElementById("vid-grid") ;

// initializing peerjs
var mpeer= new Peer(undefined, {
    path : '/peerjs' ,
    host: '/' ,
    port: '443'
}) 


let myvidstr ;  // self video stream that will be sent to all peers
const myvid= document.createElement('video') ;
myvid.muted=true ;

const peers= {}  // to save all the peers joined


// settinf up of self video stream by using audio and video devices of machine
navigator.mediaDevices.getUserMedia({
    video:v ,
    audio:a
}).then(stream=>{
    
    myvidstr=stream ;
    addvid(myvid,stream) // adding own stream in own window
})

 
socket.on('user-connected', userId => {
connectNewuser(userId, myvidstr) ; // calling the function to exchange streams with new user
})


// one of the most important function to receive the call from new user .
// that call contains user's video stream. here we will add his stream and answer the call with own stream
mpeer.on('call', call => {

    navigator.mediaDevices.getUserMedia({
        video:v ,
        audio:a
    }).then(stream=> {
        
        call.answer(myvidstr) ;// Answer the call with an A/V stream.
        const vide= document.createElement('video')  ;
        call.on('stream', remoteStream => {
        
        addvid(vide, remoteStream)   // adding the stream that the new user send with call
    });

    })
  
});



// remove the user when he is disconnected
socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
  })
  

  // function to add the video stream on window
const addvid= (video, stream) => {
    video.srcObject= stream 
    video.addEventListener('loadedmetadata', ()=> {
    video.play() 

    })
   
    vidgrid.append(video) ;
}


// when a new peer connection is eastablished
mpeer.on('open', id => {
   socket.emit('join-room', Room_id, id) ; 
})



// here the new user is called with own stream , and received his stream in the answer then we can add his stream in our window
function connectNewuser(userid , stream){
    // first we connect to the peer
    var conn = mpeer.connect('userid');
    conn.on('open', function(){
      conn.send('hi!');
    });
    const vide= document.createElement('video')  ;
    const call= mpeer.call(userid,stream) ;  // calling new user with own stream
    call.on('stream', userVideoStream => {
        addvid(vide, userVideoStream) // adding his stream in own window
    }) ;

    // to remove the video when call is closed
    call.on('close', () => {
        vide.remove()
      })
    
    peers[userid] = call  // saving the call with user
    
}

