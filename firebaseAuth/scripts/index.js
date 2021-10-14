// DOM query
const guidelist = document.querySelector('.guides');

// setup guides
const setupGuides = (data) => {
   console.log(data);
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
