import "./App.css";
import WoodCalc from "./components/WoodCalc.tsx";
import { Box, createTheme, TextField, ThemeProvider } from "@mui/material";

function App() {
  const theme = createTheme({
    colorSchemes: {
      dark: true,
      light: true,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <WoodCalc />
    </ThemeProvider>
  );
}

export default App;
