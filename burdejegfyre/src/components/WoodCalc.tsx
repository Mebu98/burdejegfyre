import { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";

const woodSettings = [
  {
    id: "weight",
    label: "Vekt (kilo)",
    val: 0,
    endAdornment: "kg",
  },
  {
    id: "moisture",
    label: "Fuktighet",
    val: 20,
    endAdornment: "%",
  },
  {
    id: "efficiency",
    label: "Peisovn virkningsgrad",
    val: 70,
    endAdornment: "%",
  },
  {
    id: "price",
    label: "Pris",
    val: 0,
    endAdornment: "kr",
  },
];

// Formula from https://nn.wikipedia.org/wiki/Brennverdi
// Default moisture of 20%
function calcKwhKg(moisture = 20) {
  let kwhKg = 5.32 - 0.06 * moisture;
  return kwhKg.toFixed(2);
}

function WoodCalc() {
  // Not really optimal way to set initial settings, but changing it might need some refactoring of woodSettings...
  let moisture = woodSettings?.find((n) => n.id === "moisture")?.val;
  const [kwhKg, setKwhKg] = useState(calcKwhKg(moisture));
  return (
    <div>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        {woodSettings.map((x) => {
          const [num, setNum] = useState(x.val);
          return (
            <TextField
              key={x.id}
              id={x.id}
              label={x.label}
              value={num}
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
                let moisture = woodSettings?.find(
                  (n) => n.id === "moisture",
                )?.val;
                setKwhKg(calcKwhKg(moisture));
                setNum(Number(e.target.value));
              }}
            />
          );
        })}
      </Box>
      <p>KWh / kg: {kwhKg}</p>
    </div>
  );
}

export default WoodCalc;
