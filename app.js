const openSignInForm = document.querySelector(".openSignInForm");
const signInForm = document.querySelector(".loginForm");
const signUpForm = document.querySelector(".signUpForm");
const openSignUpForm = document.querySelector(".signUp");

const userEmail = document.querySelector(".userEmail");

const alterOpenSignInForm = document.querySelector(".alterOpenSignInForm");
const alterOpenSignUpForm = document.querySelector(".alterOpenSignUpForm");

const signOutBtn = document.querySelector(".logOut");
const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");

const loggedinElements = document.querySelectorAll(".loggedIn");
const loggedOutElements = document.querySelectorAll(".loggedOut");
const displayNameInNav = document.querySelector(".displayName");

openSignInForm.addEventListener("click", () => {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

openSignUpForm.addEventListener("click", () => {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});
alterOpenSignInForm.addEventListener("click", () => {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});
alterOpenSignUpForm.addEventListener("click", () => {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

//Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("LOGGED IN", user);
    // var uid = user.uid;
    // location.reload();
    displayNameInNav.innerHTML = user.displayName;
    userEmail.innerHTML = "User : " + user.email;
    loggedinElements.forEach((e) => {
      e.style.display = "block";
    });
    loggedOutElements.forEach((e) => {
      e.style.display = "none";
    });

    //update Profile of needed
    const openUpdateProfileBtnForm = document.querySelector(
      ".openUpdateProfileBtnForm"
    );
    const updateProfileForm = document.querySelector(".updateProfileForm");
    openUpdateProfileBtnForm.addEventListener("click", () => {
      updateProfileForm.style.display = "block";
    });
    const enterInfoBtn = document.querySelector(".enterNewInfo");
    //UPDAT FUNCTION STARTS
    enterInfoBtn.addEventListener("click", () => {
      const displayNameVal = document.getElementById("displayName").value;

      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: displayNameVal,
          // photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
        .then(function () {
          console.log("info Updated name ", user.displayName);
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } else {
    displayNameInNav.innerHTML = "";

    console.log("LOGGED OUT");
    userEmail.innerHTML = "";
    loggedinElements.forEach((e) => {
      e.style.display = "none";
    });
    loggedOutElements.forEach((e) => {
      e.style.display = "block";
    });
  }
});

//LOGIN AUTH
signInBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("user Just Logged in from", user.user.email);

      userEmail.innerHTML = "User : " + user.user.email;
      loggedinElements.forEach((e) => {
        e.style.display = "block";
      });
      loggedOutElements.forEach((e) => {
        e.style.display = "none";
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });

  signInForm.style.display = "none";
});

//SIGNUP FUNTION
signUpBtn.addEventListener("click", () => {
  const emaill = document.getElementById("emaill").value;
  const passwordd = document.getElementById("passwordd").value;
  //

  firebase
    .auth()
    .createUserWithEmailAndPassword(emaill, passwordd)
    .then((user) => {
      console.log("user just signed Up", user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  signUpForm.style.display = "none";
});

signOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  firebase.auth().signOut();
  userEmail.innerHTML = "";
});

// //GOOGLE SIGNIN TEST
const googleBtn = document.querySelector(".googleBtn");
googleBtn.addEventListener("click", () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(result, user);
      signInForm.style.display = "none";
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorMessage);
    });
});

//FACEBOOK SIGNIN TEST
const fbBtn = document.querySelector(".fbBtn");
fbBtn.addEventListener("click", (e) => {
  e.preventDefault();
  var providerFB = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(providerFB)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(result, user);
      signInForm.style.display = "none";
      // ...
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert(errorMessage);
      alert(errorCode);
    });
});

//To complete set up, add this OAuth redirect URI to your Facebook app configuration.
//https://cleaner-basic-auth.firebaseapp.com/__/auth/handler
