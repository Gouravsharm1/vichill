exports.joined_meeting = () =>{
    // Style of page will be changed
    var x= document.getElementsByClassName("main__left") ;
    var y= document.getElementsByClassName("main__right") ;
    var c= document.getElementsByClassName("main__controls") ;

    x[0].style.flex= 0.8 ; y[0].style.flex=0.2 ; c[0].style.visibility= "visible" ;
    vidgrid.innerHTML='' ;  // This will delete all the elements present at the plae of videos
    start_now() ;  // Calling the function that will start thew video meeting for user
}

exports.left_meeting= ()=>{
    
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
    cop.setAttribute("onclick", "copy()")
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