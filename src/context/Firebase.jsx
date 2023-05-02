import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBWoK1ugV_Ta5AsuCzxvLxgsqMK7TQSsUU",
  authDomain: "bookshop-7f5e8.firebaseapp.com",
  projectId: "bookshop-7f5e8",
  storageBucket: "bookshop-7f5e8.appspot.com",
  messagingSenderId: "458989902631",
  appId: "1:458989902631:web:ea0ac3edc6e33a6afaa702",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  // signup with email password
  const signupWithEmailPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  //   signin with email password

  const signinWithEmailPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  //   sign in with google
  const signinWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };

  //   checking whether the use user logged in or not
  const isLoggedIn = user ? true : false;

  // Adding data to firestore
  const createNewBookList = async (name, price, isbn, cover) => {
    const imgRef = ref(storage, `images/${Date.now()}-${cover.name}`);
    const uploadedImg = await uploadBytes(imgRef, cover);
    await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageUrl: uploadedImg.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  // Retrieving data from firestore
  const getBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  // get book by id
  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  // Get image from firestore
  const getImage = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  // Placing a order
  const placeOrder = async (bookId, quantity) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      username: user.displayName,
      userId: user.uid,
      userEmail: user.email,
      photoURL: user.photoURL,
      quantity: Number(quantity),
    });
    return result;
  };

  // fetching book
  const fetchBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userId", "==", userId));
    const res = await getDocs(q);
    return res;
  };

  // fetchin an order
  const fetchOrder = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const res = await getDocs(collectionRef);
    return res;
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupWithEmailPassword,
        signinWithEmailPassword,
        signinWithGoogle,
        createNewBookList,
        getBooks,
        getImage,
        getBookById,
        placeOrder,
        fetchBooks,
        fetchOrder,
        isLoggedIn,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
