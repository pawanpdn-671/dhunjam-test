import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import HeadingText from "../components/HeadingText";
import Button from "../components/Button";
import Barchart from "../components/Barchart";

const AdminDashboard = () => {
	const [adminData, setAdminData] = useState({});
	const [adminFormDetails, setAdminFormDetails] = useState({});
	const [loading, setLoading] = useState(false);
	const [areAmountHigher, setAreAmountHigher] = useState(false);
	const location = useLocation();

	const getAdminDetails = async () => {
		setLoading(true);
		const adminID = location?.state?.adminID | sessionStorage.getItem("dhunjam-test-logged-id");
		if (adminID) {
			try {
				const response = await axios.get(`https://stg.dhunjam.in/account/admin/${adminID}`);
				const { data } = response.data;
				setAdminData(data);
				setAdminFormDetails(data);
			} catch (err) {
				console.log(err);
				alert(err.message);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		getAdminDetails();
	}, []);

	const handleRequestChange = (e) => {
		const { value, name } = e.target;
		setAdminFormDetails({ ...adminFormDetails, [name]: value === "true" });
	};

	const handleSongRequestChange = (e) => {
		const { name, value } = e.target;
		setAdminFormDetails({
			...adminFormDetails,
			amount: { ...adminFormDetails.amount, [name]: value },
		});
	};

	function getObjectDifference(obj1, obj2) {
		const difference = {};

		for (const key in obj1) {
			if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
				difference[key] = parseFloat(obj2[key]);
			}
		}

		return difference;
	}

	const handleSave = async () => {
		let newObj = getObjectDifference(adminData.amount, adminFormDetails.amount);
		const adminID = location?.state?.adminID | sessionStorage.getItem("dhunjam-test-logged-id");

		if (Object.keys(newObj)?.length !== 0) {
			setLoading(true);
			try {
				const res = await axios.put(`https://stg.dhunjam.in/account/admin/${adminID}`, {
					amount: newObj,
				});
				if (res.status === 200) {
					getAdminDetails();
				}
			} catch (err) {
				setLoading(false);
				console.log(err);
				alert(err.message);
			}
		}
	};

	function areValuesHigherThanMinimum(inputValues, minimumValues) {
		if (inputValues.length !== minimumValues.length) {
			return false;
		}

		return inputValues.every((value, index) => value > minimumValues[index]);
	}

	useEffect(() => {
		if (adminFormDetails.amount) {
			const res = areValuesHigherThanMinimum(
				Object.values(adminFormDetails.amount).map((val) => parseInt(val, 10)),
				[99, 79, 59, 39, 19],
			);
			setAreAmountHigher(res);
		}
	}, [adminFormDetails?.amount]);

	return Object.keys(adminData)?.length === 0 ? (
		<div className="overlay">
			<span className="loader"></span>
		</div>
	) : (
		<div className="admin-page">
			<div className="admin-page-items-wrapper">
				<HeadingText text={`${adminData?.name}, ${adminData?.location} on Dhun Jam`} />
				<div className="admin-content-section">
					<section className="row1">
						<p className="row-label">Do you want to charge your customers for requesting songs?</p>
						<div className="radio-items-wrapper">
							<div className={`radio-item ${!adminFormDetails?.charge_customers ? "greyout-radio" : ""}`}>
								<input
									type="radio"
									checked={adminFormDetails?.charge_customers}
									id="yes"
									value={true}
									name={"charge_customers"}
									onChange={handleRequestChange}
								/>
								<label htmlFor="yes">Yes</label>
							</div>
							<div className={`radio-item ${!adminFormDetails?.charge_customers ? "greyout-radio" : ""}`}>
								<input
									type="radio"
									id="no"
									checked={!adminFormDetails?.charge_customers}
									name={"charge_customers"}
									value={false}
									onChange={handleRequestChange}
								/>
								<label htmlFor="no">No</label>
							</div>
						</div>
					</section>
					<section className="row2">
						<p className="row-label">Custom song request amount -</p>
						<div className="amount-field-box">
							<input
								type="number"
								className={`amount-field ${!adminFormDetails?.charge_customers ? "greyout-field" : ""}`}
								name={"category_6"}
								value={adminFormDetails.amount ? adminFormDetails.amount["category_6"] : 0}
								onChange={handleSongRequestChange}
								disabled={!adminFormDetails?.charge_customers}
							/>
						</div>
					</section>
					<section className="row3">
						<p className="row-label">Regular song request amounts, from high to low-</p>
						<div className="regular-field-wrapper">
							{adminFormDetails?.amount &&
								Object.entries(adminFormDetails?.amount)?.map(
									([key, value]) =>
										key !== "category_6" && (
											<input
												type="text"
												value={value}
												key={key}
												onChange={handleSongRequestChange}
												name={key}
												className={`regular-amount-field ${
													!adminFormDetails?.charge_customers ? "greyout-field" : ""
												}`}
												disabled={!adminFormDetails?.charge_customers}
											/>
										),
								)}
						</div>
					</section>

					<div className="bar-chart-container">
						{adminFormDetails.amount && adminFormDetails.charge_customers && (
							<Barchart songsData={adminFormDetails?.amount} />
						)}
					</div>
					<div className="button-container">
						<Button
							text={loading ? "Saving..." : "Save"}
							disabled={loading | !adminFormDetails.charge_customers | !areAmountHigher}
							onClick={handleSave}
							greyout={!adminFormDetails?.charge_customers | !areAmountHigher}
							type="save"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
