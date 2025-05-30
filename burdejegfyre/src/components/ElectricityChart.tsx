import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ElectricityChart = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("NO1");
  const today = new Date();
  const date = {
    day: String(today.getDate()).padStart(2, "0"),
    month: String(today.getMonth() + 1).padStart(2, "0"),
    year: today.getFullYear(),
  };

  useEffect(() => {
    axios
      .get(
        `https://www.hvakosterstrommen.no/api/v1/prices/${date.year}/${date.month}-${date.day}_${region}.json`,
      )
      .then((r) => {
        setData(r.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [region, date.day, date.month, date.year]);

  function isoToUtc(isoString: string): string {
    const date = new Date(isoString);
    return date.toISOString();
  }

  const mva = 1.25;
  const parsedData = data.map(
    (item: { time_start: string; NOK_per_kWh: number }) => ({
      time_start: new Date(isoToUtc(item.time_start)),
      NOK_per_kWh: item.NOK_per_kWh * mva,
    }),
  );

  const handleRegionUpdate = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };

  return (
    <>
      <p>
        Graf over strømpriser dag ({date.day}/{date.month}/{date.year}) med 25%
        mva, uten nettleie og uten strømstøtte.
      </p>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div>
          <FormControl>
            <InputLabel>Region</InputLabel>
            <Select
              label={"Region"}
              defaultValue={"NO1"}
              onChange={handleRegionUpdate}
            >
              <MenuItem value={"NO1"}>NO1 Østnorge</MenuItem>
              <MenuItem value={"NO2"}>NO2 Sørnorge</MenuItem>
              <MenuItem value={"NO3"}>NO3 Midtnorge</MenuItem>
              <MenuItem value={"NO4"}>NO4 Nordnorge</MenuItem>
              <MenuItem value={"NO5"}>NO5 Vestnorge</MenuItem>
            </Select>
          </FormControl>
          <p>
            <a href="https://www.hvakosterstrommen.no">
              <img
                src="https://i.bnfcl.io/hva-koster-strommen/strompriser-levert-av-hvakosterstrommen_oTtWvqeiB.png"
                alt="Strømpriser levert av Hva koster strømmen.no"
                width="200"
                height="45"
              />
            </a>
          </p>
        </div>
        <LineChart
          dataset={parsedData}
          xAxis={[
            {
              dataKey: "time_start",
              scaleType: "utc",
              valueFormatter: (timestamp: string) => {
                const start = dayjs(timestamp).format("HH");
                const end = dayjs(timestamp).add(1, "h").format("HH");
                return start + "-" + end;
              },
            },
          ]}
          yAxis={[
            {
              dataKey: "NOK_per_kWh",
            },
          ]}
          series={[
            {
              dataKey: "NOK_per_kWh",
            },
          ]}
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
      </div>
    </>
  );
};

export default ElectricityChart;
