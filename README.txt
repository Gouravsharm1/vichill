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
                         8. Doodle together, it will open a new tab where you can draw together (using third party website but can be helpful for participants).
                         9. Leave meeting, it will disconnect you from video meeting and will send you back to room.
                         10. Use of icons for easy use.
                         11. If a person closes the tab without leaving meeting, his video will still be removed.
                         
Other features : 1. Changing the icon and name of mute button depending upon current state.
                 2. Changing the color of mute button depending upon current state.
                 2. Flash a temporary green light on copy link button to notify that link has been copied.
                 3. pre populated email with your name, invite link and subject, so that you just have to type the email address of receiver and send it.
                 4. Changing the icon and name camera on/off button depending upon current state.
                 5. Changing the color of camera on/off button depending upon current state.
                 6. Dynamic changing of background on homepage of website.
 
 
 Development of application :
 
 It was developed using Agile Methodology where i divided my complete development into Iterations.
 -> Started from 14 June, At first I researched about the resources that can be used for this video calling application. Where I got to know about WebRTC , Microsoft Azure communication services, Web sockets and finally i picked up Peerjs for using WebRTC and socket.io to make web socket connections and read their documentation. Then I designed my application and divided the complete development into 4 iterations till 10th July.
 
 1st Iteration (21-25)June -> I build minimum criteria where two persons can connect on video call and then added 3 more features- Mute/Unmute , Camera On/Off , Leave meeting. After testing them I hosted it and tried with my friends and found some bugs.
 
 2nd Iteration (25-30)June -> Solved the bug in which video screen was freezed of user who left the meeting. Now more than 2 person can easily connect and I added 4 more features -Colour change of Mute, Camera and copy button on click, Doodle Together (a drawing tool for fun), Chat feature, Invite via Email.
 
 3rd Iteration (1-5)july -> Solved the bug in which Invite via email feature was removing the person from meeting. Then added more feature - Notification in the chat when someone joins the meeting, As more participants join the meeting video screen size will shrink.
 
 4th Iteration (6-10)July Adopt Phase -> Here we were asked to adopt our application to additional feature in which participants can continue the conversation before and after the meeting. Firstly I Solved the bug in which a person can join the meeting without any name. Then for additional I did following changes :
 - Rather then directly starting a meeting on click, now a room will be created from where you can invite people into your room.
 - You can join Video meeting from there whenever you want. On joining video meeting other participants will be notified about it. Interface of the page will be changed for you.
 - When you leave the video meeting, Page interface will be again changed and you will still be in that room. You can continue the chat in room. When You leave the room, You will be sent to home page.
 
 
 
Some Limitations of product :
1. Same person can join room more than once : This is because we are not storing any data related to user and his rooms so he can join anywhere any number of times. Otherwise if we maintain a database of user and rooms, then we can easily check if a user is already present in the room or not. Hence we give an alert and advise user to not join same room more than once.
In our app, We will advise him to not join same room again everytime he joins a room.
2. A person can join video meeting in more than one room simultaneously : It can be solved if we maintain a database of user and keep a boolean to detect if he is already in a meeting or not. Every time he joins a meeting, we make that bool (in_meeting) true, and make it false when he leaves a meeting. When he wants to join a meeting, we can check if he is already in meeting and decide accordingly.
In our app, we will ask him to leave all other meetings before joining a new meeting.
3. If a person joins video meeting in more than one room from same system then video lags more : This is because the system have to divide its resources to continue more meetings hence more lag.
4. Sometime there is a problem due to server or system that some functionalities of app stops to work : Then we need to rejoin the room or meeting. 

 
                
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
 

flowchart_of_vichill.jpg -> Contains the flowchart of working of application. It was made using draw.io .
profiling.png -> Profiling of application was done for 54 seconds, in which people joined and leave the meeting.

Working of application :

working is easy .
first you create a room where you can chat or start a video meeting.
then you invite other people to your room. here we use socket.io to createw web sockets to connect everyone in room.
then someone starts video meeting. peerjs is used to create unique user id for users.
when someone joins the meeting he tells the socket and then socken tells everyone that new user has connected.
then everybody calls new user with their video stream.
new user adds their stream and answer the call with own stream.
when a user disconnects, then his call is closed by every user and his video stream is removed.
when someone leaves the video meeting, he comes back to chat room.


Thanks a lot to Microsoft and my Mentors Sriharsha B. S. and Meghna Vasudava for their kind mentorship and guidance.

 
