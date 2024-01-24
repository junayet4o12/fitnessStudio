
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const ChartProgress = () => {
  const data = [
    {
      name: "S",
      uv: 58.5,
      wgt: 55,
      amt: 2400,
    },
    {
      name: "M",
      uv: 58.7,
      wgt: 57,
      amt: 2210,
    },
    {
      name: "T",
      uv: 55,
      wgt: 53,
      amt: 2290,
    },
    {
      name: "W",
      uv: 57,
      wgt: 49,
      amt: 2000,
    },
    {
      name: "T",
      uv: 60,
      wgt: 52,
      amt: 2181,
    },
    {
      name: "F",
      uv: 63,
      wgt: 57,
      amt: 2500,
    },
    {
      name: "S",
      uv: 65,
      wgt: 50,
      amt: 2100,
    },
  ];
  const data2 = [
    {
      name: 'S',
      uv: 4000,
      cal: 2500,
      amt: 2400,
    },
    {
      name: 'M',
      uv: 3000,
      cal: 2100,
      amt: 2210,
    },
    {
      name: 'T',
      uv: 2000,
      cal: 1800,
      amt: 2290,
    },
    {
      name: 'W',
      uv: 2780,
      cal: 2100,
      amt: 2000,
    },
    {
      name: 'T',
      uv: 1890,
      cal: 2400,
      amt: 2181,
    },
    {
      name: 'F',
      uv: 2390,
      cal: 1500,
      amt: 2500,
    },
    {
      name: 'S',
      uv: 2800,
      cal: 2200,
      amt: 2100,
    },
  ];

  return (
    <div className="mt-6 mx-2">
      <h2 className="text-2xl my-2 font-bold">Weight Tracking</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
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
