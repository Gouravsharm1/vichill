// function to mute or unmute. Self audio parameter a will be changed 
const muteunmute= ()=> {
    const ena= myvidstr.getAudioTracks()[0].enabled ;  // checking the current condition
    if(ena){
        myvidstr.getAudioTracks()[0].enabled= false ; // mute if unmuted
        a=false ;
        setunmutebut() ; // changing the appearance of button after operation
    }
    else{
        myvidstr.getAudioTracks()[0].enabled= true ;  // unmute if already muted
        a=true ;
        setmutebut() ;
    }
}

//function to stop or to show self video . video parameter v will be changed. 
const camoff= ()=> {
    const ena= myvidstr.getVideoTracks()[0].enabled ;
    if(ena){
        myvidstr.getVideoTracks()[0].enabled= false ;
        v=false ;
        setonbut() ;
    }
    else{
        myvidstr.getVideoTracks()[0].enabled= true ;
        v=true ;
        setoffbut() ;
    }
}

// function to copy the url address of meeting
function Copy(text){

var inputc = document.body.appendChild(document.createElement("input"));
inputc.value = window.location.href;
inputc.focus();
inputc.select();
document.execCommand('copy');
inputc.parentNode.removeChild(inputc);

}

// function to leave the meeting. This will redirect to home page of website
const leave= ()=>{

    var confirm_result = confirm("Are you sure you want to leave? ");
        if (confirm_result == true) {
            socket.disconnect(name) ;
            location.replace("https://vichill.herokuapp.com")
        }
}

// function to send inviting email. email will be sent by user. subject and content will be set by us.
function sendEmail() {

    var subject = "Inviting to chill out at ViChill";
    var emailBody = 'Hi %0D%0A' + 'I '+name+' invite you to come to our meeting by clicking '+ window.location.href 
    + ' %0D%0ANote : you can always start a new meeting by going to https://vichill.herokuapp.com' ;
    window.open("mailto:?subject="+subject+"&body="+emailBody) ;
    
}
