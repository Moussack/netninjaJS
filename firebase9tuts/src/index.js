import './styles.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
const db = getFirestore(app);
// get collection reference
const collRef = collection(db, 'books');
// get collection data
getDocs(collRef)
   .then((snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
         books.push({ ...doc.data(), id: doc.id });
      });
      console.log(books);
   })
   .catch((err) => {
      console.log(err.message);
   });
