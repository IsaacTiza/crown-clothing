import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import "./sign-in.component.css";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = this.state;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			this.setState({ email: "", password: "" });
		} catch (error) {
			console.error("Sign in error:", error);
		}
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="sign-in">
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						label="Email"
						required
					/>
					<FormInput
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						label="Password"
						required
					/>
					<div className="button">
						<CustomButton type="submit">SIGN IN</CustomButton>
						<CustomButton
							onClick={signInWithGoogle}
							isGoogleSignIn>
							SIGN IN WITH GOOGLE
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
