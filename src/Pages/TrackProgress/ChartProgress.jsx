/* eslint-disable react/prop-types */
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ChartProgress = ({ caloriesOut, caloriesBurned }) => {
  // const data1 = weightTracking || [];
  const data2 = caloriesBurned;



  const progressBarStyles = {
    path: {
      stroke: "#05a16d",
    },
    text: {
      fill: "#05a16d",
      fontSize: "16px",
      fontFamily: "Poppins",
    },
  };

  const data = [
    { name: "Total Calories", uv:caloriesOut, pv: 2400, amt: 2400 },
    { name: "Calories Burned", uv: caloriesBurned, pv: 2400, amt: 2400 },
  ];

  return (
    <div className="mt-6 mx-2">
      <h2 className="text-2xl my-2 font-bold">Todays Calories</h2>
      <BarChart width={500} height={300} data={data} style={{fontFamily: "Poppins"}}>
        <XAxis dataKey="name" stroke="#05a16d" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#05a16d" barSize={30} />
      </BarChart>

      {/* <h2 className="text-2xl my-2 font-bold">Calories Burned</h2> */}

      <div className="bmiNumber mx-auto" style={{ width: 300, height: 300 }}>
        <CircularProgressbar
          styles={progressBarStyles}
          value={(data2 / 7730) * 100}
          text={`${data2} kcal`}
        />
      </div>
    </div>
  );
};

export default ChartProgress;


