import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

const PrivateRoute = ({ element }) => {
	const isAuthenticated = !!sessionStorage.getItem("dhunjam-test-logged");
	return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} />
					<Route index element={<Navigate to="/admin" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
