import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { I18nextProvider } from "react-i18next";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App.jsx";
import "./main.scss";
import i18n from "./translation/i18n";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
