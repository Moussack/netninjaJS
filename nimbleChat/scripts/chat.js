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
   }
   async addChat(message) {
      // custom object to send/add to the db
      const now = new Date();
      const chat = {
         message,
         username: this.username,
         room: this.room,
         created_at: firebase.firestore.Timestamp.fromDate(now),
      };
      // send the custom object to the db
      const response = await this.chats.add(chat);
      return response;
   }

   getChats(callback) {
      this.chats
         .where('room', '==', this.room)
         .orderBy('created_at')
         .onSnapshot((snapshot) => {
            console.log(snapshot.docChanges());
            snapshot.docChanges().forEach((change) => {
               if (change.type === 'added') {
                  //update the UI
                  callback(change.doc.data());
               }
            });
         });
   }
}

const chatroom = new Chatroom('gaming', 'rey');
chatroom.getChats((data) => {
   console.log(data);
});
