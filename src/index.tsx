import ReactDOM from "react-dom/client";
import App from './App';
import { RootStore } from './stores/RootStore';
import { StoreProvider } from './contexts/StoreContext';
import { SnackbarProvider } from "notistack";
import StyledSnackbar from "./styles/StyledSnackbar";
import { I18nextProvider } from "react-i18next";
import i18n from "./18n";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const store = new RootStore();

root.render(
  <StoreProvider store={store}>
    <SnackbarProvider Components={{ success: StyledSnackbar, error: StyledSnackbar, }} preventDuplicate autoHideDuration={3000}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </SnackbarProvider>
  </StoreProvider>
  );
