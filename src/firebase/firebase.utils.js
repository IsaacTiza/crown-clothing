// New modular Firebase SDK (v9+)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
	apiKey: "AIzaSyCg96DOCLUadHlsJg9zrQ71ZMc62ixixIM",
	authDomain: "crown-db-b0cca.firebaseapp.com",
	projectId: "crown-db-b0cca",
	storageBucket: "crown-db-b0cca.firebasestorage.app",
	messagingSenderId: "92989630940",
	appId: "1:92989630940:web:f1b92a942850b77b154719",
	measurementId: "G-E79YW3RGR0",
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
