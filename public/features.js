

// function to mute or unmute self audio parameter a with be changed 
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

// to change the appearance of button after unmute operation
const setmutebut= () =>
{
    var v= document.getElementById("mute_button") ;
    v.style.color = "green" ;
}

// to change the appearance of button after mute operation
const setunmutebut= () =>
{
    var v= document.getElementById("mute_button") ;
    v.style.color = "red" ;
}

//function to stop or to show self video . video parameter v will be changed. 
const camoff= ()=> {
    const ena= myvidstr.getVideoTracks()[0].enabled ;
    if(ena){
        myvidstr.getVideoTracks()[0].enabled= false ;
        v=false ;
        setoffbut() ;
    }
    else{
        myvidstr.getVideoTracks()[0].enabled= true ;
        v=true ;
        setonbut() ;
    }
}

// change appearance of button
const setoffbut= () =>
{
    var v= document.getElementById("camera_button") ;
    v.style.color = "red" ;
}

const setonbut= () =>
{
    var v= document.getElementById("camera_button") ;
    v.style.color = "green" ;
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

// function to leave the meeting. this will redirect to home page of website
const leave= ()=>{

    var confirm_result = confirm("Are you sure you want to quit? Note : you can always come again and start a meeting from http://sww.chichat.com");
        if (confirm_result == true) {
            location.replace("https://www.w3schools.com")
        }
}


// function to send inviting email. email will be sent by user. subject and content will be set by us.
function sendEmail() {
    var subject = "Inviting to chill out at ViChill";
    var emailBody = 'Hi %0D%0A' + 'I '+name+' am inviting you to come to our meeting by clicking '+ window.location.href 
    + ' %0D%0ANote : you can always start a new meeting by going to http://abc.com' ;
    document.location = "mailto:?subject="+subject+"&body="+emailBody;
}