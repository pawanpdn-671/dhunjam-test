import React, { useState } from "react";
import HeadingText from "../components/HeadingText";
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fieldError, setFieldError] = useState({
		username: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleLogin = async () => {
		const newErrors = {};
		if (username.trim() === "") {
			newErrors.username = "Please enter a username.";
		}
		if (password.trim() === "") {
			newErrors.password = "Please enter a password.";
		}

		if (Object.keys(newErrors).length > 0) {
			setFieldError(newErrors);
		} else {
			setFieldError({
				username: "",
				password: "",
			});
			setLoading(true);
			try {
				const response = await axios.post("https://stg.dhunjam.in/account/admin/login", {
					username,
					password,
				});
				if (response.status === 200) {
					const { id } = response.data.data;
					sessionStorage.setItem("dhunjam-test-logged", true);
					sessionStorage.setItem("dhunjam-test-logged-id", id);
					navigate("/admin", { state: { adminID: id } });
				}
			} catch (err) {
				console.log(err);
				alert(err.message);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleShowHidePass = () => setShowPassword(!showPassword);

	return (
		<div className="login-page">
			<div className="form-wrapper">
				<HeadingText text="Venue Admin Login" />
				<form className="login-form">
					<div className="field-wrapper">
						<InputField
							type="text"
							onChange={(e) => setUsername(e.target.value)}
							usedFor="username"
							name
							placeholder={"Username"}
							value={username}
						/>
						{fieldError.username && <p className="field-error">{fieldError.username}</p>}
					</div>
					<div className="field-wrapper">
						<InputField
							type={showPassword ? "text" : "password"}
							onChange={(e) => setPassword(e.target.value)}
							usedFor="password"
							placeholder={"Password"}
							value={password}
							showPassword={showPassword}
							handleShowHidePass={handleShowHidePass}
						/>
						{fieldError.password && <p className="field-error">{fieldError.password}</p>}
					</div>
					<div className="button-wrapper">
						<Button
							disabled={loading}
							onClick={handleLogin}
							text={loading ? "Signing in..." : "Sign in"}
							type="login"
						/>
					</div>
					<p className="register-label">New Registration ?</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
