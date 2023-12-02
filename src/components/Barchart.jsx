import React from "react";
import { Bar } from "react-chartjs-2";
import { LinearScale, CategoryScale, Chart, BarElement } from "chart.js";

Chart.register(LinearScale, CategoryScale, BarElement);

const Barchart = ({ songsData }) => {
	const data = {
		labels: Object.keys(songsData)?.map((key) => {
			if (key === "category_6") return "Custom";
			else return key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");
		}),
		datasets: [
			{
				label: "Monthly Sales",
				barThickness: 28,
				color: "#ffffff",
				borderRadius: 5,
				backgroundColor: "#F0C3F1",
				data: Object.values(songsData)?.map((value) => value),
			},
		],
	};

	const options = {
		scales: {
			x: {
				grid: {
					display: false,
				},
				border: {
					color: "#ffffff",
				},
				ticks: {
					color: "#ffffff",
					font: {
						size: 14,
						weight: 200,
					},
				},
			},
			y: {
				border: {
					color: "#ffffff",
				},
				grid: {
					display: false,
				},
				ticks: {
					display: false,
				},
			},
		},
	};

	return (
		<div className="barchart-wrapper">
			<h2 className="rupee-symbol">&#8377;</h2>
			<Bar id={"bar-chart"} data={data} options={options} />
		</div>
	);
};

export default Barchart;
