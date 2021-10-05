// DOM reference
const list = document.querySelector('ul');
const form = document.querySelector('form');
const unsubBtn = document.querySelector('button.unsub');

// Import firebase and firestore functions you need from the SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, addDoc, deleteDoc, Timestamp, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';

// Your firebase config
const firebaseConfig = {
   apiKey: 'AIzaSyBHOrXpafW9jJHoQn7-UWySPxxsS1TAcE8',
   authDomain: 'nimble-ninja-js.firebaseapp.com',
   projectId: 'nimble-ninja-js',
   storageBucket: 'nimble-ninja-js.appspot.com',
   messagingSenderId: '669026248863',
   appId: '1:669026248863:web:07c94cf971c791b5f81aaa',
   measurementId: 'G-H9SNQQ5KKG'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Getting Collections
/* async function getRecipes(db) {
   const recipes = collection(db, 'recipes');
   const recipesSnapshot = await getDocs(recipes);
   const snapshots = recipesSnapshot.docs;
   //console.log(recipesSnapshot.docs);
   // const snapshots = recipesSnapshot.docs.map((doc) => doc.data());
   // console.log(recipesSnapshot.docs);

   return snapshots;
} */

// Render recipe to DOM
const addRecipe = (doc, id) => {
   const time = doc.created_at.toDate();
   let html = `
         <li data-id=${id}>
            <div>${doc.title}</div>
            <div>Created At ${time}</div>
            <button>Delete</button>
         </li>
      `;

   list.innerHTML += html;
};

// delete recipe from DOM
const deleteRecipe = (id) => {
   document.querySelector(`li[data-id="${id}"]`).remove();
};

/* getRecipes(db)
   .then((snapshot) => {
      const docs = snapshot.map((doc) => doc.data());
      const recipeIDs = snapshot.map((doc) => doc.id);

      docs.forEach((doc, i) => {
         addRecipe(doc, recipeIDs[i]);
      });
   })
   .catch((err) => {
      console.log(err);
   }); */

// Getting Collections with real time listener
const unsub = await onSnapshot(collection(db, 'recipes'), (snapshot) => {
   snapshot.docChanges().forEach((change) => {
      const doc = change.doc;
      const data = doc.data();
      const ID = doc.id;
      console.log(change);
      if (change.type === 'added') {
         addRecipe(data, ID);
      } else if (change.type === 'removed') {
         deleteRecipe(ID);
      }
   });
});

// add documents to DB
form.addEventListener('submit', (e) => {
   e.preventDefault();
   const recipeCollection = collection(db, 'recipes');
   const now = new Date();
   const recipe = {
      title: form.recipe.value,
      created_at: Timestamp.fromDate(now)
   };

   addDoc(recipeCollection, recipe)
      .then(() => {
         console.log('added');
      })
      .catch((err) => {
         console.log(err);
      });

   form.reset();
   form.recipe.focus();
});

// delete data from DB
list.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      const id = e.target.parentElement.getAttribute('data-id');
      const docs = doc(db, 'recipes', id);

      deleteDoc(docs)
         .then(() => {
            console.log('deleted');
         })
         .catch((err) => {
            console.log(err);
         });
   }
});

// Unsubscribe from realtim listener
unsubBtn.addEventListener('click', () => {
   unsub();
   console.log('unsub success');
});
