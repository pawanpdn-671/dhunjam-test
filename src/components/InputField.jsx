import React from "react";

const InputField = ({ type, value, placeholder, usedFor, showPassword, handleShowHidePass, onChange }) => {
	return (
		<div className="field-item">
			<input type={type} onChange={onChange} value={value} className="input-field" placeholder={placeholder} />
			{usedFor === "password" && (
				<img
					src={`${showPassword ? "hide-pass.png" : "/show-pass.png"}`}
					alt="show/hide password"
					className="password-icon"
					onClick={handleShowHidePass}
				/>
			)}
		</div>
	);
};

export default InputField;
