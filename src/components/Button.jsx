import React from "react";

const Button = ({ text, disabled, onClick, greyout, type }) => {
	return (
		<button
			type="button"
			className={`primary-btn ${type === "save" ? "save-btn" : ""} ${greyout ? "greyout-btn" : ""}`}
			onClick={onClick}
			disabled={disabled}>
			{text}
		</button>
	);
};

export default Button;
