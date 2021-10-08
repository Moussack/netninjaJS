// ui.js Responsible for bringing(Gluing) chat.js and ui.js..
// together and running the application

// DOM query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');

// check localstorage for a name
const username = localStorage.username ? localStorage.username : 'anonymous';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

// get chats and render to the DOM
chatroom.getChats((data) => {
   chatUI.render(data);
   console.log(data);
});

// add new chat
newChatForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const message = newChatForm.message.value.trim();

   // *** add the message
   chatroom
      .addChat(message)
      .then(() => {
         newChatForm.reset();
      })
      .catch((err) => {
         console.log(err);
      });
});

// update username
newNameForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const newName = newNameForm.name.value.trim();

   // *** update the name
   chatroom.updateName(newName);

   // reset the form
   newNameForm.reset();

   // show then hide the update mssg
   updateMssg.innerText = `Your name was updated to ${newName}`;

   setTimeout(() => {
      updateMssg.innerText = ``;
   }, 2500);
});
