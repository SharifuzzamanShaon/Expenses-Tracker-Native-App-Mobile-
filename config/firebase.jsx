// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {
//   getReactNativePersistence,
// // eslint-disable-next-line import/no-unresolved
// } from 'firebase/auth/react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getFirestore } from "firebase/firestore";

import Constants from 'expo-constants';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const { GOOGLE_APIKEY } = Constants.expoConfig.extra;

console.log('====================================');
console.log(GOOGLE_APIKEY);
console.log('====================================');
const firebaseConfig = {
  apiKey: GOOGLE_APIKEY || "AIzaSyDyQHRgPf3pC0OVWMUF7QVFqYmFy7PORbc",
  authDomain: "expencetracker-f5932.firebaseapp.com",
  projectId: "expencetracker-f5932",
  storageBucket: "expencetracker-f5932.firebasestorage.app",
  messagingSenderId: "882287946898",
  appId: "1:882287946898:web:ba945eef2a12ce1317ca4b",
  measurementId: "G-KFG1JSGT57",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const myAuth= getAuth(app);

export const firestorage = getFirestore(app);
