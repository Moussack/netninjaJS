// listen for auth status changes (login or logout)
auth.onAuthStateChanged((user) => {
   console.log(user);
   if (user) {
      // *** get data from db
      db.collection('guides').onSnapshot(
         (snapshots) => {
            setupGuides(snapshots.docs);
            setupUI(user);
         },
         (err) => {
            console.log(err.message);
         }
      );
   } else {
      setupGuides([]);
      setupUI();
   }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
   e.preventDefault();

   // get user input
   const title = createForm['title'].value;
   const content = createForm['content'].value;

   // create custom object to be sended to db
   const guide = {
      title,
      content,
   };

   // *** send the data to the db
   db.collection('guides')
      .add(guide)
      .then(() => {
         console.log('guide added');
         //close the modal and reset form
         const modal = document.querySelector('#modal-create');
         M.Modal.getInstance(modal).close();
         createForm.reset();
      });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
   e.preventDefault();
   // get user info
   const email = signupForm.signup_email.value;
   const password = signupForm.signup_password.value;

   // *** sign up the user to firebase auth
   auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
         console.log(data);
         return db.collection('users').doc(data.user.uid).set({
            bio: signupForm['signup-bio'].value,
         });
      })
      .then(() => {
         // closing the modal and reset the form
         const modal = document.querySelector('#modal-signup');
         M.Modal.getInstance(modal).close();
         signupForm.reset();
      })
      .catch((err) => {
         console.log(err);
      });
});

// *** logout methd
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
   e.preventDefault();
   auth.signOut();
});

// login method
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
   e.preventDefault();

   //get user info
   const email = loginForm['login-email'].value;
   const password = loginForm['login-password'].value;
   // *** log user in
   auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
         //console.log(data.user);
         // closing the modal and reset the form
         const modal = document.querySelector('#modal-login');
         M.Modal.getInstance(modal).close();
         loginForm.reset();
      })
      .catch((err) => {
         const error = document.querySelector('.error');
         console.log(err);
         if (err.code === 'auth/wrong-password') {
            error.innerHTML = `${err.message}`;
            setInterval(() => {
               error.remove();
            }, 7000);
         } else if (err.code === 'auth/user-not-found') {
            error.innerHTML = `${err.message}`;
            setInterval(() => {
               error.remove();
            }, 7000);
         }
      });
});
