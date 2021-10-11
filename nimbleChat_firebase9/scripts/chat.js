// DOM query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// Import firebase and firestore functions you need from the SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { query, getFirestore, collection, getDocs, doc, addDoc, deleteDoc, Timestamp, onSnapshot, where, orderBy } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';

// Your firebase config
const firebaseConfig = {
   apiKey: 'AIzaSyBHOrXpafW9jJHoQn7-UWySPxxsS1TAcE8',
   authDomain: 'nimble-ninja-js.firebaseapp.com',
   projectId: 'nimble-ninja-js',
   storageBucket: 'nimble-ninja-js.appspot.com',
   messagingSenderId: '669026248863',
   appId: '1:669026248863:web:07c94cf971c791b5f81aaa',
   measurementId: 'G-H9SNQQ5KKG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ----------------- CHAT CLASS -----------------------------------------
class Chatroom {
   constructor(room, username) {
      this.username = username;
      this.room = room;
      this.chats = collection(db, 'chats');
      this.unsub;
   }
   //METHODS DECLARATION

   // Adding chat to the db
   async addChat(message) {
      // Create Date object to be passed to Timestamp.fromDate()
      const now = new Date();

      // Create custom object (the chat) to be sended to the db
      const chat = {
         message,
         username: this.username,
         room: this.room,
         created_at: Timestamp.fromDate(now),
      };

      // *** send the custom object to the db
      const response = await addDoc(this.chats, chat);
      return response;
   }

   // Get chats with realtime listener
   getChats(callback) {
      // make query first for querying the db (so we can use where, orderBy, etc)
      const qry = query(this.chats, where('room', '==', this.room), orderBy('created_at'));

      // *** realtime listener
      this.unsub = onSnapshot(qry, (snapshot) => {
         snapshot.docChanges().forEach((change) => {
            const doc = change.doc;
            const data = doc.data();
            if (change.type === 'added') {
               callback(data);
            }
         });
      });
   }

   // update username
   updateName(username) {
      //***
      this.username = username;
      console.log('username updated');
      localStorage.setItem('username', username);
   }

   // update room
   updateRoom(room) {
      // ***
      this.room = room;
      // MUST check if unsub has a value yet, if not checked it will error.
      if (this.unsub) {
         this.unsub();
      }
      console.log('room updated');
   }
}

// ----------------- UI CLASS -----------------------------------------
// ui.js Responsible for the UI DOM
// render chat templates to the DOM
// clear the list of chats (when the room changes)
class ChatUI {
   constructor(list) {
      this.list = list;
   }

   render(data) {
      // use datefns library to simplify date
      const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
         addSuffix: true,
      });

      let html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</span>
        </li>
       `;

      // *** render to the dom
      this.list.innerHTML += html;
   }

   // clear chat data in the DOM
   clear() {
      this.list.innerHTML = '';
   }
}

// ----------------- APP -----------------------------------------
// check localstorage for a name
const username = localStorage.username ? localStorage.username : 'anonymous';

// clasees instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

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
   // show update mssg then hide the update mssg
   updateMssg.innerText = `Your name was updated to ${newName}`;
   // hide after 2.5 secs
   setTimeout(() => {
      updateMssg.innerText = ``;
   }, 2500);
});

// choosing chatroom
rooms.addEventListener('click', (e) => {
   // using event delegation
   //console.dir(e.target);
   if (e.target.tagName === 'BUTTON') {
      // clear the chat on DOM
      chatUI.clear();
      // unsub from the current listener / room
      chatroom.updateRoom(e.target.id);
      // subscibing to new listener / room and render the data to DOM by using callback function
      chatroom.getChats((chat) => {
         chatUI.render(chat);
      });
   }
});

// simulate user when switching from general room to gaming room
/* setTimeout(() => {
   chatroom.updateRoom('gaming');
   chatroom.getChats((data) => {
      console.log(data);
   });
}, 6000); */
