/* eslint-disable react/prop-types */
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ChartProgress = ({ caloriesOut, caloriesBurned }) => {
  // const data1 = weightTracking || [];
  const data2 = caloriesBurned;

  const progressBarStyles = {
    path: {
      stroke: "#0c0c0c",
    },
    text: {
      fill: "#0c0c0c",
      fontSize: "16px",
      fontFamily: "Poppins",
    },
  };

  const data = [
    { name: "Total Calories", uv: caloriesOut, pv: 2400, amt: 2400 },
    { name: "Calories Burned", uv: caloriesBurned, pv: 2400, amt: 2400 },
  ];

  return (
    <div className="mt-6 mx-2">
      <h2 className="text-2xl my-2 font-bold">Todays Calories</h2>
      <BarChart
        width={500}
        height={300}
        data={data}
        style={{ fontFamily: "Poppins" }}
      >
        <XAxis dataKey="name" stroke="#0c0c0c" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#0c0c0c" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#0c0c0c" barSize={30} />
      </BarChart>

      <h2 className="text-2xl my-2 font-bold">Calories </h2>

      <div className="bmiNumber mx-auto" style={{ width: 300, height: 300 }}>
        <CircularProgressbar
          styles={progressBarStyles}
          value={(caloriesOut / 7730) * 100}
          text={`${caloriesOut} kcal`}
        />
      </div>
    </div>
  );
};

export default ChartProgress;
