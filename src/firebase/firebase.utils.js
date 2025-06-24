// Firebase v9+ Modular SDK Imports
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase Configuration
const config = {
	apiKey: "AIzaSyCg96DOCLUadHlsJg9zrQ71ZMc62ixixIM",
	authDomain: "crown-db-b0cca.firebaseapp.com",
	projectId: "crown-db-b0cca",
	storageBucket: "crown-db-b0cca.firebasestorage.app",
	messagingSenderId: "92989630940",
	appId: "1:92989630940:web:f1b92a942850b77b154719",
	measurementId: "G-E79YW3RGR0",
};

// Initialize Firebase App
const app = initializeApp(config);

// Firebase Services
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Google Auth Provider Setup
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Create User Document in Firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = doc(firestore, "users", userAuth.uid);

	const snapShot = await getDoc(userRef);

	if (!snapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userRef, {
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.error("Error creating user document", error);
		}
	}

	return userRef;
};
