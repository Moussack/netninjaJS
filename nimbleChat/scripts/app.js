// ui.js Responsible for bringing(Gluing) chat.js and ui.js together and running the application

// DOM query
const chatList = document.querySelector('.chat-list');

// clasees instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'rey');

// get chats and render to the DOM
chatroom.getChats((data) => {
   chatUI.render(data);
   console.log(data);
});
