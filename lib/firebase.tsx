"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/*/////// Firebase Create Level Affiliate //////////////*/

/*/////// Firebase Create User Documents From Auth //////////////*/
export async function CreateUserDocumentsFromAuth(
  userUid: string,
  data: any,
  notify: any,
  router: any,
  additionalInformation = {}
) {
  const userDocRef = doc(db, "users", userUid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const {
      firstName,
      lastName,
      country,
      email,
      phone,
      termsAccept,
      refId,
      refBy,
      linkReferrer,
      uuid,
    } = data;
    const address = "";
    const displayName = data.firstName;
    const createdAt = new Date();
    const updatedAt = new Date();
    const level = 1;
    try {
      await setDoc(userDocRef, {
        displayName,
        firstName,
        lastName,
        country,
        email,
        phone,
        address,
        termsAccept,
        refId,
        refBy,
        linkReferrer,
        uuid,
        createdAt,
        updatedAt,
        level,
        ...additionalInformation,
      }).then(async () => {
        try {
          if (data.refBy !== "") {
            const MyRefferer = query(
              collection(db, "users"),
              where("refBy", "==", data.refId)
            );
            const querySnapshot = await getDocs(MyRefferer);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
              });
            }
            /*      const RefferalDocRef = doc(db, `users/${userUid}/affiliate`, userUid);
            const RefferalSnapshot = await getDoc(RefferalDocRef);
            if (!RefferalSnapshot.exists() && refBy !== "") {
              await setDoc(RefferalDocRef, {
                refBy,
                createdAt,
              });
            }*/
            notify.showSuccessNotification(
              `Welcome ${data.firstName} your account are created successfully Please verify your email inbox!`
            );
            console.log(
              `Welcome ${data.firstName} your account are created successfully Please verify your email inbox!`
            );
            console.log("Document successfully written!");
            console.log(`Email sent to ${data.email}`);
            //console.log("refBy", refBy);
            setTimeout(() => {
              router.push("/en/login");
            }, 4000);
          } else if (data.refBy === "") {
            notify.showSuccessNotification(
              `Welcome ${data.firstName} your account are created successfully Please verify your email inbox!`
            );
            console.log(
              `Welcome ${data.firstName} your account are created successfully Please verify your email inbox!`
            );
            console.log("Document successfully written!");
            console.log(`Email sent to ${data.email}`);
            //console.log("refBy", refBy);
            setTimeout(() => {
              router.push("/en/login");
            }, 4000);
            console.log("No referrer");
          }
        } catch (err: any) {
          notify.showErrorNotification(
            `Error sending email verification ${err.message}`
          );
          console.log(err);
        }
      });
    } catch (err: any) {
      console.log(`error creating the user ${err.message}`);
      notify.showErrorNotification(
        `User ${data.firstName} are not created successfully `
      );
    }
  }
  return userDocRef;
}

/*/////// Firebase Login //////////////*/
export async function logIn(
  email: string,
  password: string,
  notify: any,
  router: any
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser?.emailVerified === true) {
      notify.showSuccessWithoutTitleNotification(
        `Welcome ${auth.currentUser.email}!`
      );
      setTimeout(() => {
        router.push("/en/dashboard");
      }, 2500);
      console.log("Connexion Autorisée");
    } else {
      notify.showWarningNotification(
        `Connection not authorized ! Please verify your email !`
      );
      console.log("Connexion non Autorisée ! Veuillez vérifier votre email !");
    }
  } catch (err: any) {
    console.log(err.message);
    if (err.code === "auth/claims-too-large") {
      notify.showErrorNotification(`TOO MANY ATTEMPTS TRY LATER`);
      console.log("TOO MANY ATTEMPTS TRY LATER !");
    }
    if (err.code === "auth/invalid-email-verified") {
      notify.showErrorNotification(`Email ${email} are not verified!`);
      console.log(`Email ${email} are not verified!`);
    }
    if (err.code === "auth/wrong-password") {
      notify.showErrorNotification(`Password Incorrect !`);
      console.log("Password Incorrect !");
    }
    if (err.code === "auth/too-many-requests") {
      //toast.error("Compte Temporairement Suspendu !) Veuillez réessayer plus tard !");
      notify.showErrorNotification(
        `Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.`
      );
      console.log(
        "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      );
    }
    if (err.code === "auth/user-not-found") {
      //toast.error("Utilisateur Non Inscrit !");
      notify.showErrorNotification(`TOO MANY ATTEMPTS TRY LATER`);
      console.log("Utilisateur Non Inscrit !");
    }
    if (err.code === "auth/network-request-failed") {
      //toast.error("Network Failed, please check ur internet !");
      notify.showErrorNotification(
        `Network Failed, please check ur internet !`
      );
      console.log("Network Failed, please check ur internet !");
    }
  }
}

/*/////// Firebase REGISTER //////////////*/
export async function CreateUser(
  email: string,
  password: string,
  data: any,
  notify: any,
  router: any
) {
  if (!email || !password) {
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      try {
        await sendEmailVerification(userCredential.user);
        const userUid = userCredential.user.uid;
        await CreateUserDocumentsFromAuth(userUid, data, notify, router);
      } catch (err: any) {
        console.log("Error sending email verification", err);
        notify.showErrorNotification(`${err.message}`);
      }
    }
  } catch (err: any) {
    if (err.code === "auth/claims-too-large") {
      notify.showErrorNotification("TOO MANY ATTEMPTS TRY LATER");
      console.log("TOO MANY ATTEMPTS TRY LATER !");
    } else if (err.code === "auth/email-already-in-use") {
      notify.showErrorNotification(`User ${data.email} already in use`);
      console.log("Email already in use !");
    } else if (err.code === "auth/weak-password") {
      notify.showErrorNotification(
        "Password should be at least 6 characters !"
      );
      console.log("Password should be at least 6 characters !");
    } else if (err.code === "auth/internal-error") {
      notify.showErrorNotification("Internal error !");
      console.log("Internal error !");
    } else if (err.code === "auth/invalid-email") {
      notify.showErrorNotification("Invalid email !");
      console.log("Invalid email !");
    } else {
      console.log(err);
    }
  }
}

/*/////// Firebase Logout //////////////*/
export async function logOut(router: any, notify: any) {
  try {
    const re = await signOut(auth);
    notify.showSuccessWithoutTitleNotification(`Success Logout !`);
    router.push("/");
    console.log(re);
  } catch (err) {
    console.log(err);
  }
}

/*/////// Firebase Reset Password //////////////*/
export async function resetPassword(email: string) {
  try {
    const re = await sendPasswordResetEmail(auth, email);
    console.log(re);
    if (auth) {
      //toast.success("Email envoyé ! \n Veuillez vérifiez votre boite mail !");
      console.log("Email envoyé ! \n Veuillez vérifiez votre boite mail !");
      //navigate("/login");
    }
  } catch (err: any) {
    console.log(err.message);
    if (err.code === "auth/user-not-found") {
      //toast.error(" Email non trouvé !");
      console.log(" Email non trouvé !");
    }
  }
}
/*/////// Firebase Listening Auth //////////////*/
export const onAuthStateChangedListener = (callback: any) =>
  onAuthStateChanged(auth, callback);
