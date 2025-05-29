import { useEffect, useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { useWoodNokKwhContext } from "../contexts/WoodNokKwhContext";

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
  const kwhKg = 5.32 - 0.06 * moisture;
  return Number(kwhKg.toFixed(2));
}

function calcWoodNokKwh(kwhKg = 4.3, nokKg = 100 / 15, efficiency = 70) {
  const woodNokKwh = nokKg / (kwhKg * (efficiency * 0.01));
  return Number(woodNokKwh.toFixed(2));
}

const WoodCalc: React.FC = () => {
  const [kwhKg, setKwhKg] = useState(0);
  const { woodNokKwh, setWoodNokKwh } = useWoodNokKwhContext();

  // Not really optimal way to set initial settings, but changing it might need some refactoring of woodSettings...
  function runCalcs() {
    const moisture = woodSettings?.find((n) => n.id === "moisture")?.val || 20;
    const weight = woodSettings?.find((n) => n.id === "weight")?.val || 15;
    const price = woodSettings?.find((n) => n.id === "price")?.val || 100;
    const efficiency =
      woodSettings?.find((n) => n.id === "efficiency")?.val || 100;
    const pendingKwhKg = calcKwhKg(moisture);
    setKwhKg(pendingKwhKg);
    setWoodNokKwh(calcWoodNokKwh(pendingKwhKg, price / weight, efficiency));
  }
  useEffect(() => {
    runCalcs();
  });
  return (
    <div>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        {woodSettings.map((x) => {
          let num = x.val;
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
                num = Number(e.target.value);
              }}
            />
          );
        })}
      </Box>
      <details
        style={{
          maxWidth: "33vw",
          margin: "auto",
        }}
      >
        <summary>Hvordan bruke kalkulatoren.</summary>
        <h3>Eksempel situasjon</h3>
        <p>
          En har kjøpt førti 15kg bjørkeved poser med 20% fuktighet til 100 kr
          per pose.
        </p>
        <h3>Vekt</h3>
        <p>
          I dette feltet skal man fylle ut vekt per enhet av det du har kjøpt. I
          dette eksmepelet vil det være 15kg.
        </p>
        <h3>Fuktighet</h3>
        <p>
          Fuktigheten, det burde stå et estimat på informasjonslappen til veden.
          Hvis man er usikker er 20% et vanlig fuktighetsnivå for ved kjøpt i
          Norge.
        </p>
        <h3>Peisovn virkningsgrad</h3>
        <p>
          I dette feltet skal man fylle ut virkningsgraden til peisovnen din,
          hvis du er usikker kan du bruke estimater nedenfor. <br /> Hvis ovnen
          er åpen er virkningsgraden ofte mellom 20 og 40%. Hvis ovnen ikke er
          rentbrennende (ofte de før 1998), så har den ofte en virkningsgrad på
          40%. Hvis den er etter 1998 så vil den nok være nærmere 80%.
        </p>
        <h3>Pris</h3>
        <p>Dette vil være pris per "enhet". I dette eksempelet 100kr.</p>
      </details>

      <p>KWh / kg ved: {kwhKg}</p>
      <p> Effektiv NOK / kWh for oppvarming: {woodNokKwh}</p>
    </div>
  );
};

export default WoodCalc;
