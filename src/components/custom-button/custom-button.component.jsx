import React from "react";

import "./custom-button.component.styles.css";

const CustomButton = ({ children, ...otherProps }) => {
	return (
		<div
			className="custom-button"
			{...otherProps}>
			{children}
		</div>
	);
};

export default CustomButton
