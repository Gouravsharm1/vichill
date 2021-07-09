
// to change the appearance of button after unmute operation
const setmutebut= () =>
{
    // first we change the icon
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
    document.querySelector('.mute_button').innerHTML = html;
    // now we change the color
    var v= document.getElementById("mute_button") ;
    v.style.color = "green" ;
}

// to change the appearance of button after mute operation
const setunmutebut= () =>
{
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
    document.querySelector('.mute_button').innerHTML = html;
    var v= document.getElementById("mute_button") ;
    v.style.color = "red" ;
}


// change appearance of camera after camera is turned on button
const setoffbut= () =>
{
    const html = `
    <i class="fas fa-video"></i>
    <span>Camera Off</span>
  `
    document.querySelector('.video_button').innerHTML = html;
    var v= document.getElementsByClassName("video_button") ;
    v[0].style.color = "red" ;
}

// change appearance of camera after camera is turned on button
const setonbut= () =>
{
    const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Camera On</span>
  `
  document.querySelector('.video_button').innerHTML = html;
  var v= document.getElementsByClassName("video_button") ;
    v[0].style.color = "green" ;
}


// To notify that link has been copied by changing the color of button for a moment
function change_copy_color(){
    var x= document.getElementById('copy_button') ;
    if(x.style.color=="green")
    x.style.color= "white" ;
    else
    x.style.color= "green"
}
