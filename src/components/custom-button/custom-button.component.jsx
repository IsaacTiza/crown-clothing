import React from "react";

import "./custom-button.component.styles.css";

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
	return (
		<div
			className={`${isGoogleSignIn ? "google-sign-in" : " "} custom-button`}
			{...otherProps}>
			{children}
		</div>
	);
};

export default CustomButton;
