// ui.js Responsible for bringing(Gluing) chat.js and ui.js..
// together and running the application

// DOM query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'rey');

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
