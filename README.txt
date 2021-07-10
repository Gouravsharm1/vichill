This website is created under microsoft engage mentorship program

description : video calling web app where you can create/join rooms and start video meeting whenever you want. It also contains some more additional features.

Tech. stack used : node.js , peerjs, socket.io .
web page template : ejs (embedded java script) to easily use javascript code structure inside the webpage
uuid : to generate random unique id for room.

Hosted on : heroku
Any database is not used by choice to make it simple to use and talk freely because chat will disaapear when you leave the room.

wesite link : https://vichill.herokuapp.com

features : It is basically divided into four parts: Room and Video Meeting and chat and other features.

Room features : 1. one click creates room 
                2. Advise you to not join same room again in same browser.
                3. Asking name when you join to use for chat.
                4. Ensuring that nobody joins without name.
                5. One click to join video meeting.
                6. Changing the interface of website when you join the video meeting.
                7. Button to copy the room invite link.
                8. Button to invite someone via email.
                9. Button to leave room, this will redirect you to home page after disconnecting you from room.
                10. Leaving the room will erase your data from server.
                11. Changing the interface again when you leave the video meeting.
                 
Chat features : 1. Notification in the chat when someone joins the room.
                2. You can start chat without joining video meeting.
                3. You can acess chat while in the video meeting.
                4. Notification in the chat when someone joins the video meeting.
                5. You can continue chat even after leaving video meeting.
                6. Notification in the chat when someone leaves the video meeting.
                7. Sending messages in the room.
                8. Send message by pressing enter.
                9. Send message by clicking on Send button.
                10. Ensuring that nobody sends a empty message in chat.
                11. Scroll option.
                12. Auto scroll to bottom when a new message is added.
                
Video meeting features : 1. Advise you to leave video from other rooms before joining new video meeting.
                         2. Changing the size of each video on your screen depending upon the number of participants present in video meeting.
                         3. Access to chat during video meeting.
                         4. Mute and Unmute options.
                         5. Camera on and off options.
                         6. Copy link button to copy invite link of room.
                         7. Invite via Email to invite people by sending email by your own id.
                         8. Doodle together, it will open a new tab where you can draw together.
                         9. Leave meeting, it will disconnect you from video meeting and will send you back to room.
                         10. Use of icons for easy use.
                         
Other features : 1. Changing the icon of mute button depending upon current state.
                 2. Changing the color and name of mute button depending upon current state.
                 2. Flash a temporary green light on copy link button to notify that link has been copied.
                 3. pre populated email with your name, invite link and subject, so that you just have to type the email address of receiver and send it.
                 4. Changing the icon of camera on/off button depending upon current state.
                 5. Changing the color and name of camera on/off button depending upon current state.
                 6. Dynamic changing of background on homepage of website.
                
                
Structure of repository :

Starting point of application : server.js -> contains the backend part of website.

views -> index.ejs : home page of website. template was chosen from html5 and javascript, css and html were modified as per my requirements.
         room.ejs : when a room is created from home page uuid will give unique room id and use this file as room. All other things like chat and video meeting will happen in this room.
         
 images ->  containms background images that are being used in home page.
 assets -> contains css and js files for home page.
 
 public -> style.css: contains the style and css for room.ejs
           script.js -> contains the main javascript code for web application.
           chat.js -> contains the code related to chat feature.
           feature.js -> contains the code and functions for differtent features
           change_appearance.js -> contains function an code that is mostly used for changing style and interface of application
           


 
