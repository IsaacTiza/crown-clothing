import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				onSnapshot(userRef, (snapshot) => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			} else {
				setCurrentUser(null);
			}
		});
	}

	componentWillUnmount() {
		if (this.unsubscribeFromAuth) {
			this.unsubscribeFromAuth();
		}
	}

	render() {
		const { currentUser } = this.props;

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
						element={
							currentUser ? (
								<Navigate
									to="/"
									replace
								/>
							) : (
								<SignInAndSignUpPage />
							)
						}
					/>
				</Routes>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
