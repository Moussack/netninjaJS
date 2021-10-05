// DOM reference
const list = document.querySelector('ul');
const form = document.querySelector('form');

// Import the functions you need from the SDKs you need
import * as firebase from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import * as firestore from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';

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
const app = firebase.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

// Getting Collections
async function getRecipes(db) {
   const recipes = firestore.collection(db, 'recipes');
   const recipesSnapshot = await firestore.getDocs(recipes);
   const snapshots = recipesSnapshot.docs;
   //console.log(recipesSnapshot.docs);
   // const snapshots = recipesSnapshot.docs.map((doc) => doc.data());
   // console.log(recipesSnapshot.docs);

   return snapshots;
}

/* async function getRecipesID(db) {
   const recipes = firestore.collection(db, 'recipes');
   const recipesSnapshot = await firestore.getDocs(recipes);
   const ID = recipesSnapshot.docs.map((doc) => {
      return doc.id;
   });

   //console.log(ID);
   return ID;
} */

// Do something with the Data
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

getRecipes(db)
   .then((snapshot) => {
      const docs = snapshot.map((doc) => doc.data());
      const recipeIDs = snapshot.map((doc) => doc.id);

      docs.forEach((doc, i) => {
         addRecipe(doc, recipeIDs[i]);
      });
   })
   .catch((err) => {
      console.log(err);
   });

// add documents
form.addEventListener('submit', (e) => {
   e.preventDefault();
   const recipeCollection = firestore.collection(db, 'recipes');

   const now = new Date();
   const recipe = {
      title: form.recipe.value,
      created_at: firestore.Timestamp.fromDate(now)
   };

   firestore
      .addDoc(recipeCollection, recipe)
      .then(() => {
         console.log('added');
      })
      .catch((err) => {
         console.log(err);
      });
});

// delete
list.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      const id = e.target.parentElement.getAttribute('data-id');
      //console.log(id);
      const docs = firestore.doc(db, 'recipes', id);
      firestore
         .deleteDoc(docs)
         .then(() => {
            console.log('deleted');
         })
         .catch((err) => {
            console.log(err);
         });
   }
});
