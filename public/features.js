
// function to mute or unmute self audio parameter a with be changed 
const muteunmute= ()=> {
    const ena= myvidstr.getAudioTracks()[0].enabled ;  // checking the current condition
    if(ena){
        myvidstr.getAudioTracks()[0].enabled= false ; // mute if unmuted
        a=false ;
        setunmutebut() ; // changing the appearance of button after operation  (function present in change_appearance.js)
    }
    else{
        myvidstr.getAudioTracks()[0].enabled= true ;  // unmute if already muted
        a=true ;
        setmutebut() ; //changing the appearance of button after operation (function present in change_appearance.js)
    }
}

//function to stop or to show self video . video parameter v will be changed. 
const camoff= ()=> {
    const ena= myvidstr.getVideoTracks()[0].enabled ;  // checking the current condition
    if(ena){
        myvidstr.getVideoTracks()[0].enabled= false ;
        v=false ;
        setonbut() ; // changing the appearance of button after operation  (function present in change_appearance.js)
    }
    else{
        myvidstr.getVideoTracks()[0].enabled= true ;
        v=true ;
        setoffbut() ; // changing the appearance of button after operation  (function present in change_appearance.js)
    }
}

// function to copy the url address of meeting
function Copy(text){

var inputc = document.body.appendChild(document.createElement("input"));  //temporary create a element 
inputc.value = window.location.href;
inputc.focus();
inputc.select();
document.execCommand('copy'); // saving the location
inputc.parentNode.removeChild(inputc); // delete the temporary element
}

// This will b called when someone wants to leave room. It will redirect to home page.
const leave= ()=>{
    var confirm_result = confirm("Are you sure you want to leave? ");  // to confirm
        if (confirm_result == true) {
            socket.disconnect(name) ;
            location.replace("https://vichill.herokuapp.com")  //sent to home page
        }
}

// function to send inviting email. email will be sent by user by using his default email. subject and content will be set by us.
function sendEmail() {

    var subject = "Inviting to chill out at ViChill";
    var emailBody = 'Hi %0D%0A' + 'I '+name+' invite you to come to our meeting by clicking '+ window.location.href 
    + ' %0D%0ANote : you can always start a new meeting by going to https://vichill.herokuapp.com' ;
    window.open("mailto:?subject="+subject+"&body="+emailBody) ;  // open email in another tab  
}

