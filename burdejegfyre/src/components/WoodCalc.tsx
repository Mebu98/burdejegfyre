import { useEffect, useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";

const woodSettings = [
  {
    id: "weight",
    label: "Vekt (kilo)",
    val: 15,
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
    val: 100,
    endAdornment: "kr",
  },
];

// Formula from: https://nn.wikipedia.org/wiki/Brennverdi
// Default moisture of 20%
function calcKwhKg(moisture = 20) {
  let kwhKg = 5.32 - 0.06 * moisture;
  return Number(kwhKg.toFixed(2));
}

function calcNokKwh(kwhKg = 4.3, nokKg = 100 / 15, efficiency = 70) {
  let nokKwh = nokKg / (kwhKg * (efficiency * 0.01));
  return Number(nokKwh.toFixed(2));
}

function WoodCalc() {
  const [kwhKg, setKwhKg] = useState(0);
  const [nokKwh, setNokKwh] = useState(0);

  // Not really optimal way to set initial settings, but changing it might need some refactoring of woodSettings...
  function runCalcs() {
    let moisture = woodSettings?.find((n) => n.id === "moisture")?.val || 20;
    let weight = woodSettings?.find((n) => n.id === "weight")?.val || 15;
    let price = woodSettings?.find((n) => n.id === "price")?.val || 100;
    let efficiency =
      woodSettings?.find((n) => n.id === "efficiency")?.val || 100;
    let pendingKwhKg = calcKwhKg(moisture);
    setKwhKg(pendingKwhKg);
    setNokKwh(calcNokKwh(pendingKwhKg, price / weight, efficiency));
  }
  useEffect(() => {
    runCalcs();
  }, []);
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
                runCalcs();
                setNum(Number(e.target.value));
              }}
            />
          );
        })}
      </Box>
      <p>KWh / kg: {kwhKg}</p>
      <p> NOK / KWh: {nokKwh}</p>
    </div>
  );
}

export default WoodCalc;
