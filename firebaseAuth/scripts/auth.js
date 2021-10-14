// listen for auth status changes
auth.onAuthStateChanged((user) => {
   if (user) {
      // get data from db
      db.collection('guides')
         .get()
         .then((snapshots) => {
            setupGuides(snapshots.docs);
         })
         .catch((err) => {
            console.log(err);
         });
   } else {
      setupGuides([]);
   }
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
         console.log(err);
      });
});
