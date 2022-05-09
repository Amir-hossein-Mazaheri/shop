import React from "react";

import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import clearLogsOnProduction from "../Helpers/clearLogsOnProduction";
import theme from "../Layouts/configTheme";
import ErrorBoundary from "../Pages/Error/ErrorBoundary";
import configStore from "../Store/configStore";
import App from "./App";

const store = configStore;

const queryClient = new QueryClient();

clearLogsOnProduction();

const BombShop: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default BombShop;
