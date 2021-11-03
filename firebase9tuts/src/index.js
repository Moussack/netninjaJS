import './styles.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: 'AIzaSyARAnY8tkeduEZX5CKClI2EzcYNz46iITk',
   authDomain: 'fir-9-dojo-nimble.firebaseapp.com',
   projectId: 'fir-9-dojo-nimble',
   storageBucket: 'fir-9-dojo-nimble.appspot.com',
   messagingSenderId: '67933165596',
   appId: '1:67933165596:web:33e0e991721da3883f67d9',
};

// init firebase app
const app = initializeApp(firebaseConfig);
// init firestore DB
const db = getFirestore();

// get collection reference
const collRef = collection(db, 'books');

// queries
const q = query(collRef);
const listElement = document.querySelector('.listUL');

const renderUI = (data, id) => {
   const list = `
               <li>
                  <span class="books">${data.title}</span> ||
                  <span class="author">${data.author}</span> ||
                   <span class="id">${id}</span>

               </li>
            `;
   listElement.innerHTML += list;
};

// Real Time collection data

const getBooks = (callback) => {
   onSnapshot(collRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
         if (change.type === 'added') {
            callback(change.doc.data(), change.doc.id);
         }
      });
   });
};

const clearUI = () => {
   listElement.innerHTML = '';
};

getBooks((data, id) => {
   renderUI(data, id);
});

// adding a document
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const title = addBookForm.title.value;
   const author = addBookForm.author.value;

   const docBook = {
      title,
      author,
   };
   // *** ADD a doc to db
   addDoc(collRef, docBook)
      .then(() => {
         addBookForm.reset();
         console.log('data added to db');
      })
      .catch((err) => {
         console.log(err.message);
      });
});

// deleting a document
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const docRef = doc(db, 'books', deleteBookForm.id.value);

   // *** DELETE doc
   deleteDoc(docRef)
      .then(() => {
         console.log('data deleted');
         deleteBookForm.reset();
         clearUI();
         getBooks((data, id) => {
            renderUI(data, id);
         });
      })
      .catch((err) => {
         console.log(err.message);
      });
});

/* CUSTOM ARRAY METHOD */
// const myArr = [1, 2, 3, 4, 5, 6, 7];
/* // My custom Foreach
const myForEach = (theArr, callback) => {
   for (let i = 0; i < theArr.length; i++) {
      const element = theArr[i];
      callback(element, i);
   }
}; */

/* // My custom Map
const myMap = (theArr, callback) => {
   console.log('My Custom Map Function!');
   const newArray = [];

   for (let i = 0; i < theArr.length; i++) {
      const element = theArr[i];
      newArray[i] = callback(element, i);
   }

   return newArray;
};

let asd = myMap(myArr, (ele) => {
   return ele + 2;
});

console.log(asd); */

/* const myCustomMap = function (callback) {
   let newArray = [];
   for (let index = 0; index < this.length; index++) {
      const element = this[index];
      newArray[index] = callback(element, index);
   }
   return newArray;
}; */

/* Array.prototype.myMap = function (callback) {
   let newArray = [];
   for (let index = 0; index < this.length; index++) {
      const element = this[index];
      newArray[index] = callback(element, index);
   }
   return newArray;
};

Array.prototype.myForeach = function (callback) {
   for (let index = 0; index < this.length; index++) {
      const element = this[index];
      callback(element, index);
   }
};

const arr = [1, 2, 3, 4, 5].myForeach((ele) => {
   console.log(ele + 2);
}); */
