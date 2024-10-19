// BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Kozhikode", "Trissur", "Malappuram", "Kochi", "Wayanad"],
    datasets: [
      {
        label: "Participants",
        data: [60, 25, 55, 35, 10],
        backgroundColor: "#058A55",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Participants",
        },
      },
      x: {
        title: {
          display: true,
          text: "Zone",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
    borderColor: "#058A55",
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
