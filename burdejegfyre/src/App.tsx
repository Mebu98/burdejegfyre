import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box, TextField } from "@mui/material";

function App() {
  const woodSettings = [
    {
      id: "weight",
      label: "Vekt (kg)",
      val: 0,
    },
    {
      id: "humidity",
      label: "Fuktighet",
      val: 0,
    },
    {
      id: "price",
      label: "Pris",
      val: 0,
    },
  ];

  return (
    <>
      <div>Hello World</div>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        {woodSettings.map((x) => {
          return <TextField id={x.id} label={x.label} />;
        })}
      </Box>
    </>
  );
}

export default App;
