import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};
	}
	unSubscribeFromAuth = null

	componentDidMount() {
		this.unSubscribeFromAuth = auth.onAuthStateChanged(user => {
			this.setState({
				currentUser: user
				
			})
			console.log(user)
		})
	}

	componentWillUnmount() {
		this.unSubscribeFromAuth()
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Routes>
					<Route
						path="/"
						Component={HomePage}
					/>
					<Route
						path="/shop"
						Component={ShopPage}
					/>
					<Route
						path="/signin"
						Component={SignInAndSignUpPage}
					/>
				</Routes>
			</div>
		);
	}
}

export default App;
