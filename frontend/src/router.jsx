import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error404Page from "./pages/Error404Page.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPage from "./pages/ForgotPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import StonkPage from "./pages/StonkPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot",
        element: <ForgotPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "watchlist",
        element: <WatchlistPage />,
      },
      {
        path: "watchlist/:symbol",
        element: <StonkPage />,
      },
    ],
  },
]);

export default router;