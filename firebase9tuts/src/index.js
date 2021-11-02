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

// init firebass app
const app = initializeApp(firebaseConfig);
// init firestore DB
const db = getFirestore();

// get collection reference
const collRef = collection(db, 'books');

// queries
const q = query(collRef, where('author', '==', 'asd'));

// Real Time collection data
onSnapshot(q, (snapshot) => {
   let books = [];
   snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
   });
   console.log(books);
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
         addBookForm.reset();
         console.log('data deleted');
      })
      .catch((err) => {
         console.log(err.message);
      });
});
