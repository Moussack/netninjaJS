// DOM query
const guidelist = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

// setup ui
const setupUI = (user) => {
   if (user) {
      // show account info and render it to the dom
      db.collection('users')
         .doc(user.uid)
         .get()
         .then((doc) => {
            console.log(doc);
            const html = `
               <div>Logged in as ${user.email}</div>
               <div>${doc.data().bio}</div>
            `;
            accountDetails.innerHTML += html;
         });

      // *** toggle ui elements
      loggedInLinks.forEach((item) => (item.style.display = 'block'));
      loggedOutLinks.forEach((item) => (item.style.display = 'none'));
   } else {
      // hide account info if user logged out
      accountDetails.innerHTML = '';
      // *** toggle ui elements
      loggedInLinks.forEach((item) => (item.style.display = 'none'));
      loggedOutLinks.forEach((item) => (item.style.display = 'block'));
   }
};

// setup guides
const setupGuides = (data) => {
   //console.log(data);
   if (data.length) {
      let html = '';
      data.forEach((doc) => {
         const guide = doc.data();
         // create custom html
         li = `
             <li>
               <div class="collapsible-header grey lighten-4">${guide.title}</div>
               <div class="collapsible-body white">${guide.content}</div>
            </li>
         `;

         html += li;
      });
      // *** render it to the dom
      guidelist.innerHTML = html;
   } else {
      guidelist.innerHTML = '<h5 class="center-align">Login to view gudies</h5>';
   }
};

// setup materialize component
document.addEventListener('DOMContentLoaded', () => {
   let modals = document.querySelectorAll('.modal');
   M.Modal.init(modals);

   let items = document.querySelectorAll('.collapsible');
   M.Collapsible.init(items);
});
