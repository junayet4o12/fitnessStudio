/* eslint-disable react/prop-types */
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const ChartProgress = ({ weightTracking, caloriesBurned }) => {
  
  const data1 = weightTracking || [];
  const data2 = caloriesBurned || [];

  return (
    <div className="mt-6 mx-2">
      <h2 className="text-2xl my-2 font-bold">Weight Tracking</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data1}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="wgt"
            stroke="#c4564c"
            fill="#c4564c"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>

      <h2 className="text-2xl my-2 font-bold">Calories Burned</h2>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data2}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="cal" stroke="#8884d8" fill="#8884d8" />
          {/* Use dataKey="cal" instead of dataKey="pv" */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartProgress;
