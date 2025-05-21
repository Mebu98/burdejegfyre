import "./App.css";
import { Box, createTheme, TextField, ThemeProvider } from "@mui/material";

function App() {
  const theme = createTheme({
    colorSchemes: {
      dark: true,
      light: true,
    },
  });

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
