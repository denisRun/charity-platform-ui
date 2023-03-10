import ReactDOM from "react-dom/client";
import App from './App';
import { RootStore } from './stores/RootStore';
import { StoreProvider } from './contexts/StoreContext';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const store = new RootStore();

root.render(
  <StoreProvider store={store}>
      <App />
  </StoreProvider>
  );
