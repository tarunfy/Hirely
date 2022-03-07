import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
  return <Pie data={chartData} />;
};

export default PieChart;
