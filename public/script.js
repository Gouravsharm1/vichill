const socket= io('/') ;
var a=true ; var v=true ;  // setting audio and video true for initial stream, will be changed when user wants
var num_users=0 ;
const vidgrid= document.getElementById("vid-grid") ;

// initializing peerjs 
var mpeer= new Peer(undefined, {
    path : '/peerjs' ,
    host: '/' ,
    port: 443    //if using on local machine then port should be local port
}) 

var myuserid ; // wil be given by Peerjs

let myvidstr ;  // self video stream that will be sent to all peers
const myvid= document.createElement('video') ;
myvid.muted=true ;

const peers= {}  // to save all the peers joined

// when a new peer connection is eastablished
mpeer.on('open', id => {
    myuserid=id ;
   socket.emit('join-room', Room_id, id, name) ; 
})

// setting up of self video stream by using audio and video devices of machine
navigator.mediaDevices.getUserMedia({
    video:v ,
    audio:a
}).then(stream=>{
    num_users++ ;
    myvidstr=stream ;
    addvid(myvid,myvidstr) // adding own stream in own window
})

 // will be called when a new user join the room
socket.on('user-connected', (userId, username) => {
    num_users++ ;
    $('ul').append(`<li class="message"><b>${username} joined</b><br/></li>`)
    connectNewuser(userId, myvidstr) ; // calling the function to exchange streams with new user
})

// here the new user is called with own stream , and received his stream in the answer then we can add his stream in our window
function connectNewuser(userid , stream){
    // first we connect to the peer
    var conn = mpeer.connect('userid');
    conn.on('open', function(){
      conn.send(String(myuserid));
    });
    const vide= document.createElement('video')  ;
    const call= mpeer.call(userid,stream) ;  // calling new user with own stream
    //vide.id= String(userid) ;
    call.on('stream', userVideoStream => {
        addvid(vide, userVideoStream) // adding his stream in own window
    }) ;

    peers[userid] = call  // saving the call with user

    // to remove the video when call is closed
    call.on('close', () => { 
        num_users-- ;
        vide.remove()
        adjust_videos() ;
      })      
}

// call received by remote user. This call contains remote user's video stream. here we will add his stream and answer the call with own stream
mpeer.on('call', call => {
    num_users++ ;
    navigator.mediaDevices.getUserMedia({
        video:v ,
        audio:a
    }).then(stream=> {
        
        peers[call.peer] = call ;

        call.answer(myvidstr) ;// Answer the call with own A/V stream.
        const vide= document.createElement('video')  ;
        call.on('stream', remoteStream => {
        
        addvid(vide, remoteStream)   // adding the stream that the new user send with call
    });
    // removing remote user's video streeam when he closes the call
     call.on('close', () => {
        num_users-- ;
        vide.remove() ;
        adjust_videos() ; 
      })

    })
});


// remove the user when he is disconnected and close his call
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
    adjust_videos() ; 
}

// function to adjust the videos. It is called when a new user join or old user left.
function adjust_videos() {
    var vids= document.getElementsByTagName('video') ;
    var height , weight , i ;
    if(num_users>=9)
    {
        height= 180 ; weight= 190 ;
    }
    else if(num_users>=5)
    {
        height= 200 ; weight=230 ;
    }
    else if(num_users>=3)
    {
        height=300 ; weight=400 ;
    }
    else
    {
        height=400 ; weight=400 ;
    }

    for(i=0; i<vids.length; i++)
    {
        vids[i].style.height=  height+'px' ;
        vids[i].style.width=  weight+'px' ;
    }
}


