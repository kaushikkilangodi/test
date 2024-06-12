import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from "./routes";
import { DateProvider } from './context/DateContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from './styles/GlobalStyles';

const router = createRouter({
  routeTree,
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    customColor: Palette['primary'];
  }

  interface PaletteOptions {
    customColor?: PaletteOptions['primary'];
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#5A9EEE', // Set your custom primary color here
    },
    customColor: {
      main: '#D9D9D9',
      light: '#f0f0f2',
      // red: '#f22222', // Define your custom color here
    },
  },
});
function App() {
  return (
    <DateProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
    <RouterProvider router={router} />
</ThemeProvider>
</DateProvider>
  );
}

export default App;
