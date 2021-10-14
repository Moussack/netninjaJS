// ui.js Responsible for getting chats and data together

// adding new chat documents
// setting up real time listener to get new chats
// updating  the username
// updating the romm

class Chatroom {
   constructor(room, username) {
      this.room = room;
      this.username = username;
      this.chats = db.collection('chats');
      this.unsub;
   }

   // add chat to the DB
   async addChat(message) {
      // CREATE custom object to send/add to the db
      const now = new Date();
      const chat = {
         message,
         username: this.username,
         room: this.room,
         created_at: firebase.firestore.Timestamp.fromDate(now),
      };
      // *** send the custom object to the db
      const response = await this.chats.add(chat);
      console.dir(firebase.firestore);
      return response;
   }

   // set listener
   getChats(callback) {
      this.unsub = this.chats
         .where('room', '==', this.room)
         .orderBy('created_at')
         .onSnapshot((snapshot) => {
            //console.log(snapshot.docChanges());
            snapshot.docChanges().forEach((change) => {
               if (change.type === 'added') {
                  //update the UI
                  callback(change.doc.data());
               }
            });
         });
   }

   // update username
   updateName(username) {
      this.username = username;
      console.log('username updated');
      localStorage.setItem('username', username);
   }

   // update room by unsub the listener first
   updateRoom(room) {
      this.room = room;
      // MUST check if unsub has a value yet, if not checked it will throw error.
      if (this.unsub) {
         this.unsub();
      }
      console.log('room updated');
   }
}

// test simulate user chanign room
/* setTimeout(() => {
   chatroom.updateRoom('gaming');
   chatroom.updateName('chunli');
   chatroom.getChats((data) => {
      console.log(data);
   });

   //chatroom.addChat('hello my name is chunli');
}, 3000); */
