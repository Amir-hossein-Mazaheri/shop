import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import theme from "../Layouts/configTheme";
import ErrorBoundary from "../Pages/Error/ErrorBoundary";
import configStore from "../Store/configStore";
import App from "./App";

const store = configStore;

const BombShop: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default BombShop;
