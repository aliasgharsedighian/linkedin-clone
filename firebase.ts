import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPo3h0R0TARjRU66VeOVGlZL0u3_l0ycQ",
  authDomain: "fcm-demo-be8ee.firebaseapp.com",
  projectId: "fcm-demo-be8ee",
  storageBucket: "fcm-demo-be8ee.appspot.com",
  messagingSenderId: "1034072341892",
  appId: "1:1034072341892:web:2dd52455aafbabb51971d1",
  measurementId: "G-0QBX30F6Z5",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
