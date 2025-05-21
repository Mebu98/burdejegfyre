import { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";

const woodSettings = [
  {
    id: "weight",
    label: "Vekt (kg)",
    val: 0,
    endAdornment: "kg",
  },
  {
    id: "humidity",
    label: "Fuktighet",
    val: 0,
    endAdornment: "%",
  },
  {
    id: "price",
    label: "Pris",
    val: 0,
    endAdornment: "kr",
  },
];

function WoodCalc() {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      {woodSettings.map((x) => {
        return (
          <TextField
            key={x.id}
            id={x.id}
            label={x.label}
            type="number"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {x.endAdornment}
                  </InputAdornment>
                ),
              },
            }}
            onChange={(e) => {
              x.val = Number(e.target.value);
            }}
          />
        );
      })}
    </Box>
  );
}

export default WoodCalc;
