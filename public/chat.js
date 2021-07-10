var name ; // this will store the username of participant

// while loop to ensure that no one can joins with name as null or empty string
while(true)
{
    var tname= prompt("Please tell your name","");  // getting the name of user so that it can be used in chat
    if(tname===null || tname==="")
    alert("Sorry!! you cannot come without name") ;
    else {
        name = tname ; break ;
    } 
}

var text= $('input') ;  // text written in chat by user

// jquery function to send the message to all the peers when enter is pressed on keyboard
$('html').keydown((e)=> {
        if(e.which==13 && text.val().length!==0) {   // 13 is used because numeric value for enter is 13 and also checked that something is written in chat
            socket.emit('message', text.val(), name) ;
            text.val('')  // resetting the text typed to blank
        }
})

// send message by send button
const sendmsg=()=> {
    if(text.val().length!==0) {  
        socket.emit('message', text.val(), name) ;
        text.val('')  // resetting the text typed to blank
    }
}
  
// adding the message on chat window with the name of sender
 socket.on('createmsg', (msg,name)=> {
        $('ul').append(`<li class="message"><b>${name}</b><br/>${msg}</li>`)
        scrollbottom() ;  // to scroll till last msg in chat window
    })
    
// function to scroll the chat window till bottom every time a message is added 
const scrollbottom=() => {
    let d= $('.chat_window') ;
    d.scrollTop(d.prop("scrollHeight")) ;
}
 
