import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import dayjs from "dayjs";
import { timeParse } from "d3-time-format";
import { useEffect, useState } from "react";

const ElectricityChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.hvakosterstrommen.no/api/v1/prices/2025/05-27_NO1.json")
      .then((r) => {
        setData(r.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  function isoToUtc(isoString: any): string {
    const date = new Date(isoString);
    return date.toISOString();
  }

  const parsedData = data.map((item: any) => ({
    time_start: new Date(isoToUtc(item.time_start)),
    NOK_per_kWh: item.NOK_per_kWh,
  }));

  return (
    <LineChart
      dataset={parsedData}
      xAxis={[
        {
          dataKey: "time_start",
          scaleType: "utc",
          valueFormatter: (timestamp) => {
            let start = dayjs(timestamp).format("HH");
            let end = dayjs(timestamp).add(1, "h").format("HH");
            return start + "-" + end;
          },
        },
      ]}
      series={[{ dataKey: "NOK_per_kWh" }]}
      grid={{ vertical: true, horizontal: true }}
      sx={{
        ".MuiLineElement-root": {
          strokeWidth: 3,
        },
        ".MuiXAxis-tick line": {
          stroke: "grey",
        },
        ".MuiYAxis-tick line": {
          stroke: "grey",
        },
      }}
    ></LineChart>
  );
};

export default ElectricityChart;
