import "./App.css";
import WoodCalc from "./components/WoodCalc.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import ContextProvider from "./contexts/NokKwhContext.tsx";
import GlobalTest from "./components/GlobalTest.tsx";

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
        <GlobalTest />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
