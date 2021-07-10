// This file contains functions related to changing the appearance of elements on page

// to change the appearance of button after unmute operation
const setmutebut= () =>
{
    // To replace the icon
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
    document.querySelector('.mute_button').innerHTML = html;  //icon changed by this command
    var v= document.getElementById("mute_button") ;
    // To change the color of button after clicking
    v.style.color = "green" ;
}

// to change the appearance of button after mute operation
const setunmutebut= () =>
{
    // To replace the icon
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
    document.querySelector('.mute_button').innerHTML = html;
    var v= document.getElementById("mute_button") ;
    v.style.color = "red" ;
}

// change appearance of Video button when camera turned off
const setoffbut= () =>
{
    // To replace the icon
    const html = `
    <i class="fas fa-video"></i>
    <span>Camera Off</span>
  `
    document.querySelector('.video_button').innerHTML = html;
    var v= document.getElementsByClassName("video_button") ;
    v[0].style.color = "red" ;
}

// change appearance of Video button when camera turned on
const setonbut= () =>
{
    // To replace the icon
    const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Camera On</span>
  `
  document.querySelector('.video_button').innerHTML = html; 
  var v= document.getElementsByClassName("video_button") ;
    v[0].style.color = "green" ;
}

// This function will notify that link to meeting has been copied by flashing a temporary green color on button
function change_copy_color(){
    var x= document.getElementById('copy_button') ;
    if(x.style.color=="green")
    x.style.color= "white" ;
    else
    x.style.color= "green"
}

// This function Will adjust the videos everytime someone joins or leave the meeting
function adjust_videos() {
    var vids= document.getElementsByTagName('video') ;
    var height , width , i ; // height and width of the video elements will be changed based on number of participants in video meeting
    // height and width will be in pixels (px)
    if(num_users>=9)
    {
        height= 180 ; width= 190 ;
    }
    else if(num_users>=5)
    {
        height= 200 ; width=230 ;
    }
    else if(num_users>=3)
    {
        height=300 ; width=400 ;
    }
    else
    {
        height=400 ; width=400 ;
    }
    // for loop will change style of every video element
    for(i=0; i<vids.length; i++)
    {
        vids[i].style.height=  height+'px' ;
        vids[i].style.width=  width+'px' ;
    }
}
