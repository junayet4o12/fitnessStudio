import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MyRouts from "./MyRouts/MyRouts.jsx";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import AuthProviders from "./Authentication/AuthProvider/AuthProviders.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store.jsx";
import { ThemeProvider } from "@material-tailwind/react";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <HelmetProvider>
        <AuthProviders>
          <ThemeProvider>
          <RouterProvider router={MyRouts} />
          </ThemeProvider>
        </AuthProviders>
      </HelmetProvider>
    </Provider>
  </QueryClientProvider>
);
