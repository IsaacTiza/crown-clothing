import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-actions";
class App extends React.Component {
	

	unSubscribeFromAuth = null;

	componentDidMount() {
		const {setCurrentUser} = this.props
		this.unSubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				// listen to user document snapshot in Firestore
				onSnapshot(userRef, (snapshot) => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
					
				});
			}
			
				setCurrentUser(userAuth);
			
		});
	}

	componentWillUnmount() {
		if (this.unSubscribeFromAuth) {
			this.unSubscribeFromAuth();
		}
	}

	render() {
		return (
			<div>
				<Header />
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/shop"
						element={<ShopPage />}
					/>
					<Route
						path="/signin"
						element={<SignInAndSignUpPage />}
					/>
				</Routes>
			</div>
		);
	}
}
const mapDispatchToprops = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToprops)(App);
