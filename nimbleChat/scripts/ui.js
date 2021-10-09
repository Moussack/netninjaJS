// ui.js Responsible for the UI DOM
// render chat templates to the DOM
// clear the list of chats (when the room changes)

class ChatUI {
   constructor(list) {
      this.list = list;
   }

   // display chat data to the DOM
   render(data) {
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
