var myscreen ='';  // saving own screen
function start_screen_share(){
 try{
   navigator.mediaDevices.getDisplayMedia({
     video: {
       cursor: "always"
     },
     audio: {
       echoCancellation: true,
       noiseSuppression: true
     }
   }).then((stream)=> {
       let videoTrack = stream.getVideoTracks()[0];
       screen = stream;
       broadcastNewTracks( stream, 'video');
       myvid.srcObject = stream;  // Now my video will show this stream as video

       screen.getVideoTracks()[0].addEventListener( 'ended', () => {
            stopSharingScreen();
            myvid.srcObject = myvidstr;  // now again changing the source for own video, it will now show video stream
        } );
   }).catch(err => {
     console.log(err); // for checking error in console
   })
 }catch(err){
    console.log(err); // for checking error in console
 }
};

// Function will be called when screen sharing is stopped
function stopSharingScreen(){
  return new Promise( ( res, rej ) => {
          screen.getTracks().length ? screen.getTracks().forEach( track => track.stop() ) : '';
              res();
          } ).then( () => {
              broadcastNewTracks( myvidstr, 'video' );
          } ).catch( ( e ) => {
              console.error( e ); // for checking error in console
          } );
}

// function to replace video screen with desktop screen
function replaceTrack( stream, recipientPeer ) {
    let sender = recipientPeer.peerConnection.getSenders ? recipientPeer.peerConnection.getSenders().find( s => s.track && s.track.kind === stream.kind ) : false;
    sender ? sender.replaceTrack( stream ) : '';
}

// This function is used to change the video in other user's screen.
function broadcastNewTracks( stream, type) {
    let track = type == 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
    for ( let pe in peers ) {
        let Name = peers[pe];
        if ( typeof Name == 'object' ) {
            replaceTrack( track, Name);
        }
    }
}
