import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAaTIhSV1knDItREkEYJpk94TiNSnAu1z0",
  authDomain: "fir-tutorial-f7f02.firebaseapp.com",
  projectId: "fir-tutorial-f7f02",
  storageBucket: "fir-tutorial-f7f02.appspot.com",
  messagingSenderId: "935759605434",
  appId: "1:935759605434:web:64e632a374a90510ec5c83",
  measurementId: "G-FEX6DT9QBT"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)