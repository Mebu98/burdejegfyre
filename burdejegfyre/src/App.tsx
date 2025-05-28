import "./App.css";
import WoodCalc from "./components/WoodCalc.tsx";
import ElectricityChart from "./components/ElectricityChart.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import ContextProvider from "./contexts/WoodNokKwhContext.tsx";

function App() {
  const theme = createTheme({
    colorSchemes: {
      dark: true,
      light: true,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <WoodCalc />
        <ElectricityChart />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
